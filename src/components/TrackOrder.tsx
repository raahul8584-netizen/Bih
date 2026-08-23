export default function TrackOrder() {
  return (
    <section className="py-20 bg-slate-900 border-b border-slate-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-black tracking-tight text-white mb-2">
              Real-Time Hub Tracking
            </h2>
            <p className="text-sm text-slate-400">
              Track your ADSP cargo shipments and local hub consignments instantly.
            </p>
          </div>
          
          <div className="w-full max-w-md">
            <div className="flex bg-white/[0.03] p-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
              <input 
                type="text" 
                placeholder="Enter tracking ID (e.g. ADSP12345)" 
                className="flex-1 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder-slate-500 font-sans"
              />
              <a 
                href="/tracking"
                className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-6 py-3 rounded-xl text-xs uppercase tracking-widest transition-colors flex items-center justify-center cursor-pointer"
              >
                Track
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
