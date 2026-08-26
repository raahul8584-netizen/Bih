'use client';

import { FiBarChart2, FiClock, FiBox, FiTruck, FiMapPin, FiSettings, FiLogOut } from 'react-icons/fi';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  processes: any[];
}

export default function Sidebar({ activeTab, setActiveTab, onLogout, processes }: SidebarProps) {
  // Calculate completion percentage
  const processData = processes?.[0]?.attributes || processes?.[0] || {};
  const stepKeys = ['Regitrationfee', 'vovtya', 'securirtydeposit', 'agreefee', 'traningfee', 'installfee'];
  
  // Start with 1 because "Online Registration" is always true
  const completedCount = 1 + stepKeys.filter(key => processData[key] === true).length;
  const percentage = Math.round((completedCount / 7) * 100);
  const remainingSteps = 7 - completedCount;

  return (
    <aside className="w-[260px] bg-[#232F3E] text-white flex flex-col fixed h-screen z-[100]">
      <div className="p-[25px] flex items-center">
        <img
          src="/logo/logo.png"
          alt="Logistic Hub Logo"
          className="h-[50px] w-auto object-contain"
        />
      </div>

      <nav className="flex-1 py-[20px]">
        <SidebarLink 
          icon={<FiBarChart2 />} 
          label="Overview" 
          active={activeTab === 'overview'} 
          onClick={() => setActiveTab('overview')} 
        />
        <SidebarLink 
          icon={<FiClock />} 
          label="Process" 
          active={activeTab === 'process'} 
          onClick={() => setActiveTab('process')} 
        />
        <SidebarLink 
          icon={<FiBox />} 
          label="Shipments" 
          active={activeTab === 'shipments'} 
          onClick={() => setActiveTab('shipments')} 
        />
        <SidebarLink 
          icon={<FiTruck />} 
          label="Fleet" 
          active={activeTab === 'fleet'} 
          onClick={() => setActiveTab('fleet')} 
        />
        <SidebarLink 
          icon={<FiMapPin />} 
          label="Tracking" 
          active={activeTab === 'tracking'} 
          onClick={() => setActiveTab('tracking')} 
        />
        <SidebarLink 
          icon={<FiSettings />} 
          label="Settings" 
          active={activeTab === 'settings'} 
          onClick={() => setActiveTab('settings')} 
        />

        <div className="mt-[30px] px-[25px]">
          <p className="text-[11px] uppercase text-white/40 font-bold tracking-[1px] mb-[15px]">Onboarding Status</p>
          <div className="bg-white/5 rounded-[8px] p-[15px]">
            <div className="flex justify-between mb-[8px]">
              <span className="text-[12px] text-[#ccc]">Hub Activation</span>
              <span className="text-[12px] font-bold text-[#FF9900]">{percentage}%</span>
            </div>
            <div className="w-full h-[6px] bg-white/10 rounded-[3px] overflow-hidden">
              <div 
                className="h-full bg-[#FF9900] transition-all duration-1000" 
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <p className="text-[10px] text-white/40 mt-[10px] leading-[1.4]">
              {remainingSteps > 0 
                ? `Complete ${remainingSteps} more steps to activate your hub.`
                : 'Your hub is fully activated!'}
            </p>
          </div>
        </div>
      </nav>

      <div className="p-[20px] border-t border-white/10">
        <button 
          onClick={onLogout} 
          className="flex items-center gap-[12px] text-[#ff9999] bg-transparent border-none cursor-pointer text-[15px] font-medium"
        >
          <FiLogOut /> Logout
        </button>
      </div>
    </aside>
  );
}

function SidebarLink({ icon, label, active, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className={`px-[25px] py-[12px] flex items-center gap-[12px] cursor-pointer transition-all border-l-4 ${
        active 
          ? 'bg-[#FF9900]/10 border-[#FF9900] text-[#FF9900] font-semibold' 
          : 'border-transparent text-[#cbd5e0] font-normal'
      }`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}
