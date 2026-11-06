import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MapPin, 
  SlidersHorizontal, 
  LayoutGrid, 
  List, 
  RotateCcw, 
  Plus, 
  Building2, 
  PackageCheck,
  CheckCircle2,
  Archive,
  ShieldCheck,
  Clock
} from 'lucide-react';
import { LostFoundItem, CollegeLocation, ItemCategory, ItemStatus } from '../types';
import { COLLEGE_LOCATIONS, CATEGORIES } from '../data/mockData';
import { ItemCard } from './ItemCard';

interface InventoryPageProps {
  items: LostFoundItem[];
  onSelectItem: (item: LostFoundItem) => void;
  onOpenReport: (type: 'lost') => void;
}

export const InventoryPage: React.FC<InventoryPageProps> = ({
  items,
  onSelectItem,
  onOpenReport
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<CollegeLocation | 'All'>('All');
  const [statusFilter, setStatusFilter] = useState<'all' | ItemStatus>('all');
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory | 'All'>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'location' | 'title'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filtered & Sorted items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Status
      if (statusFilter !== 'all' && item.status !== statusFilter) return false;
      // Location (Strictly from the 10 college addresses)
      if (selectedLocation !== 'All' && item.location !== selectedLocation) return false;
      // Category
      if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesLoc = item.location.toLowerCase().includes(q);
        const matchesSpot = item.specificSpot?.toLowerCase().includes(q) || false;
        const matchesId = item.id.toLowerCase().includes(q);
        const matchesTags = item.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesLoc && !matchesSpot && !matchesId && !matchesTags) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'oldest') return a.id.localeCompare(b.id);
      if (sortBy === 'location') return a.location.localeCompare(b.location);
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      // default newest (higher id first)
      return b.id.localeCompare(a.id);
    });
  }, [items, statusFilter, selectedLocation, selectedCategory, searchQuery, sortBy]);

  const hasActiveFilters = Boolean(
    searchQuery.trim() ||
    selectedLocation !== 'All' ||
    statusFilter !== 'all' ||
    selectedCategory !== 'All'
  );

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedLocation('All');
    setStatusFilter('all');
    setSelectedCategory('All');
    setSortBy('newest');
  };

  // Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.04
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: 'easeOut' as const }
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
  };

  const totalItemsCount = items.length;
  const lostCount = useMemo(() => items.filter(i => i.status === 'lost').length, [items]);
  const foundCount = useMemo(() => items.filter(i => i.status === 'found').length, [items]);
  const reunitedCount = useMemo(() => items.filter(i => i.status === 'reunited').length, [items]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Header Banner Card with Subtle Gradient Border & Glass Accents */}
      <div className="relative p-[1px] rounded-3xl bg-gradient-to-b from-white/30 via-[#c2eb8c]/35 to-white/10 shadow-xl overflow-hidden">
        <div className="p-6 sm:p-7 rounded-[23px] bg-gradient-to-r from-[#112923]/95 via-[#163a31]/95 to-[#1e5246]/95 backdrop-blur-md text-white flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden">
          <div className="space-y-1.5 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-medium text-[#c2eb8c] uppercase tracking-wider border border-white/15">
              <span>Campus Directory</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
              Campus Lost &amp; Found Inventory
            </h1>
            <p className="text-xs sm:text-sm text-white/80 max-w-xl leading-relaxed">
              Every reported lost, found, and reunited belonging across college buildings. Filter by your specific building or spot.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 relative z-10 shrink-0">
            <button
              onClick={() => onOpenReport('lost')}
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#153931] hover:bg-[#0f2822] border border-white/20 rounded-full transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Report Lost Item</span>
            </button>
          </div>

        </div>
      </div>

      {/* Quick Stats Overview Strip: 4 Frosted Glass Cards with Refined Gradient Borders */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        {/* Stat 1: Total Logged */}
        <div className="relative p-[1px] rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white/95 via-[#dfead9]/75 to-[#bde0cb]/40 shadow-[0_4px_20px_-2px_rgba(21,57,49,0.04)] transition-all duration-300 hover:shadow-md">
          <div className="bg-white/80 backdrop-blur-md rounded-[15px] sm:rounded-[23px] p-3.5 sm:p-4 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[11px] font-semibold text-[#5a766c] block">
                Total Cataloged
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl sm:text-2xl font-extrabold text-[#112923] font-display">
                  {totalItemsCount}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">items</span>
              </div>
              <span className="text-[10px] text-[#246352] block font-medium">Across 10 buildings</span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#153931] to-[#23584c] text-[#c2eb8c] flex items-center justify-center shrink-0 shadow-2xs">
              <Archive className="w-5 h-5 stroke-[1.8]" />
            </div>
          </div>
        </div>

        {/* Stat 2: Active Lost */}
        <div className="relative p-[1px] rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white/95 via-[#f5e9d7]/75 to-[#edd8be]/40 shadow-[0_4px_20px_-2px_rgba(21,57,49,0.04)] transition-all duration-300 hover:shadow-md">
          <div className="bg-white/80 backdrop-blur-md rounded-[15px] sm:rounded-[23px] p-3.5 sm:p-4 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[11px] font-semibold text-[#8c5222] block">
                Active Lost
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl sm:text-2xl font-extrabold text-[#5c2e0b] font-display">
                  {lostCount}
                </span>
                <span className="text-[10px] text-[#8c5222]/70 font-medium">reports</span>
              </div>
              <span className="text-[10px] text-[#8c5222] block font-medium">Awaiting recovery</span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#8c4b12] to-[#ab601d] text-[#fed7aa] flex items-center justify-center shrink-0 shadow-2xs">
              <Clock className="w-5 h-5 stroke-[1.8]" />
            </div>
          </div>
        </div>

        {/* Stat 3: Safe Custody (Found) */}
        <div className="relative p-[1px] rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white/95 via-[#dcf0dc]/75 to-[#c2e4bf]/40 shadow-[0_4px_20px_-2px_rgba(21,57,49,0.04)] transition-all duration-300 hover:shadow-md">
          <div className="bg-white/80 backdrop-blur-md rounded-[15px] sm:rounded-[23px] p-3.5 sm:p-4 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[11px] font-semibold text-[#1e4822] block">
                In Safe Custody
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl sm:text-2xl font-extrabold text-[#112923] font-display">
                  {foundCount}
                </span>
                <span className="text-[10px] text-[#1e4822]/70 font-medium">items</span>
              </div>
              <span className="text-[10px] text-[#1e4822] block font-medium">At campus desks</span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1e4822] to-[#2c6832] text-[#d4f2aa] flex items-center justify-center shrink-0 shadow-2xs">
              <ShieldCheck className="w-5 h-5 stroke-[1.8]" />
            </div>
          </div>
        </div>

        {/* Stat 4: Reunited & Returned */}
        <div className="relative p-[1px] rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white/95 via-[#dfead9]/75 to-[#c2eb8c]/40 shadow-[0_4px_20px_-2px_rgba(21,57,49,0.04)] transition-all duration-300 hover:shadow-md">
          <div className="bg-white/80 backdrop-blur-md rounded-[15px] sm:rounded-[23px] p-3.5 sm:p-4 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[11px] font-semibold text-[#246352] block">
                Reunited
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl sm:text-2xl font-extrabold text-[#112923] font-display">
                  {reunitedCount}
                </span>
                <span className="text-[10px] text-[#246352]/70 font-medium">successes</span>
              </div>
              <span className="text-[10px] text-[#246352] block font-medium">Returned to owners</span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#112923] to-[#1d4c3f] text-[#c2eb8c] flex items-center justify-center shrink-0 shadow-2xs">
              <CheckCircle2 className="w-5 h-5 stroke-[1.8]" />
            </div>
          </div>
        </div>

      </div>

      {/* Main Filter & Control Center Card with Refined Glass-Morphism & Gradient Border */}
      <div className="relative p-[1px] rounded-3xl bg-gradient-to-b from-white/95 via-[#dfead9]/80 to-[#bde0cb]/50 shadow-[0_8px_30px_rgb(21,57,49,0.04)]">
        <div className="bg-white/80 backdrop-blur-md rounded-[23px] p-5 sm:p-6 space-y-4">
          
          {/* Row 1: Search + Location Filter (The 10 College Locations!) + Status Pills + Sort + View */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            
            {/* Search Box */}
            <div className="flex-1 relative flex items-center min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by keywords, serial, or item title..."
                className="w-full pl-10 pr-4 py-2.5 bg-white/75 backdrop-blur-xs border border-white/80 rounded-full text-xs text-[#153931] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#153931]/25 focus:border-[#153931] focus:bg-white shadow-2xs transition-all"
              />
            </div>

            {/* College Location Selector Dropdown (Limited to the exact 10 addresses) */}
            <div className="relative min-w-[200px]">
              <div className="flex items-center gap-1.5 px-3.5 py-2 bg-white/75 backdrop-blur-xs border border-white/80 rounded-full shadow-2xs">
                <MapPin className="w-3.5 h-3.5 text-[#246352] shrink-0" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value as any)}
                  aria-label="Filter by College Building"
                  className="w-full bg-transparent text-xs font-semibold text-[#153931] focus:outline-none cursor-pointer pr-4"
                >
                  <option value="All">All College Locations</option>
                  {COLLEGE_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Status Segmented Control */}
            <div className="inline-flex p-1 bg-[#112923]/5 backdrop-blur-xs rounded-full shrink-0 border border-white/60 shadow-2xs">
              {(['all', 'lost', 'found', 'reunited'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full capitalize transition-all ${
                    statusFilter === st
                      ? 'bg-[#112923] text-white shadow-2xs'
                      : 'text-[#4e6c62] hover:text-[#112923]'
                  }`}
                >
                  {st === 'all' ? 'All' : st}
                </button>
              ))}
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-1.5 px-3 py-2 bg-white/75 backdrop-blur-xs border border-white/80 rounded-full text-xs shadow-2xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs font-semibold text-[#153931] focus:outline-none cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="location">Location (A-Z)</option>
                <option value="title">Title (A-Z)</option>
              </select>
            </div>

            {/* Grid/List View Mode */}
            <div className="flex items-center p-1 bg-[#112923]/5 backdrop-blur-xs rounded-full shrink-0 border border-white/60 shadow-2xs">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-full transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white text-[#112923] shadow-2xs'
                    : 'text-slate-400 hover:text-[#112923]'
                }`}
                title="Grid View"
                aria-label="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-full transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white text-[#112923] shadow-2xs'
                    : 'text-slate-400 hover:text-[#112923]'
                }`}
                title="List View"
                aria-label="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Row 2: Location Quick Filter Tags with Frosted Styling */}
          <div className="pt-2 border-t border-[#f0f5ec] flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-bold text-[#557067] uppercase tracking-wider shrink-0 pr-1">
              Buildings:
            </span>
            <button
              onClick={() => setSelectedLocation('All')}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedLocation === 'All'
                  ? 'bg-[#112923] text-white shadow-2xs'
                  : 'bg-white/70 backdrop-blur-xs text-[#4f6c62] hover:bg-white hover:text-[#112923] border border-white/80 shadow-2xs'
              }`}
            >
              All Areas ({items.length})
            </button>
            {COLLEGE_LOCATIONS.map((loc) => {
              const count = items.filter(it => it.location === loc).length;
              const isSelected = selectedLocation === loc;
              return (
                <button
                  key={loc}
                  onClick={() => setSelectedLocation(loc)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#112923] text-white shadow-2xs'
                      : 'bg-white/70 backdrop-blur-xs text-[#4f6c62] hover:bg-white hover:text-[#112923] border border-white/80 shadow-2xs'
                  }`}
                >
                  <span>{loc}</span>
                  {count > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-[#c2eb8c] text-[#112923]' : 'bg-[#e2ebd9] text-[#1e4822]'}`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Row 3: Active Filter Summary / Reset */}
          <div className="flex items-center justify-between pt-1 text-xs text-[#5f7a71]">
            <div className="flex items-center gap-2">
              <span>Showing <strong className="text-[#112923]">{filteredItems.length}</strong> items in college inventory</span>
              {selectedLocation !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#e8f3ef] text-[#153931] font-semibold text-[11px] border border-[#d2e7ce]">
                  <MapPin className="w-3 h-3 text-[#246352]" />
                  <span>{selectedLocation}</span>
                </span>
              )}
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-xs font-semibold text-[#153931] hover:text-[#256356] transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Items Grid with Framer Motion Staggered Fade-in & Slide-up Animations */}
      <AnimatePresence mode="wait">
        {filteredItems.length > 0 ? (
          <motion.div
            key={`${selectedLocation}-${statusFilter}-${selectedCategory}-${searchQuery}-${sortBy}-${viewMode}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5'
                : 'space-y-3'
            }
          >
            {filteredItems.map((item) => (
              <motion.div key={item.id} variants={itemVariants} layout>
                <ItemCard
                  item={item}
                  viewMode={viewMode}
                  onSelect={onSelectItem}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative p-[1px] rounded-3xl bg-gradient-to-b from-white/90 via-[#dfead9]/70 to-[#bde0cb]/40 shadow-md max-w-md mx-auto"
          >
            <div className="py-14 text-center bg-white/85 backdrop-blur-md rounded-[23px] p-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#f4f7f1] text-[#153931] flex items-center justify-center mx-auto shadow-2xs border border-white">
                <Building2 className="w-7 h-7 text-slate-400" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-[#112923] font-display">
                  No items found for {selectedLocation !== 'All' ? selectedLocation : 'this search'}
                </h3>
                <p className="text-xs text-slate-500">
                  Be the first to report a missing or found item in this college area!
                </p>
              </div>
              <div className="pt-2 flex items-center justify-center gap-2">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 text-xs font-semibold text-[#153931] bg-[#eef4ec] rounded-full hover:bg-[#dce9d8] border border-[#d6e3d2]"
                >
                  Reset Filters
                </button>
                <button
                  onClick={() => onOpenReport('lost')}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#112923] rounded-full hover:bg-[#1a4037] shadow-sm"
                >
                  + Report Lost
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
