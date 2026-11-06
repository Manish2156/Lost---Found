import React from 'react';
import { ShieldCheck, AlertCircle, PhoneCall, Lock, UserCheck, HelpCircle } from 'lucide-react';

export const SafetyGuide: React.FC = () => {
  return (
    <section className="py-12 md:py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="max-w-2xl space-y-2">
          <p className="text-xs font-semibold text-indigo-700 tracking-wide uppercase">
            Trust & Community Protection
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-display tracking-tight">
            Safety Standards & Verification Policy
          </h2>
          <p className="text-sm text-slate-600">
            Our campus recovery system uses strict verification layers to prevent theft, unauthorized claims, and honor code violations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-950 font-display">
              Proof of Ownership
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every claimant must accurately identify non-public item details—such as passcode unlock, internal wallet cards, device serial numbers, or unique stickers—prior to physical release.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-950 font-display">
              Public Desk Handoffs Only
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Never agree to meet individuals in isolated or off-campus locations. All handoffs should take place at official university service desks with surveillance and staff presence.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-950 font-display">
              High-Value Property Protocol
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Items valued over $250 (laptops, phones, jewelry) unclaimed after 72 hours are securely transferred to Campus Public Safety Property Retention for permanent safekeeping.
            </p>
          </div>

        </div>

        {/* Emergency / Contact Box */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl">
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold">
              <AlertCircle className="w-4 h-4" />
              <span>Suspicious Activity or Stolen Property?</span>
            </div>
            <h4 className="text-lg font-bold font-display">
              Contact Campus Public Safety Dispatch
            </h4>
            <p className="text-xs text-slate-300">
              If an item is suspected stolen or an individual is attempting fraudulent claims, contact campus officers immediately.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono">
              Emergency: <strong>(555) 019-9111</strong>
            </div>
            <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono">
              Non-Emergency: <strong>(555) 019-9110</strong>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
