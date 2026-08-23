"use client";
import { useEffect, useState } from "react";
import "./LogoLoader.css";
interface LogoLoaderProps {
  forceShow?: boolean;
}

export default function LogoLoader({ forceShow = false }: LogoLoaderProps) {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (forceShow) return;
    const timer = setTimeout(() => {
      setHide(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, [forceShow]);

  if (!forceShow && hide) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden">

      <div className="absolute w-[450px] h-[450px] bg-orange-500/20 blur-[120px] rounded-full animate-pulse" />

      <div className="relative logo-wrapper">

        <img
          src="/logo/whitelogo.png"
          className="w-[330px] md:w-[430px] animate-logo"
          alt="LogissHub"
        />

        <span className="shine"></span>

      </div>

      <div className="flex mt-10 gap-2">
        <span className="dot"></span>
        <span className="dot delay-200"></span>
        <span className="dot delay-500"></span>
      </div>

    </div>
  );
}