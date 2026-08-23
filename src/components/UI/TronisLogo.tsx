import React from 'react';

interface TronisLogoProps {
  className?: string;
  light?: boolean;
}

export default function TronisLogo({ className = "", light = false }: TronisLogoProps) {
  // Determine text color based on light/dark backgrounds (default to light text for dark mode theme)
  const adspColor = light ? "#0B0F19" : "#FFFFFF"; 
  const hubColor = "#f97316"; // Bright Orange
  const separatorColor = light ? "rgba(11, 15, 25, 0.2)" : "rgba(255, 255, 255, 0.2)";
  const taglineColor = light ? "#475569" : "#94a3b8";

  return (
    <div className={`flex items-center select-none ${className}`}>
      <svg
        width="280"
        height="64"
        viewBox="0 0 280 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-auto h-12 lg:h-14"
      >
        {/* ========================================================
            SYMBOL (SPEED TRUCK WITH MOTION TRAILS & SWOOSHES)
           ======================================================== */}
        
        {/* Top Swoosh (Blue) */}
        <path
          d="M 12,24 C 22,8 55,8 68,23"
          stroke="#2563eb"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Bottom Swoosh (Orange) */}
        <path
          d="M 18,48 C 28,60 62,60 72,46"
          stroke="#f97316"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Speed Motion Trails (Horizontal Streaks) */}
        <path d="M 8,30 L 26,30" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
        <path d="M 4,35 L 30,35" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
        <path d="M 2,40 L 28,40" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
        <path d="M 7,45 L 22,45" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />

        {/* Truck Cargo Box */}
        <path
          d="M 28,26 H 58 V 46 H 28 Z"
          fill={light ? "#0B0F19" : "#FFFFFF"}
        />

        {/* Truck Driver Cab */}
        <path
          d="M 58,32 H 66 L 73,38 V 46 H 58 Z"
          fill={light ? "#0B0F19" : "#FFFFFF"}
        />

        {/* Cab Window Cutout */}
        <path
          d="M 60,34 H 65 L 69,38 H 60 Z"
          fill={light ? "#FFFFFF" : "#0B0F19"}
        />

        {/* Front Wheel Outer */}
        <circle cx="38" cy="46" r="6" fill={light ? "#0B0F19" : "#FFFFFF"} />
        {/* Front Wheel Inner */}
        <circle cx="38" cy="46" r="2.5" fill={light ? "#FFFFFF" : "#0B0F19"} />

        {/* Rear Wheel Outer */}
        <circle cx="64" cy="46" r="6" fill={light ? "#0B0F19" : "#FFFFFF"} />
        {/* Rear Wheel Inner */}
        <circle cx="64" cy="46" r="2.5" fill={light ? "#FFFFFF" : "#0B0F19"} />

        {/* ========================================================
            SEPARATOR LINE
           ======================================================== */}
        <line
          x1="84"
          y1="12"
          x2="84"
          y2="52"
          stroke={separatorColor}
          strokeWidth="1.5"
        />

        {/* ========================================================
            TEXT BRANDING ("ADSPHUB" & TAGLINE)
           ======================================================== */}
        
        {/* "ADSP" Text */}
        <text
          x="94"
          y="35"
          fill={adspColor}
          fontSize="24"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="-0.02em"
        >
          ADSP
        </text>

        {/* "HUB" Text */}
        <text
          x="162"
          y="35"
          fill={hubColor}
          fontSize="24"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="-0.02em"
        >
          HUB
        </text>

        {/* Tagline: "LOGISTICS SIMPLIFIED, DELIVERY AMPLIFIED" */}
        <text
          x="94"
          y="48"
          fill={taglineColor}
          fontSize="6.8"
          fontWeight="800"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="0.04em"
        >
          LOGISTICS SIMPLIFIED, DELIVERY AMPLIFIED
        </text>
      </svg>
    </div>
  );
}

