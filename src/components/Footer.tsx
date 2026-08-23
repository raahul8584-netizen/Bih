'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import TronisLogo from '@/components/UI/TronisLogo';
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiLinkedin } from 'react-icons/fi';

export default function Footer() {
  const [support, setSupport] = useState({
    phone: "1800-ADSP-HUB",
    whatsapp: "+91 99999 99999",
    mail: "support@adsp-hub.in",
  });

  const apiurl = process.env.NEXT_PUBLIC_STRAPI_URL;
  const currentYear = new Date().getFullYear();

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
            phone: supportData.supportnumber || "1800-ADSP-HUB",
            whatsapp: supportData.supportwhatapp || "+91 99999 99999",
            mail: supportData.supportmail || "support@adsp-hub.in",
          });
        }
      })
      .catch((err) => console.error("Error fetching support:", err));
  }, [apiurl]);

  const rawWhatsapp = support.whatsapp.replace(/\D/g, '');

  return (
    <footer className="bg-slate-950 text-slate-400 pt-20 pb-10 border-t border-white/5 font-sans">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Logo & Slogan Column */}
          <div className="md:col-span-4 space-y-4">
            <TronisLogo />
            <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
              Delivering trust. Powering growth. Join the nation's leading hub partner network.
            </p>
            <div className="space-y-1.5 text-xs">
              <p><span className="text-slate-400 font-bold">Helpline:</span> <a href={`tel:${support.phone}`} className="text-amber-500 hover:underline">{support.phone}</a></p>
              <p><span className="text-slate-400 font-bold">Email:</span> <a href={`mailto:${support.mail}`} className="text-amber-500 hover:underline">{support.mail}</a></p>
              <p><span className="text-slate-400 font-bold">WhatsApp:</span> <a href={`https://wa.me/${rawWhatsapp}`} target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:underline">{support.whatsapp}</a></p>
            </div>
          </div>

          {/* Company Links */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-bold text-xs text-white uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/" className="hover:text-amber-500 transition-colors">About Us</Link></li>
              <li><Link href="/" className="hover:text-amber-500 transition-colors">Careers</Link></li>
              <li><Link href="/" className="hover:text-amber-500 transition-colors">Press & Media</Link></li>
              <li><Link href="/" className="hover:text-amber-500 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Partner Program Links */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-bold text-xs text-white uppercase tracking-wider">Partner Program</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/register" className="hover:text-amber-500 transition-colors">Become a Partner</Link></li>
              <li><Link href="/" className="hover:text-amber-500 transition-colors">Partner Benefits</Link></li>
              <li><Link href="/" className="hover:text-amber-500 transition-colors">Training & Support</Link></li>
              <li><Link href="/login" className="hover:text-amber-500 transition-colors">Partner Login</Link></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-bold text-xs text-white uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/help" className="hover:text-amber-500 transition-colors">Help Center</Link></li>
              <li><Link href="/" className="hover:text-amber-500 transition-colors">Guidelines</Link></li>
              <li><Link href="/tracking" className="hover:text-amber-500 transition-colors">Notifications</Link></li>
              <li><Link href="/" className="hover:text-amber-500 transition-colors">News & Updates</Link></li>
            </ul>
          </div>

          {/* Download App Badges */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-bold text-xs text-white uppercase tracking-wider">Download Partner App</h4>
            <div className="space-y-3">
              {/* Google Play */}
              <a href="#" className="flex items-center gap-3 px-4 py-2.5 bg-slate-900 border border-white/5 rounded-xl hover:border-amber-500/20 transition-all max-w-[170px]">
                <svg className="w-6 h-6 text-amber-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 3.25a.75.75 0 00-.75.75v16c0 .414.336.75.75.75h1.27l9.78-8.75L6.27 3.25H5zm2.7 1.05l7.98 7.15-7.98 7.15V4.3z" />
                </svg>
                <div className="text-left leading-tight">
                  <span className="text-[9px] text-slate-500 uppercase tracking-widest block">Get it on</span>
                  <span className="text-xs font-bold text-white block">Google Play</span>
                </div>
              </a>

              {/* App Store */}
              <a href="#" className="flex items-center gap-3 px-4 py-2.5 bg-slate-900 border border-white/5 rounded-xl hover:border-amber-500/20 transition-all max-w-[170px]">
                <svg className="w-6 h-6 text-amber-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.51-.64.73-1.2 1.87-1.05 2.98 1.11.09 2.25-.56 2.91-1.43z" />
                </svg>
                <div className="text-left leading-tight">
                  <span className="text-[9px] text-slate-500 uppercase tracking-widest block">Download on the</span>
                  <span className="text-xs font-bold text-white block">App Store</span>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-6 text-xs text-slate-500">
          <div>
            <p>© {currentYear} ADSP Logistic Hub. All rights reserved.</p>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors"><FiFacebook className="w-4.5 h-4.5" /></a>
            <a href="#" className="hover:text-white transition-colors"><FiTwitter className="w-4.5 h-4.5" /></a>
            <a href="#" className="hover:text-white transition-colors"><FiInstagram className="w-4.5 h-4.5" /></a>
            <a href="#" className="hover:text-white transition-colors"><FiYoutube className="w-4.5 h-4.5" /></a>
            <a href="#" className="hover:text-white transition-colors"><FiLinkedin className="w-4.5 h-4.5" /></a>
          </div>
        </div>

      </div>
    </footer>
  );
}