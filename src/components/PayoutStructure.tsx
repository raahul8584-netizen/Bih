'use client';

import { FiDollarSign, FiCalendar, FiCreditCard, FiTrendingUp, FiPackage, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

export default function PayoutStructure() {
  const payoutRows = [
    {
      label: "Payout Schedule",
      value: "Weekly",
      badge: "Guaranteed Payout",
      icon: <FiCalendar className="text-amber-500" size={18} />
    },
    {
      label: "Payout Account",
      value: "Beneficiary Bank Account",
      badge: "Direct Bank Transfer",
      icon: <FiCreditCard className="text-amber-500" size={18} />
    },
    {
      label: "Per Successful Delivery (HUB PARTNER)",
      value: "60 INR",
      highlight: true,
      badge: "Hub Earnings / Parcel",
      icon: <FiDollarSign className="text-amber-500" size={18} />
    },
    {
      label: "Per Successful Delivery (DELIVERY AGENT)",
      value: "22 INR",
      highlight: false,
      badge: "Rider Payout / Parcel",
      icon: <FiTrendingUp className="text-amber-500" size={18} />
    },
    {
      label: "Return To Origin (RTO)",
      value: "0 INR",
      badge: "Standard Policy",
      icon: <FiPackage className="text-slate-400" size={18} />
    },
    {
      label: "Lost / Theft / Damaged (Within Hub Premises)",
      value: "Bared by HUB PARTNER",
      badge: "Safety Responsibility",
      icon: <FiAlertCircle className="text-amber-500" size={18} />
    },
    {
      label: "Daily Number of Parcels",
      value: "300 parcels/day",
      badge: "Expected Daily Volume",
      icon: <FiPackage className="text-amber-500" size={18} />
    },
    {
      label: "Weekly Target",
      value: "1600 parcels/week",
      badge: "Target Capacity",
      icon: <FiCheckCircle className="text-amber-500" size={18} />
    }
  ];

  return (
    <section className="py-20 bg-[#0B0F19] text-white border-b border-white/5 relative overflow-hidden font-sans">
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-14 space-y-3">
          <span className="text-amber-500 font-extrabold uppercase tracking-[0.25em] text-xs bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 rounded-full inline-block">
            EARNINGS & PAYOUT MODEL
          </span>
          <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight">
            Official Payout Structure
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
            Transparent weekly payouts and clear per-parcel earnings for Logistic Hub Partners.
          </p>
        </div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <div className="bg-[#111827] border border-amber-500/30 rounded-2xl p-5 shadow-[0_0_20px_rgba(234,179,8,0.05)] flex flex-col justify-between">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Hub Earnings</span>
            <div className="my-2">
              <span className="text-3xl font-black text-amber-400">₹60</span>
              <span className="text-xs text-slate-400 font-bold ml-1">INR / Parcel</span>
            </div>
            <span className="text-[11px] text-amber-500/90 font-medium">Per Successful Delivery</span>
          </div>

          <div className="bg-[#111827] border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Delivery Agent Payout</span>
            <div className="my-2">
              <span className="text-3xl font-black text-white">₹22</span>
              <span className="text-xs text-slate-400 font-bold ml-1">INR / Parcel</span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">Per Successful Delivery</span>
          </div>

          <div className="bg-[#111827] border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Daily Volume</span>
            <div className="my-2">
              <span className="text-3xl font-black text-white">300</span>
              <span className="text-xs text-slate-400 font-bold ml-1">parcels/day</span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">Expected Allotment</span>
          </div>

          <div className="bg-[#111827] border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Weekly Target</span>
            <div className="my-2">
              <span className="text-3xl font-black text-amber-400">1,600</span>
              <span className="text-xs text-slate-400 font-bold ml-1">parcels/week</span>
            </div>
            <span className="text-[11px] text-amber-500/90 font-medium">Weekly Target Capacity</span>
          </div>
        </div>

        {/* Detailed Table Container */}
        <div className="bg-[#111827] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <div className="bg-slate-900/80 px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-base font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2">
              <FiDollarSign size={18} /> Payout Terms & Policy Breakdown
            </h3>
            <span className="text-xs text-slate-400 font-semibold bg-slate-800 px-3 py-1 rounded-full border border-white/5">
              Updated Rates 2026
            </span>
          </div>

          <div className="divide-y divide-white/5">
            {payoutRows.map((row, idx) => (
              <div 
                key={idx} 
                className={`px-6 py-4.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-colors ${
                  row.highlight ? 'bg-amber-500/5' : 'hover:bg-white/[0.02]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-900 border border-white/5 shrink-0">
                    {row.icon}
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-white m-0">
                      {row.label}
                    </p>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {row.badge}
                    </span>
                  </div>
                </div>

                <div className="sm:text-right w-full sm:w-auto">
                  <span className={`text-sm sm:text-base font-black px-4 py-1.5 rounded-lg inline-block ${
                    row.highlight 
                      ? 'bg-amber-500 text-slate-950 shadow-md' 
                      : 'bg-slate-900 text-white border border-white/10'
                  }`}>
                    {row.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-xs text-slate-400 max-w-xl mx-auto">
          <p>
            * All payouts are processed automatically on a weekly cycle directly into the registered beneficiary bank account.
          </p>
        </div>

      </div>
    </section>
  );
}
