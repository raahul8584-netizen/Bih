'use client';

import { FiInfo, FiCreditCard } from 'react-icons/fi';

interface AddProcess {
  id: number;
  attributes: {
    title: string;
    discription: string;
    amount: string;
    email: string;
  };
}

interface NotificationBannerProps {
  addProcesses: any[];
}

export default function NotificationBanner({ addProcesses }: NotificationBannerProps) {
  if (!addProcesses || addProcesses.length === 0) return null;

  const process = addProcesses[0].attributes || addProcesses[0];

  return (
    <div className="mb-8 animate-in slide-in-from-top-4 duration-500">
      <div className="bg-gradient-to-r from-[#232F3E] to-[#37475A] rounded-xl overflow-hidden shadow-lg border-l-4 border-[#FF9900]">
        <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="bg-[#FF9900]/20 p-3 rounded-full mt-1">
              <FiInfo className="text-[#FF9900] text-2xl" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-1">
                Onboarding Update: {process.title} Required
              </h3>
              <p className="text-white/80 text-sm leading-relaxed max-w-2xl">
                You have completed your onboarding process, but <span className="text-[#FF9900] font-bold">{process.title}</span> is required to start your shipments.
                {process.discription && <span className="block mt-1">{process.discription}</span>}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-3 min-w-[200px]">
            <div className="text-center md:text-right">
              <p className="text-white/60 text-[11px] uppercase tracking-wider font-bold mb-1">Pending Amount</p>
              <p className="text-white font-bold text-2xl">₹{process.amount}</p>
            </div>
            <button
              onClick={() => alert("We are redirecting you to the UPI gateway, but there seems to be a temporary issue with our UPI system. Please contact your Relationship Manager to continue with the payment.")}
              className="flex items-center gap-2 bg-[#FF9900] text-black font-bold px-6 py-3 rounded-lg hover:bg-[#e68a00] transition-all transform hover:scale-105"
            >
              <FiCreditCard /> Pay Now via UPI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
