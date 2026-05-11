import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ exportId: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { exportId } = await params;

    const pdfExport = await prisma.pdfExport.findUnique({
      where: { id: exportId },
      include: {
        itinerary: {
          select: { destination: true }
        }
      }
    });

    if (!pdfExport) {
      return NextResponse.json({ error: "Export job not found" }, { status: 404 });
    }

    // Security check: ensure user owns this export
    if (pdfExport.userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({
      id: pdfExport.id,
      status: pdfExport.status,
      url: pdfExport.url,
      destination: pdfExport.itinerary.destination,
      createdAt: pdfExport.createdAt,
    });

  } catch (error) {
    console.error("PDF Status API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
