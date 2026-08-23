import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Eligibility from '@/components/Eligibility';
import DocsKYC from '@/components/DocsKYC';
import ApplicationProcess from '@/components/ApplicationProcess';
import Link from 'next/link';
import LogoLoader from '@/components/UI/logoloder/Logoloder';

export default function PartnerProgramPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#F7F9FC]">
      <TopBar />
      <Header />
      <LogoLoader />
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="text-blue-400 font-extrabold uppercase tracking-widest text-sm bg-blue-500/10 px-4 py-2 rounded-full">
            Opportunity
          </span>
          <h1 className="text-4xl md:text-5xl font-black mt-4 mb-6 leading-tight">
            Become a <span className="text-blue-400">Logistic Hub</span> Delivery Partner
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Start your own business delivering packages for ADSP Logistic Hub. Get access to our industry-leading technology, processes, and support to grow your business.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition-all shadow-md active:scale-95 text-lg"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </section>

      {/* Program Details */}
      <Eligibility />
      <DocsKYC />
      <ApplicationProcess />

      <Footer />
    </main>
  );
}
