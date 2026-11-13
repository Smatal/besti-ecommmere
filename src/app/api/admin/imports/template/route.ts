import { NextResponse } from "next/server";
import { ImportService } from "@/backend/services/import.service";

export async function GET() {
  try {
    const buffer = await ImportService.generateTemplateBuffer();

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Disposition": 'attachment; filename="bestie_cares_products_template.xlsx"',
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    });
  } catch (error: any) {
    console.error("[TemplateRoute] Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate template" },
      { status: 500 }
    );
  }
}
