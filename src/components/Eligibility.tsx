export default function Eligibility() {
  const fees = [
    { detail: "Own Vehicle (Two Wheeler / Four Wheeler)", amount: "Required" },
    { detail: "Valid Driving License", amount: "Required" },
    { detail: "Vehicle Registration Certificate", amount: "Required" },
    { detail: "Vehicle Insurance", amount: "Required" },
    { detail: "Smartphone (Android)", amount: "Required" },
    { detail: "Minimum Age", amount: "18 Years" },
    { detail: "Bank Account", amount: "Required" }
  ];

  const badges = [
    { 
      icon: (
        <svg className="w-8 h-8 text-blue-650" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M21 21h-6.75V16.5H12V21H5.25V5.25A2.25 2.25 0 017.5 3h9a2.25 2.25 0 012.25 2.25V21z" />
        </svg>
      ), 
      title: "100+ Sq. Ft Space", 
      subtitle: "Owned or Rented Office/Shop" 
    },
    { 
      icon: (
        <svg className="w-8 h-8 text-blue-650" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
        </svg>
      ), 
      title: "Shop Verification", 
      subtitle: "Interior & Exterior Photos" 
    },
    { 
      icon: (
        <svg className="w-8 h-8 text-blue-650" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ), 
      title: "Safety & Security", 
      subtitle: "24/7 Monitored Deliveries" 
    },
    { 
      icon: (
        <svg className="w-8 h-8 text-blue-650" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
        </svg>
      ), 
      title: "Daily Parcels", 
      subtitle: "Dedicated Hub Allotment" 
    },
    { 
      icon: (
        <svg className="w-8 h-8 text-blue-650" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124l-.304-4.819a4.878 4.878 0 00-3.003-4.314L10.5 4.875M18 14.25H4.25M18 14.25v-3.75V6.75A2.25 2.25 0 0015.75 4.5H10.5" />
        </svg>
      ), 
      title: "Hub Operations", 
      subtitle: "Professional Hub Management" 
    }
  ];

  return (
    <section className="py-24 bg-[#0B0F19] text-white border-b border-white/5">
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
        <div className="text-center mb-16">
          <span className="text-amber-500 font-extrabold uppercase tracking-widest text-[10px] bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
            ELIGIBILITY & REQUIREMENTS
          </span>
          <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight hidden">
            Eligibility & Requirements
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Table Section */}
          <div className="lg:col-span-7 w-full">
            <div className="overflow-hidden rounded-2xl border border-white/[0.06] shadow-2xl bg-slate-900">
              <table className="w-full border-collapse text-left text-slate-300">
                <thead>
                  <tr className="bg-slate-950 border-b border-white/[0.06] text-white">
                    <th className="px-6 py-4.5 font-bold text-xs uppercase tracking-wider">Partner Eligibility</th>
                    <th className="px-6 py-4.5 font-bold text-xs uppercase tracking-wider text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04] text-xs">
                  {fees.map((fee, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-6 py-4.5 text-slate-400 font-semibold">{fee.detail}</td>
                      <td className="px-6 py-4.5 text-right font-bold text-white">{fee.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Badges Section */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {badges.map((badge, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-5 p-5 bg-slate-900 rounded-2xl border border-white/[0.04] hover:border-amber-500/20 transition-all duration-300 hover:-translate-x-1"
              >
                <div className="w-14 h-14 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0 text-amber-500">
                  {badge.icon}
                </div>
                <div>
                  <h4 className="font-bold text-white text-base mb-1">{badge.title}</h4>
                  <span className="text-xs text-slate-400 leading-relaxed font-medium">{badge.subtitle}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
