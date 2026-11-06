import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { TEAM_MEMBERS } from '../data/mockData';

interface FooterProps {
  onNavClick: (tab: string) => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, onOpenContact }) => {
  return (
    <footer className="w-full bg-white border-t border-slate-200 mt-12 py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top: Brand & Simple Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#153931] flex items-center justify-center text-white">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-bold text-[#153931] block">
                Lost &amp; Found
              </span>
              <span className="text-xs text-slate-500 block">
                Campus Recovery Network
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600">
            <button
              onClick={() => onNavClick('dashboard')}
              className="hover:text-slate-900 transition-colors"
            >
              Dashboard
            </button>
            <span className="text-slate-300">·</span>
            <button
              onClick={() => onNavClick('inventory')}
              className="hover:text-slate-900 transition-colors"
            >
              Inventory
            </button>
            <span className="text-slate-300">·</span>
            <button
              onClick={() => onNavClick('about')}
              className="hover:text-slate-900 transition-colors"
            >
              About Us
            </button>
            <span className="text-slate-300">·</span>
            <button
              onClick={onOpenContact}
              className="px-3 py-1 bg-[#153931] text-white rounded-md hover:bg-[#0f2822] transition-colors font-medium"
            >
              Contact
            </button>
          </div>
        </div>

        {/* Development Team Credits (Clean, simple, professional) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-semibold text-slate-800">Development Team:</span>
            {TEAM_MEMBERS.map((member, idx) => (
              <span key={member.name} className="inline-flex items-center gap-1 text-slate-600">
                <span>{member.name}</span>
                <span className="text-slate-400">({member.role})</span>
                {idx < TEAM_MEMBERS.length - 1 && <span className="text-slate-300 ml-2">·</span>}
              </span>
            ))}
          </div>

          <p className="text-slate-400 text-xs shrink-0">
            © {new Date().getFullYear()} Lost &amp; Found. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};
