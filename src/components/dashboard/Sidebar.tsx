import { FiBarChart2, FiClock, FiBox, FiTruck, FiMapPin, FiSettings, FiLogOut, FiX } from 'react-icons/fi';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  processes: any[];
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ activeTab, setActiveTab, onLogout, processes, isOpen, onClose }: SidebarProps) {
  // Calculate completion percentage
  const processData = processes?.[0]?.attributes || processes?.[0] || {};
  const stepKeys = ['Regitrationfee', 'vovtya', 'securirtydeposit', 'agreefee', 'traningfee', 'installfee'];
  
  // Start with 1 because "Online Registration" is always true
  const completedCount = 1 + stepKeys.filter(key => processData[key] === true).length;
  const percentage = Math.round((completedCount / 7) * 100);
  const remainingSteps = 7 - completedCount;

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Overlay Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose} 
          className="fixed inset-0 bg-black/60 z-[95] lg:hidden backdrop-blur-xs transition-opacity duration-300"
        />
      )}

      <aside className={`w-[260px] bg-[#232F3E] text-white flex flex-col fixed top-0 bottom-0 left-0 h-screen z-[100] transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-[20px] sm:p-[25px] flex items-center justify-between border-b border-white/10 lg:border-none">
          <img
            src="/logo/logo.png"
            alt="Logistic Hub Logo"
            className="h-[40px] sm:h-[50px] w-auto object-contain"
          />
          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition"
            aria-label="Close Sidebar Menu"
          >
            <FiX size={22} />
          </button>
        </div>

        <nav className="flex-1 py-[15px] sm:py-[20px] overflow-y-auto">
          <SidebarLink 
            icon={<FiBarChart2 />} 
            label="Overview" 
            active={activeTab === 'overview'} 
            onClick={() => handleTabClick('overview')} 
          />
          <SidebarLink 
            icon={<FiClock />} 
            label="Process" 
            active={activeTab === 'process'} 
            onClick={() => handleTabClick('process')} 
          />
          <SidebarLink 
            icon={<FiBox />} 
            label="Shipments" 
            active={activeTab === 'shipments'} 
            onClick={() => handleTabClick('shipments')} 
          />
          <SidebarLink 
            icon={<FiTruck />} 
            label="Fleet" 
            active={activeTab === 'fleet'} 
            onClick={() => handleTabClick('fleet')} 
          />
          <SidebarLink 
            icon={<FiMapPin />} 
            label="Tracking" 
            active={activeTab === 'tracking'} 
            onClick={() => handleTabClick('tracking')} 
          />
          <SidebarLink 
            icon={<FiSettings />} 
            label="Settings" 
            active={activeTab === 'settings'} 
            onClick={() => handleTabClick('settings')} 
          />

          <div className="mt-[20px] sm:mt-[30px] px-[20px] sm:px-[25px]">
            <p className="text-[11px] uppercase text-white/40 font-bold tracking-[1px] mb-[12px] sm:mb-[15px]">Onboarding Status</p>
            <div className="bg-white/5 rounded-[8px] p-[12px] sm:p-[15px]">
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
    </>
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
