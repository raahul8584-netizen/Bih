'use client';

import React from 'react';
import { FiVolume2, FiPlay, FiTv } from 'react-icons/fi';

export default function PromoVideo() {
  return (
    <section className="relative bg-[#0F172A] py-20 overflow-hidden border-t border-b border-white/[0.05]">
      {/* Subtle background ambient glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[350px] h-[350px] bg-[#FF9900]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Text: Slogan, Title and Badge */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
              <FiTv className="text-[#FF9900] w-3.5 h-3.5" />
              <span className="text-[10px] font-bold text-[#FF9900] uppercase tracking-[0.25em]">
                Featured Media
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
              Experience the Future of <br />
              <span className="text-[#FF9900]">
                Smart Operations
              </span>
            </h2>

            <p className="text-slate-200 font-light text-sm sm:text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
              Watch our official advertisement and walk through the smart warehouse hubs, real-time routing engines, and delivery partner models that drive the Adsp logistics network.
            </p>

            {/* Premium feature chips */}
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0 pt-4">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/10 transition-colors">
                <FiVolume2 className="text-[#FF9900] w-4.5 h-4.5" />
                <div>
                  <h4 className="text-white text-xs font-bold">Voice Over ON</h4>
                  <p className="text-[10px] text-slate-300">Turn on sound to listen</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/10 transition-colors">
                <FiPlay className="text-blue-400 w-4.5 h-4.5" />
                <div>
                  <h4 className="text-white text-xs font-bold">Official Tour</h4>
                  <p className="text-[10px] text-slate-300">Full operations showcase</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Video Player: Extremely refined custom layout */}
          <div className="lg:col-span-7">
            <div className="relative group">
              {/* Dual neon outline glow effects */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#FF9900] via-blue-500 to-[#FF9900] rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition duration-700" />

              {/* Outer border wrapper */}
              <div className="relative bg-slate-900 rounded-[22px] overflow-hidden p-2 border border-white/10 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.6)]">

                {/* Simulated Glass Browser Header */}
                <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.06] mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-slate-300">
                    LogissHub_Last_Mile_Solutions{" "}
                    <span className="text-slate-500 mx-1 normal-case tracking-normal">
                      by
                    </span>
                    <span className="text-[#FF9900] font-bold tracking-normal">
                      Adsp
                    </span>
                  </div>
                  <div className="w-10" />
                </div>

                {/* Video Component */}
                <div className="relative aspect-video rounded-xl overflow-hidden bg-black/60 group-hover:shadow-[0_0_20px_rgba(255,153,0,0.1)] transition-all">
                  <video
                    className="w-full h-full object-cover"
                    controls
                    preload="metadata"
                    playsInline
                  >
                    <source src="/assets/🎬_LOGISSHUB_PREMIUM_ADVERTISE.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
