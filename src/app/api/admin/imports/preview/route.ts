import { NextResponse } from "next/server";
import { ImportService, ExcelProductRow } from "@/backend/services/import.service";
import ExcelJS from "exceljs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("excel") as File;

    if (!file) {
      return NextResponse.json({ error: "Missing Excel or CSV file" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const workbook = new ExcelJS.Workbook();
    let sheet: ExcelJS.Worksheet | undefined;

    if (file.name.toLowerCase().endsWith(".csv")) {
      const { Readable } = await import("stream");
      sheet = await workbook.csv.read(Readable.from([buffer.toString("utf-8")]));
    } else {
      // @ts-ignore
      await workbook.xlsx.load(buffer);
      sheet = workbook.getWorksheet("Products") || workbook.worksheets[0];
    }

    if (!sheet) {
      return NextResponse.json(
        { error: "Could not find a valid worksheet in the file." },
        { status: 400 }
      );
    }

    const rows: ExcelProductRow[] = [];

    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // Skip headers

      const getVal = (col: number) => {
        const val = row.getCell(col).value;
        return val ? String(val).trim() : "";
      };

      const getNum = (col: number) => {
        const val = row.getCell(col).value;
        if (typeof val === "number") return val;
        if (typeof val === "string") {
          const parsed = parseFloat(val.replace(/[^0-9.]/g, ""));
          return isNaN(parsed) ? 0 : parsed;
        }
        return 0;
      };

      rows.push({
        sku: getVal(1),
        name: getVal(2),
        category: getVal(3),
        price: getNum(4),
        mrp: getNum(5),
        duoPrice: getNum(6) || undefined,
        duoMrp: getNum(7) || undefined,
        stock: getNum(8),
        volume: getVal(9),
        badge: getVal(10),
        subtitle: getVal(11),
        description: getVal(12),
        actives: getVal(13),
      });
    });

    const preview = await ImportService.processPreview(rows);
    return NextResponse.json(preview);
  } catch (error: any) {
    console.error("[PreviewRoute] Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process import preview" },
      { status: 500 }
    );
  }
}
