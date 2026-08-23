export default function DocsKYC() {
  const docSections = [
    {
      title: "Individual Partners",
      docs: ["Aadhar Card", "PAN Card", "Driving License", "Vehicle RC", "Vehicle Insurance", "Bank Passbook", "Profile Photo"]
    },
    {
      title: "Company Partners",
      docs: ["Company PAN", "GST Certificate", "Address Proof", "Company Profile", "Authorized Signatory ID", "Bank Details", "Company Stamp"]
    },
    {
      title: "Fleet Partners",
      docs: ["Fleet Details", "Vehicle List", "RC & Insurance (All)", "Driver List", "Partner Agreement", "Bank Details", "Authorized Signatory ID"]
    }
  ];

  return (
    <section className="py-24 bg-[#0B0F19] text-white border-b border-white/5">
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
        <div className="text-center mb-16">
          <span className="text-amber-500 font-extrabold uppercase tracking-widest text-[10px] bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
            REQUIRED DOCUMENTS & ONBOARDING KYC
          </span>
          <div className="flex justify-center gap-16 text-xs font-bold text-slate-400 mb-8 uppercase tracking-widest">
            <span>Individual Partners</span>
            <span>Company Partners</span>
            <span>Fleet Partners</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {docSections.map((section, sIdx) => (
            <div key={sIdx} className="bg-slate-900 p-8 rounded-3xl border border-white/[0.04] shadow-2xl">
              <h3 className="text-sm font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_#eab308]" />
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.docs.map((doc, dIdx) => (
                  <li key={dIdx} className="flex items-start gap-3 text-xs text-slate-300">
                    <svg className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className="leading-relaxed font-semibold">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-amber-500/5 border border-amber-500/10 px-6 py-4 rounded-2xl text-left max-w-xl mx-auto">
            <svg className="w-5 h-5 text-amber-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-[10px] text-slate-400 leading-relaxed font-semibold m-0 uppercase tracking-wider">
              All documents must be valid and clearly visible
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
