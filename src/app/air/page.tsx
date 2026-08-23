import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServicesSummary from '@/components/ServicesSummary';
import Link from 'next/link';

export default function ServicesPage() {
  const serviceList = [
    {
      title: "Hub Air Express",
      description: "Urgent shipping with guaranteed delivery. Our global network connects you to major hubs globally with overnight flights.",
      icon: "✈️"
    },
    {
      title: "Ocean Logistics",
      description: "Cost-effective, reliable international sea freight. FCL (Full Container Load) and LTL solutions for all main trade lanes.",
      icon: "🚢"
    },
    {
      title: "Hub Freight Services",
      description: "Truckload and intermodal transport connecting regional fulfillment hubs with optimized cross-country networks.",
      icon: "🚛"
    },
    {
      title: "Last Mile Delivery",
      description: "Reliable, tech-enabled neighborhood delivery services for maximum customer satisfaction and low failure rate.",
      icon: "🚐"
    }
  ];

  return (
    <main className="min-h-screen flex flex-col bg-[#F7F9FC]">
      <TopBar />
      <Header />
      
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="text-blue-400 font-extrabold uppercase tracking-widest text-sm bg-blue-500/10 px-4 py-2 rounded-full">
            Our Services
          </span>
          <h1 className="text-4xl md:text-5xl font-black mt-4 mb-6 leading-tight">
            End-to-End <span className="text-blue-400">Supply Chain</span> Solutions
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Leverage our global logistical networks to ship packages of any size across the world securely.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition-all shadow-md active:scale-95 text-lg"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Main services breakdown */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {serviceList.map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm flex gap-6 items-start">
              <div className="text-5xl">{item.icon}</div>
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ServicesSummary />

      <Footer />
    </main>
  );
}
