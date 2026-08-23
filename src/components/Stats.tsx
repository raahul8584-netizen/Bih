export default function Stats() {
  const calculations = [
    { label: "Revenue per Parcel", value: "₹82" },
    { label: "Weekly Revenue (1600 Parcels)", value: "₹1,31,200" },
    { label: "Delivery Payout (₹22/P)", value: "₹35,200" },
    { label: "Weekly Hub Net Profit", value: "₹96,000" }
  ];

  return (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Background blurs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <span className="text-blue-400 font-extrabold uppercase tracking-widest text-xs bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full inline-block mb-4 shadow-sm">
            Revenue & Payout Structure
          </span>
          <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight">
            Potential Weekly Earnings
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {calculations.map((calc, idx) => (
            <div 
              key={idx} 
              className="bg-slate-900/60 p-8 rounded-3xl border border-white/[0.04] text-center hover:border-blue-500/20 transition-all duration-300"
            >
              <h2 className="text-3xl lg:text-4xl font-extrabold text-blue-500 mb-2 font-sans tracking-tight">
                {calc.value}
              </h2>
              <h4 className="text-xs text-slate-400 font-bold uppercase tracking-wider leading-relaxed">
                {calc.label}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
