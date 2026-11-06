import React from 'react';

interface ItemVisualProps {
  itemId: string;
  title: string;
  imageUrl?: string;
  className?: string;
}

export const ItemVisual: React.FC<ItemVisualProps> = ({
  itemId,
  title,
  imageUrl,
  className = "w-full h-full"
}) => {
  // If user provided a custom uploaded photo (e.g. data:image/ or /src/assets/), show it
  if (imageUrl && (imageUrl.startsWith('data:') || imageUrl.startsWith('blob:') || imageUrl.includes('hero_campus') || imageUrl.includes('item_'))) {
    return (
      <img
        src={imageUrl}
        alt={title}
        className={`${className} object-cover`}
        referrerPolicy="no-referrer"
      />
    );
  }

  // Card 1: Boat Earbuds
  if (title.toLowerCase().includes('boat') || title.toLowerCase().includes('earbud')) {
    return (
      <div className={`${className} bg-[#f5f6f4] flex items-center justify-center p-4 relative overflow-hidden select-none`}>
        <svg viewBox="0 0 200 160" className="w-full h-full max-h-36 drop-shadow-md">
          <defs>
            <linearGradient id="earbudsCase" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#30353b" />
              <stop offset="50%" stopColor="#1e2226" />
              <stop offset="100%" stopColor="#121417" />
            </linearGradient>
            <linearGradient id="earbudsStem" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2c3036" />
              <stop offset="100%" stopColor="#14171a" />
            </linearGradient>
          </defs>

          {/* Cast Shadow */}
          <ellipse cx="100" cy="140" rx="60" ry="12" fill="#000000" opacity="0.12" />

          {/* Open Case Base */}
          <rect x="52" y="70" width="96" height="60" rx="28" fill="url(#earbudsCase)" />
          {/* Case Rim / Inner Bay */}
          <ellipse cx="100" cy="72" rx="42" ry="12" fill="#141619" stroke="#3d434a" strokeWidth="1" />
          
          {/* LED indicator */}
          <circle cx="100" cy="106" r="2.5" fill="#5eead4" />

          {/* Left Earbud in Bay */}
          <g transform="translate(74, 52)">
            <ellipse cx="12" cy="14" rx="10" ry="12" fill="url(#earbudsStem)" />
            <rect x="7" y="16" width="9" height="24" rx="4.5" fill="url(#earbudsStem)" />
            <circle cx="12" cy="12" r="3" fill="#3a4048" />
          </g>

          {/* Right Earbud in Bay */}
          <g transform="translate(104, 52)">
            <ellipse cx="12" cy="14" rx="10" ry="12" fill="url(#earbudsStem)" />
            <rect x="7" y="16" width="9" height="24" rx="4.5" fill="url(#earbudsStem)" />
            <circle cx="12" cy="12" r="3" fill="#3a4048" />
          </g>

          {/* Subtle boAt branding line */}
          <text x="100" y="122" fontSize="7" fill="#64748b" textAnchor="middle" fontWeight="700" letterSpacing="1">
            boAt
          </text>
        </svg>
      </div>
    );
  }

  // Card 2: Skybags Backpack
  if (title.toLowerCase().includes('backpack') || title.toLowerCase().includes('skybag')) {
    return (
      <div className={`${className} bg-[#f5f6f4] flex items-center justify-center p-3 relative overflow-hidden select-none`}>
        <svg viewBox="0 0 180 180" className="w-full h-full max-h-40 drop-shadow-md">
          <defs>
            <linearGradient id="packBlue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#224269" />
              <stop offset="60%" stopColor="#18314f" />
              <stop offset="100%" stopColor="#102237" />
            </linearGradient>
            <linearGradient id="packFront" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#294e7c" />
              <stop offset="100%" stopColor="#1c385b" />
            </linearGradient>
          </defs>

          {/* Ground Shadow */}
          <ellipse cx="90" cy="165" rx="55" ry="10" fill="#000000" opacity="0.1" />

          {/* Top Grab Handle */}
          <path d="M 75 35 Q 90 20 105 35" fill="none" stroke="#0e1b2b" strokeWidth="6" strokeLinecap="round" />

          {/* Main Pack Body */}
          <path
            d="M 50 155 L 45 65 Q 48 35 90 35 Q 132 35 135 65 L 130 155 Q 90 162 50 155 Z"
            fill="url(#packBlue)"
          />

          {/* Shoulder Straps Top Arc Peeking */}
          <path d="M 46 60 Q 32 85 45 125" fill="none" stroke="#132438" strokeWidth="8" strokeLinecap="round" />
          <path d="M 134 60 Q 148 85 135 125" fill="none" stroke="#132438" strokeWidth="8" strokeLinecap="round" />

          {/* Front Large Zipper Pocket */}
          <path
            d="M 55 95 Q 90 90 125 95 L 122 148 Q 90 155 58 148 Z"
            fill="url(#packFront)"
            stroke="#13263e"
            strokeWidth="1.5"
          />

          {/* Zipper Lines */}
          <path d="M 56 94 Q 90 89 124 94" fill="none" stroke="#3b689e" strokeWidth="1.5" strokeDasharray="3,2" />
          <path d="M 62 120 Q 90 117 118 120" fill="none" stroke="#3b689e" strokeWidth="1.5" strokeDasharray="3,2" />

          {/* Red Accent Tag / Puller */}
          <rect x="70" y="93" width="5" height="12" rx="1.5" fill="#e11d48" />

          {/* Skybags logo emblem */}
          <rect x="83" y="128" width="14" height="6" rx="1.5" fill="#f8fafc" opacity="0.85" />
        </svg>
      </div>
    );
  }

  // Card 3: Fastrack Watch
  if (title.toLowerCase().includes('watch') || title.toLowerCase().includes('fastrack')) {
    return (
      <div className={`${className} bg-[#f5f6f4] flex items-center justify-center p-3 relative overflow-hidden select-none`}>
        <svg viewBox="0 0 160 180" className="w-full h-full max-h-40 drop-shadow-md">
          <defs>
            <linearGradient id="watchBezel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="50%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
            <linearGradient id="watchDial" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#090d14" />
            </linearGradient>
            <linearGradient id="watchStrap" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1f242d" />
              <stop offset="50%" stopColor="#2c333f" />
              <stop offset="100%" stopColor="#181c23" />
            </linearGradient>
          </defs>

          {/* Ground Shadow */}
          <ellipse cx="80" cy="165" rx="35" ry="8" fill="#000000" opacity="0.1" />

          {/* Top Strap */}
          <rect x="66" y="12" width="28" height="45" rx="4" fill="url(#watchStrap)" />
          <line x1="69" y1="15" x2="69" y2="55" stroke="#475569" strokeWidth="1" strokeDasharray="2,2" />
          <line x1="91" y1="15" x2="91" y2="55" stroke="#475569" strokeWidth="1" strokeDasharray="2,2" />

          {/* Bottom Strap */}
          <rect x="66" y="120" width="28" height="48" rx="4" fill="url(#watchStrap)" />
          <line x1="69" y1="122" x2="69" y2="162" stroke="#475569" strokeWidth="1" strokeDasharray="2,2" />
          <line x1="91" y1="122" x2="91" y2="162" stroke="#475569" strokeWidth="1" strokeDasharray="2,2" />

          {/* Metallic Case Bezel */}
          <circle cx="80" cy="90" r="42" fill="url(#watchBezel)" stroke="#334155" strokeWidth="1" />
          
          {/* Side Crown Button */}
          <rect x="122" y="86" width="5" height="8" rx="1.5" fill="#94a3b8" />

          {/* Dark Dial */}
          <circle cx="80" cy="90" r="35" fill="url(#watchDial)" />

          {/* Dial Hour Markers */}
          <g stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round">
            <line x1="80" y1="60" x2="80" y2="65" />
            <line x1="80" y1="115" x2="80" y2="120" />
            <line x1="50" y1="90" x2="55" y2="90" />
            <line x1="105" y1="90" x2="110" y2="90" />
          </g>

          {/* Watch Hands */}
          <line x1="80" y1="90" x2="96" y2="82" stroke="#f8fafc" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="80" y1="90" x2="80" y2="68" stroke="#f8fafc" strokeWidth="2" strokeLinecap="round" />
          <line x1="80" y1="90" x2="68" y2="104" stroke="#f43f5e" strokeWidth="1" strokeLinecap="round" />
          <circle cx="80" cy="90" r="2.5" fill="#f43f5e" />

          {/* Subdial / Fastrack Logo */}
          <text x="80" y="79" fontSize="5" fill="#94a3b8" textAnchor="middle" fontWeight="700">
            FASTRACK
          </text>
        </svg>
      </div>
    );
  }

  // Card 4: Hydro Flask Bottle
  if (title.toLowerCase().includes('bottle') || title.toLowerCase().includes('hydro flask')) {
    return (
      <div className={`${className} bg-[#f5f6f4] flex items-center justify-center p-3 relative overflow-hidden select-none`}>
        <svg viewBox="0 0 140 180" className="w-full h-full max-h-40 drop-shadow-md">
          <defs>
            <linearGradient id="flaskBody" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="45%" stopColor="#f8fafc" />
              <stop offset="85%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>
            <linearGradient id="flaskCap" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>

          {/* Ground Shadow */}
          <ellipse cx="70" cy="168" rx="28" ry="7" fill="#000000" opacity="0.1" />

          {/* Flex Cap Loop */}
          <path
            d="M 58 24 Q 52 10 70 10 Q 88 10 82 24"
            fill="none"
            stroke="url(#flaskCap)"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Cap Base */}
          <rect x="54" y="24" width="32" height="14" rx="3" fill="url(#flaskCap)" />
          {/* Cap Ribbing */}
          <line x1="58" y1="26" x2="58" y2="36" stroke="#475569" strokeWidth="1" />
          <line x1="64" y1="26" x2="64" y2="36" stroke="#475569" strokeWidth="1" />
          <line x1="70" y1="26" x2="70" y2="36" stroke="#475569" strokeWidth="1" />
          <line x1="76" y1="26" x2="76" y2="36" stroke="#475569" strokeWidth="1" />
          <line x1="82" y1="26" x2="82" y2="36" stroke="#475569" strokeWidth="1" />

          {/* Stainless Steel Neck Rim */}
          <rect x="56" y="38" width="28" height="6" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="0.5" />

          {/* Bottle Main Cylinder */}
          <rect x="46" y="44" width="48" height="120" rx="8" fill="url(#flaskBody)" />

          {/* Subtle Hydro Flask Silhouette Logo */}
          <g transform="translate(64, 88)" fill="#64748b" opacity="0.75">
            <circle cx="6" cy="3" r="2.5" />
            <path d="M 6 7 C 3 9 2 13 6 15 C 10 13 9 9 6 7 Z" />
          </g>

          <text x="70" y="112" fontSize="5.5" fill="#64748b" textAnchor="middle" fontWeight="700" letterSpacing="0.5">
            Hydro Flask
          </text>
        </svg>
      </div>
    );
  }

  // Generic fallback if none matched
  return (
    <div className={`${className} bg-[#f5f6f4] flex items-center justify-center p-4 text-slate-400`}>
      <div className="w-12 h-12 rounded-full bg-slate-200/60 flex items-center justify-center text-slate-500 font-bold text-xs uppercase">
        {title.slice(0, 2)}
      </div>
    </div>
  );
};
