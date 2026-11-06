import React, { useState } from 'react';
import { X, MapPin, Calendar, ShieldCheck, Share2, AlertCircle, Building2, User, Check } from 'lucide-react';
import { LostFoundItem } from '../types';
import { ItemVisual } from './ItemVisual';

interface ItemDetailModalProps {
  item: LostFoundItem | null;
  onClose: () => void;
  onClaim: (item: LostFoundItem) => void;
  onNotifySighting: (item: LostFoundItem) => void;
  onShowToast: (msg: string) => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  onClose,
  onClaim,
  onNotifySighting,
  onShowToast
}) => {
  const [copied, setCopied] = useState(false);

  if (!item) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + '?item=' + item.id);
    setCopied(true);
    onShowToast(`Item link copied: ${item.id}`);
    setTimeout(() => setCopied(false), 2000);
  };

  const isFound = item.status === 'found';
  const isLost = item.status === 'lost';
  const isReunited = item.status === 'reunited';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-150">
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-[#dce6d5] overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e5edd0] bg-[#f8faf5]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold text-[#153931] bg-[#eef4ec] border border-[#d2dfcd] px-2.5 py-1 rounded-md">
              {item.id}
            </span>
            <span className={`text-xs font-semibold ${
              isFound ? 'text-[#296a58]' : isLost ? 'text-[#a24f2b]' : 'text-[#2b5c8f]'
            }`}>
              {isFound ? 'Found Belongings' : isLost ? 'Lost Item Report' : 'Safely Reunited'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="p-2 text-slate-500 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors"
              title="Share item link"
              aria-label="Share item link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[78vh] overflow-y-auto space-y-5">
          
          {/* Main Showcase Image */}
          <div className="rounded-2xl overflow-hidden bg-[#f4f6f2] border border-[#e2e8dc] aspect-[16/10] relative flex items-center justify-center">
            <ItemVisual
              itemId={item.id}
              title={item.title}
              imageUrl={item.imageUrl}
              className="w-full h-full max-h-64 object-contain"
            />
            <div className="absolute top-3 right-3">
              <span className="text-xs font-semibold text-[#296a58] bg-white/95 px-3 py-1 rounded-full shadow-2xs">
                {isFound ? 'Found' : 'Lost'}
              </span>
            </div>
          </div>

          {/* Title & Metadata */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-[#526b63]">
              <span className="font-semibold text-[#153931]">{item.category}</span>
              <span aria-hidden="true">·</span>
              <span>Reported {item.dateReported}</span>
              <span aria-hidden="true">·</span>
              <span>Occurred {item.dateOccurred}</span>
            </div>

            <h2 className="text-2xl font-bold text-[#142d27] font-display">
              {item.title}
            </h2>
          </div>

          {/* Location & Safe Custody */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div className="p-3.5 rounded-2xl bg-[#f8faf6] border border-[#d8e3d2] space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1e3831]">
                <MapPin className="w-3.5 h-3.5 text-[#296a58]" />
                <span>Incident Campus Location</span>
              </div>
              <p className="text-sm font-semibold text-[#153931]">{item.location}</p>
              <p className="text-[11px] text-[#657f76]">{item.specificSpot ? `Spot: ${item.specificSpot}` : 'College Grounds'}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#eef4ec] border border-[#d6e3d2] space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#153931]">
                <Building2 className="w-3.5 h-3.5 text-[#296a58]" />
                <span>Current Custody Status</span>
              </div>
              <p className="text-sm font-semibold text-[#153931]">
                {item.heldAtHub ? item.heldAtHub : isLost ? 'Awaiting Sighting / Missing' : 'With Finder (Safe Transfer)'}
              </p>
              <p className="text-[11px] text-[#4f6f65]">
                {item.heldAtHub ? 'Verify at campus desk with student ID' : 'Direct secure transfer'}
              </p>
            </div>
          </div>

          {/* Full Description */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-[#142d27] uppercase tracking-wider">
              Description &amp; Notes
            </h4>
            <p className="text-xs sm:text-sm text-[#40564f] leading-relaxed bg-[#f8faf6] p-4 rounded-2xl border border-[#d8e3d2]">
              {item.description}
            </p>
          </div>

          {/* Verification Notice */}
          {item.verificationQuestion && (
            <div className="p-4 rounded-2xl bg-[#fcf8ec] border border-[#eedfad] space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#7a5c18]">
                <ShieldCheck className="w-4 h-4 text-[#8a681c]" />
                <span>Anti-Theft Verification Question</span>
              </div>
              <p className="text-xs text-[#5c440d] leading-relaxed italic">
                "{item.verificationQuestion}"
              </p>
            </div>
          )}

          {/* Reporter details */}
          <div className="flex items-center justify-between text-xs text-[#637d74] pt-2 border-t border-[#e2ebd9]">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#86a198]" />
              <span>Reported by: <strong className="text-[#153931]">{item.reportedBy.name}</strong> ({item.reportedBy.role})</span>
            </div>
            <span>Via {item.reportedBy.contactMethod}</span>
          </div>

        </div>

        {/* Action Footer */}
        <div className="px-6 py-4 border-t border-[#e5edd0] bg-[#f8faf5] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#657f76]">
            Campus Public Safety: <span className="font-semibold text-[#153931]">(555) 019-9110</span>
          </p>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {isFound && (
              <button
                onClick={() => {
                  onClose();
                  onClaim(item);
                }}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-[#153931] hover:bg-[#0e2722] rounded-full transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>This Is Mine (Claim Item)</span>
              </button>
            )}

            {isLost && (
              <button
                onClick={() => {
                  onClose();
                  onNotifySighting(item);
                }}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-[#153931] hover:bg-[#0e2722] rounded-full transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <AlertCircle className="w-4 h-4" />
                <span>I Found This / Report Sighting</span>
              </button>
            )}

            {isReunited && (
              <div className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-[#153931] bg-[#dce7d6] rounded-full flex items-center justify-center gap-1.5">
                <Check className="w-4 h-4" />
                <span>Reunited with Owner</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
