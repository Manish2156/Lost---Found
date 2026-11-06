import React, { useState } from 'react';
import { X, Search, MapPin, Calendar, ArrowRight, Package } from 'lucide-react';
import { LostFoundItem } from '../types';
import { ItemVisual } from './ItemVisual';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: LostFoundItem[];
  onSelectItem: (item: LostFoundItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  items,
  onSelectItem
}) => {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'lost' | 'found'>('all');

  if (!isOpen) return null;

  const results = items.filter((item) => {
    if (filterType !== 'all' && item.type !== filterType) return false;
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.id.toLowerCase().includes(q)
    );
  }).slice(0, 6);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-20 animate-in fade-in duration-150">
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-[#d8e3d2] overflow-hidden p-6 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Search Input */}
        <div className="flex items-center gap-3 pb-3 border-b border-[#e2ebd9]">
          <Search className="w-5 h-5 text-[#30594e] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search items by name, campus building, or category (e.g. Earbuds, Watch, Backpack, Hydro Flask)..."
            className="w-full text-sm text-[#153931] placeholder:text-[#8ea59c] focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#657f76] font-medium">Filter:</span>
          {(['all', 'lost', 'found'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1 rounded-full capitalize font-semibold transition-colors ${
                filterType === t
                  ? 'bg-[#153931] text-white'
                  : 'bg-[#f0f4ed] text-[#47635a] hover:bg-[#e4ede0]'
              }`}
            >
              {t === 'all' ? 'All Items' : t}
            </button>
          ))}
          <span className="ml-auto text-slate-400 text-[11px]">
            {results.length} found
          </span>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto space-y-2 divide-y divide-[#f2f6ee]">
          {results.length > 0 ? (
            results.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectItem(item);
                  onClose();
                }}
                className="pt-2 flex items-center justify-between gap-3 p-2.5 hover:bg-[#f6f9f3] rounded-2xl cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#f4f6f2] shrink-0 border border-[#e2e8dc] flex items-center justify-center">
                    <ItemVisual itemId={item.id} title={item.title} imageUrl={item.imageUrl} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-[11px]">
                      <span className="font-semibold text-[#296a58]">
                        {item.status === 'found' ? 'Found' : 'Lost'}
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="text-slate-500">{item.category}</span>
                    </div>
                    <h4 className="text-sm font-bold text-[#142d27] truncate group-hover:text-[#153931]">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-[#6c857d] mt-0.5">
                      <div className="flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 text-[#86a198]" />
                        <span className="truncate">{item.location}</span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <Calendar className="w-3 h-3 text-[#86a198]" />
                        <span>{item.dateReported}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 text-[#153931] p-1 group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-xs text-slate-500">
              No matching campus items found.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
