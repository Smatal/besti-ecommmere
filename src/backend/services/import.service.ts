import ExcelJS from "exceljs";
import { client, writeClient } from "@/backend/sanity/lib/client";
import { prisma } from "@/backend/db/client";
import { ALL_CATEGORIES_QUERY } from "@/backend/sanity/queries";
import { revalidatePath } from "next/cache";

export interface ExcelProductRow {
  sku: string;
  name: string;
  category: string;
  price: number;
  mrp: number;
  duoPrice?: number;
  duoMrp?: number;
  stock: number;
  volume?: string;
  badge?: string;
  subtitle?: string;
  description?: string;
  actives?: string;
}

export interface ImportPreviewResult {
  willCreate: number;
  willUpdate: number;
  willFail: number;
  failures: { row: number; sku: string; reason: string }[];
  validRows: ExcelProductRow[];
}

export class ImportService {
  /**
   * Generates a pre-formatted Excel template (.xlsx) with header styling and category validations.
   */
  static async generateTemplateBuffer(): Promise<Buffer> {
    const categories = await client.fetch<any[]>(ALL_CATEGORIES_QUERY);
    const categoryNames = categories.map((c) => c.name || c.id);

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Products");

    sheet.columns = [
      { header: "SKU / Product ID*", key: "sku", width: 22 },
      { header: "Product Name*", key: "name", width: 32 },
      { header: "Category*", key: "category", width: 20 },
      { header: "Price (INR)*", key: "price", width: 16 },
      { header: "MRP (INR)*", key: "mrp", width: 16 },
      { header: "Duo Price (INR)", key: "duoPrice", width: 16 },
      { header: "Duo MRP (INR)", key: "duoMrp", width: 16 },
      { header: "Initial Stock*", key: "stock", width: 16 },
      { header: "Volume (e.g. 50ml)", key: "volume", width: 18 },
      { header: "Badge (e.g. BESTSELLER)", key: "badge", width: 22 },
      { header: "Clinical Subtitle", key: "subtitle", width: 30 },
      { header: "Description", key: "description", width: 45 },
      { header: "Actives (comma separated)", key: "actives", width: 40 },
    ];

    // Header styling
    const headerRow = sheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 11 };
    headerRow.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF0F172A" }, // Dark slate
    };
    headerRow.height = 28;
    headerRow.alignment = { vertical: "middle", horizontal: "center" };

    // Sample guidance rows
    sheet.addRow({
      sku: "hyaluronic-booster",
      name: "Hyaluronic Acid 2% + B5 Multi-Depth Booster",
      category: categoryNames[0] || "Hydration",
      price: 599,
      mrp: 799,
      duoPrice: 1099,
      duoMrp: 1598,
      stock: 120,
      volume: "30ml",
      badge: "NEW LAUNCH",
      subtitle: "Multi-molecular hydration for dewy, resilient skin barrier",
      description: "Clinical grade ultra-pure hyaluronic serum with pro-vitamin B5.",
      actives: "2% Multi-Molecular HA, 1% Panthenol B5, Pentavitin",
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
  }

  /**
   * Pre-flights the rows: validates formatting, duplicates, required columns.
   */
  static async processPreview(rows: ExcelProductRow[]): Promise<ImportPreviewResult> {
    const existingSanity = await client.fetch<any[]>(`*[_type == "product"]{id, "sku": id}`);
    const existingSkus = new Set(existingSanity.map((p) => (p.sku || p.id).toLowerCase()));
    const seenInSheet = new Set<string>();

    const result: ImportPreviewResult = {
      willCreate: 0,
      willUpdate: 0,
      willFail: 0,
      failures: [],
      validRows: [],
    };

    rows.forEach((row, idx) => {
      const rowNumber = idx + 2;
      const sku = (row.sku || "").trim().toLowerCase();

      if (!sku) {
        result.willFail++;
        result.failures.push({ row: rowNumber, sku: "N/A", reason: "SKU/Product ID is required" });
        return;
      }

      if (seenInSheet.has(sku)) {
        result.willFail++;
        result.failures.push({ row: rowNumber, sku, reason: `Duplicate SKU "${sku}" found within sheet` });
        return;
      }
      seenInSheet.add(sku);

      if (!row.name || !row.name.trim()) {
        result.willFail++;
        result.failures.push({ row: rowNumber, sku, reason: "Product Name is required" });
        return;
      }

      if (!row.price || isNaN(row.price) || row.price <= 0) {
        result.willFail++;
        result.failures.push({ row: rowNumber, sku, reason: "Valid price greater than 0 is required" });
        return;
      }

      if (existingSkus.has(sku)) {
        result.willUpdate++;
      } else {
        result.willCreate++;
      }

      result.validRows.push(row);
    });

    return result;
  }

  /**
   * Executes batch upsert into Sanity CMS and Neon PostgreSQL Inventory.
   */
  static async executeImportBatch(rows: ExcelProductRow[]) {
    const errors: { sku: string; reason: string }[] = [];
    let successCount = 0;

    for (const row of rows) {
      try {
        const canonicalId = row.sku.toLowerCase().replace(/[^a-z0-9_-]/g, "-");
        const slug = canonicalId;
        const categoryKey = (row.category || "serums").toLowerCase().replace(/[^a-z0-9]/g, "-");

        // 1. Sanity CMS upsert
        const doc = {
          _type: "product",
          id: canonicalId,
          name: row.name.trim(),
          slug: { _type: "slug", current: slug },
          categoryName: row.category || "Skincare",
          category: {
            _type: "reference",
            _ref: categoryKey,
          },
          singlePrice: Math.round(Number(row.price)),
          singleMrp: Math.round(Number(row.mrp || row.price * 1.25)),
          duoPrice: row.duoPrice ? Math.round(Number(row.duoPrice)) : Math.round(Number(row.price) * 1.85),
          duoMrp: row.duoMrp ? Math.round(Number(row.duoMrp)) : Math.round(Number(row.mrp || row.price * 1.25) * 2),
          volume: row.volume || "50ml",
          badge: row.badge || undefined,
          subtitle: row.subtitle || undefined,
          description: row.description || undefined,
          actives: row.actives
            ? row.actives.split(",").map((s) => s.trim()).filter(Boolean)
            : undefined,
        };

        // Check if doc exists in Sanity
        const existingDoc = await client.fetch(`*[_type == "product" && (id == $id || _id == $id)][0]`, {
          id: canonicalId,
        });

        if (existingDoc) {
          await writeClient.patch(existingDoc._id).set(doc).commit();
        } else {
          await writeClient.create({
            ...doc,
            _id: `product-${canonicalId}`,
          });
        }

        // 2. Neon Database Inventory upsert
        await prisma.inventory.upsert({
          where: { productId: canonicalId },
          update: {
            availableStock: Math.max(0, Math.round(Number(row.stock || 100))),
          },
          create: {
            productId: canonicalId,
            availableStock: Math.max(0, Math.round(Number(row.stock || 100))),
            reservedStock: 0,
            lowStockThreshold: 15,
          },
        });

        successCount++;
      } catch (err: any) {
        console.error(`[executeImportBatch] Failed on SKU ${row.sku}:`, err);
        errors.push({ sku: row.sku, reason: err.message || "Unknown write failure" });
      }
    }

    await prisma.auditLog.create({
      data: {
        action: "PRODUCTS_BULK_IMPORTED",
        entityType: "Product",
        entityId: "EXCEL_IMPORT",
        summary: `Excel bulk import completed: ${successCount} successful, ${errors.length} failed`,
        details: { totalRows: rows.length, successCount, errors },
      },
    });

    revalidatePath("/admin/products");
    revalidatePath("/admin/inventory");
    revalidatePath("/admin/dashboard");
    revalidatePath("/");

    return {
      success: true,
      processed: rows.length,
      successCount,
      errors,
    };
  }
}
