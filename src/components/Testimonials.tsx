export default function Testimonials() {
  const feedbacks = [
    { 
      name: "Alpha Logistics Inc.", 
      text: "Partnering with ADSP Logistic Hub has doubled our last-mile delivery efficiency. The automated consignment routing handles the logistics so we can scale our hub business." 
    },
    { 
      name: "Vanguard Retailers", 
      text: "The ADSP branding gives our partners and warehouse staff immense confidence. Delivery dispatches are consistently on time, which translates to high satisfaction." 
    },
    { 
      name: "Zenith Tech Systems", 
      text: "ADSP Hub's freight coordination and asset visibility are unmatched. Heavy inbound shipments to regional fulfillment centers have never been this streamlined." 
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
        <div className="text-center mb-16">
          <span className="text-blue-500 font-extrabold uppercase tracking-widest text-xs bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-full inline-block mb-3">
            Partner Testimonials
          </span>
          <h2 className="text-3xl lg:text-4xl font-black text-slate-800 tracking-tight">
            What Our Hub Partners Are Saying
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {feedbacks.map((fb, idx) => (
            <div 
              key={idx} 
              className="bg-slate-50 p-8 rounded-3xl border border-slate-200/50 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
            >
              <div>
                {/* Quote Vector */}
                <div className="text-blue-600/30 text-5xl font-serif leading-none mb-4">“</div>
                <p className="text-slate-600 text-sm italic leading-relaxed mb-6">
                  {fb.text}
                </p>
              </div>
              
              <div>
                {/* Star rating vector */}
                <div className="flex items-center gap-1 mb-4 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <h4 className="font-bold text-slate-800 text-base mb-0.5">{fb.name}</h4>
                <span className="text-xs text-blue-600 font-extrabold uppercase tracking-wider">ADSP Logistic Partner</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
