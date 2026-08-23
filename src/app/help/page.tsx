'use client';

import { useEffect, useState } from 'react';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function HelpPage() {
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

  const faqs = [
    { q: "How can I become a delivery partner?", a: "Go to the Partner Program page (/fba) and click 'Apply Now' to register. You will need your basic business KYC documents." },
    { q: "Where can I track my shipment status?", a: "Use the Track Package page (/tracking) and enter your Tracking ID to view real-time location and progress." },
    { q: "How does the payment cycle work?", a: "Payment cycles for our partner network are processed bi-weekly (every 14 days) directly into your registered bank account." },
    { q: "Who should I contact for on-road issues?", a: "Our support helpline is available 24/7. Reach out via the phone number or WhatsApp buttons on this page." }
  ];

  return (
    <main className="min-h-screen flex flex-col bg-[#F7F9FC] text-[#0F1111] font-sans">
      <TopBar />
      <Header />

      {/* Designer Hero Banner */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 py-20 text-white overflow-hidden">
        {/* Soft Background Mesh */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <span className="text-blue-400 font-extrabold uppercase tracking-widest text-xs bg-blue-500/10 border border-blue-500/25 px-4 py-2 rounded-full inline-block mb-4 shadow-sm">
            Customer Care Support
          </span>
          <h1 className="text-4xl md:text-5xl font-black mt-2 mb-6 tracking-tight text-white">
            How can we <span className="text-blue-400">help you</span> today?
          </h1>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Get instant solutions or connect directly with our support desk. Available 24/7.
          </p>
        </div>
      </section>

      {/* Main Premium Light Container */}
      <section className="py-20 container mx-auto px-4 max-w-6xl flex-1">
        {/* Connection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          {/* Call Card */}
          <div className="group bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-500 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-3xl mb-6 text-blue-600 group-hover:scale-110 transition-transform duration-300">
              📞
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">Call Helpline</h3>
              <p className="text-gray-500 text-sm mb-6 max-w-xs leading-relaxed">
                Direct phone helpline for urgent operations and on-road query resolution.
              </p>
            </div>
            <a 
              href={`tel:${support.phone}`} 
              className="bg-blue-600 hover:bg-blue-700 !text-white px-6 py-3.5 rounded-xl text-base font-extrabold transition-all w-full text-center shadow-sm duration-300"
            >
              {support.phone}
            </a>
          </div>

          {/* WhatsApp Card */}
          <div className="group bg-white p-8 rounded-2xl border border-gray-200 hover:border-[#25D366] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#25D366]/10 flex items-center justify-center text-3xl mb-6 text-[#25D366] group-hover:scale-110 transition-transform duration-300">
              💬
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">WhatsApp Support</h3>
              <p className="text-gray-500 text-sm mb-6 max-w-xs leading-relaxed">
                Connect instantly on WhatsApp for real-time tracking support and queries.
              </p>
            </div>
            <a 
              href={`https://wa.me/${rawWhatsapp}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-[#25D366] hover:bg-[#1EBE57] !text-white px-6 py-3.5 rounded-xl text-base font-extrabold transition-all w-full text-center shadow-sm duration-300"
            >
              Chat on WhatsApp
            </a>
          </div>

          {/* Email Card */}
          <div className="group bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-500 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-3xl mb-6 text-blue-600 group-hover:scale-110 transition-transform duration-300">
              ✉️
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">Email Helpdesk</h3>
              <p className="text-gray-500 text-sm mb-6 max-w-xs leading-relaxed">
                Submit requests regarding partner registrations, invoices, or billing.
              </p>
            </div>
            <a 
              href={`mailto:${support.mail}`} 
              className="bg-blue-600 hover:bg-blue-700 !text-white px-6 py-3.5 rounded-xl text-sm font-extrabold transition-all w-full text-center break-all shadow-sm duration-300"
            >
              {support.mail}
            </a>
          </div>

        </div>

        {/* Designer FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-slate-800 text-center mb-12 tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-200 p-6 rounded-2xl transition-all duration-200 hover:border-blue-500/40 hover:shadow-md"
              >
                <h4 className="font-extrabold text-lg text-slate-800 mb-2 flex items-start gap-2">
                  <span className="text-blue-500">Q.</span>
                  {faq.q}
                </h4>
                <p className="text-gray-600 leading-relaxed text-sm pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Back navigation */}
        <div className="mt-16 text-center">
          <Link 
            href="/" 
            className="inline-flex items-center text-gray-500 hover:text-blue-500 font-bold transition-colors group"
          >
            <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span> Back to Homepage
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
