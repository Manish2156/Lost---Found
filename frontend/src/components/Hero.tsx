import React from 'react';
import { Search, Plus, Send, PackageSearch, Handshake } from 'lucide-react';
import { HeroIllustration } from './HeroIllustration';

interface HeroProps {
  onOpenReport: (type: 'lost') => void;
  onBrowseClick: () => void;
  onSearchClick: () => void;
  onMakeADifferenceClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenReport,
  onBrowseClick,
  onSearchClick,
  onMakeADifferenceClick
}) => {
  return (
    <section className="relative w-full pt-4 pb-10 overflow-hidden">
      
      {/* Dynamic Background Gradient Mesh */}
      <div className="absolute inset-0 -z-20 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-[#dcecd8]/50 via-[#eaf4e6]/40 to-transparent blur-3xl" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-[#d5ebd9]/60 via-[#e4f3e6]/40 to-transparent blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 w-[600px] h-[400px] rounded-full bg-gradient-to-t from-[#e9f4e6]/50 to-transparent blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        
        {/* Main Hero 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-2">
          
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Top Pill Badge with Gradient Border & Shimmer */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#e3eedc] to-[#d8e9d0] border border-[#c6dfbc] text-[#1c473c] text-xs font-semibold tracking-wide shadow-2xs hover:shadow-xs transition-shadow">
              <span className="text-amber-500 animate-spin-slow text-xs">✦</span>
              <span>A Helping Hand, Always</span>
            </div>

            {/* Headline with Gradient Text */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl lg:text-[3.65rem] font-extrabold text-[#11201d] font-display tracking-tight leading-[1.12]">
                Lost Something? <br />
                <span className="bg-gradient-to-r from-[#153931] via-[#1d5c4e] to-[#2b7e6c] bg-clip-text text-transparent">
                  Find It Here!
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#526b64] max-w-lg leading-relaxed">
              Our Lost and Found platform helps you report, find and return lost items easily and safely.
            </p>

            {/* Action Buttons with Gradient & Lift Hover Animations */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              {/* Browse Items Button */}
              <button
                onClick={onBrowseClick}
                className="px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#153931] via-[#1a4a40] to-[#236053] hover:from-[#102d27] hover:to-[#1a473e] active:scale-[0.98] rounded-full transition-all duration-200 flex items-center gap-2 shadow-md shadow-[#153931]/25 hover:shadow-lg hover:shadow-[#153931]/35 hover:-translate-y-0.5 group"
              >
                <Search className="w-4 h-4 text-[#9fe0d2] group-hover:scale-110 transition-transform" />
                <span>Browse Items</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>

              {/* + Report Item Button */}
              <button
                onClick={() => onOpenReport('lost')}
                className="px-6 py-3 text-xs sm:text-sm font-semibold text-[#153931] bg-white hover:bg-[#f3f9f0] border-2 border-[#153931]/80 hover:border-[#153931] active:scale-[0.98] rounded-full transition-all duration-200 flex items-center gap-1.5 shadow-2xs hover:shadow-md hover:-translate-y-0.5"
              >
                <Plus className="w-4 h-4 text-[#153931]" />
                <span>Report Item</span>
              </button>
            </div>

          </div>

          {/* Right Column: Hero Visual featuring Original Logo with Glowing Gradients & Floating Tiles */}
          <div className="lg:col-span-6 flex justify-center">
            <HeroIllustration />
          </div>

        </div>

        {/* 4-Feature Action Strip with Subtle Gradients & Hover Micro-Interactions */}
        <div className="bg-gradient-to-b from-white to-[#fafcf8] rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-[#dfe8da] p-3 sm:p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#e8eee4]">
            
            {/* 1. Search Items */}
            <button
              onClick={onSearchClick}
              className="p-3.5 sm:px-4 sm:py-2.5 text-left flex items-center gap-3.5 hover:bg-gradient-to-r hover:from-[#f3f8f1] hover:to-transparent rounded-2xl transition-all duration-200 group cursor-pointer hover:translate-x-0.5"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#e1f3ed] to-[#d2ede3] text-[#1b5b4f] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:shadow-xs transition-all">
                <Search className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-[#142d27] font-display group-hover:text-[#153931]">
                  Search Items
                </h4>
                <p className="text-xs text-[#627a72] truncate">
                  Find lost items near you
                </p>
              </div>
            </button>

            {/* 2. Report Lost */}
            <button
              onClick={() => onOpenReport('lost')}
              className="p-3.5 sm:px-4 sm:py-2.5 text-left flex items-center gap-3.5 hover:bg-gradient-to-r hover:from-[#f0f5fc] hover:to-transparent rounded-2xl transition-all duration-200 group cursor-pointer hover:translate-x-0.5"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#e4f0fc] to-[#d1e6f9] text-[#246296] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:shadow-xs transition-all">
                <Send className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-[#142d27] font-display group-hover:text-[#246296]">
                  Report Lost
                </h4>
                <p className="text-xs text-[#627a72] truncate">
                  Let others know what you lost
                </p>
              </div>
            </button>

            {/* 3. Report Found */}
            <button
              onClick={() => onOpenReport('found')}
              className="p-3.5 sm:px-4 sm:py-2.5 text-left flex items-center gap-3.5 hover:bg-gradient-to-r hover:from-[#eef6fa] hover:to-transparent rounded-2xl transition-all duration-200 group cursor-pointer hover:translate-x-0.5"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#e4f2fa] to-[#d3eaf6] text-[#215a88] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:shadow-xs transition-all">
                <Package className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-[#142d27] font-display group-hover:text-[#215a88]">
                  Report Found
                </h4>
                <p className="text-xs text-[#627a72] truncate">
                  Help someone get their item back
                </p>
              </div>
            </button>

            {/* 4. Make a Difference */}
            <button
              onClick={onMakeADifferenceClick}
              className="p-3.5 sm:px-4 sm:py-2.5 text-left flex items-center gap-3.5 hover:bg-gradient-to-r hover:from-[#edf4fb] hover:to-transparent rounded-2xl transition-all duration-200 group cursor-pointer hover:translate-x-0.5"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#e6f1fb] to-[#d4e6f8] text-[#255c8c] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:shadow-xs transition-all">
                <Handshake className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-[#142d27] font-display group-hover:text-[#255c8c]">
                  Make a Difference
                </h4>
                <p className="text-xs text-[#627a72] truncate">
                  Be a part of our community
                </p>
              </div>
            </button>

          </div>
        </div>

      </div>
    </section>
  );
};
