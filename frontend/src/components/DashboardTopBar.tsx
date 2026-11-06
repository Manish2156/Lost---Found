import React from 'react';
import { Search, Bell, ChevronDown, User, Calendar } from 'lucide-react';

interface DashboardTopBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenSearch: () => void;
}

export const DashboardTopBar: React.FC<DashboardTopBarProps> = ({
  searchQuery,
  setSearchQuery,
  onOpenSearch
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4">
      
      {/* Top Left Profile Icon */}
      <div className="flex items-center gap-3 p-1.5 -ml-1.5">
        <div className="w-10 h-10 rounded-full bg-[#153931] text-white flex items-center justify-center font-bold text-sm shadow-xs border-2 border-white">
          <User className="w-5 h-5 text-white" />
        </div>
        <div>
          <span className="text-sm font-bold text-[#142d27] block">
            Student Profile
          </span>
          <span className="text-xs text-slate-500 block">
            Campus Member
          </span>
        </div>
      </div>

      {/* Right Controls: Search, Notification Bell, Date & Timeframe Dropdown */}
      <div className="flex flex-wrap items-center gap-3">
        
        {/* Search Bar */}
        <div className="relative flex items-center min-w-[220px] sm:min-w-[260px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={onOpenSearch}
            placeholder="Search items, tags, places..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-[#dce6d5] rounded-full text-xs text-[#153931] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#153931]/20 focus:border-[#153931] shadow-2xs"
          />
        </div>

        {/* Notification Bell */}
        <button
          onClick={onOpenSearch}
          className="relative w-9 h-9 rounded-full bg-white border border-[#dce6d5] flex items-center justify-center text-[#153931] hover:bg-[#f6f9f3] transition-colors shadow-2xs"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#c2eb8c] text-[#112923] text-[9px] font-bold flex items-center justify-center border border-white">
            2
          </span>
        </button>

        {/* Date Display */}
        <div className="hidden xl:flex items-center gap-1.5 text-xs text-slate-400 font-medium px-2">
          <Calendar className="w-3.5 h-3.5" />
          <span>12 Nov, 2026</span>
        </div>

        {/* Timeframe Selector Pill */}
        <div className="flex items-center gap-2 px-3.5 py-2 bg-white border border-[#dce6d5] rounded-full text-xs font-semibold text-[#153931] shadow-2xs">
          <span>Campus Live</span>
        </div>

      </div>

    </div>
  );
};
