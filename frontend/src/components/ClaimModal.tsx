import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight, Building } from 'lucide-react';
import { LostFoundItem } from '../types';

interface ClaimModalProps {
  item: LostFoundItem | null;
  onClose: () => void;
  onSubmitClaim: (claimData: {
    itemId: string;
    claimantName: string;
    claimantEmail: string;
    studentId: string;
    proofDetails: string;
    pickupLocation: string;
  }) => void;
}

export const ClaimModal: React.FC<ClaimModalProps> = ({
  item,
  onClose,
  onSubmitClaim
}) => {
  const [claimantName, setClaimantName] = useState('');
  const [claimantEmail, setClaimantEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [proofDetails, setProofDetails] = useState('');
  const [pickupLocation, setPickupLocation] = useState('College Campus Information Center');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [claimCode, setClaimCode] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!item) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!claimantName.trim()) newErrors.name = 'Full name is required';
    if (!claimantEmail.trim() || !claimantEmail.includes('@')) {
      newErrors.email = 'Valid campus email (@university.edu) is required';
    }
    if (!studentId.trim()) newErrors.studentId = 'Student ID number is required';
    if (!proofDetails.trim() || proofDetails.length < 10) {
      newErrors.proof = 'Please provide detailed proof of ownership (at least 10 characters)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const generatedCode = 'CLM-' + Math.floor(100000 + Math.random() * 900000);
    setClaimCode(generatedCode);
    setIsSubmitted(true);

    onSubmitClaim({
      itemId: item.id,
      claimantName,
      claimantEmail,
      studentId,
      proofDetails,
      pickupLocation
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-150">
      <div 
        className="relative bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-[#dce6d5] overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e5edd0] bg-[#f8faf5]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#e5eee0] text-[#153931] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#142d27] font-display">Verify Ownership &amp; Claim Item</h3>
              <p className="text-xs text-[#5f756e]">Item: {item.title} ({item.id})</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confirmation State */}
        {isSubmitted ? (
          <div className="p-8 text-center space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-[#e8f3ef] text-[#153931] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h4 className="text-xl font-bold text-[#153931] font-display">
                Claim Verification Initiated
              </h4>
              <p className="text-xs text-[#526b63] max-w-md mx-auto">
                Your claim has been registered. Bring this claim code and your Student ID card to collect your belongings.
              </p>
            </div>

            {/* Claim Receipt Box */}
            <div className="p-4 rounded-2xl bg-[#f8faf6] border border-[#d8e3d2] text-left space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#657f76]">Verification Receipt Code</span>
                <span className="font-mono font-bold text-[#153931] bg-[#e6eee1] px-2.5 py-0.5 rounded border border-[#c8d9c1]">
                  {claimCode}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#657f76]">Pickup Hub Desk</span>
                <span className="font-medium text-[#153931]">{pickupLocation}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#657f76]">Claimant Email</span>
                <span className="font-medium text-[#153931]">{claimantEmail}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="w-full py-2.5 px-4 bg-[#153931] hover:bg-[#0e2722] text-white text-xs font-semibold rounded-full transition-colors"
              >
                Close &amp; Return to Feed
              </button>
            </div>
          </div>
        ) : (
          /* Form State */
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            <div className="p-3 rounded-2xl bg-[#fcf8ec] border border-[#eedfad] text-xs text-[#7a5c18] flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-[#8a681c] shrink-0 mt-0.5" />
              <span>
                To protect campus members from fraudulent claims, our staff inspects serial numbers, internal contents, or physical passcode unlock prior to handoff.
              </span>
            </div>

            {item.verificationQuestion && (
              <div className="p-3 rounded-2xl bg-[#eef4ec] border border-[#d6e3d2] text-xs text-[#1e3831]">
                <span className="font-semibold block mb-0.5">Finder's Verification Clue:</span>
                <span className="italic">{item.verificationQuestion}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#1e3831]">
                  Your Full Legal Name *
                </label>
                <input
                  type="text"
                  value={claimantName}
                  onChange={(e) => setClaimantName(e.target.value)}
                  placeholder="e.g. Maya Chen"
                  className="w-full px-3 py-2 text-xs bg-[#f8faf6] border border-[#d4ded0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#153931]/30 focus:border-[#153931]"
                />
                {errors.name && <p className="text-[11px] text-rose-600">{errors.name}</p>}
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#1e3831]">
                  Student / Faculty Email *
                </label>
                <input
                  type="email"
                  value={claimantEmail}
                  onChange={(e) => setClaimantEmail(e.target.value)}
                  placeholder="mchen@university.edu"
                  className="w-full px-3 py-2 text-xs bg-[#f8faf6] border border-[#d4ded0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#153931]/30 focus:border-[#153931]"
                />
                {errors.email && <p className="text-[11px] text-rose-600">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#1e3831]">
                  Student ID Number *
                </label>
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="e.g. 98402914"
                  className="w-full px-3 py-2 text-xs bg-[#f8faf6] border border-[#d4ded0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#153931]/30 focus:border-[#153931]"
                />
                {errors.studentId && <p className="text-[11px] text-rose-600">{errors.studentId}</p>}
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#1e3831]">
                  Campus Pickup Desk
                </label>
                <div className="relative">
                  <select
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full appearance-none px-3 py-2 text-xs bg-[#f8faf6] border border-[#d4ded0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#153931]/30"
                  >
                    <option value="Front gate security office">Front gate security checkpoint (24/7)</option>
                    <option value="Canteen service desk">Canteen service desk</option>
                    <option value="Sci building office">Sci building office</option>
                    <option value="Rupangan auditorium desk">Rupangan auditorium desk</option>
                    <option value="New law building library desk">New law building library desk</option>
                  </select>
                  <Building className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Proof Details Input */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#1e3831]">
                Proof of Ownership *
              </label>
              <textarea
                rows={3}
                value={proofDetails}
                onChange={(e) => setProofDetails(e.target.value)}
                placeholder="Describe specific unmentioned items inside, serial number, unique scratches, wallpaper photo, stickers, or passcode..."
                className="w-full px-3 py-2 text-xs bg-[#f8faf6] border border-[#d4ded0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#153931]/30 focus:border-[#153931]"
              />
              {errors.proof && <p className="text-[11px] text-rose-600">{errors.proof}</p>}
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#e2ebd9]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-[#526b63] hover:text-[#153931] rounded-full hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-[#153931] hover:bg-[#0e2722] rounded-full transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <span>Submit Verification Claim</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
