'use client';

import { useState } from 'react';
import { loginUser } from '@/lib/strapi';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiShield, FiTrendingUp, FiHeadphones, FiGlobe } from 'react-icons/fi';

export default function Login() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await loginUser(identifier, password);
      localStorage.setItem('token', data.jwt);
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#F7F9FC]">

      {/* Left Column: Branding & Benefits (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden flex-col justify-between p-16">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -ml-48 -mb-48" />

        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center text-white/70 hover:text-white mb-12 transition-colors">
            <FiArrowLeft className="mr-2" /> Back to Home
          </Link>

          <div className="mb-8">
            <img src="/logo/logo.png" alt="Logo" className="h-20 w-auto object-contain" />
          </div>

          <h1 className="text-5xl font-extrabold text-white leading-tight mb-6">
            Scale Your Business with <br />
            <span className="text-blue-400">ADSP Hub</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-lg mb-12">
            Join thousands of successful partners delivering excellence across the globe. Our technology, your ambition.
          </p>

          <div className="grid grid-cols-1 gap-8">
            <BenefitItem
              icon={<FiTrendingUp className="text-blue-400" />}
              title="Global Scalability"
              desc="Access our worldwide network and scale your operations effortlessly."
            />
            <BenefitItem
              icon={<FiShield className="text-blue-400" />}
              title="Secure Operations"
              desc="Bank-grade security and real-time tracking for every single package."
            />
            <BenefitItem
              icon={<FiHeadphones className="text-blue-400" />}
              title="24/7 Expert Support"
              desc="Our dedicated partner support team is always just a call away."
            />
          </div>
        </div>

        <div className="relative z-10 pt-10 border-t border-white/10">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-gray-600 flex items-center justify-center text-[10px] text-white">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-400">
              Joined by <span className="text-white font-bold">12,000+</span> partners this month.
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-10 text-center">
            <img src="/logo/blogo.png" alt="Logo" className="h-16 mx-auto mb-4 object-contain" />
          </div>

          <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 lg:p-12 border border-gray-100">
            <div className="mb-10">
              <h2 className="text-3xl font-black text-slate-800 mb-2 tracking-tight">Partner Login</h2>
              <p className="text-gray-500">Access your hub management dashboard</p>
            </div>

            {error && (
              <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm animate-shake rounded-r-lg">
                <p className="font-bold">Error</p>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Identity</label>
                <div className="relative group">
                  <input
                    type="text"
                    required
                    placeholder="Email or Hub ID"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-gray-200 px-5 py-4 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-gray-800 placeholder:text-gray-400"
                  />
                  <FiGlobe className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-500 transition-colors" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Security Key</label>
                  <a href="#" className="text-xs text-blue-600 hover:underline font-bold">Forgot?</a>
                </div>
                <div className="relative group">
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-gray-200 px-5 py-4 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-gray-800 placeholder:text-gray-400"
                  />
                  <FiShield className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-500 transition-colors" />
                </div>
              </div>

              <div className="flex items-center gap-3 ml-1">
                <input type="checkbox" id="remember" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <label htmlFor="remember" className="text-sm text-gray-500 cursor-pointer select-none">Keep me signed in for 30 days</label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold rounded-2xl transition-all transform active:scale-[0.98] shadow-xl hover:shadow-2xl shadow-blue-900/10 flex justify-center items-center gap-3"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Connecting...
                  </>
                ) : 'Enter Dashboard'}
              </button>
            </form>

            <div className="mt-12 text-center pt-8 border-t border-gray-50 flex flex-col items-center gap-4">
              <p className="text-gray-500 text-sm">
                Need a partnership? <Link href="/register" className="text-blue-600 font-black hover:underline ml-1">Apply Now</Link>
              </p>
              <div className="mt-2">
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    window.open('https://www.sitelock.com/verify.php?site=logisshub.info','SiteLock','width=600,height=600,left=160,top=170');
                  }}
                  className="hover:opacity-80 transition-opacity inline-block"
                >
                  <img className="img-fluid h-8 w-auto object-contain" alt="SiteLock" title="SiteLock" src="https://shield.sitelock.com/shield/logisshub.info" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 flex justify-center gap-6 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-gray-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Support</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function BenefitItem({ icon, title, desc }: any) {
  return (
    <div className="flex gap-5 group">
      <div className="w-12 h-12 shrink-0 bg-white/5 rounded-xl flex items-center justify-center text-2xl group-hover:bg-blue-500/20 transition-colors duration-300">
        {icon}
      </div>
      <div>
        <h3 className="text-white font-bold text-lg mb-1">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
