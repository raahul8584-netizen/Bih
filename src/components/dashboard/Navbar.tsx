'use client';

import { FiSearch, FiBell, FiUser } from 'react-icons/fi';

interface NavbarProps {
  user: any;
  profile: any;
}

export default function Navbar({ user, profile }: NavbarProps) {
  return (
    <header className="h-[70px] bg-white flex items-center justify-between px-[30px] shadow-sm sticky top-0 z-[90]">
      <div className="flex items-center gap-[15px] bg-[#f0f2f5] px-[15px] py-[8px] rounded-[8px] w-[400px]">
        <FiSearch className="text-[#888]" />
        <input
          type="text"
          placeholder="Search shipment, ID, or location..."
          className="border-none bg-transparent outline-none w-full text-[14px]"
        />
      </div>

      <div className="flex items-center gap-[20px]">
        <button className="relative bg-transparent border-none cursor-pointer">
          <FiBell size={20} className="text-[#565959]" />
          <span className="absolute top-[-5px] right-[-5px] bg-[#FF9900] w-[8px] height-[8px] rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-[12px] border-l border-[#eee] pl-[20px]">
          <div className="text-right">
            <p className="m-0 font-semibold text-[14px]">{profile?.Name || 'Logistics Partner'}</p>
            <p className="m-0 text-[12px] text-[#565959]">{user?.email || 'partner@logisshub.in'}</p>
          </div>
          <div className="w-[40px] h-[40px] rounded-full bg-[#FF9900] flex items-center justify-center text-white">
            <FiUser size={20} />
          </div>
        </div>
      </div>
    </header>
  );
}
