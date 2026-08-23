'use client';

import Script from 'next/script';
import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    grecaptcha: any;
    onloadCallback?: () => void;
  }
}

interface ReCAPTCHAProps {
  sitekey: string;
  onChange: (token: string | null) => void;
}

export default function ReCAPTCHA({ sitekey, onChange }: ReCAPTCHAProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);

  useEffect(() => {
    const renderRecaptcha = () => {
      if (window.grecaptcha && containerRef.current && widgetIdRef.current === null) {
        try {
          const widgetId = window.grecaptcha.render(containerRef.current, {
            sitekey: sitekey,
            callback: (token: string) => onChange(token),
            'expired-callback': () => onChange(null),
            'error-callback': () => onChange(null),
            theme: 'light',
          });
          widgetIdRef.current = widgetId;
        } catch (error) {
          console.error('Error rendering reCAPTCHA:', error);
        }
      }
    };

    if (window.grecaptcha && typeof window.grecaptcha.render === 'function') {
      renderRecaptcha();
    } else {
      window.onloadCallback = () => {
        renderRecaptcha();
      };
      
      const interval = setInterval(() => {
        if (window.grecaptcha && typeof window.grecaptcha.render === 'function') {
          renderRecaptcha();
          clearInterval(interval);
        }
      }, 300);
      
      return () => {
        clearInterval(interval);
      };
    }
  }, [sitekey, onChange]);

  return (
    <div className="flex flex-col items-center justify-center my-4">
      <Script
        src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit"
        strategy="afterInteractive"
      />
      <div ref={containerRef} className="g-recaptcha" />
    </div>
  );
}
