export default function HowItWorks() {
  const steps = [
    { number: "01", title: "Inbound to Hub", desc: "Ship your local or regional logistics inventory directly to a designated ADSP hub facility." },
    { number: "02", title: "Automated Sorting", desc: "Once inventory arrives, our automated system sorts, packs, and maps packages to dispatch riders." },
    { number: "03", title: "Priority Dispatch", desc: "Consignments are delivered using optimized last-mile route coordination to ensure SLA safety." }
  ];

  return (
    <section className="py-24 bg-slate-50 border-b border-slate-100">
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
        <div className="text-center mb-16">
          <span className="text-blue-500 font-extrabold uppercase tracking-widest text-xs bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-full inline-block mb-3">
            Fulfillment Flow
          </span>
          <h2 className="text-3xl lg:text-4xl font-black text-slate-800 tracking-tight">
            How ADSP Fulfillment Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {steps.map((step, idx) => (
            <div key={idx} className="text-center flex flex-col items-center group">
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white font-extrabold text-xl flex items-center justify-center mb-6 shadow-[0_4px_15px_rgba(37,99,235,0.2)] group-hover:scale-110 transition-transform duration-300">
                {step.number}
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                {step.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
