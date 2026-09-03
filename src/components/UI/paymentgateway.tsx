'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FaWhatsapp } from 'react-icons/fa';
import {
  FiLock,
  FiCheckCircle,
  FiX,
  FiSmartphone,
  FiGlobe,
  FiInfo,
  FiCopy,
  FiCheck,
  FiRefreshCw,
  FiMail,
  FiPhoneCall,
  FiAlertCircle,
  FiAlertTriangle,
  FiMessageSquare
} from 'react-icons/fi';

export interface PaymentGatewayProps {
  amount?: string | number;
  processName?: string;
  customerName?: string;
  message?: string;
  isOpen?: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
}

const formatCurrency = (num: number) => {
  return num.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export default function Paymentgateway({
  amount = "",
  processName = "",
  customerName = "",
  message,
  isOpen,
  onClose,
  onSuccess,
}: PaymentGatewayProps) {
  const [mounted, setMounted] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'netbanking'>('upi');
  const [utrNumber, setUtrNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [showQrNoticeModal, setShowQrNoticeModal] = useState(false);
  const [hasClickedWhatsapp, setHasClickedWhatsapp] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isServerError, setIsServerError] = useState(false);

  // Strapi API Support Details State
  const [support, setSupport] = useState({
    phone: "",
    whatsapp: "",
    mail: "",
    url: "",
    acountno: "",
    ifsccode: "",
    bankname: "",
    holdername: "",
  });

  const apiurl = process.env.NEXT_PUBLIC_STRAPI_URL;

  // Fetch Support & Bank Details from Strapi
  useEffect(() => {
    if (!apiurl) {
      setIsServerError(true);
      return;
    }

    fetch(`${apiurl}/api/supports`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((result) => {
        const supportData = result.data?.[0] || result?.[0];
        if (supportData) {
          const attributes = supportData.attributes || supportData;
          const fetchedSupport = {
            phone: attributes.supportnumber ?? supportData.supportnumber ?? "",
            whatsapp: attributes.supportwhatapp ?? supportData.supportwhatapp ?? "",
            mail: attributes.supportmail ?? supportData.supportmail ?? "",
            url: attributes.url ?? supportData.url ?? "",
            acountno: attributes.acountno ?? supportData.acountno ?? "",
            ifsccode: attributes.ifsccode ?? supportData.ifsccode ?? "",
            bankname: attributes.bankname ?? supportData.bankname ?? "",
            holdername: attributes.holdername ?? supportData.holdername ?? "",
          };

          setSupport(fetchedSupport);

          // If ANY required field is missing or empty string from server, trigger server error UI
          const isDataMissing =
            !fetchedSupport.acountno ||
            !fetchedSupport.ifsccode ||
            !fetchedSupport.bankname ||
            !fetchedSupport.holdername;

          if (isDataMissing) {
            setIsServerError(true);
          }
        } else {
          setIsServerError(true);
        }
      })
      .catch((err) => {
        console.error("Error fetching support:", err);
        setIsServerError(true);
      });
  }, [apiurl]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (isOpen === false) return null;

  // Tax calculation logic matching InvoiceGenerator.tsx
  const rawAmountStr = (amount !== undefined ? amount : "2499").toString();
  const cleanAmountStr = rawAmountStr.replace(/,/g, "").replace(/[^0-9.]/g, "");
  const totalVal = parseFloat(cleanAmountStr) || 0;
  const baseRate = totalVal / 1.18;
  const adjustedBaseRate = Math.round(baseRate * 100) / 100;
  const cgstVal = Math.round(adjustedBaseRate * 0.09 * 100) / 100;
  const sgstVal = cgstVal;
  const totalGst = cgstVal + sgstVal;

  const handleCopy = (text: string, fieldName: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setHasClickedWhatsapp(false);

    setTimeout(() => {
      setIsSubmitting(false);
      const successText = `Please contact your Relationship Manager immediately and share the payment confirmation screenshot on WhatsApp for instant verification.`;
      setSubmittedMessage(successText);
      if (onSuccess) onSuccess();
    }, 1200);
  };

  // Display variables using strictly API data
  const displayAccountNo = support.acountno;
  const displayIfsc = support.ifsccode;
  const displayHolder = support.holdername;
  const displayBank = support.bankname;

  // Check if server is missing data
  const hasMissingData = isServerError || !displayAccountNo || !displayIfsc || !displayBank || !displayHolder;

  const modalContent = (
    <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 border border-slate-200 relative animate-in zoom-in-95 duration-200 text-slate-800 my-auto max-h-[90vh] md:max-h-[85vh] overflow-y-auto">
      {/* Close Button - Hidden on success screen until WhatsApp screenshot button is clicked */}
      {onClose && (!submittedMessage || hasClickedWhatsapp) && (
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 flex items-center justify-center transition-colors shadow-sm"
          title="Close Payment Window"
        >
          <FiX size={18} />
        </button>
      )}

      {/* Left Column - Order Summary & GST Breakdown */}
      <div className="md:col-span-5 bg-slate-900 text-white p-5 sm:p-6 md:p-8 flex flex-col justify-between relative overflow-hidden shrink-0">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none" />
        
        <div>
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <div className="h-8 w-8 sm:h-9 sm:w-9 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30 text-sm sm:text-base">
              P
            </div>
            <span className="font-bold text-base sm:text-lg tracking-wide text-white">Logistic Hub Pay</span>
          </div>

          <p className="text-slate-400 text-[11px] sm:text-xs font-medium uppercase tracking-wider mb-1">Payable Amount</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 md:mb-6 tracking-tight break-words">
            ₹{formatCurrency(totalVal)}
          </h1>

          <div className="space-y-2.5 sm:space-y-3.5 border-t border-slate-800 pt-4 md:pt-6 text-xs sm:text-sm">
            <div className="flex justify-between items-start gap-2 text-xs sm:text-sm">
              <span className="text-slate-400 font-medium leading-tight break-words">{processName}</span>
              <span className="font-semibold text-white shrink-0">₹{formatCurrency(adjustedBaseRate)}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>CGST (9%)</span>
              <span className="font-medium text-slate-300">₹{formatCurrency(cgstVal)}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>SGST (9%)</span>
              <span className="font-medium text-slate-300">₹{formatCurrency(sgstVal)}</span>
            </div>
            <div className="border-t border-slate-800/80 pt-2.5 sm:pt-3 flex justify-between text-xs font-semibold text-indigo-400">
              <span>Total Tax (18% GST)</span>
              <span>₹{formatCurrency(totalGst)}</span>
            </div>
          </div>
        </div>

        {/* Support Contact Info Panel */}
        <div className="mt-5 pt-4 md:mt-6 md:pt-5 border-t border-slate-800 space-y-2 text-xs text-slate-300">
          <div className="font-semibold text-indigo-300 mb-1.5 uppercase tracking-wider text-[10px] sm:text-[11px]">
            Support & Help Desk
          </div>
          {support.mail && (
            <div className="flex items-center gap-2">
              <FiMail className="text-indigo-400 shrink-0" size={14} />
              <span className="truncate break-all">{support.mail}</span>
            </div>
          )}
          {support.whatsapp && (
            <div className="flex items-center gap-2">
              <FiPhoneCall className="text-emerald-400 shrink-0" size={14} />
              <span>+{support.whatsapp}</span>
            </div>
          )}
          <div className="mt-3 pt-3 border-t border-slate-800/60 text-[10px] sm:text-[11px] text-slate-400 flex items-center gap-1.5">
            <FiLock className="text-emerald-400 shrink-0" size={13} />
            <span>Guaranteed 256-bit SSL Encryption</span>
          </div>
        </div>
      </div>

      {/* Right Column - Payment Form */}
      <div className="md:col-span-7 p-5 sm:p-6 md:p-8 flex flex-col justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-1">Payment Details</h2>
          
          {/* Custom Message Banner */}
          {message ? (
            <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs flex items-start gap-2">
              <FiInfo className="text-amber-600 shrink-0 mt-0.5" size={16} />
              <span className="break-words">{message}</span>
            </div>
          ) : (
            <p className="text-xs text-slate-500 mb-4">
              Complete your payment for <span className="font-semibold text-slate-700">{processName}</span>.
            </p>
          )}

          {hasMissingData ? (
            <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-5 sm:p-6 my-2 space-y-4 text-slate-800 animate-in zoom-in-95 duration-200">
              <div className="flex items-center gap-3 text-amber-800 border-b border-amber-200/80 pb-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <FiAlertTriangle className="text-amber-700" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">Payment Server Maintenance</h3>
                  <p className="text-[11px] text-amber-700">Gateway Offline / Server Maintenance</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                Payment gateway servers are currently undergoing maintenance and account details could not be loaded at this moment.
              </p>

              <div className="bg-white border border-amber-200 rounded-xl p-4 space-y-3 shadow-xs">
                <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">Please follow these options to make your payment:</p>
                
                <div className="space-y-3 text-xs text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 font-bold text-[11px]">1</div>
                    <div>
                      <span className="font-bold text-slate-900 block">Call / WhatsApp Relationship Manager:</span>
                      <span>Connect directly with your assigned Relationship Manager via Phone or WhatsApp for payment account details.</span>
                      {support.whatsapp && (
                        <span className="block font-mono text-indigo-600 font-bold mt-0.5">+{support.whatsapp}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 font-bold text-[11px]">2</div>
                    <div>
                      <span className="font-bold text-slate-900 block">Email Support Desk:</span>
                      <span>Send your payment query to <strong className="text-slate-900">{support.mail || 'support@adsplogistichub.com'}</strong>.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 font-bold text-[11px]">3</div>
                    <div>
                      <span className="font-bold text-slate-900 block">Dashboard Live Chat / Complaint:</span>
                      <span>Go to <strong className="text-slate-900">Dashboard &gt; Settings &gt; Chat Option</strong> to submit a complaint or chat live with support.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Direct Action Buttons */}
              <div className="space-y-2.5 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {/* 1. Direct Call Button */}
                  <a
                    href={`tel:${(support.phone || support.whatsapp || '8584860513').replace(/[^0-9+]/g, '')}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-3 rounded-xl shadow-md transition duration-200 flex items-center justify-center gap-2 text-xs no-underline cursor-pointer active:scale-95"
                  >
                    <FiPhoneCall size={16} />
                    <span>Call Manager</span>
                  </a>

                  {/* 2. Email Support Button */}
                  <a
                    href={`mailto:${support.mail || 'support@adsplogistichub.com'}?subject=${encodeURIComponent(`Payment Support Request - ${processName}`)}`}
                    className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-3 rounded-xl shadow-md transition duration-200 flex items-center justify-center gap-2 text-xs no-underline cursor-pointer active:scale-95"
                  >
                    <FiMail size={16} />
                    <span>Email Support</span>
                  </a>
                </div>

                {/* 3. WhatsApp Button */}
                {support.whatsapp && (
                  <a
                    href={`https://wa.me/91${support.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello, I am trying to make a payment for ${processName} (${amount}), but the payment gateway server is currently undergoing maintenance. Please guide me.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition duration-200 flex items-center justify-center gap-2 text-xs sm:text-sm active:scale-95 no-underline cursor-pointer"
                  >
                    <FaWhatsapp size={18} />
                    <span>WhatsApp Relationship Manager</span>
                  </a>
                )}

                {/* 4. Dashboard Settings Chat Option Redirect Button */}
                <a
                  href="/dashboard?tab=settings"
                  onClick={() => {
                    if (onClose) onClose();
                  }}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition duration-200 flex items-center justify-center gap-2 text-xs sm:text-sm active:scale-95 no-underline cursor-pointer"
                >
                  <FiMessageSquare size={16} />
                  <span>Go to Dashboard Chat / Support Settings</span>
                </a>

                {/* 5. Close & Return to Dashboard Button */}
                <button
                  type="button"
                  onClick={() => {
                    if (onClose) onClose();
                  }}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-4 rounded-xl border border-slate-300 transition duration-200 text-xs active:scale-95 cursor-pointer mt-1"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : submittedMessage ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 sm:p-6 text-center space-y-4 my-4 sm:my-6 animate-in zoom-in-95 duration-200">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <FiCheckCircle size={24} />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-emerald-950">Payment Request Submitted</h3>
              <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed font-medium">
                {submittedMessage}
              </p>

              {/* Action Required Alert Banner */}
              {!hasClickedWhatsapp && (
                <div className="bg-amber-100/90 border border-amber-300 rounded-xl p-3 text-[11px] sm:text-xs text-amber-900 font-semibold flex items-center justify-center gap-1.5 animate-pulse">
                  <FiAlertCircle className="shrink-0 text-amber-700" size={16} />
                  <span>Action Required: Send your payment screenshot on WhatsApp to unlock dashboard return.</span>
                </div>
              )}

              {/* Action Buttons Container */}
              <div className="space-y-2.5 pt-1">
                {/* 1. WhatsApp Button */}
                {support.whatsapp && (
                  <a
                    href={`https://wa.me/91${support.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello, I have completed the payment of ₹${formatCurrency(totalVal)} for ${processName}. Attached is my payment confirmation screenshot.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setHasClickedWhatsapp(true)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-600/30 transition duration-200 flex items-center justify-center gap-2 text-xs sm:text-sm active:scale-95 no-underline cursor-pointer"
                  >
                    <FaWhatsapp size={20} />
                    <span>Send Screenshot on WhatsApp</span>
                  </a>
                )}

                {/* 2. Close & Return to Dashboard Button (Locked until WhatsApp is clicked) */}
                <button
                  type="button"
                  disabled={!hasClickedWhatsapp}
                  onClick={() => {
                    if (!hasClickedWhatsapp) return;
                    setSubmittedMessage(null);
                    if (onClose) onClose();
                  }}
                  className={`w-full font-bold py-3.5 px-4 rounded-xl transition duration-200 text-xs sm:text-sm flex items-center justify-center gap-2 ${
                    hasClickedWhatsapp
                      ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-md active:scale-95 cursor-pointer'
                      : 'bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed opacity-75'
                  }`}
                >
                  {!hasClickedWhatsapp && <FiLock size={15} className="shrink-0 text-slate-400" />}
                  <span>
                    {hasClickedWhatsapp
                      ? 'Close & Return to Dashboard'
                      : 'Close & Return to Dashboard (Send Screenshot First)'}
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Payment Method Selector - Only UPI and Netbanking */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-4 sm:mb-5">
                <button
                  type="button"
                  onClick={() => setSelectedMethod('upi')}
                  className={`border rounded-xl p-2.5 sm:p-3 flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                    selectedMethod === 'upi'
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-600 shadow-sm'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <FiSmartphone size={16} />
                  <span>UPI Payment</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedMethod('netbanking')}
                  className={`border rounded-xl p-2.5 sm:p-3 flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                    selectedMethod === 'netbanking'
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-600 shadow-sm'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <FiGlobe size={16} />
                  <span>Netbanking / Bank Transfer</span>
                </button>
              </div>

              {/* Tab 1: UPI View with Blurry QR Code & Reload Button */}
              {selectedMethod === 'upi' && (
                <div className="space-y-3.5 sm:space-y-4">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 sm:p-4 flex flex-col items-center text-center relative overflow-hidden">
                    <p className="text-[11px] sm:text-xs font-semibold text-slate-700 mb-2">Scan QR Code using PhonePe / GPay / Paytm</p>
                    
                    {/* Blurry QR Code Container */}
                    <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-xl overflow-hidden border border-slate-300 bg-white flex items-center justify-center p-2 group shadow-inner">
                      <img
                        src="/QR/exported_qrcode_image (2).png"
                        alt="UPI QR Code"
                        className="w-full h-full object-contain filter blur-[6px] opacity-60 scale-105 transition duration-300"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      
                      {/* Overlay Reload Button */}
                      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex flex-col items-center justify-center p-2 sm:p-3 text-white gap-1.5 sm:gap-2">
                        <span className="text-[10px] sm:text-[11px] font-semibold text-slate-100">QR Code Server Sync</span>
                        <button
                          type="button"
                          onClick={() => setShowQrNoticeModal(true)}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] sm:text-xs py-1.5 sm:py-2 px-3 sm:px-3.5 rounded-lg shadow-md flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
                        >
                          <FiRefreshCw size={13} className="animate-spin-slow" />
                          <span>Reload QR Code</span>
                        </button>
                      </div>
                    </div>

                    <p className="text-[10px] sm:text-[11px] text-slate-500 mt-2">
                      If QR doesn't load, click <span className="font-semibold text-indigo-600">Reload</span> or pay via Bank Transfer below.
                    </p>
                  </div>

                  {/* Bank Account Details Card */}
                  <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-3.5 sm:p-4 space-y-2.5">
                    <div className="flex flex-wrap justify-between items-center border-b border-indigo-100 pb-2 gap-1">
                      <span className="text-[11px] sm:text-xs font-bold text-indigo-950 uppercase tracking-wider">Direct Bank Details</span>
                      {displayBank && (
                        <span className="text-[10px] sm:text-[11px] font-medium text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded truncate max-w-[150px]">{displayBank}</span>
                      )}
                    </div>

                    <div className="text-xs space-y-2 text-slate-700">
                      {displayHolder && (
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                          <span className="text-slate-500 font-medium shrink-0">Account Holder:</span>
                          <span className="font-bold text-slate-900 sm:text-right break-words">{displayHolder}</span>
                        </div>
                      )}

                      {displayAccountNo && (
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white p-2 rounded-lg border border-indigo-100 gap-1.5">
                          <span className="text-slate-500 font-medium shrink-0">Account Number:</span>
                          <div className="flex items-center justify-between sm:justify-end gap-2">
                            <span className="font-mono font-bold text-slate-900 text-xs sm:text-sm tracking-wide break-all">{displayAccountNo}</span>
                            <button
                              type="button"
                              onClick={() => handleCopy(displayAccountNo, 'acountno')}
                              className="p-1 text-indigo-600 hover:bg-indigo-50 rounded transition shrink-0"
                              title="Copy Account Number"
                            >
                              {copiedField === 'acountno' ? <FiCheck size={16} className="text-emerald-600" /> : <FiCopy size={16} />}
                            </button>
                          </div>
                        </div>
                      )}

                      {displayIfsc && (
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white p-2 rounded-lg border border-indigo-100 gap-1.5">
                          <span className="text-slate-500 font-medium shrink-0">IFSC Code:</span>
                          <div className="flex items-center justify-between sm:justify-end gap-2">
                            <span className="font-mono font-bold text-slate-900 text-xs sm:text-sm tracking-wide break-all">{displayIfsc}</span>
                            <button
                              type="button"
                              onClick={() => handleCopy(displayIfsc, 'ifsccode')}
                              className="p-1 text-indigo-600 hover:bg-indigo-50 rounded transition shrink-0"
                              title="Copy IFSC Code"
                            >
                              {copiedField === 'ifsccode' ? <FiCheck size={16} className="text-emerald-600" /> : <FiCopy size={16} />}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Netbanking / Bank Transfer View */}
              {selectedMethod === 'netbanking' && (
                <div className="space-y-3.5 sm:space-y-4">
                  <div className="bg-slate-900 text-white rounded-xl p-4 sm:p-5 space-y-3 relative overflow-hidden shadow-md">
                    <div className="flex flex-wrap justify-between items-center border-b border-slate-800 pb-3 gap-2">
                      <div>
                        <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider block">Bank Name</span>
                        <span className="text-xs sm:text-sm font-bold text-white break-words">{displayBank || 'Partner Bank'}</span>
                      </div>
                      <div className="h-7 sm:h-8 px-2 sm:px-2.5 bg-indigo-600/30 border border-indigo-500/40 rounded-lg flex items-center justify-center text-[10px] sm:text-xs font-bold text-indigo-300">
                        IMPS / NEFT / RTGS
                      </div>
                    </div>

                    <div className="space-y-2.5 text-xs pt-1">
                      {displayHolder && (
                        <div>
                          <span className="text-slate-400 block text-[10px] sm:text-[11px] mb-0.5">Account Holder Name</span>
                          <span className="font-bold text-xs sm:text-sm text-white tracking-wide break-words">{displayHolder}</span>
                        </div>
                      )}

                      {displayAccountNo && (
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-slate-800/80 p-2.5 rounded-lg border border-slate-700 gap-2">
                          <div>
                            <span className="text-slate-400 block text-[10px]">Account Number</span>
                            <span className="font-mono text-sm sm:text-base font-bold text-emerald-400 tracking-wider break-all">{displayAccountNo}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopy(displayAccountNo, 'acountno')}
                            className="px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-md flex items-center justify-center gap-1 transition shrink-0"
                          >
                            {copiedField === 'acountno' ? <FiCheck size={14} /> : <FiCopy size={14} />}
                            <span>{copiedField === 'acountno' ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                      )}

                      {displayIfsc && (
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-slate-800/80 p-2.5 rounded-lg border border-slate-700 gap-2">
                          <div>
                            <span className="text-slate-400 block text-[10px]">IFSC Code</span>
                            <span className="font-mono text-xs sm:text-sm font-bold text-indigo-300 tracking-wider break-all">{displayIfsc}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopy(displayIfsc, 'ifsccode')}
                            className="px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-md flex items-center justify-center gap-1 transition shrink-0"
                          >
                            {copiedField === 'ifsccode' ? <FiCheck size={14} /> : <FiCopy size={14} />}
                            <span>{copiedField === 'ifsccode' ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 space-y-1">
                    <p className="font-semibold flex items-center gap-1">
                      <FiInfo className="text-amber-600 shrink-0" />
                      Payment Verification Notice:
                    </p>
                    <p className="text-[10px] sm:text-[11px] leading-relaxed">
                      After transferring <span className="font-bold">₹{formatCurrency(totalVal)}</span> via Netbanking or UPI, enter your UTR / Reference number below and click submit.
                    </p>
                  </div>
                </div>
              )}

              {/* Submit Form */}
              <form onSubmit={handleSubmit} className="mt-4 sm:mt-5 space-y-3.5 sm:space-y-4">


                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 sm:py-3.5 px-4 rounded-xl shadow-lg shadow-indigo-200 transition duration-200 active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
                >
                  {isSubmitting ? (
                    <span>Submitting Payment Request...</span>
                  ) : (
                    <span>Confirm Payment (₹{formatCurrency(totalVal)})</span>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      {/* QR Reload Notice Modal (Triggers when user clicks Reload QR Code) */}
      {showQrNoticeModal && (
        <div className="fixed inset-0 z-[10000] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-slate-200 space-y-4 sm:space-y-5 relative my-auto max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowQrNoticeModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full transition"
            >
              <FiX size={18} />
            </button>

            <div className="flex items-center gap-3 text-amber-600">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                <FiAlertCircle size={22} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">QR Code Server Notice</h3>
                <p className="text-[11px] text-slate-500">Scan & Pay Status</p>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 sm:p-3.5 text-xs text-amber-900 leading-relaxed font-medium">
              Scan & Pay via QR Code is currently undergoing scheduled server maintenance. Please proceed by transferring the amount directly to the Bank Account details provided below.
            </div>

            {/* Copyable Bank Account Box inside QR Popup */}
            <div className="bg-slate-900 text-white rounded-xl p-3.5 sm:p-4 space-y-2.5 sm:space-y-3">
              {displayHolder && (
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Account Holder</span>
                  <span className="text-xs font-bold text-slate-100 break-words">{displayHolder}</span>
                </div>
              )}

              {displayAccountNo && (
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-slate-800 p-2.5 rounded-lg border border-slate-700 gap-2">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Account Number</span>
                    <span className="font-mono text-xs sm:text-sm font-bold text-emerald-400 break-all">{displayAccountNo}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(displayAccountNo, 'qr_acountno')}
                    className="px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition active:scale-95 shrink-0"
                  >
                    {copiedField === 'qr_acountno' ? <FiCheck size={14} /> : <FiCopy size={14} />}
                    <span>{copiedField === 'qr_acountno' ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              )}

              {displayIfsc && (
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-slate-800 p-2.5 rounded-lg border border-slate-700 gap-2">
                  <div>
                    <span className="text-[10px] text-slate-400 block">IFSC Code</span>
                    <span className="font-mono text-xs font-bold text-indigo-300 break-all">{displayIfsc}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(displayIfsc, 'qr_ifsccode')}
                    className="px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition active:scale-95 shrink-0"
                  >
                    {copiedField === 'qr_ifsccode' ? <FiCheck size={14} /> : <FiCopy size={14} />}
                    <span>{copiedField === 'qr_ifsccode' ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowQrNoticeModal(false)}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 sm:py-3 px-4 rounded-xl text-xs shadow-md transition"
            >
              Understand & Proceed
            </button>
          </div>
        </div>
      )}
    </div>
  );

  if (isOpen !== undefined || onClose !== undefined) {
    if (!mounted) return null;
    return createPortal(
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6 bg-slate-950/70 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
        {modalContent}
      </div>,
      document.body
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8">
      {modalContent}
    </div>
  );
}

