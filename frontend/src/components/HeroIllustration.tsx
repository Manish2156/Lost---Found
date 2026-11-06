import React from 'react';

export const HeroIllustration: React.FC = () => {
  return (
    <div className="relative w-full aspect-[4/3] max-w-[540px] mx-auto flex items-center justify-center select-none py-2">
      
      {/* Dynamic Ambient Gradient Glow Background */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
        {/* Outer soft ambient halo */}
        <div className="w-[390px] h-[390px] rounded-full bg-gradient-to-tr from-[#c8e6d9]/60 via-[#e0f0e6]/70 to-[#d0ebd8]/50 blur-3xl opacity-80 animate-pulse duration-[4000ms]" />
        {/* Inner emerald radial glow */}
        <div className="absolute w-[250px] h-[250px] rounded-full bg-gradient-to-r from-[#2a6859]/20 to-[#3b8c78]/20 blur-2xl" />
      </div>

      {/* Pulsing Concentric Ripple Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[330px] h-[330px] rounded-full border border-[#2d6f5f]/10 animate-[ping_6s_cubic-bezier(0,0,0.2,1)_infinite]" />
        <div className="w-[260px] h-[260px] rounded-full border border-[#2d6f5f]/15" />
        <div className="w-[190px] h-[190px] rounded-full border border-[#2d6f5f]/20 border-dashed animate-[spin_40s_linear_infinite]" />
      </div>

      {/* Main SVG Scene */}
      <svg viewBox="0 0 540 440" className="w-full h-full drop-shadow-2xl overflow-visible">
        <defs>
          {/* Logo Main Body Gradients */}
          <linearGradient id="logoBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#255a4e" />
            <stop offset="40%" stopColor="#153931" />
            <stop offset="85%" stopColor="#0d2822" />
            <stop offset="100%" stopColor="#071b17" />
          </linearGradient>

          <linearGradient id="logoRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#63bda9" />
            <stop offset="50%" stopColor="#2e7062" />
            <stop offset="100%" stopColor="#10322b" />
          </linearGradient>

          <linearGradient id="logoInnerAperture" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#f0f7f2" />
            <stop offset="100%" stopColor="#dcece2" />
          </linearGradient>

          {/* Curved Search Loop Gradients */}
          <linearGradient id="searchLoopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3d8776" />
            <stop offset="60%" stopColor="#1a453b" />
            <stop offset="100%" stopColor="#0d2923" />
          </linearGradient>

          {/* Floating Card Shadows */}
          <filter id="heroTileShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#0e2a24" floodOpacity="0.12" />
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0e2a24" floodOpacity="0.08" />
          </filter>

          <filter id="logoCenterShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="16" stdDeviation="16" floodColor="#061814" floodOpacity="0.25" />
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#061814" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* --- DYNAMIC SUNBURST RAYS (Top Right) --- */}
        <g stroke="#f5be42" strokeWidth="4.5" strokeLinecap="round" className="animate-pulse duration-1000">
          <line x1="445" y1="70" x2="455" y2="88" />
          <line x1="468" y1="82" x2="488" y2="106" />
          <line x1="480" y1="108" x2="498" y2="116" />
        </g>

        {/* --- 4 GOLDEN SPARKLES --- */}
        <g fill="#f5be42" className="animate-bounce duration-[3000ms]">
          <path d="M 120 70 Q 120 80 130 80 Q 120 80 120 90 Q 120 80 110 80 Q 120 80 120 70 Z" />
          <path d="M 430 310 Q 430 318 438 318 Q 430 318 430 326 Q 430 318 422 318 Q 430 318 430 310 Z" />
        </g>

        {/* --- CENTRAL HERO EMBLEM: THE ORIGINAL LOGO FROM REFERENCE --- */}
        <g filter="url(#logoCenterShadow)" transform="translate(270, 215)" className="animate-float-slow">
          
          {/* Outer Curved Magnifying Base Arc from the original logo */}
          <path
            d="M -75 90 C -30 115 35 115 80 85 C 95 75 105 60 102 45 C 99 30 82 25 68 35 C 30 60 -25 60 -65 40 Z"
            fill="url(#searchLoopGrad)"
            opacity="0.9"
          />

          {/* Dynamic Ground Shadow below Pin */}
          <ellipse cx="0" cy="115" rx="75" ry="16" fill="#0c241f" opacity="0.2" />

          {/* MAIN PIN HEAD & BODY (The signature teardrop location pin) */}
          <path
            d="M 0 -115 C 66 -115 108 -68 108 0 C 108 55 45 105 6 126 C 2 128 -2 128 -6 126 C -45 105 -108 55 -108 0 C -108 -68 -66 -115 0 -115 Z"
            fill="url(#logoBodyGrad)"
            stroke="url(#logoRimGrad)"
            strokeWidth="3.5"
          />

          {/* Pin Top Metallic Highlight Rim */}
          <path
            d="M -75 -40 C -55 -95 0 -105 65 -75"
            fill="none"
            stroke="#6ce5cc"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.45"
          />

          {/* Center Aperture Hole (Matches white circle inside pin from reference logo) */}
          <circle
            cx="0"
            cy="-18"
            r="44"
            fill="url(#logoInnerAperture)"
            stroke="#174339"
            strokeWidth="3"
          />

          {/* Inner Search Glass Ring Effect inside Aperture */}
          <circle
            cx="0"
            cy="-18"
            r="38"
            fill="none"
            stroke="#a3d9cb"
            strokeWidth="2.5"
            opacity="0.7"
          />

          {/* Glass Specular Reflection Crescent */}
          <path
            d="M -24 -36 A 32 32 0 0 1 24 -36"
            fill="none"
            stroke="#ffffff"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.95"
          />

          {/* Subtle center magnifying crosshair / target motif */}
          <circle cx="0" cy="-18" r="7" fill="#153931" opacity="0.85" />
          <circle cx="0" cy="-18" r="3" fill="#ffffff" />
        </g>

        {/* --- FLOATING TILES FROM REFERENCE SCREENSHOT WITH HOVER & GLOW --- */}
        
        {/* 1. BLUE WALLET TILE (Top Left) */}
        <g transform="translate(75, 95)" filter="url(#heroTileShadow)" className="cursor-pointer group animate-float-delayed hover:scale-110 transition-transform">
          <rect x="0" y="0" width="70" height="70" rx="22" fill="#ffffff" stroke="#e3ece1" strokeWidth="1.5" />
          <rect x="1.5" y="1.5" width="67" height="67" rx="20.5" fill="url(#logoInnerAperture)" opacity="0.5" />
          
          {/* Blue Wallet Graphic */}
          <g transform="translate(16, 19)">
            <rect x="0" y="6" width="38" height="25" rx="5" fill="#326ea2" />
            <rect x="5" y="1" width="28" height="7" rx="2.5" fill="#589bd1" />
            <path d="M 22 13 H 38 V 24 H 22 A 5 5 0 0 1 22 13 Z" fill="#204f77" />
            <circle cx="30" cy="18.5" r="2.5" fill="#ffd166" />
          </g>
        </g>

        {/* 2. UMBRELLA TILE (Bottom Left) */}
        <g transform="translate(55, 235)" filter="url(#heroTileShadow)" className="cursor-pointer group animate-float-reverse hover:scale-110 transition-transform">
          <rect x="0" y="0" width="66" height="66" rx="20" fill="#ffffff" stroke="#e3ece1" strokeWidth="1.5" />
          <rect x="1.5" y="1.5" width="63" height="63" rx="18.5" fill="url(#logoInnerAperture)" opacity="0.5" />

          {/* Blue Umbrella Graphic */}
          <g transform="translate(15, 17)">
            <path
              d="M 1 18 C 1 7 35 7 35 18 C 30 16 25 18 20 16 C 15 18 7 16 1 18 Z"
              fill="#3474a8"
            />
            <path d="M 18 7 V 29 A 4 4 0 0 0 26 29" fill="none" stroke="#1d486d" strokeWidth="3" strokeLinecap="round" />
            <line x1="18" y1="3" x2="18" y2="7" stroke="#1d486d" strokeWidth="3" strokeLinecap="round" />
          </g>
        </g>

        {/* 3. HEADPHONES TILE (Top Right) */}
        <g transform="translate(415, 125)" filter="url(#heroTileShadow)" className="cursor-pointer group animate-float-slow hover:scale-110 transition-transform">
          <rect x="0" y="0" width="68" height="68" rx="20" fill="#ffffff" stroke="#e3ece1" strokeWidth="1.5" />
          <rect x="1.5" y="1.5" width="65" height="65" rx="18.5" fill="url(#logoInnerAperture)" opacity="0.5" />

          {/* Blue Headphones Graphic */}
          <g transform="translate(16, 17)">
            <path
              d="M 5 24 A 13 13 0 0 1 31 24"
              fill="none"
              stroke="#2d6ea5"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <rect x="2" y="19" width="7" height="13" rx="3" fill="#1b476e" />
            <rect x="27" y="19" width="7" height="13" rx="3" fill="#1b476e" />
          </g>
        </g>

        {/* 4. SMARTPHONE TILE (Bottom Right) */}
        <g transform="translate(425, 255)" filter="url(#heroTileShadow)" className="cursor-pointer group animate-float-delayed hover:scale-110 transition-transform">
          <rect x="0" y="0" width="66" height="66" rx="20" fill="#ffffff" stroke="#e3ece1" strokeWidth="1.5" />
          <rect x="1.5" y="1.5" width="63" height="63" rx="18.5" fill="url(#logoInnerAperture)" opacity="0.5" />

          {/* Smartphone Graphic */}
          <g transform="translate(20, 14)">
            <rect x="0" y="0" width="26" height="38" rx="5" fill="#326c99" />
            <rect x="2.5" y="4" width="21" height="26" rx="2" fill="#eaf3fb" />
            <circle cx="13" cy="34" r="2" fill="#ffffff" />
          </g>
        </g>

      </svg>
    </div>
  );
};
