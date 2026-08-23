import Header from '@/components/Header';
import Hero from '@/components/Hero';
import SmartOperations from '@/components/SmartOperations';
import Eligibility from '@/components/Eligibility';
import DocsKYC from '@/components/DocsKYC';
import ApplicationProcess from '@/components/ApplicationProcess';
import BottomGrid from '@/components/BottomGrid';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="bg-[#0B0F19] min-h-screen selection:bg-amber-500 selection:text-slate-950">
      <Header />
      <Hero />
      <SmartOperations />
      <Eligibility />
      <DocsKYC />
      <ApplicationProcess />
      <BottomGrid />

      {/* CTA Banner */}
      <section className="py-16 bg-[#0B0F19] text-white border-b border-white/5">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="bg-[#111827] rounded-3xl border border-white/[0.04] p-8 lg:p-12 flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="text-center md:text-left space-y-2">
              <h3 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
                Ready to grow with ADSP Logistic Hub?
              </h3>
              <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
                Join thousands of delivery partners earning better, together.
              </p>
            </div>
            <a 
              href="/register" 
              className="bg-amber-500 hover:bg-amber-600 !text-white font-extrabold px-8 py-4.5 rounded-xl text-xs uppercase tracking-widest transition-all transform active:scale-[0.98] shadow-lg shadow-amber-500/10 shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              Become a Partner
              <span className="font-extrabold text-sm !text-white">&gt;</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
