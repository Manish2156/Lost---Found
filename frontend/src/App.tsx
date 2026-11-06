/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { DashboardTopBar } from './components/DashboardTopBar';
import { FeaturesFlashCards } from './components/FeaturesFlashCards';
import { InventoryPage } from './components/InventoryPage';
import { ItemCard } from './components/ItemCard';
import { ItemDetailModal } from './components/ItemDetailModal';
import { ClaimModal } from './components/ClaimModal';
import { ReportModal } from './components/ReportModal';
import { SearchModal } from './components/SearchModal';
import { ContactModal } from './components/ContactModal';
import { MakeADifferenceModal } from './components/MakeADifferenceModal';
import { AboutUs } from './components/AboutUs';
import { SafetyGuide } from './components/SafetyGuide';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { INITIAL_ITEMS } from './data/mockData';
import { LostFoundItem, CollegeLocation } from './types';
import { 
  ArrowRight, 
  Menu, 
  X, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Building 
} from 'lucide-react';

export default function App() {
  // Navigation: 'dashboard' | 'inventory' | 'desks' | 'safety'
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Items State
  const [items, setItems] = useState<LostFoundItem[]>(INITIAL_ITEMS);

  // Search
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [selectedItem, setSelectedItem] = useState<LostFoundItem | null>(null);
  const [claimingItem, setClaimingItem] = useState<LostFoundItem | null>(null);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportType, setReportType] = useState<'lost' | 'found'>('lost');
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [makeADifferenceOpen, setMakeADifferenceOpen] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  const handleOpenReport = (type: 'lost' = 'lost') => {
    setReportType(type);
    setReportModalOpen(true);
  };

  // Recent 4 items
  const recentItems = useMemo(() => {
    return items.slice(0, 4);
  }, [items]);

  const handleReportSubmit = (newItem: LostFoundItem) => {
    setItems((prev) => [newItem, ...prev]);
    showToast(`Report ${newItem.id} published to college inventory!`);
  };

  const handleClaimSubmit = (claimData: { itemId: string; claimantName: string }) => {
    showToast(`Claim registered for ${claimData.itemId}. Visit the security desk with your student ID.`);
  };

  // Framer Motion Animation Variants for Staggered Fade-in and Slide-up
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05
      }
    }
  };

  const gridItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' as const }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ebf2e4] via-[#f3f7ee] to-[#e4eee0] p-2.5 sm:p-5 lg:p-7 flex flex-col items-center justify-between font-sans antialiased text-[#112a24]">
      
      {/* Outer Curved Master Container Frame matching reference */}
      <div className="w-full max-w-[1540px] bg-[#112923] rounded-[2rem] sm:rounded-[2.5rem] p-2 sm:p-3.5 shadow-2xl border border-[#1a3d34] flex flex-col lg:flex-row gap-3 min-h-[92vh]">
        
        {/* Mobile Header Bar */}
        <div className="lg:hidden flex items-center justify-between p-3 text-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#c2eb8c] to-[#98c96e] text-[#112923] flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="text-base font-bold font-display">Lost &amp; Found</span>
          </div>
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 rounded-xl bg-white/10 text-white"
            aria-label="Toggle menu"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* LEFT SIDEBAR (Desktop) */}
        <div className="hidden lg:flex shrink-0">
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onOpenReport={handleOpenReport}
            onOpenContact={() => setContactModalOpen(true)}
          />
        </div>

        {/* Mobile Drawer */}
        {mobileSidebarOpen && (
          <div className="lg:hidden p-2 z-50">
            <Sidebar
              activeTab={activeTab}
              setActiveTab={(tab) => {
                setActiveTab(tab);
                setMobileSidebarOpen(false);
              }}
              onOpenReport={(t) => {
                setMobileSidebarOpen(false);
                handleOpenReport(t);
              }}
              onOpenContact={() => {
                setMobileSidebarOpen(false);
                setContactModalOpen(true);
              }}
            />
          </div>
        )}

        {/* MAIN LIGHT WORKSPACE CONTAINER */}
        <div className="flex-1 bg-[#f8faf6] rounded-[1.6rem] sm:rounded-[2rem] p-5 sm:p-7 flex flex-col justify-between overflow-y-auto max-h-[89vh] scrollbar-none space-y-7">
          
          {/* Top Bar with Profile Icon, Search, Notification Bell, Date & Timeframe */}
          <DashboardTopBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onOpenSearch={() => setSearchModalOpen(true)}
          />

          {/* ========================================================
              TAB 1: MAIN DASHBOARD VIEW (With Features Flash Cards & Framer Motion Grid)
             ======================================================== */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              
              {/* Header Title with Gradient Accent & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#eef7ec] border border-[#cbe5c6] text-[#1c483c] text-[11px] font-semibold uppercase tracking-wider mb-2">
                    <span>College Campus Recovery Network</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-[#112a24] font-display tracking-tight">
                    Campus Lost &amp; Found Overview
                  </h1>
                  <p className="text-xs sm:text-sm text-[#5d776f] mt-1 font-medium">
                    Report missing items, explore found belongings, or claim property across all 10 college zones.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleOpenReport('lost')}
                    className="px-4 py-2 text-xs font-semibold text-[#112923] bg-white border border-[#d6e0d3] hover:border-[#112923] rounded-full transition-all shadow-2xs hover:shadow-xs active:scale-95"
                  >
                    + Report Lost
                  </button>
                  <button
                    onClick={() => setActiveTab('inventory')}
                    className="px-5 py-2 text-xs font-bold text-[#112923] bg-[#c2eb8c] hover:bg-[#b2e277] rounded-full transition-all shadow-sm active:scale-95"
                  >
                    View Inventory
                  </button>
                </div>
              </div>

              {/* FEATURES FLASH CARDS */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#1e483e] flex items-center gap-1.5 font-display">
                    <span className="w-1.5 h-3.5 bg-[#153931] rounded-full" />
                    <span>Quick Recovery Actions</span>
                  </h3>
                  <span className="text-xs text-[#5f7a71] font-semibold">
                    10 Monitored Campus Buildings
                  </span>
                </div>

                <FeaturesFlashCards
                  onSearchClick={() => setSearchModalOpen(true)}
                  onReportLostClick={() => handleOpenReport('lost')}
                  onInventoryClick={() => setActiveTab('inventory')}
                  onMakeADifferenceClick={() => setMakeADifferenceOpen(true)}
                />
              </div>

              {/* RECENT POSTS WITH FRAMER MOTION STAGGERED FADE-IN & SLIDE-UP */}
              <div className="pt-2 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-[#112923] rounded-full inline-block" />
                    <h3 className="text-base sm:text-lg font-bold text-[#112a24] font-display">
                      Recent High-Priority Item Reports
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('inventory')}
                    className="text-xs font-bold text-[#112923] hover:underline flex items-center gap-1 group"
                  >
                    <span>View Full Inventory ({items.length})</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Staggered Motion Grid */}
                <motion.div
                  variants={gridContainerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
                >
                  {recentItems.map((item) => (
                    <motion.div key={item.id} variants={gridItemVariants}>
                      <ItemCard
                        item={item}
                        viewMode="grid"
                        onSelect={(it) => setSelectedItem(it)}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>

            </div>
          )}

          {/* ========================================================
              TAB 2: CAMPUS INVENTORY PAGE (Requested Page!)
             ======================================================== */}
          {activeTab === 'inventory' && (
            <InventoryPage
              items={items}
              onSelectItem={(it) => setSelectedItem(it)}
              onOpenReport={handleOpenReport}
            />
          )}

          {/* ========================================================
              TAB 3: ABOUT US
             ======================================================== */}
          {activeTab === 'about' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <AboutUs />
            </div>
          )}

          {/* ========================================================
              TAB 4: SAFETY & CLAIMS
             ======================================================== */}
          {activeTab === 'safety' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <SafetyGuide />
            </div>
          )}

        </div>

      </div>

      {/* FOOTER */}
      <Footer
        onNavClick={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenContact={() => setContactModalOpen(true)}
      />

      {/* ========================================================
          MODALS & INTERACTION DIALOGS
         ======================================================== */}
      
      {/* Item Detail Modal */}
      <ItemDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onClaim={(it) => {
          setSelectedItem(null);
          setClaimingItem(it);
        }}
        onNotifySighting={() => showToast('Report sighting notification sent to owner')}
        onShowToast={showToast}
      />

      {/* Claim Modal */}
      <ClaimModal
        item={claimingItem}
        onClose={() => setClaimingItem(null)}
        onSubmitClaim={handleClaimSubmit}
      />

      {/* Report Modal */}
      <ReportModal
        initialType={reportType}
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        onSubmit={handleReportSubmit}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        items={items}
        onSelectItem={(it) => setSelectedItem(it)}
      />

      {/* Contact Us Modal (Requested!) */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        onShowToast={showToast}
      />

      {/* Make A Difference Modal */}
      <MakeADifferenceModal
        isOpen={makeADifferenceOpen}
        onClose={() => setMakeADifferenceOpen(false)}
        onOpenInventory={() => setActiveTab('inventory')}
      />

      {/* Toast Feedback */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />

    </div>
  );
}
