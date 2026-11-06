import React from 'react';
import { X, Handshake, Heart, ShieldCheck, Award, ArrowRight } from 'lucide-react';

interface MakeADifferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenInventory: () => void;
}

export const MakeADifferenceModal: React.FC<MakeADifferenceModalProps> = ({
  isOpen,
  onClose,
  onOpenInventory
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div 
        className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-[#dce6d5] overflow-hidden my-6 p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-[#e5eee0] text-[#153931] flex items-center justify-center mx-auto shadow-2xs">
            <Handshake className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#112a24] font-display">
            Community Return Network
          </h2>
          <p className="text-xs text-[#526b63] max-w-md mx-auto leading-relaxed">
            Every semester, belongings get misplaced on campus. You can help someone recover their keys, laptop, or notes today.
          </p>
        </div>

        <div className="space-y-3">
          <div className="p-3.5 rounded-2xl bg-[#f7faf4] border border-[#e2ebd9] flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#e2ecdc] text-[#153931] flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#142d27]">
                Turn in Items to Campus Offices
              </h4>
              <p className="text-[11px] text-[#637d74] mt-0.5 leading-snug">
                Drop found belongings at the nearest department office or front desk to help owners recover them quickly.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#f7faf4] border border-[#e2ebd9] flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#e2ecdc] text-[#153931] flex items-center justify-center shrink-0 mt-0.5">
              <Heart className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#142d27]">
                Browse the Campus Inventory
              </h4>
              <p className="text-[11px] text-[#637d74] mt-0.5 leading-snug">
                Check whether a student has already logged a lost report for an item you found.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#f7faf4] border border-[#e2ebd9] flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#e2ecdc] text-[#153931] flex items-center justify-center shrink-0 mt-0.5">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#142d27]">
                Community Support
              </h4>
              <p className="text-[11px] text-[#637d74] mt-0.5 leading-snug">
                Help build an active, honest, and reliable college community network.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-2 flex items-center gap-3">
          <button
            onClick={() => {
              onClose();
              onOpenInventory();
            }}
            className="flex-1 py-3 px-4 bg-[#153931] hover:bg-[#0e2722] text-white text-xs font-semibold rounded-full transition-all flex items-center justify-center gap-1.5 shadow-sm"
          >
            <span>Browse Campus Inventory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
