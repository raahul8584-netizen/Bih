'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/lib/strapi';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';

export default function Hero() {
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
    <div className="relative min-h-[700px] lg:min-h-[800px] flex items-center overflow-hidden bg-slate-950 py-20 lg:py-32">
      {/* Background Video with absolute cover */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 z-0 w-full h-full object-cover opacity-20 pointer-events-none"
      >
        <source src="/assets/Agar_tum_Veo_Gemini_Runway.mp4" type="video/mp4" />
      </video>

      {/* Tech Grid Line Overlay */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Gradient Mask Overlays */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90 pointer-events-none" />

      {/* Floating Ambient Glowing Spheres */}
      <div className="absolute top-12 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-12 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none z-0" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Slogan, Stats, and Call-to-action */}
          <div className="lg:col-span-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 mb-6 backdrop-blur-md">
              {/* Profile Group Icon Placeholder */}
              <div className="flex -space-x-1">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-4.5 h-4.5 rounded-full border border-slate-950 bg-slate-500" />
                ))}
              </div>
              <span className="text-[10px] font-bold text-slate-300">
                Trusted by 10,000+ Delivery Partners
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[42px] xl:text-[52px] font-black text-white leading-[1.1] mb-6 tracking-tight font-sans">
              Powering Deliveries.<br />
              <span className="text-amber-500">
                Empowering Partners.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-400 mb-8 leading-relaxed max-w-md mx-auto lg:mx-0">
              Join ADSP Logistic Hub and become part of a high-performance delivery ecosystem built for speed, reliability, and growth.
            </p>

            {/* Performance Stats list with golden icons */}
            <div className="grid grid-cols-3 gap-4 mb-8 border-t border-white/5 pt-6 max-w-sm mx-auto lg:mx-0">
              <div>
                <div className="flex items-center gap-1.5 justify-center lg:justify-start text-amber-500 font-extrabold text-lg">
                  <span>99.9%</span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium uppercase mt-1">Delivery Success</p>
              </div>
              <div>
                <div className="flex items-center gap-1.5 justify-center lg:justify-start text-amber-500 font-extrabold text-lg">
                  <span>24/7</span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium uppercase mt-1">Partner Support</p>
              </div>
              <div>
                <div className="flex items-center gap-1.5 justify-center lg:justify-start text-amber-500 font-extrabold text-lg">
                  <span>10K+</span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium uppercase mt-1">Active Partners</p>
              </div>
            </div>

            <a 
              href="/register" 
              className="inline-flex items-center gap-2 border border-amber-500/40 text-amber-500 hover:bg-amber-500 hover:text-slate-950 font-bold px-6 py-3 rounded-lg text-xs uppercase tracking-widest transition-all"
            >
              Join as Partner
              <span>&gt;</span>
            </a>
          </div>

          {/* Center Column: Truck Graphic */}
          <div className="lg:col-span-3 hidden lg:flex items-center justify-center relative">
            <div className="w-full relative group">
              <div className="absolute -inset-1 bg-amber-500/10 rounded-2xl blur-lg pointer-events-none" />
              <img 
                src="/assets/hero_truck.jpg" 
                alt="Delivery Truck" 
                className="w-full h-auto rounded-2xl border border-white/5 object-cover shadow-2xl relative z-10"
              />
            </div>
          </div>

          {/* Right Column: Sign In Card */}
          <div className="lg:col-span-4 w-full">
            <div className="relative group">
              {/* Outer soft dynamic glow */}
              <div className="absolute -inset-1 bg-amber-500/5 rounded-3xl blur-xl opacity-10 group-hover:opacity-20 transition duration-700 pointer-events-none" />
              
              <div className="relative bg-slate-900/80 backdrop-blur-2xl rounded-2xl p-8 border border-white/[0.06] shadow-2xl">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white tracking-tight">Partner Sign In</h3>
                  <p className="text-slate-500 text-xs mt-1">Welcome back! Please login.</p>
                </div>

                {error && (
                  <div className="mb-5 p-3 bg-red-500/15 border border-red-500/20 text-red-200 text-xs rounded-lg animate-shake">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email / Phone Number */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Email / Phone Number
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter email or phone number"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-white/10 focus:border-amber-500 outline-none transition-all text-white placeholder-slate-600 text-xs font-sans"
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Password
                      </label>
                      <a href="#" className="text-[10px] font-bold text-amber-500 hover:underline">Forgot?</a>
                    </div>
                    <input
                      type="password"
                      required
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-white/10 focus:border-amber-500 outline-none transition-all text-white placeholder-slate-600 text-xs font-sans"
                    />
                  </div>

                  {/* Remember me */}
                  <div className="flex items-center gap-2 pt-1">
                    <input type="checkbox" id="remember-me" className="w-3.5 h-3.5 rounded border-white/10 text-amber-500 focus:ring-amber-500 bg-slate-950" />
                    <label htmlFor="remember-me" className="text-xs text-slate-400 select-none">Remember me</label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-700 disabled:text-slate-500 text-slate-950 font-bold rounded-lg transition-all flex justify-center items-center gap-1.5 text-xs uppercase tracking-widest mt-6 cursor-pointer"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                    ) : (
                      <>
                        Sign In
                        <span>&gt;</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Create Account Action */}
                <div className="mt-6 pt-5 border-t border-white/[0.06] text-center text-xs text-slate-500">
                  New Partner?{' '}
                  <a
                    href="/register"
                    className="font-bold text-amber-500 hover:underline"
                  >
                    Create an Account
                  </a>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
