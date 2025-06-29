
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const dataToEncode = searchParams.get('data');

  if (!dataToEncode) {
    return new NextResponse('Parameter "data" diperlukan.', { status: 400 });
  }

  const qrServerUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(dataToEncode)}`;

  try {
    const response = await fetch(qrServerUrl);

    if (!response.ok) {
      throw new Error(`Gagal mengambil kode QR dari server: ${response.statusText}`);
    }

    const imageBuffer = await response.arrayBuffer();

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable', // Cache for 1 year
      },
    });
  } catch (error) {
    console.error("Gagal membuat kode QR:", error);
    return new NextResponse('Terjadi kesalahan internal saat membuat kode QR.', { status: 500 });
  }
}
