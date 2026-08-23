'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

export default function TopBar() {
  const [support, setSupport] = useState({
    phone: "",
    whatsapp: "",
    mail: "",
  });

  const apiurl = process.env.NEXT_PUBLIC_STRAPI_URL;

  useEffect(() => {
    if (!apiurl) return;

    fetch(`${apiurl}/api/supports`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((result) => {

        const supportData = result.data?.[0];

        if (supportData) {
          setSupport({
            phone: supportData.supportnumber || "",
            whatsapp: supportData.supportwhatapp || "",
            mail: supportData.supportmail || "",
          });

        }
      })
      .catch((err) => console.error("Error fetching support:", err));
  }, [apiurl]);

  const rawWhatsapp = support.whatsapp.replace(/\D/g, '');

  return (
    <div className="bg-slate-950 text-[#CCCCCC] py-2.5 text-xs md:text-sm border-b border-white/5">
      <div className="container mx-auto px-4 flex flex-wrap justify-between items-center gap-2">
        <div className="flex flex-wrap gap-4 md:gap-8 items-center">
          <span className="hidden sm:inline-flex items-center gap-1">
            <span className="text-blue-500">📍</span> Mumbai, MH, India
          </span>
          <span className="flex items-center gap-1 text-xs">
            🕒 24/7 Ops
          </span>
          <span className="flex items-center gap-1">
            📞 <a href={`tel:${support.phone}`} className="text-[#CCCCCC] hover:text-white transition-colors">{support.phone}</a>
          </span>
          <span className="flex items-center gap-1">
            <span className="text-[#25D366]">💬</span> <a href={`https://wa.me/${rawWhatsapp}`} target="_blank" rel="noopener noreferrer" className="text-[#CCCCCC] hover:text-[#25D366] transition-colors font-medium">WhatsApp</a>
          </span>
        </div>
        <div className="flex gap-4 items-center">
          <span className="cursor-pointer hover:text-white transition-colors hidden xs:inline">Global Operations</span>
          <span className="text-gray-600 hidden xs:inline">|</span>
          <Link href="/help" className="hover:text-white transition-colors">Help</Link>
        </div>
      </div>
    </div>
  );
}


