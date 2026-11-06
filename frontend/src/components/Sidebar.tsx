import React from 'react';
import { 
  LayoutDashboard, 
  PackageSearch, 
  FileText, 
  Info, 
  Mail, 
  ShieldCheck, 
  ArrowRight
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenReport: (type: 'lost') => void;
  onOpenContact: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  onOpenReport,
  onOpenContact
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'inventory', label: 'Inventory', icon: PackageSearch },
    { id: 'report-lost', label: 'Report Lost', icon: FileText, action: () => onOpenReport('lost') },
    { id: 'about', label: 'About Us', icon: Info },
    { id: 'contact', label: 'Contact', icon: Mail, action: onOpenContact }
  ];

  return (
    <aside className="w-64 bg-[#112923] text-white flex flex-col justify-between p-5 rounded-3xl shrink-0 border border-[#193d34] shadow-xl">
      
      {/* Top Brand Logo */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 px-2 pt-1">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#c2eb8c] to-[#98c96e] text-[#112923] flex items-center justify-center font-bold shadow-md shadow-[#c2eb8c]/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-base font-bold text-white font-display tracking-tight block">
              Lost &amp; Found
            </span>
            <span className="text-[10px] text-[#9fc7bc] font-medium tracking-wide block">
              Campus Recovery Network
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1.5 pt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.action) {
                    item.action();
                  } else {
                    setActiveTab(item.id);
                  }
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 group ${
                  isActive
                    ? 'bg-white text-[#112923] shadow-md shadow-black/10'
                    : 'text-[#9fc7bc] hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#112923]' : 'text-[#7da99d] group-hover:text-white'}`} />
                  <span>{item.label}</span>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Inventory Callout Card (No Report Found, simple Inventory redirect) */}
      <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10 text-white space-y-2">
        <h4 className="text-xs font-semibold text-[#c2eb8c]">
          Campus Directory
        </h4>
        <p className="text-[11px] text-[#9fc7bc] leading-relaxed">
          Search and view all reported items across all college buildings.
        </p>
        <button
          onClick={() => setActiveTab('inventory')}
          className="w-full mt-2 py-2 px-3 bg-[#c2eb8c] hover:bg-[#b0e073] text-[#112923] text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
        >
          <span>View Inventory</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </aside>
  );
};
