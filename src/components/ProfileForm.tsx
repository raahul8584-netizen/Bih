'use client';

import { useState } from 'react';
import { createUserProfile } from '@/lib/strapi';
import { FiUser, FiPhone, FiCreditCard, FiHash, FiShield, FiArrowRight, FiMail, FiCheckCircle, FiClock, FiInfo, FiLock, FiGlobe, FiMap, FiMapPin } from 'react-icons/fi';

interface ProfileFormProps {
  user: any;
  onSuccess: () => void;
}

export default function ProfileForm({ user, onSuccess }: ProfileFormProps) {
  const [formData, setFormData] = useState({
    Name: '',
    Phone: '',
    Adhar: '',
    Pan: '',
    GSTIN: '',
    city: '',
    state: '',
    pin: '',
    country: '',
    email: user?.email || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validations
      if (!/^\d{10}$/.test(formData.Phone)) {
        throw new Error('Phone Number must be exactly 10 digits.');
      }
      if (!/^\d{12}$/.test(formData.Adhar)) {
        throw new Error('Aadhar Number must be exactly 12 digits.');
      }
      if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.Pan)) {
        throw new Error('Invalid PAN Format (Example: ABCDE1234F).');
      }
      if (formData.pin.length !== 6) {
        throw new Error('PIN Code must be exactly 6 digits.');
      }
      if (formData.GSTIN && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(formData.GSTIN)) {
        throw new Error('Invalid GSTIN Format.');
      }

      const token = localStorage.getItem('token');
      if (!token) throw new Error('Session expired');

      await createUserProfile(token, formData);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#F7F9FC]">

      {/* Left Column: Verification Branding & Trust (Full height on desktop) */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#232F3E] relative overflow-hidden flex-col justify-between p-12 lg:p-16">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#FF9900]/10 rounded-full blur-[120px] -ml-64 -mt-64" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -mr-64 -mb-64" />

        <div className="relative z-10">
          <div className="mb-12">
            <img src="/logo/logo.png" alt="Logo" className="h-20 w-auto object-contain" />
          </div>

          <h1 className="text-5xl font-black text-white leading-tight mb-6 tracking-tighter">
            Secure Your <br />
            <span className="text-[#FF9900]">Business Identity</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-md mb-12 leading-relaxed">
            Welcome to the Hub. Verification is a critical step to ensure a safe and reliable delivery network for everyone.
          </p>

          <div className="space-y-10">
            <BenefitItem
              icon={<FiShield className="text-[#FF9900]" />}
              title="Identity Protection"
              desc="Your personal and business data is encrypted and stored according to global privacy standards."
            />
            <BenefitItem
              icon={<FiCheckCircle className="text-[#FF9900]" />}
              title="Verified Status"
              desc="Once verified, you'll receive the 'Verified Partner' badge on your global profile."
            />
            <BenefitItem
              icon={<FiLock className="text-[#FF9900]" />}
              title="Fraud Prevention"
              desc="Our advanced systems protect you from identity theft and unauthorized hub access."
            />
          </div>
        </div>

        <div className="relative z-10 pt-10 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
              <FiLock className="text-white text-xl" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">256-bit AES Encryption</p>
              <p className="text-gray-500 text-xs tracking-wide uppercase">Your data is safe with us</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Form Area */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16 overflow-y-auto">
        <div className="w-full max-w-2xl">
          <div className="lg:hidden mb-10 text-center">
            <img src="/logo/blogo.png" alt="Logo" className="h-16 mx-auto object-contain" />
          </div>

          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 mb-3 text-[#FF9900]">
              <span className="w-2 h-2 rounded-full bg-[#FF9900] animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest">Mandatory Verification</span>
            </div>
            <h2 className="text-3xl font-black text-[#232F3E] tracking-tight mb-2">Partner Details</h2>
            <p className="text-sm text-gray-500">Provide your official business identity details below.</p>
          </div>

          {error && (
            <div className="mb-8 p-6 bg-red-50 border-l-4 border-red-500 rounded-r-2xl text-red-700 text-sm animate-shake">
              <div className="flex items-center gap-3 font-bold mb-1">
                <FiInfo /> Validation Error
              </div>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormGroup
                label="Full Legal Name"
                name="Name"
                placeholder="As per PAN card"
                value={formData.Name}
                onChange={handleChange}
                icon={<FiUser />}
              />
              <FormGroup
                label="Email Address"
                name="email"
                value={formData.email}
                disabled
                icon={<FiMail />}
              />
              <FormGroup
                label="Primary Contact"
                name="Phone"
                placeholder="10-digit number"
                value={formData.Phone}
                onChange={handleChange}
                icon={<FiPhone />}
                maxLength={10}
              />
              <FormGroup
                label="Aadhar ID"
                name="Adhar"
                placeholder="12-digit number"
                value={formData.Adhar}
                onChange={handleChange}
                icon={<FiCreditCard />}
                maxLength={12}
              />
              <FormGroup
                label="PAN Card ID"
                name="Pan"
                placeholder="ABCDE1234F"
                value={formData.Pan}
                onChange={handleChange}
                icon={<FiHash />}
                maxLength={10}
              />
              <FormGroup
                label="GSTIN (If Any)"
                name="GSTIN"
                placeholder="15-character ID"
                value={formData.GSTIN}
                onChange={handleChange}
                icon={<FiShield />}
                maxLength={15}
              />
              <FormGroup
                label="City"
                name="city"
                placeholder="Enter city"
                value={formData.city}
                onChange={handleChange}
                icon={<FiMapPin />}
              />
              <FormGroup
                label="State"
                name="state"
                placeholder="Enter state"
                value={formData.state}
                onChange={handleChange}
                icon={<FiMap />}
              />
              <FormGroup
                label="PIN Code"
                name="pin"
                placeholder="6-digit PIN"
                value={formData.pin}
                onChange={handleChange}
                icon={<FiHash />}
                maxLength={6}
              />
              <FormGroup
                label="Country"
                name="country"
                placeholder="Enter country"
                value={formData.country}
                onChange={handleChange}
                icon={<FiGlobe />}
              />
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#232F3E] hover:bg-[#1a232e] text-white font-black rounded-2xl shadow-2xl shadow-blue-900/20 transition-all transform active:scale-[0.98] flex justify-center items-center gap-4 text-base uppercase tracking-widest"
              >
                {loading ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Submit Identity <FiArrowRight className="text-xl" />
                  </>
                )}
              </button>

              <div className="mt-8 flex flex-col items-center gap-4 text-center">
                <p className="text-xs text-gray-400 max-w-sm">
                  By submitting this form, you authorize Logistic Hub to verify your business details with regional authorities.
                </p>
                <div className="flex gap-6 opacity-30 grayscale hover:grayscale-0 transition-all cursor-default">
                  <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className="h-6" />
                  <img src="https://img.icons8.com/color/48/mastercard.png" alt="MC" className="h-6" />
                  <img src="https://img.icons8.com/color/48/pci-compliant.png" alt="PCI" className="h-6" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>


  );
}

function FormGroup({ label, name, value, onChange, placeholder, disabled, icon, maxLength, pattern }: any) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[12px] font-bold text-[#565959] uppercase tracking-wide ml-1">{label}</label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </div>
        <input
          type={name === 'email' ? 'email' : 'text'}
          name={name}
          required={!disabled && name !== 'GSTIN'}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          maxLength={maxLength}
          pattern={pattern}
          className={`w-full pl-11 pr-4 py-2.5 border rounded-[12px] outline-none transition-all ${disabled
            ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-white border-gray-300 focus:border-[#FF9900] focus:ring-4 focus:ring-orange-50 shadow-sm'
            }`}
        />
      </div>
    </div>
  );
}

function BenefitItem({ icon, title, desc }: any) {
  return (
    <div className="flex items-start gap-6 group">
      <div className="w-14 h-14 shrink-0 rounded-2xl bg-white/5 flex items-center justify-center text-2xl text-[#FF9900] group-hover:bg-white transition-all duration-500 shadow-inner border border-white/5 group-hover:border-white">
        {icon}
      </div>

      <div>
        <h4 className="text-white font-bold text-xl mb-2 tracking-tight group-hover:text-[#FF9900] transition-colors">
          {title}
        </h4>

        <p className="text-gray-400 text-sm leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
}



