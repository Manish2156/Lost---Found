import React from 'react';
import { FileText, Search, ShieldCheck, CheckCircle } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Submit a Quick Report',
      description: 'Detail the misplaced or found item in under two minutes with category, campus location, photos, and a private identification clue.',
      icon: FileText
    },
    {
      step: '02',
      title: 'Automated Feed Matching',
      description: 'The platform categorizes and cross-references reports across all campus zones, alerting finders and rightful owners instantaneously.',
      icon: Search
    },
    {
      step: '03',
      title: 'Anti-Theft Verification',
      description: 'Before property is released, the claimant must provide private verification proof (e.g. wallpaper description, serial digits, or card names).',
      icon: ShieldCheck
    },
    {
      step: '04',
      title: 'Secure Desk Handoff',
      description: 'Reclaim your property at one of the 18 authorized campus service desks upon presenting your physical Student or Staff ID.',
      icon: CheckCircle
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-slate-50/70 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <p className="text-xs font-semibold text-indigo-700 tracking-wide uppercase">
            Campus Protocol
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-display tracking-tight">
            How Lost & Found Reconnects Property
          </h2>
          <p className="text-sm text-slate-600">
            A transparent four-step process built around student security, fraud prevention, and rapid community return.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.step}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 hover:border-slate-300 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-400">
                    {item.step}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-slate-950 font-display">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
