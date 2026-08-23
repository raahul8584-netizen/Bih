import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Try to fetch from Strapi support endpoint if configured/public
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://server-production-ce2d.up.railway.app';
    const response = await fetch(`${strapiUrl}/api/supports`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (response.ok) {
      const data = await response.json();
      // Inspect structure. Typically Strapi v4 returns { data: [ { id: 1, attributes: { phone: "...", whatsapp: "..." } } ] }
      // Or { data: [ { phone: "...", whatsapp: "..." } ] }
      const supportData = data.data?.[0];
      if (supportData) {
        const attributes = supportData.attributes || supportData;
        const phone = attributes.phone || attributes.phoneNumber || '+91 8537833586';
        const whatsapp = attributes.whatsapp || attributes.whatsappNumber || '+91 8537833586';
        const email = attributes.email || 'support@logisshub.info';
        return NextResponse.json({ phone, whatsapp, email });
      }
    }
  } catch (error) {
    console.error('Error fetching support info from Strapi:', error);
  }

  // Fallback defaults if Strapi fetch fails or has no data
  return NextResponse.json({
    phone: '+91 8537833586',
    whatsapp: '+91 8537833586',
    email: 'support@logisshub.info'
  });
}
