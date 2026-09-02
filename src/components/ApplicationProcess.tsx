'use client';

import { FiCheckCircle, FiShield, FiFileText, FiBookOpen, FiTool, FiCheck, FiMapPin } from 'react-icons/fi';

export default function ApplicationProcess() {
  const steps = [
    {
      stepNumber: "01",
      title: "1. Online Registration Form",
      cost: "Included",
      isMoney: false,
      desc: "Initial application for becoming a Logistic Hub Partner. Covers verification of basic business details and hub location feasibility.",
      icon: <FiFileText className="text-amber-500" size={20} />
    },
    {
      stepNumber: "02",
      title: "2. Registration Fees (Area Locking)",
      cost: "₹17,700",
      isMoney: true,
      desc: "Secures your exclusive delivery area and hub location. Ensures no other partner is assigned to the same operational zone.",
      icon: <FiMapPin className="text-amber-500" size={20} />
    },
    {
      stepNumber: "03",
      title: "3. Verification Officer Visit",
      cost: "Required",
      isMoney: false,
      desc: "A verification officer will visit your registered address and hub location to verify physical infrastructure and feasibility.",
      icon: <FiCheckCircle className="text-amber-500" size={20} />
    },
    {
      stepNumber: "04",
      title: "4. Security Deposit",
      cost: "₹28,948",
      isMoney: true,
      desc: "Refundable security deposit for equipment and operational assets provided by Logistic Hub for package safety.",
      icon: <FiShield className="text-amber-500" size={20} />
    },
    {
      stepNumber: "05",
      title: "5. Agreement Fees",
      cost: "₹37,687",
      isMoney: true,
      desc: "Legal and documentation costs for the partnership agreement. Covers notary, stamp duty, and legal verification.",
      icon: <FiFileText className="text-amber-500" size={20} />
    },
    {
      stepNumber: "06",
      title: "6. Training Fees",
      cost: "₹20,665",
      isMoney: true,
      desc: "Comprehensive training program for you and your staff. Includes system training, delivery protocols, and customer service.",
      icon: <FiBookOpen className="text-amber-500" size={20} />
    },
    {
      stepNumber: "07",
      title: "7. Installation Fees",
      cost: "₹45,000",
      isMoney: true,
      desc: "On-site setup of hub infrastructure, barcode scanners, system integration, and branding materials installation.",
      icon: <FiTool className="text-amber-500" size={20} />
    }
  ];

  return (
    <section className="py-20 bg-[#0B0F19] text-white border-b border-white/5 relative overflow-hidden font-sans">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <span className="text-amber-500 font-extrabold uppercase tracking-[0.25em] text-xs bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 rounded-full inline-block">
            Step-by-Step Activation Flow
          </span>
          <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight">
            Partner Onboarding & Fee Structure
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
            Follow the 7 official sequential steps to complete your Logistic Hub partnership activation.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div 
              key={idx}
              className={`bg-[#111827] rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-xl ${
                idx === 0 
                  ? 'border-emerald-500/30 hover:border-emerald-500/60' 
                  : step.isMoney 
                    ? 'border-amber-500/30 hover:border-amber-500/70 shadow-[0_0_20px_rgba(234,179,8,0.05)]' 
                    : 'border-white/10 hover:border-white/20'
              }`}
            >
              <div>
                {/* Header row: Step badge & Price Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shadow-md">
                      {step.stepNumber}
                    </span>
                    <div className="p-2 rounded-lg bg-slate-900 border border-white/5">
                      {step.icon}
                    </div>
                  </div>

                  <span className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider border ${
                    step.isMoney 
                      ? 'bg-amber-500/15 text-amber-400 border-amber-500/40 shadow-sm' 
                      : step.cost === 'Included' 
                        ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' 
                        : 'bg-blue-500/15 text-blue-400 border-blue-500/30'
                  }`}>
                    {step.cost}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-amber-400 transition-colors leading-snug">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Step Footer Status */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-medium">Stage {step.stepNumber} of 07</span>
                <span className="text-amber-500 font-bold flex items-center gap-1">
                  Sequential Step <FiCheck size={12} />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Note */}
        <div className="mt-12 text-center bg-[#111827]/80 border border-white/10 rounded-2xl p-6 max-w-3xl mx-auto backdrop-blur-sm">
          <p className="text-xs text-slate-300 font-medium leading-relaxed">
            💡 <strong className="text-amber-400">Note:</strong> All fees are payable sequentially through official gateway options available in your partner dashboard after registration.
          </p>
        </div>

      </div>
    </section>
  );
}
