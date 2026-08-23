'use client';

import { useState } from 'react';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TrackingPage() {
  const [trackingId, setTrackingId] = useState('');
  const [result, setResult] = useState<any>(null);
  const [searched, setSearched] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    if (!trackingId.trim()) {
      setResult(null);
      return;
    }

    // Mock tracking information
    setResult({
      id: trackingId.toUpperCase(),
      status: "In Transit",
      origin: "Mumbai Hub, MH",
      destination: "Delhi Fulfillment Center, DL",
      eta: "June 28, 2026",
      carrier: "Logistic Hub Express",
      steps: [
        { title: "Package Received at Origin", date: "June 24, 2026 - 10:00 AM", done: true },
        { title: "Processed through Hub", date: "June 25, 2026 - 02:30 PM", done: true },
        { title: "In Transit to Destination", date: "June 25, 2026 - 09:00 PM", done: true },
        { title: "Out for Delivery", date: "Pending", done: false },
      ]
    });
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#F7F9FC]">
      <TopBar />
      <Header />
      
      {/* Hero Tracking Section */}
      <section className="bg-slate-900 text-white py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <span className="text-blue-400 font-extrabold uppercase tracking-widest text-sm bg-blue-500/10 px-4 py-2 rounded-full">
            Real-Time Tracking
          </span>
          <h1 className="text-4xl md:text-5xl font-black mt-4 mb-6">
            Track Your Package
          </h1>
          <p className="text-gray-300 text-lg mb-8">
            Enter your Logistic Hub Tracking ID to view the latest status of your shipment.
          </p>

          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto bg-white p-2 rounded-xl shadow-lg">
            <input 
              type="text" 
              placeholder="Enter tracking ID (e.g. LH123456789)" 
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              className="flex-1 px-4 py-3 border-none text-[#0F1111] placeholder-gray-400 focus:outline-none text-base rounded-lg"
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition-all active:scale-95 text-base">
              Track Package
            </button>
          </form>
        </div>
      </section>

      {/* Result Container */}
      <section className="py-12 container mx-auto px-4 max-w-3xl flex-1">
        {searched && result && (
          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-md animate-slide-up">
            <div className="flex flex-wrap justify-between items-center border-b border-gray-100 pb-6 mb-6">
              <div>
                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Tracking ID</span>
                <h3 className="text-2xl font-black text-slate-800">{result.id}</h3>
              </div>
              <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-bold text-sm">
                Status: {result.status}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 text-sm text-gray-600">
              <div>
                <p><strong>Route:</strong> {result.origin} ➔ {result.destination}</p>
                <p className="mt-1"><strong>Carrier:</strong> {result.carrier}</p>
              </div>
              <div>
                <p><strong>Estimated Arrival:</strong> {result.eta}</p>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h4 className="font-bold text-base text-slate-800 mb-6">Shipment Progress</h4>
              <div className="relative border-l-2 border-gray-100 ml-4 pl-8 space-y-8">
                {result.steps.map((step: any, index: number) => (
                  <div key={index} className="relative">
                    <div className={`absolute -left-12 top-1 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      step.done ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {index + 1}
                    </div>
                    <h5 className={`font-bold text-sm ${step.done ? 'text-slate-800' : 'text-gray-400'}`}>
                      {step.title}
                    </h5>
                    <p className="text-xs text-gray-500 mt-1">{step.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {searched && !result && (
          <div className="bg-white p-8 rounded-xl border border-gray-200 text-center shadow-md">
            <p className="text-red-500 font-bold">Please enter a valid tracking ID.</p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
