import Link from 'next/link';
import TronisLogo from '@/components/UI/TronisLogo';

export default function Header() {
  return (
    <header className="bg-slate-950 py-4.5 sticky top-0 z-[1000] border-b border-white/5 backdrop-blur-md bg-opacity-95">
      <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center max-w-7xl">

        {/* Brand Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <TronisLogo />
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden md:flex gap-8 items-center text-sm font-medium">
          <Link href="/" className="text-amber-500 transition-colors duration-200">Home</Link>
          <Link href="/fba" className="text-slate-300 hover:text-amber-500 transition-colors duration-200">Partner Program</Link>
          <Link href="/air" className="text-slate-300 hover:text-amber-500 transition-colors duration-200">Services</Link>
          <Link href="/freight" className="text-slate-300 hover:text-amber-500 transition-colors duration-200">Resources</Link>
          <Link href="/help" className="text-slate-300 hover:text-amber-500 transition-colors duration-200">About Us</Link>
          <Link href="/tracking" className="text-slate-300 hover:text-amber-500 transition-colors duration-200">Contact Us</Link>
        </nav>

        {/* CTA Button */}
        <div className="flex items-center">

        </div>
        <Link
          href="/login"
          className="bg-amber-500 hover:bg-amber-600 !text-white px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all transform active:scale-95 flex items-center gap-1.5"
        >
          Partner Sign In
          <span className="font-extrabold text-sm !text-white">&gt;</span>
        </Link>
      </div>
    </header>
  );
}


