'use client';

import { FiCheckCircle, FiPlus } from 'react-icons/fi';

interface InvoiceModalProps {
  show: boolean;
  onClose: () => void;
  invoice: any;
  user: any;
  profile: any;
}

export default function InvoiceModal({ show, onClose, invoice, user, profile }: InvoiceModalProps) {
  if (!show || !invoice) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] backdrop-blur-sm px-4">
      <div className="bg-white w-full max-w-[600px] rounded-[12px] p-[40px] relative shadow-2xl animate-in zoom-in-95 duration-200">
        <button 
          onClick={onClose} 
          className="absolute top-[20px] right-[20px] bg-transparent border-none text-[24px] cursor-pointer text-[#888] hover:text-[#333]"
        >
          &times;
        </button>

        <div id="invoice-content">
          <div className="flex justify-between mb-[40px] border-b-2 border-[#eee] pb-[20px]">
            <div>
              <img src="/logo/blacklogo.png" alt="Logistic Hub Logo" className="h-[50px] mb-[10px] object-contain" />
              <p className="m-0 font-bold text-[18px]">Logistic Hub Official Invoice</p>
            </div>
            <div className="text-right">
              <p className="m-0 text-[#565959] text-[14px]">Invoice #: {invoice.id}</p>
              <p className="m-0 text-[#565959] text-[14px]">Date: {invoice.date}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[40px] mb-[40px]">
            <div>
              <p className="m-0 mb-[10px] font-semibold text-[#888] uppercase text-[12px]">From:</p>
              <p className="m-0 font-bold">Logistic Hub India Pvt Ltd</p>
              <p className="m-0 text-[14px] text-[#565959]">11th Floor, Logistic Hub Towers,</p>
              <p className="m-0 text-[14px] text-[#565959]">Vikhroli, Mumbai, MH, 400079</p>
            </div>
            <div>
              <p className="m-0 mb-[10px] font-semibold text-[#888] uppercase text-[12px]">Bill To:</p>
              <p className="m-0 font-bold">{profile?.Name || 'Logistics Partner'}</p>
              <p className="m-0 text-[14px] text-[#565959]">{user?.email || 'partner@logistichub.in'}</p>
              <p className="m-0 text-[14px] text-[#565959]">Partner ID: LH-P-2026</p>
            </div>
          </div>

          <table className="w-full border-collapse mb-[40px]">
            <thead>
              <tr className="bg-[#f8f8f8]">
                <th className="text-left p-[15px] border-b-2 border-[#eee]">Description</th>
                <th className="text-right p-[15px] border-b-2 border-[#eee]">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-[15px] border-b border-[#eee]">{invoice.title}</td>
                <td className="text-right p-[15px] border-b border-[#eee]">{invoice.cost}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td className="p-[15px] font-bold text-[18px]">Total</td>
                <td className="text-right p-[15px] font-bold text-[18px] text-blue-600">{invoice.cost}</td>
              </tr>
            </tfoot>
          </table>

          <div className="bg-[#f0f9f4] p-[15px] rounded-[8px] mb-[40px]">
            <p className="m-0 text-[14px] text-[#2ecc71] font-semibold text-center">
              <FiCheckCircle className="inline-block mr-[8px] align-middle" />
              This is a digitally generated receipt. No signature required.
            </p>
          </div>
        </div>

        <div className="flex gap-[15px]">
          <button
            onClick={() => window.print()}
            className="flex-1 flex items-center justify-center gap-[8px] bg-blue-600 text-white hover:bg-blue-700 p-[10px] rounded-[8px] border-none font-bold cursor-pointer transition-colors"
          >
            <FiPlus /> Download PDF
          </button>
          <button
            onClick={onClose}
            className="flex-1 p-[10px] rounded-[8px] border border-[#ddd] bg-white text-gray-700 font-bold cursor-pointer hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
