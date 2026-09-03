import { useMemo } from 'react';
import Link from 'next/link';
import { FiPlus, FiTruck, FiCheckCircle, FiClock, FiAlertCircle, FiMapPin } from 'react-icons/fi';

interface OverviewProps {
  setActiveTab: (tab: string) => void;
  profile: any;
  processes: any[];
}

export default function Overview({ setActiveTab, profile, processes }: OverviewProps) {
  // Generate random stats on refresh
  const stats = useMemo(() => {
    const getRandomTrend = () => {
      const val = (Math.random() * 15).toFixed(1);
      return Math.random() > 0.3 ? `+${val}%` : `-${val}%`;
    };

    return [
      { label: "Active Shipments", value: 0, trend: "+0%", icon: <FiTruck className="text-[#3498db]" /> },
      { label: "Delivered Today", value:0, trend: "+0%", icon: <FiCheckCircle className="text-[#2ecc71]" /> },
      { label: "In Transit", value:0, trend: "+0%", icon: <FiClock className="text-[#f39c12]" /> },
      { label: "Delayed", value: 0, trend: "+0%", icon: <FiAlertCircle className="text-[#e74c3c]" /> },
    ];
  }, []);

  // Get the first process record (should only be one per user)
  const processData = processes?.[0]?.attributes || processes?.[0] || {};

  const getStepStatus = (currentStepKey: string | null, prevStepKey: string | null) => {
    // First step is always completed
    if (currentStepKey === null) return 'completed';

    const isCurrentTrue = processData[currentStepKey] === true;
    const isPrevTrue = prevStepKey === null || processData[prevStepKey] === true;

    if (isCurrentTrue) return 'completed';
    if (isPrevTrue) return 'active';
    return 'pending';
  };

  const steps = [
    {
      label: "Online Registration Form",
      subtext: "Included",
      status: getStepStatus(null, null)
    },
    {
      label: "REGISTRATION FEE PAYMENT FOR AREA LOCK",
      subtext: "₹17,700 INR",
      status: getStepStatus('Regitrationfee', null)
    },
    {
      label: "VERIFICATION OFFICER VISITING TO YOUR ADDRESS",
      subtext: "Verification in progress",
      status: getStepStatus('vovtya', 'Regitrationfee')
    },
    {
      label: "SECURITY DEPOSIT",
      subtext: "₹28,948 INR",
      status: getStepStatus('securirtydeposit', 'vovtya')
    },
    {
      label: "AGREEMENT FEE",
      subtext: "₹37,687 INR",
      status: getStepStatus('agreefee', 'securirtydeposit')
    },
    {
      label: "TRAINING FEE",
      subtext: "₹20,665 INR",
      status: getStepStatus('traningfee', 'agreefee')
    },
    {
      label: "INSTALLATION FEE",
      subtext: "₹45,000 INR",
      status: getStepStatus('installfee', 'traningfee')
    },
  ];

  const documents = [
    { label: "Certificate of Incorporation (If Company)", verified: !!profile?.Coi },
    { label: "PAN Card", verified: !!profile?.Pan },
    { label: "GSTIN Certificate", verified: !!profile?.GSTIN },
    { label: "Details of Authorized Signatory", verified: !!profile?.DASB },
    { label: "Cancelled Cheque", verified: !!profile?.Cheque },
    { label: "Shop Establishment License", verified: !!profile?.SEL },
    { label: "Aadhar Card (If Individual)", verified: !!profile?.Adhar },
  ];

  const pendingDocs = documents.filter(doc => !doc.verified).map(doc => doc.label);

  return (
    <div className="animate-in fade-in duration-500 max-w-full overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-5 sm:mb-[30px]">
        <div>
          <h1 className="text-xl sm:text-[26px] font-bold mb-1 text-[#232F3E]" style={{ color: '#232F3E' }}>Logistic Hub Dashboard</h1>
          <p className="text-[#565959] m-0 text-xs sm:text-sm">Welcome back! Here's what's happening with your hub today.</p>
        </div>
        <button
          onClick={() => alert('Your onboarding process is still pending! Please complete all the steps to enable shipment creation.')}
          className="flex items-center gap-[8px] bg-[#FF9900] text-white px-4 sm:px-[20px] py-2.5 sm:py-[10px] rounded-[8px] font-semibold border-none cursor-pointer hover:bg-[#e68a00] transition-colors text-xs sm:text-sm shrink-0"
        >
          <FiPlus /> Create New Shipment
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-[25px] mb-6 sm:mb-[40px]">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            trend={stat.trend}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-[25px] mb-[30px]">
        {/* Onboarding Stepper */}
        <div className="bg-white rounded-[12px] p-4 sm:p-[25px] shadow-sm">
          <div className="flex justify-between items-center mb-4 sm:mb-[20px]">
            <h3 className="m-0 font-bold text-sm sm:text-base text-[#232F3E]" style={{ color: '#232F3E' }}>Onboarding Process</h3>
            <button
              onClick={() => setActiveTab('process')}
              className="border-none bg-transparent text-[#FF9900] font-semibold cursor-pointer text-xs sm:text-[13px]"
            >
              View Details
            </button>
          </div>

          <div className="flex flex-col gap-0 relative pl-[10px]">
            {steps.map((step, index) => (
              <StepItem
                key={index}
                status={step.status}
                label={step.label}
                subtext={step.subtext}
                isFirst={index === 0}
                isLast={index === steps.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Document Checklist */}
        <div className="bg-white rounded-[12px] p-4 sm:p-[25px] shadow-sm">
          <h3 className="m-0 mb-4 sm:mb-[20px] font-bold text-sm sm:text-base text-[#232F3E]" style={{ color: '#232F3E' }}>Required Documents</h3>
          <div className="grid grid-cols-1 gap-[12px]">
            {documents.map((doc, index) => (
              <DocItem key={index} label={doc.label} verified={doc.verified} />
            ))}
          </div>

          {pendingDocs.length > 0 && (
            <div className="mt-[20px] p-[15px] bg-[#fff9eb] border border-[#ffe8cc] rounded-[8px] text-[13px] text-[#856404]">
              <div className="flex gap-2">
                <FiAlertCircle className="shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold mb-1">Pending Documents:</p>
                  <p className="mb-2">{pendingDocs.join(', ')}</p>
                  <p className="italic font-semibold underline">Submit these to your Relationship Manager</p>
                </div>
              </div>
            </div>
          )}

          {pendingDocs.length === 0 && (
            <div className="mt-[20px] p-[15px] bg-[#f0f9f4] border border-[#c6f6d5] rounded-[8px] text-[13px] text-[#2f855a]">
              <FiCheckCircle className="inline-block mr-[8px] align-middle" />
              All documents verified successfully.
            </div>
          )}
        </div>
      </div>

      {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-[25px]">
        <div className="lg:col-span-2 bg-white rounded-[12px] p-[25px] shadow-sm">
          <div className="flex justify-between items-center mb-[20px]">
            <h3 className="m-0 font-bold">Recent Shipments</h3>
            <Link href="#" className="text-[14px] font-semibold text-[#FF9900] hover:underline">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left border-bottom border-[#eee]">
                  <th className="py-[12px] text-[13px] text-[#888] font-normal uppercase tracking-wider">ID</th>
                  <th className="py-[12px] text-[13px] text-[#888] font-normal uppercase tracking-wider">DESTINATION</th>
                  <th className="py-[12px] text-[13px] text-[#888] font-normal uppercase tracking-wider">STATUS</th>
                  <th className="py-[12px] text-[13px] text-[#888] font-normal uppercase tracking-wider">ETA</th>
                </tr>
              </thead>
              <tbody>
                <TableRow id="#LH-9921" dest="London, UK" status="In Transit" statusColor="#3498db" eta="Apr 18, 14:00" />
                <TableRow id="#LH-8812" dest="New York, US" status="Delivered" statusColor="#2ecc71" eta="Completed" />
                <TableRow id="#LH-7734" dest="Mumbai, IN" status="Delayed" statusColor="#e74c3c" eta="Apr 19, 09:30" />
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-[12px] p-[25px] shadow-sm">
          <h3 className="m-0 mb-[20px] font-bold">Activity Feed</h3>
          <div className="flex flex-col gap-[20px]">
            <ActivityItem
              title="Shipment #LH-9921 Arrived at Hub"
              time="10 mins ago"
              icon={<div className="bg-[#e8f4fd] text-[#3498db] p-[8px] rounded-[8px]"><FiMapPin /></div>}
            />
            <ActivityItem
              title="Payment verified for #LH-7734"
              time="5 hours ago"
              icon={<div className="bg-[#fff7ed] text-[#f39c12] p-[8px] rounded-[8px]"><FiCheckCircle /></div>}
            />
          </div>
        </div>
      </div> */}
    </div>
  );
}

function StatCard({ icon, label, value, trend }: any) {
const isPositive = trend?.startsWith("+");
  return (
    <div className="bg-white rounded-[12px] p-[20px] shadow-sm border border-[#f0f0f0]">
      <div className="flex justify-between mb-[15px]">
        <div className="text-[24px]">{icon}</div>
        <span className={`text-[12px] font-semibold px-[8px] py-[2px] rounded-full ${isPositive ? 'bg-[#f0f9f4] text-[#2ecc71]' : 'bg-[#fdf2f2] text-[#e74c3c]'
          }`}>
          {trend}
        </span>
      </div>
      <p className="m-0 mb-[5px] text-[#565959] text-[14px]">{label}</p>
      <h2 className="m-0 text-[24px] font-bold text-[#232F3E]" style={{ color: '#232F3E' }}>{value}</h2>
    </div>
  );
}

function StepItem({ status, label, subtext, isFirst, isLast }: any) {
  let color = '#ddd';
  let icon = <div className="w-[10px] h-[10px] rounded-full bg-[#ddd]" />;

  if (status === 'completed') {
    color = '#2ecc71';
    icon = <FiCheckCircle color={color} size={20} />;
  } else if (status === 'active') {
    color = '#FF9900';
    icon = <div className="w-[20px] h-[20px] rounded-full bg-white border-[5px] border-[#FF9900] box-border" />;
  }

  return (
    <div className="flex gap-[15px] relative">
      {!isLast && (
        <div className={`absolute left-[9px] top-[20px] bottom-[-20px] w-[2px] z-[1] ${status === 'completed' ? 'bg-[#2ecc71]' : 'bg-[#eee]'
          }`} />
      )}
      <div className="z-[2] h-[40px] flex items-center justify-center w-[20px]">
        {icon}
      </div>
      <div className={isLast ? 'pb-0' : 'pb-[25px]'}>
        <p className={`m-0 text-[14px] ${status === 'active' ? 'font-bold' : 'font-medium'} ${status === 'pending' ? 'text-[#888]' : ''}`}>
          {label}
        </p>
        <p className={`m-0 mt-[2px] text-[12px] ${status === 'active' ? 'text-[#FF9900] font-semibold' : 'text-[#888] font-normal'}`}>
          {subtext}
        </p>
      </div>
    </div>
  );
}

function DocItem({ label, verified }: any) {
  return (
    <div className={`p-[12px] rounded-[8px] border border-[#eee] flex items-center justify-between ${verified ? 'bg-[#fcfcfc]' : 'bg-white'}`}>
      <span className={`text-[13px] font-medium ${verified ? '' : 'text-[#666]'}`}>{label}</span>
      {verified ? (
        <FiCheckCircle className="text-[#2ecc71]" size={16} />
      ) : (
        <FiAlertCircle className="text-[#e74c3c]" size={16} />
      )}
    </div>
  );
}

function TableRow({ id, dest, status, statusColor, eta }: any) {
  return (
    <tr className="border-b border-[#f8f8f8]">
      <td className="py-[15px] text-[14px] font-semibold">{id}</td>
      <td className="py-[15px] text-[14px]">{dest}</td>
      <td className="py-[15px]">
        <span
          style={{ backgroundColor: `${statusColor}15`, color: statusColor }}
          className="text-[11px] font-bold px-[10px] py-[4px] rounded-[4px] uppercase"
        >
          {status}
        </span>
      </td>
      <td className="py-[15px] text-[13px] text-[#565959]">{eta}</td>
    </tr>
  );
}

function ActivityItem({ title, time, icon }: any) {
  return (
    <div className="flex gap-[15px] items-start">
      {icon}
      <div>
        <p className="m-0 mb-[4px] text-[14px] font-medium">{title}</p>
        <p className="m-0 text-[12px] text-[#565959]">{time}</p>
      </div>
    </div>
  );
}
