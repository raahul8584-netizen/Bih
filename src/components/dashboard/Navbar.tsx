'use client';

import { FiSearch, FiBell, FiUser, FiMenu } from 'react-icons/fi';

interface NavbarProps {
  user: any;
  profile: any;
  onToggleSidebar?: () => void;
}

export default function Navbar({ user, profile, onToggleSidebar }: NavbarProps) {
  return (
    <header className="h-[65px] sm:h-[70px] bg-white flex items-center justify-between px-4 sm:px-6 lg:px-[30px] shadow-xs sticky top-0 z-[90]">
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Menu Toggle Button */}
        <button
          type="button"
          onClick={onToggleSidebar}
          className="lg:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition"
          aria-label="Open Sidebar Menu"
        >
          <FiMenu size={22} />
        </button>

        {/* Search Bar - Responsive */}
        <div className="hidden sm:flex items-center gap-[12px] bg-[#f0f2f5] px-[15px] py-[8px] rounded-[8px] w-full max-w-[350px] md:max-w-[400px]">
          <FiSearch className="text-[#888] shrink-0" />
          <input
            type="text"
            placeholder="Search shipment, ID, or location..."
            className="border-none bg-transparent outline-none w-full text-[13px] sm:text-[14px]"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-[20px]">
        <button className="relative bg-transparent border-none cursor-pointer p-2 hover:bg-slate-100 rounded-full transition">
          <FiBell size={20} className="text-[#565959]" />
          <span className="absolute top-1 right-1 bg-[#FF9900] w-[8px] h-[8px] rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-2.5 sm:gap-[12px] border-l border-[#eee] pl-3 sm:pl-[20px]">
          <div className="text-right hidden sm:block">
            <p className="m-0 font-semibold text-[13px] sm:text-[14px] truncate max-w-[150px]">{profile?.Name || 'Logistics Partner'}</p>
            <p className="m-0 text-[11px] sm:text-[12px] text-[#565959] truncate max-w-[150px]">{user?.email || 'partner@logisshub.in'}</p>
          </div>
          <div className="w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] rounded-full bg-[#FF9900] flex items-center justify-center text-white shrink-0 font-bold">
            <FiUser size={18} />
          </div>
        </div>
      </div>
    </header>
  );
}
