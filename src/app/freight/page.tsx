import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function FreightPage() {
  const features = [
    {
      title: "Full Truckload (FTL)",
      description: "Dedicated transport for large volume shipments. Secure, fast, and fully tracked route optimization.",
      icon: "🚛"
    },
    {
      title: "Less-Than-Truckload (LTL)",
      description: "Cost-effective shipping solution for smaller shipments sharing truck space. High efficiency.",
      icon: "📦"
    },
    {
      title: "Intermodal Transport",
      description: "Optimized combinations of rail, road, and sea to deliver cost savings and environmental benefits.",
      icon: "🚄"
    },
    {
      title: "Cross-Docking & Storage",
      description: "Minimize storage time and speed up distribution with our advanced cross-docking facilities.",
      icon: "🏬"
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
            Freight Services
          </span>
          <h1 className="text-4xl md:text-5xl font-black mt-4 mb-6 leading-tight">
            Advanced <span className="text-blue-400">Hub Freight</span> Logistics
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Fast, reliable road and rail transport solutions designed to streamline your business supply chain.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition-all shadow-md active:scale-95 text-lg"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Grid of features */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-800 mb-4">Our Freight Solutions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From single pallets to complete truckloads, we handle your shipments with precision and real-time visibility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, index) => (
            <div key={index} className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">{feat.icon}</div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{feat.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feat.description}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
