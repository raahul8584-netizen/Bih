'use client';
import React from 'react';

export default function BottomGrid() {
  const partners = [
    { name: "DMart" },
    { name: "bigbasket" },
    { name: "Flipkart" },
    { name: "meesho" },
    { name: "Reliance" },
    { name: "TATA 1mg" }
  ];

  const news = [
    { title: "ADSP Expands to 50+ New Cities", date: "June 12, 2026" },
    { title: "Partner Rewards Program Launched", date: "June 5, 2026" },
    { title: "New Training Module for Partners", date: "May 28, 2026" }
  ];

  return (
    <section className="py-20 bg-[#0B0F19] text-white border-b border-white/5">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Column 1: Testimonial */}
          <div className="space-y-4">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 block">
              WHAT OUR PARTNERS SAY
            </span>
            <div className="bg-[#111827] p-8 rounded-2xl border border-white/[0.04] shadow-2xl flex flex-col justify-between min-h-[300px]">
              <p className="text-slate-300 text-xs italic leading-relaxed">
                "ADSP Logistic Hub has given me consistent deliveries and timely payments. Support team is always responsive."
              </p>
              
              <div className="mt-8">
                {/* 5 Golden Stars */}
                <div className="flex items-center gap-1 text-amber-500 mb-2 text-xs">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-700" />
                  <div>
                    <h4 className="font-bold text-white text-xs">Rohit Sharma</h4>
                    <span className="text-[9px] text-slate-500 uppercase tracking-wider block">Delivery Partner</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Our Partners Grid */}
          {/* <div className="space-y-4">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 block">
              OUR PARTNERS
            </span>
            <div className="grid grid-cols-2 gap-4">
              {partners.map((partner, idx) => (
                <div 
                  key={idx} 
                  className="bg-[#111827] border border-white/[0.04] hover:border-amber-500/20 transition-all rounded-2xl h-24 flex items-center justify-center p-4 text-center group cursor-pointer"
                >
                  <span className="text-sm font-black text-slate-400 group-hover:text-white transition-colors duration-200 uppercase tracking-wider font-mono">
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
          </div> */}

          {/* Column 3: Latest News Feed */}
          <div className="space-y-4">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 block">
              LATEST NEWS
            </span>
            <div className="bg-[#111827] rounded-2xl border border-white/[0.04] p-6 lg:p-8 shadow-2xl space-y-6">
              <div className="divide-y divide-white/[0.04]">
                {news.map((item, idx) => (
                  <div key={idx} className="py-4.5 first:pt-0 last:pb-0 flex flex-col gap-1 hover:pl-1 transition-all duration-250 cursor-pointer">
                    <h4 className="font-bold text-xs text-slate-300 hover:text-amber-500 transition-colors">
                      {item.title}
                    </h4>
                    <span className="text-[9px] text-slate-500 font-mono">{item.date}</span>
                  </div>
                ))}
              </div>
              
              <div className="pt-2 border-t border-white/[0.04] text-center">
                <a href="#" className="text-xs font-bold text-amber-500 hover:underline">
                  View All News
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
