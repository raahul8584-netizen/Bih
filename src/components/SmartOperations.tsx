'use client';
import React from 'react';

export default function SmartOperations() {
  const checklist = [
    { title: "Real-time Tracking" },
    { title: "Smart Route Optimization" },
    { title: "Automated Workflows" },
    { title: "Performance Analytics" }
  ];

  const highlights = [
    {
      title: "Dedicated Support",
      desc: "24/7 support for all your delivery needs",
      icon: (
        <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      title: "Timely Payments",
      desc: "Secure & on-time payouts every time",
      icon: (
        <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Growth Opportunities",
      desc: "More deliveries, more earnings",
      icon: (
        <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      title: "Partner Community",
      desc: "Be part of a strong and growing network",
      icon: (
        <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 bg-[#0B0F19] text-white border-b border-white/5 relative">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left Column: Slogan, Description & Checklist */}
          <div className="lg:col-span-5 text-center lg:text-left space-y-6">
            <span className="text-amber-500 font-extrabold uppercase tracking-widest text-[10px] bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full inline-block">
              Smart Operations
            </span>
            <h2 className="text-3xl lg:text-4xl font-black leading-tight tracking-tight">
              Technology that moves your business forward
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md mx-auto lg:mx-0">
              Real-time tracking, automated updates, intelligent routing, and seamless integrations to help you deliver more, faster and smarter.
            </p>

            {/* Checklist Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4 max-w-md mx-auto lg:mx-0">
              {checklist.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs font-bold text-slate-300">{item.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Live Operations Dashboard Widget */}
          <div className="lg:col-span-7 bg-[#111827] rounded-3xl border border-white/[0.06] p-6 lg:p-8 shadow-2xl relative">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">Live Operations</h3>
                <p className="text-slate-500 text-[10px]">Real-time overview of active hub dispatches</p>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-4 gap-4 p-4 bg-slate-950 rounded-2xl border border-white/[0.04] mb-6 text-center">
              <div>
                <span className="text-slate-500 text-[9px] uppercase tracking-wider block">Active Dispatches</span>
                <span className="text-base font-extrabold text-white font-mono">1,248</span>
              </div>
              <div>
                <span className="text-slate-500 text-[9px] uppercase tracking-wider block">SLA Rate</span>
                <span className="text-base font-extrabold text-amber-500 font-mono">98.6%</span>
              </div>
              <div>
                <span className="text-slate-500 text-[9px] uppercase tracking-wider block">Delays</span>
                <span className="text-base font-extrabold text-red-500 font-mono">18</span>
              </div>
              <div>
                <span className="text-slate-500 text-[9px] uppercase tracking-wider block">RTD Avg</span>
                <span className="text-base font-extrabold text-white font-mono">2.1%</span>
              </div>
            </div>

            {/* Simulated Tracking Map Path */}
            <div className="h-44 bg-slate-950 rounded-2xl border border-white/[0.04] relative overflow-hidden mb-6 flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] bg-[size:16px_16px]" />
              {/* SVG Vector Path map line */}
              <svg className="w-full h-full p-4 relative z-10" fill="none" strokeWidth="2.5">
                <path d="M 40,80 Q 120,20 200,80 T 360,60" stroke="#1e293b" strokeDasharray="4 4" />
                <path d="M 40,80 Q 120,20 200,80 T 360,60" stroke="#eab308" className="animate-dash" strokeDashoffset="100" />
                {/* Node Points */}
                <circle cx="40" cy="80" r="4.5" fill="#eab308" />
                <circle cx="200" cy="80" r="4.5" fill="#eab308" />
                <circle cx="360" cy="60" r="4.5" fill="#eab308" />
              </svg>
              <span className="absolute bottom-3 left-4 text-[9px] font-bold text-slate-500 uppercase tracking-widest font-mono">Route Tracker Live</span>
            </div>

            {/* Recent Activities List */}
            <div className="space-y-4">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">Recent Activities</span>
              <div className="divide-y divide-white/[0.04] text-xs">
                <div className="flex justify-between py-3">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span className="text-slate-300 font-bold">Delivery Completed</span>
                    <span className="text-slate-500">#ADSP8293 completed</span>
                  </div>
                  <span className="text-slate-500 font-mono">2 min ago</span>
                </div>
                <div className="flex justify-between py-3">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span className="text-slate-300 font-bold">Out for Delivery</span>
                    <span className="text-slate-500">#ADSP8294 dispatched</span>
                  </div>
                  <span className="text-slate-500 font-mono">5 min ago</span>
                </div>
                <div className="flex justify-between py-3">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span className="text-slate-300 font-bold">Consignment Received</span>
                    <span className="text-slate-500">#ADSP8295 sorted</span>
                  </div>
                  <span className="text-slate-500 font-mono">10 min ago</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Highlights Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-12 border-t border-white/5">
          {highlights.map((item, idx) => (
            <div key={idx} className="bg-[#111827] p-6 rounded-2xl border border-white/[0.04] flex items-start gap-4">
              <div className="p-3 bg-amber-500/10 rounded-xl shrink-0 text-amber-500">
                {item.icon}
              </div>
              <div>
                <h4 className="font-bold text-white text-sm mb-1">{item.title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
