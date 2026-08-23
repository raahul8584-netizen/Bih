export default function ApplicationProcess() {
  const steps = [
    { number: "01", label: "Register", title: "Register", desc: "Submit your details and documents" },
    { number: "02", label: "Verification", title: "Verification", desc: "We verify your documents" },
    { number: "03", label: "Onboarding", title: "Onboarding", desc: "Training & onboarding completed" },
    { number: "04", label: "Start Delivering", title: "Start Delivering", desc: "Get deliveries and start earning" },
    { number: "05", label: "Get Paid", title: "Get Paid", desc: "Weekly payouts into your account" }
  ];

  return (
    <section className="py-20 bg-[#0B0F19] text-white border-b border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <span className="text-amber-500 font-extrabold uppercase tracking-[0.25em] text-[10px] block mb-3">
            HOW ADSP FULFILLMENT WORKS
          </span>
        </div>

        {/* Stepper Timeline container */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="absolute top-7 left-10 right-10 h-0.5 bg-amber-500/20 hidden md:block z-0" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                {/* Stepper Badge */}
                <div className="w-14 h-14 rounded-full bg-slate-900 border-2 border-amber-500 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-amber-500 group-hover:scale-105 shadow-[0_0_15px_rgba(234,179,8,0.15)] relative">
                  {/* Hexagon style inner logo placeholder */}
                  <div className="w-6 h-6 border border-amber-500/40 rounded flex items-center justify-center text-[10px] font-bold text-amber-500 group-hover:text-slate-950 group-hover:border-slate-950">
                    ⬡
                  </div>
                </div>

                <span className="text-[10px] font-extrabold text-amber-500 font-mono tracking-wider mb-2 block">
                  {step.number} {step.label}
                </span>
                <p className="text-xs text-slate-400 max-w-[160px] leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
