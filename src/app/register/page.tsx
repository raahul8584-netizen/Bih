'use client';

import { useState } from 'react';
import { registerUser } from '@/lib/strapi';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiCheckCircle, FiUserPlus, FiFileText, FiActivity } from 'react-icons/fi';
import ReCAPTCHA from '@/components/ReCAPTCHA';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!captchaToken) {
      setError('Please complete the Captcha verification.');
      return;
    }

    const confirmMsg = "Important: Please ensure you have securely saved your email and password. Self-service password recovery is currently unavailable.\n\nDo you want to proceed?";

    if (!window.confirm(confirmMsg)) {
      return;
    }

    setLoading(true);
    try {
      const payload = {
        username: formData.email,
        email: formData.email,
        password: formData.password,
      };

      const data = await registerUser(payload);
      localStorage.setItem('token', data.jwt);
      localStorage.setItem('user', JSON.stringify(data.user));

      alert('Registration Successful!');
      router.push('/login');
    } catch (err: any) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#F7F9FC]">

      {/* Left Column: Onboarding Steps */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden flex-col justify-between p-16">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -ml-48 -mt-48" />

        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center text-white/70 hover:text-white mb-12 transition-colors">
            <FiArrowLeft className="mr-2" /> Back to Home
          </Link>

          <div className="mb-8">
            <img src="/logo/whitelogo.png" alt="Logo" className="h-20 w-auto object-contain" />
          </div>

          <h1 className="text-5xl font-extrabold text-white leading-tight mb-6">
            Become a <br />
            <span className="text-blue-400">Delivery Partner</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-lg mb-12">
            Start your journey with ADSP Hub. A simple 3-step process to get your business running.
          </p>

          <div className="space-y-10">
            <StepItem
              icon={<FiUserPlus className="text-blue-400" />}
              step="Step 1"
              title="Create Your Account"
              desc="Register with your email and set up your secure partner profile."
              active
            />
            <StepItem
              icon={<FiFileText className="text-gray-500" />}
              step="Step 2"
              title="Verify Documents"
              desc="Upload your business KYC and location details for verification."
            />
            <StepItem
              icon={<FiActivity className="text-gray-500" />}
              step="Step 3"
              title="Start Operations"
              desc="Complete the onboarding and start receiving delivery requests."
            />
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-6 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-gray-500" />
            ))}
          </div>
          <p className="text-xs text-gray-400">
            "The best decision for my local delivery business." <br />
            <span className="text-white font-bold">— Rajesh K., Hub Owner</span>
          </p>
        </div>
      </div>

      {/* Right Column: Register Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-10 text-center">
            <img src="/logo/blacklogo.png" alt="Logo" className="h-16 mx-auto mb-4 object-contain" />
          </div>

          <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 lg:p-12 border border-gray-100">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-black text-slate-800 mb-2 tracking-tight">Create Account</h2>
              <p className="text-gray-500">Join the ADSP Logistic Hub network today</p>
            </div>

            {error && (
              <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#F8FAFC] border border-gray-200 px-5 py-4 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-gray-800"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Create Password</label>
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-[#F8FAFC] border border-gray-200 px-5 py-4 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-gray-800"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-[#F8FAFC] border border-gray-200 px-5 py-4 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-gray-800"
                />
              </div>

              <div className="p-4 bg-blue-50 rounded-xl text-[11px] text-blue-800 leading-relaxed border border-blue-100 italic">
                Note: Passwords are non-recoverable. Please store them securely in a password manager.
              </div>

              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                onChange={setCaptchaToken}
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-black rounded-2xl transition-all transform active:scale-[0.98] shadow-lg shadow-blue-500/20 flex justify-center items-center gap-3 uppercase tracking-widest"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Registering...
                  </>
                ) : 'Register Now'}
              </button>
            </form>

            <div className="mt-10 text-center pt-8 border-t border-gray-50 flex flex-col items-center gap-4">
              <p className="text-gray-500 text-sm">
                Already have an account? <Link href="/login" className="text-blue-600 font-bold hover:underline ml-1">Login here</Link>
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
        </div>
      </div>
    </div>
  );
}

function StepItem({ icon, step, title, desc, active }: any) {
  return (
    <div className={`flex gap-5 transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-40'}`}>
      <div className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center text-2xl border ${active ? 'bg-white/10 border-white/20' : 'bg-transparent border-white/5'}`}>
        {icon}
      </div>
      <div>
        <span className="text-[10px] font-black uppercase text-blue-400 tracking-[0.2em] mb-1 block">{step}</span>
        <h3 className="text-white font-bold text-lg mb-1">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
