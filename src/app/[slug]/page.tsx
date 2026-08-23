import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

// Pre-defined content for different slugs
const contentMap: Record<string, { title: string; subtitle: string; body: string; icon: string }> = {
  careers: {
    title: "Careers at Logistic Hub",
    subtitle: "Join our global team and shape the future of logistics",
    body: "We are always looking for passionate drivers, software engineers, operations managers, and customer support heroes. At Logistic Hub, you'll work with state-of-the-art technology and be part of an inclusive, growing workforce that rewards performance and safety.",
    icon: "💼"
  },
  blog: {
    title: "Logistic Hub Blog",
    subtitle: "Latest news, tech innovations, and insights from the logistics world",
    body: "Read about how we leverage machine learning for route optimization, our initiatives for green and sustainable deliveries, and success stories from our partner delivery network. Stay tuned for weekly updates from our tech and operations teams.",
    icon: "📰"
  },
  about: {
    title: "About Logistic Hub",
    subtitle: "Connecting people and businesses around the globe",
    body: "Founded with the mission to make shipping and delivery seamless, Logistic Hub has grown into one of the largest logistics partners globally. We operate safe, reliable, and high-performance delivery networks designed to support small businesses and global brands alike.",
    icon: "🏢"
  },
  investors: {
    title: "Investor Relations",
    subtitle: "Financial reports, stock info, and corporate governance",
    body: "Access quarterly earnings, reports, governance policies, and upcoming events for investors. We are committed to creating long-term value for our shareholders through disciplined growth, tech leadership, and operational excellence.",
    icon: "📈"
  },
  devices: {
    title: "Hub Devices",
    subtitle: "Smart scanners and tracking hardware for modern warehouses",
    body: "Discover the custom tracking devices, high-speed handheld scanners, and IoT integrations that power our partner warehouses. Built to endure harsh environments and maximize efficiency.",
    icon: "📱"
  },
  affiliate: {
    title: "Affiliate Program",
    subtitle: "Earn commissions by referring new partners or customers",
    body: "Promote Logistic Hub services on your website, social media, or business networks and earn industry-leading referral bonuses. We provide all marketing materials, link tools, and real-time conversion tracking.",
    icon: "🔗"
  },
  advertise: {
    title: "Advertise Your Business",
    subtitle: "Reach millions of active buyers and shippers",
    body: "Get your business noticed. Partner with us to place targeted advertisements on package inserts, tracking pages, or within our customer applications. Fast onboarding and clear analytics.",
    icon: "📣"
  },
  "host-hub": {
    title: "Host a Logistic Hub Locker",
    subtitle: "Monetize your property space by hosting a secure parcel locker",
    body: "Have extra space in your convenience store, supermarket, or residential lobby? Host a Logistic Hub locker. Increase foot traffic, offer a key service to your community, and earn passive hosting fees.",
    icon: "🏪"
  },
  "covid-support": {
    title: "COVID-19 Support & Safety Measures",
    subtitle: "Keeping our workforce and customers safe",
    body: "Learn about our ongoing health guidelines, contactless delivery options, and sanitation protocols across all fulfillment hubs. Safety remains our number one priority.",
    icon: "🛡️"
  },
  policies: {
    title: "Shipping Rates & Policies",
    subtitle: "Understanding our rates, timelines, and general guidelines",
    body: "Review standard rates for domestic, international, and express shipping. Read our guidelines regarding fragile items, hazardous materials, and customs clearance procedures.",
    icon: "📋"
  },
  returns: {
    title: "Returns & Replacements",
    subtitle: "Easy, hassle-free returns on Logistic Hub shipments",
    body: "Need to return a package? Start a return process using your tracking ID or account dashboard. Drop it off at any Logistic Hub locker or partner store free of charge.",
    icon: "🔄"
  },
  help: {
    title: "Help Center",
    subtitle: "Answers to frequently asked questions and direct support options",
    body: "Search our support archives, learn how to manage your package deliveries, reschedule shipments, or file claims. Our helpline and WhatsApp channels are active 24/7.",
    icon: "❓"
  },
  conditions: {
    title: "Conditions of Use",
    subtitle: "Terms and legal rules for accessing our services",
    body: "By using our site, apps, or shipping services, you agree to these standard conditions of use. Please review details regarding liability, cargo declaration, and service agreements.",
    icon: "⚖️"
  },
  privacy: {
    title: "Privacy Notice",
    subtitle: "How we collect, protect, and use your personal information",
    body: "We value your privacy. Read our detailed policy detailing what personal information is tracked, how data is secured, and options to manage your tracking cookies and profile details.",
    icon: "🔒"
  },
  "ads-privacy": {
    title: "Your Ads Privacy Choices",
    subtitle: "Control how your data is used for behavioral advertising",
    body: "Opt-out or manage preferences for target and interest-based advertising. We respect your choices regarding customized advertising cookies and cross-site data collection.",
    icon: "⚙️"
  }
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function InfoPage({ params }: PageProps) {
  const { slug } = await params;
  const content = contentMap[slug] || {
    title: "Page Not Found",
    subtitle: "The requested information page could not be located.",
    body: "Please go back to the homepage or check the footer links for active services.",
    icon: "⚠️"
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#F7F9FC]">
      <TopBar />
      <Header />
      
      {/* Dynamic Header */}
      <section className="bg-slate-900 text-white py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="text-5xl mb-4">{content.icon}</div>
          <h1 className="text-4xl md:text-5xl font-black mt-2 mb-4">
            {content.title}
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>
      </section>

      {/* Content Body */}
      <section className="py-16 container mx-auto px-4 flex-1 max-w-3xl">
        <div className="bg-white p-8 md:p-12 rounded-xl border border-gray-200 shadow-sm leading-relaxed text-gray-700">
          <p className="text-lg mb-8">{content.body}</p>
          <div className="border-t border-gray-100 pt-8 flex justify-between items-center">
            <Link href="/" className="text-blue-600 hover:text-blue-700 hover:underline font-bold">
              ← Back to Home
            </Link>
            <Link href="/login" className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
