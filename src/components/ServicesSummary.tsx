export default function ServicesSummary() {
  const services = [
    { 
      title: "Hub Air Express", 
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
      ) 
    },
    { 
      title: "Ocean Logistics", 
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12h19.5M2.25 9h19.5M2.25 15h19.5M12 2.25v19.5" />
        </svg>
      ) 
    },
    { 
      title: "Hub Freight", 
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124l-.304-4.819a4.878 4.878 0 00-3.003-4.314L10.5 4.875M18 14.25H4.25M18 14.25v-3.75V6.75A2.25 2.25 0 0015.75 4.5H10.5" />
        </svg>
      ) 
    },
    { 
      title: "Hub Delivery", 
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ) 
    }
  ];

  return (
    <section className="py-24 bg-slate-50 border-b border-slate-100">
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
        <div className="text-center mb-16">
          <span className="text-blue-500 font-extrabold uppercase tracking-widest text-xs bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-full inline-block mb-3">
            Scale Operations
          </span>
          <h2 className="text-3xl lg:text-4xl font-black text-slate-800 tracking-tight max-w-2xl mx-auto">
            Scale Your Business with ADSP supply chain capabilities
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <div 
              key={idx} 
              className="group bg-white p-8 rounded-3xl border border-slate-200/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center cursor-pointer"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h4 className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">
                {service.title}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
