import React, { useState } from 'react';
import { 
  Home, 
  PackageSearch, 
  FileText, 
  Info, 
  Search, 
  User, 
  Menu, 
  X,
  ShieldCheck
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenReport: (type: 'lost') => void;
  onOpenSearch: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenReport,
  onOpenSearch,
  onOpenContact
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full px-4 sm:px-8 py-3 bg-[#f6f8f2]/95 backdrop-blur-md transition-all border-b border-[#e5edd0]/80 shadow-2xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* LEFT: Logo & Profile Icon */}
        <div className="flex items-center gap-3">
          {/* Profile Icon (Top Left as requested, no login/signup function) */}
          <div 
            className="w-9 h-9 rounded-full bg-[#153931] text-white flex items-center justify-center shrink-0 shadow-2xs cursor-default"
            title="User Profile"
          >
            <User className="w-4 h-4" />
          </div>

          <button
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2 text-left focus:outline-none rounded-xl transition-transform hover:scale-[1.01]"
          >
            <div className="w-8 h-8 rounded-lg bg-[#153931] flex items-center justify-center shrink-0 text-white">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-sm font-bold text-[#153931] font-display leading-tight">
                Lost &amp; Found
              </span>
              <span className="block text-[10px] text-slate-500 font-medium">
                Campus Network
              </span>
            </div>
          </button>
        </div>

        {/* CENTER NAVIGATION PILLS: Dashboard, Inventory, Report Lost, About Us, Contact Button */}
        <nav className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white/80 backdrop-blur-xs p-1.5 rounded-full border border-slate-200/80 shadow-2xs">
          {/* Dashboard */}
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-colors ${
              activeTab === 'dashboard'
                ? 'bg-[#153931] text-white font-semibold'
                : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>

          {/* Inventory */}
          <button
            onClick={() => setActiveTab('inventory')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-colors ${
              activeTab === 'inventory'
                ? 'bg-[#153931] text-white font-semibold'
                : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <PackageSearch className="w-3.5 h-3.5" />
            <span>Inventory</span>
          </button>

          {/* Report Lost */}
          <button
            onClick={() => onOpenReport('lost')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Report Lost</span>
          </button>

          {/* About Us */}
          <button
            onClick={() => setActiveTab('about')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-colors ${
              activeTab === 'about'
                ? 'bg-[#153931] text-white font-semibold'
                : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>About Us</span>
          </button>

          {/* Contact (Simple button as requested) */}
          <button
            onClick={onOpenContact}
            className="px-3.5 py-1.5 rounded-full bg-[#153931] text-white hover:bg-[#0f2822] transition-colors font-medium shadow-2xs"
          >
            Contact
          </button>
        </nav>

        {/* RIGHT: Search Action */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSearch}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
            title="Search items"
            aria-label="Search items"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-lg space-y-2 animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-1 text-xs font-medium text-slate-700">
            <button
              onClick={() => {
                setActiveTab('dashboard');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 text-left"
            >
              <Home className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('inventory');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 text-left"
            >
              <PackageSearch className="w-4 h-4" />
              <span>Inventory</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReport('lost');
              }}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 text-left"
            >
              <FileText className="w-4 h-4" />
              <span>Report Lost</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('about');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 text-left"
            >
              <Info className="w-4 h-4" />
              <span>About Us</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="flex items-center justify-center p-2 rounded-lg bg-[#153931] text-white text-center font-semibold mt-2"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
