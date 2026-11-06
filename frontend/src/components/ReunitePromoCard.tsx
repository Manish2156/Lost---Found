import React from 'react';
import { Handshake } from 'lucide-react';

interface ReunitePromoCardProps {
  onGetStarted: () => void;
}

export const ReunitePromoCard: React.FC<ReunitePromoCardProps> = ({ onGetStarted }) => {
  return (
    <article className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-[#dff0d8] via-[#d2e8ca] to-[#c1dfb7] border border-[#bedbb2] p-5 flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-[#153931]/10 hover:-translate-y-1.5 transition-all duration-300 select-none group">
      
      {/* Background Soft Organic Radial & Waves */}
      <div className="absolute inset-0 pointer-events-none opacity-45 overflow-hidden">
        <svg viewBox="0 0 200 200" className="w-full h-full" preserveAspectRatio="none">
          <path d="M 0 100 Q 50 60 100 120 T 200 100 L 200 200 L 0 200 Z" fill="#b8d9aa" />
          <path d="M 0 140 Q 60 110 120 160 T 200 130 L 200 200 L 0 200 Z" fill="#a5cd95" opacity="0.5" />
        </svg>
      </div>

      <div className="relative z-10 space-y-3">
        {/* Handshake Icon Container */}
        <div className="w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-xs border border-white/80 flex items-center justify-center text-[#153931] shadow-xs group-hover:scale-105 transition-transform duration-200">
          <Handshake className="w-6 h-6 stroke-[1.85]" />
        </div>

        <div className="space-y-1">
          <div className="text-[10px] font-bold text-[#2d6153] uppercase tracking-wider">
            <span>Student Support</span>
          </div>
          <h3 className="text-lg font-bold text-[#0f2822] font-display leading-tight">
            Campus Return Assistance
          </h3>
          <p className="text-xs text-[#3f655a] font-medium">
            Report, search, and safely recover items.
          </p>
        </div>
      </div>

      <div className="relative z-10 pt-4">
        <button
          onClick={onGetStarted}
          className="w-full sm:w-auto px-5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#153931] via-[#1a4a40] to-[#225f52] hover:from-[#0e2722] hover:to-[#17483d] rounded-full transition-all duration-200 flex items-center justify-center gap-1.5 shadow-md shadow-[#153931]/20 group-hover:shadow-lg group-hover:shadow-[#153931]/30 group-hover:scale-[1.02]"
        >
          <span>Get Started</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>

    </article>
  );
};
