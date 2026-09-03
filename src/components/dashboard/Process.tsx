'use client';
import { useState, useEffect } from 'react';
import { generateInvoicePDF } from "../UI/InvoiceGenerator";
import Paymentgateway from '../UI/paymentgateway';
import { FiPlus } from 'react-icons/fi';

interface ProcessProps {
  handleDownloadInvoice: (step: any) => void;
  processes: any[];
  profile: any;
}

export default function Process({ handleDownloadInvoice, processes, profile }: ProcessProps) {
  const [profileId, setProfileId] = useState<number | null>(null);
  const [documentId, setDocumentId] = useState<string | null>(null);
  const [paymentModal, setPaymentModal] = useState<{
    isOpen: boolean;
    amount: string;
    processName: string;
  }>({
    isOpen: false,
    amount: '0',
    processName: '',
  });
  const [support, setSupport] = useState({
    phone: "1800-ADSP-HUB",
    whatsapp: "+91 99999 99999",
    mail: "support@adsp-hub.in",
    url: "",
  });

  const apiurl = process.env.NEXT_PUBLIC_STRAPI_URL;

  useEffect(() => {
    if (!apiurl) return;

    fetch(`${apiurl}/api/supports`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((result) => {
        const supportData = result.data?.[0] || result?.[0];
        if (supportData) {
          const attributes = supportData.attributes || supportData;
          setSupport({
            phone: attributes.supportnumber || supportData.supportnumber || "1800-ADSP-HUB",
            whatsapp: attributes.supportwhatapp || supportData.supportwhatapp || "+91 99999 99999",
            mail: attributes.supportmail || supportData.supportmail || "support@adsp-hub.in",
            url: attributes.url || supportData.url || "",
          });
        }
      })
      .catch((err) => console.error("Error fetching support:", err));
  }, [apiurl]);

  useEffect(() => {
    const fetchProfileId = async () => {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      let email = profile?.email || profile?.Email;
      
      if (!email && userStr) {
        try {
          const userObj = JSON.parse(userStr);
          email = userObj.email;
        } catch (e) {}
      }

      if (!token || !email) return;

      try {
        const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
        const res = await fetch(`${strapiUrl}/api/user-profiles?filters[email][$eq]=${email}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.data?.[0]) {
          setProfileId(data.data[0].id);
          setDocumentId(data.data[0].documentId);
        }
      } catch (err) {
        console.error("Failed to fetch profile ID in Process.tsx:", err);
      }
    };
    fetchProfileId();
  }, [profile]);
console.log("Processes data:", processes);
  const processData = processes?.[0]?.attributes || processes?.[0] || {};
  const customerName = profile?.Name;

  const getStepStatus = (currentKey: string | null, prevKey: string | null) => {
    if (currentKey === null) return { status: 'Completed', isLocked: false, label: 'Completed' };

    const isCompleted = processData[currentKey] === true;
    const isPrevCompleted = prevKey === null || processData[prevKey] === true;

    if (isCompleted) return { status: 'Completed', isLocked: false, label: 'Completed' };
    if (isPrevCompleted) return { status: 'Active', isLocked: false, label: currentKey === 'Regitrationfee' ? 'Pending Payment' : 'In Progress' };
    return { status: 'Upcoming', isLocked: true, label: 'Locked' };
  };

  interface StepData {
    title: string;
    status: string;
    isLocked: boolean;
    label: string;
    cost: string;
    description: string;
    isActionable?: boolean;
    onDownload?: () => void;
  }

  const steps: StepData[] = [
    {
      title: "1. Online Registration Form",
      ...getStepStatus(null, null),
      cost: "Included",
      description: "Initial application for becoming a Logistic Hub Partner. This step covers the verification of your basic business details and hub location feasibility.",
    },
    {
      title: "2. Registration Fees (Area Locking)",
      ...getStepStatus('Regitrationfee', null),
      cost: "₹17,700",
      description: "Secures your exclusive delivery area and hub location. This fee ensures that no other partner is assigned to the same operational zone.",
      isActionable: true,
      onDownload: () => generateInvoicePDF({
        customerName,
        invoiceNo: `${customerName ? customerName.substring(0, 4).toUpperCase() : 'USER'}-${Math.floor(1000 + Math.random() * 9000)}`,
        invoiceDate: processData?.regitrationfeedate || new Date().toISOString(),
        amount: "17,700",
        process: "Registration Fees",
        city: profile?.city || '',
        state: profile?.state || '',
        pin: profile?.pin || '',
        email: profile?.email || processData?.email || '',
        phone: profile?.Phone || profile?.phone || '',
        profile: {
          ...profile,
          strapiId: profileId ?? profile?.strapiId ?? profile?.id,
          id: documentId ?? profile?.documentId ?? profile?.id
        },
        url: support.url
      } as any)
    },
    {
      title: "3. Verification Officer Visit",
      ...getStepStatus('vovtya', 'Regitrationfee'),
      cost: "Required",
      description: "A verification officer will visit your registered address and hub location to verify the physical infrastructure and operational feasibility."
    },
    {
      title: "4. Security Deposit",
      ...getStepStatus('securirtydeposit', 'vovtya'),
      cost: "₹28,948",
      description: "Refundable security deposit for equipment and operational assets provided by Logistic Hub. This is held as a guarantee for the safety of packages and system usage.",
      isActionable: true,
      onDownload: () => generateInvoicePDF({
        customerName,
        invoiceNo: `${customerName ? customerName.substring(0, 4).toUpperCase() : 'USER'}-${Math.floor(1000 + Math.random() * 9000)}`,
        invoiceDate: processData?.securirtydepositdate || new Date().toISOString(),
        amount: "28,948",
        process: "Security Deposit",
        city: profile?.city || '',
        state: profile?.state || '',
        pin: profile?.pin || '',
        email: profile?.email || processData?.email || '',
        phone: profile?.Phone || profile?.phone || '',
        profile: {
          ...profile,
          strapiId: profileId ?? profile?.strapiId ?? profile?.id,
          id: documentId ?? profile?.documentId ?? profile?.id
        },
        url: support.url
      } as any)
    },
    {
      title: "5. Agreement Fees",
      ...getStepStatus('agreefee', 'securirtydeposit'),
      cost: "₹37,687",
      description: "Legal and documentation costs for the partnership agreement. Covers notary, stamp duty, and legal verification of all partnership terms.",
      isActionable: true,
      onDownload: () => generateInvoicePDF({
        customerName,
        invoiceNo: `${customerName ? customerName.substring(0, 4).toUpperCase() : 'USER'}-${Math.floor(1000 + Math.random() * 9000)}`,
        invoiceDate: processData?.agreefeedate || new Date().toISOString(),
        amount: "37,687",
        process: "Agreement Fees",
        city: profile?.city || '',
        state: profile?.state || '',
        pin: profile?.pin || '',
        email: profile?.email || processData?.email || '',
        phone: profile?.Phone || profile?.phone || '',
        profile: {
          ...profile,
          strapiId: profileId ?? profile?.strapiId ?? profile?.id,
          id: documentId ?? profile?.documentId ?? profile?.id
        },
        url: support.url
      } as any)
    },
    {
      title: "6. Training Fees",
      ...getStepStatus('traningfee', 'agreefee'),
      cost: "₹20,665",
      description: "Comprehensive training program for you and your staff. Includes system training, delivery protocols, and customer service excellence modules.",
      isActionable: true,
      onDownload: () => generateInvoicePDF({
        customerName,
        invoiceNo: `${customerName ? customerName.substring(0, 4).toUpperCase() : 'USER'}-${Math.floor(1000 + Math.random() * 9000)}`,
        invoiceDate: processData?.traningfeedate || new Date().toISOString(),
        amount: "20,665",
        process: "Training Fees",
        city: profile?.city || '',
        state: profile?.state || '',
        pin: profile?.pin || '',
        email: profile?.email || processData?.email || '',
        phone: profile?.Phone || profile?.phone || '',
        profile: {
          ...profile,
          strapiId: profileId ?? profile?.strapiId ?? profile?.id,
          id: documentId ?? profile?.documentId ?? profile?.id
        },
        url: support.url
      } as any)
    },
    {
      title: "7. Installation Fees",
      ...getStepStatus('installfee', 'traningfee'),
      cost: "₹45,000",
      description: "On-site setup of hub infrastructure, including barcode scanners, system integration, and branding materials installation.",
      isActionable: true,
      onDownload: () => generateInvoicePDF({
        customerName,
        invoiceNo: `${customerName ? customerName.substring(0, 4).toUpperCase() : 'USER'}-${Math.floor(1000 + Math.random() * 9000)}`,
        invoiceDate: processData?.installfeedate || new Date().toISOString(),
        amount: "45,000",
        process: "Installation Fees",
        city: profile?.city || '',
        state: profile?.state || '',
        pin: profile?.pin || '',
        email: profile?.email || processData?.email || '',
        phone: profile?.Phone || profile?.phone || '',
        profile: {
          ...profile,
          strapiId: profileId ?? profile?.strapiId ?? profile?.id,
          id: documentId ?? profile?.documentId ?? profile?.id
        },
        url: support.url
      } as any)
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-gray-900">
      <div className="mb-[30px]">
        <h1 className="text-[26px] font-bold mb-[5px] text-[#232F3E]" style={{ color: '#232F3E' }}>Onboarding Process Details</h1>
        <p className="text-[#565959] m-0">Follow these steps to complete your Logistic Hub activation.</p>
      </div>

      <div className="grid grid-cols-1 gap-[20px]">
        {steps.map((step, idx) => (
          <ProcessCard
            key={idx}
            title={step.title}
            status={step.label}
            cost={step.cost}
            description={step.description}
            isActionable={step.isActionable && step.status === 'Active'}
            isLocked={step.isLocked}
            onDownload={step.onDownload}
            onPayNow={() => setPaymentModal({
              isOpen: true,
              amount: step.cost,
              processName: step.title,
            })}
          />
        ))}
      </div>

      {paymentModal.isOpen && (
        <Paymentgateway
          isOpen={paymentModal.isOpen}
          amount={paymentModal.amount}
          processName={paymentModal.processName}
          customerName={customerName}
          onClose={() => setPaymentModal({ isOpen: false, amount: '0', processName: '' })}
        />
      )}
    </div>
  );
}

function ProcessCard({ title, status, cost, description, isActionable, onDownload, isLocked, onPayNow }: any) {
  return (
    <div className={`bg-white text-gray-900 rounded-[12px] p-4 sm:p-[25px] shadow-sm border border-[#eee] transition-all duration-300 ${isLocked ? 'opacity-50 grayscale pointer-events-none' : ''
      }`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-[15px]">
        <div>
          <h3 className="m-0 mb-1 font-bold text-sm sm:text-base text-[#232F3E]" style={{ color: '#232F3E' }}>{title}</h3>
          <div className="flex flex-wrap gap-[10px] items-center">
            <span className={`text-[11px] font-bold px-[8px] py-[4px] rounded-[4px] uppercase ${status === 'Completed' ? 'bg-[#f0f9f4] text-[#2ecc71]' :
              status === 'Pending Payment' ? 'bg-[#fff7ed] text-[#f39c12]' :
                'bg-[#f8f8f8] text-[#888]'
              }`}>
              {status}
            </span>
            <span className="text-[13px] sm:text-[14px] font-bold text-[#131921]">{cost}</span>
          </div>
        </div>
        <div className="flex gap-[10px] shrink-0 w-full sm:w-auto">
          {onDownload && status === 'Completed' && (
            <button
              onClick={onDownload}
              className="px-3 sm:px-[15px] py-2 sm:py-[8px] rounded-[6px] border border-[#ddd] bg-white text-xs sm:text-[13px] font-semibold cursor-pointer flex items-center justify-center gap-[5px] hover:bg-gray-50 transition-colors flex-1 sm:flex-initial"
            >
              Invoice <FiPlus size={14} />
            </button>
          )}
          {isActionable && (
            <button
              disabled={isLocked}
              onClick={onPayNow}
              className="px-4 sm:px-[20px] py-2 sm:py-[8px] text-xs sm:text-[13px] bg-[#FF9900] text-white border-none rounded-[6px] font-semibold cursor-pointer hover:bg-[#e68a00] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex-1 sm:flex-initial shadow-xs"
            >
              Pay Now
            </button>
          )}
        </div>
      </div>
      <p className="m-0 text-xs sm:text-[14px] text-[#565959] leading-[1.6]">{description}</p>
    </div>
  );
}

