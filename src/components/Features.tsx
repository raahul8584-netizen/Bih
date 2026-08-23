export default function Features() {
  const features = [
    { 
      title: "Be Your Own Boss", 
      icon: (
        <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M21 21h-6.75V16.5H12V21H5.25V5.25A2.25 2.25 0 017.5 3h9a2.25 2.25 0 012.25 2.25V21z" />
        </svg>
      ), 
      desc: "Run your own local business and build a dedicated hub operation team that aligns with your long term scaling vision." 
    },
    { 
      title: "Earn Top Revenue", 
      icon: (
        <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ), 
      desc: "Benefit from a highly lucrative business model with robust parcel volumes to secure consistent high margins." 
    },
    { 
      title: "Ongoing Tech Support", 
      icon: (
        <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94-3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ), 
      desc: "Access professional on-site training, legal advisory, and automated route tracking platforms anytime." 
    }
  ];

  return (
    <section className="relative z-20 -mt-20 px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <div 
            key={idx} 
            className="group bg-white p-8 rounded-2xl border border-slate-200/60 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.08)] hover:-translate-y-2 transition-all duration-300 flex flex-col items-start text-left cursor-pointer"
          >
            <div className="p-4 rounded-xl bg-blue-50 text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
              {feature.title}
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
