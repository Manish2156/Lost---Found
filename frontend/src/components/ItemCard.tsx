import React from 'react';
import { MapPin, Calendar, ArrowUpRight } from 'lucide-react';
import { LostFoundItem } from '../types';
import { ItemVisual } from './ItemVisual';

interface ItemCardProps {
  item: LostFoundItem;
  viewMode?: 'grid' | 'list';
  onSelect: (item: LostFoundItem) => void;
  onClaim?: (item: LostFoundItem) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  viewMode = 'grid',
  onSelect
}) => {
  const isFound = item.status === 'found';
  const isReunited = item.status === 'reunited';

  const statusLabel = isReunited ? 'Reunited' : isFound ? 'Found' : 'Lost';

  const statusClasses = isReunited
    ? 'bg-slate-100/90 text-slate-700 border-slate-200'
    : isFound
    ? 'bg-emerald-50/90 text-emerald-800 border-emerald-200'
    : 'bg-amber-50/90 text-amber-800 border-amber-200';

  if (viewMode === 'list') {
    return (
      <article
        onClick={() => onSelect(item)}
        className="group relative rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/70 hover:border-emerald-300/60 p-4 transition-all duration-200 shadow-xs hover:shadow-sm cursor-pointer"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Thumbnail */}
          <div className="relative w-full sm:w-28 h-28 rounded-xl overflow-hidden bg-slate-50 border border-slate-200/60 shrink-0 flex items-center justify-center">
            <ItemVisual
              itemId={item.id}
              title={item.title}
              imageUrl={item.imageUrl}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200 ease-out"
            />
            <span
              className={`absolute top-2 right-2 text-xs font-semibold px-2 py-1 rounded-md border backdrop-blur-xs ${statusClasses}`}
            >
              {statusLabel}
            </span>
          </div>

          {/* Details (Strict 4px/8px grid) */}
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{item.category}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="font-mono text-xs text-slate-400">{item.id}</span>
            </div>

            <h3 className="text-sm font-semibold text-slate-900 truncate group-hover:text-emerald-900 transition-colors">
              {item.title}
            </h3>

            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
              {item.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{item.location}</span>
                {item.specificSpot && (
                  <span className="text-slate-400">({item.specificSpot})</span>
                )}
              </div>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{item.dateReported}</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="shrink-0 flex items-center justify-end w-full sm:w-auto pt-2 sm:pt-0">
            <button
              type="button"
              onClick={() => onSelect(item)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <span>View details</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      </article>
    );
  }

  // Grid Card (Strict 4px/8px scale for padding, margins, and gaps)
  return (
    <article
      onClick={() => onSelect(item)}
      className="group relative rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/70 hover:border-emerald-300/60 p-4 transition-all duration-200 shadow-xs hover:shadow-sm cursor-pointer flex flex-col justify-between h-full"
    >
      {/* Visual Container */}
      <div className="relative rounded-xl overflow-hidden bg-slate-50 border border-slate-200/60 aspect-[4/3] flex items-center justify-center">
        <ItemVisual
          itemId={item.id}
          title={item.title}
          imageUrl={item.imageUrl}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200 ease-out"
        />

        {/* Status Badge */}
        <div className="absolute top-2 right-2">
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-md border backdrop-blur-xs ${statusClasses}`}
          >
            {statusLabel}
          </span>
        </div>

        {/* Location Chip */}
        <div className="absolute bottom-2 left-2 max-w-[85%]">
          <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-700 bg-white/90 backdrop-blur-xs px-2 py-1 rounded-md border border-slate-200/80 shadow-2xs truncate">
            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="truncate">{item.location}</span>
          </span>
        </div>
      </div>

      {/* Info Block (Strict 4px/8px internal spacing: mt-4, space-y-2, pt-2) */}
      <div className="mt-4 flex-1 flex flex-col justify-between space-y-2">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              {item.category}
            </span>
            <span className="font-mono text-xs text-slate-400">
              {item.id}
            </span>
          </div>

          <h3 className="text-sm font-semibold text-slate-900 group-hover:text-emerald-950 transition-colors line-clamp-1">
            {item.title}
          </h3>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Footer Metadata */}
        <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="truncate text-slate-600 font-medium">
            {item.specificSpot || item.location}
          </span>
          <div className="flex items-center gap-1 shrink-0 text-slate-400">
            <Calendar className="w-3 h-3" />
            <span>{item.dateReported}</span>
          </div>
        </div>
      </div>
    </article>
  );
};
