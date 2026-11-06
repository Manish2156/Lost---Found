import React, { useState } from 'react';
import { X, Mail, Phone, MapPin, Send, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';
import { COLLEGE_LOCATIONS } from '../data/mockData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  onShowToast
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState(COLLEGE_LOCATIONS[0]);
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      return;
    }
    setIsSent(true);
    onShowToast('Inquiry sent to College Lost & Found Helpdesk!');
    setTimeout(() => {
      setIsSent(false);
      setName('');
      setEmail('');
      setMessage('');
      onClose();
    }, 1800);
  };

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

        {isSent ? (
          <div className="py-8 text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-[#e8f3ef] text-[#153931] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#153931] font-display">
              Message Received!
            </h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              Our campus security desk and student coordinators will review your inquiry and follow up at <strong className="text-[#153931]">{email}</strong> shortly.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#eef7ec] text-[#1e5246] text-[10px] font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Campus Support Desk</span>
              </div>
              <h2 className="text-2xl font-extrabold text-[#112a24] font-display tracking-tight">
                Contact Campus Lost &amp; Found
              </h2>
              <p className="text-xs text-slate-500">
                Need urgent help locating an item or reaching a specific building custody desk? Reach out to our campus team.
              </p>
            </div>

            {/* Quick Contacts Strip */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-[#f8faf6] border border-[#dce6d5] space-y-1">
                <div className="flex items-center gap-1.5 text-slate-500 font-semibold text-[11px]">
                  <Phone className="w-3.5 h-3.5 text-[#153931]" />
                  <span>Main Gate Desk</span>
                </div>
                <p className="font-bold text-[#153931] text-xs font-mono">(555) 019-2105</p>
              </div>

              <div className="p-3 rounded-2xl bg-[#f8faf6] border border-[#dce6d5] space-y-1">
                <div className="flex items-center gap-1.5 text-slate-500 font-semibold text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-[#153931]" />
                  <span>Canteen Desk</span>
                </div>
                <p className="font-bold text-[#153931] text-xs font-mono">7:30 AM – 8:00 PM</p>
              </div>
            </div>

            {/* Inquiry Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#1e3831]">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Raj Vishwakarma"
                    className="w-full px-3 py-2 text-xs bg-[#f8faf6] border border-[#d4ded0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#153931]/30 focus:border-[#153931]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#1e3831]">College Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@college.edu"
                    className="w-full px-3 py-2 text-xs bg-[#f8faf6] border border-[#d4ded0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#153931]/30 focus:border-[#153931]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#1e3831]">Relevant College Location</label>
                <div className="relative">
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value as any)}
                    className="w-full appearance-none px-3 py-2 text-xs bg-[#f8faf6] border border-[#d4ded0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#153931]/30 cursor-pointer"
                  >
                    {COLLEGE_LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                  <MapPin className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#1e3831]">Inquiry or Question *</label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your inquiry, lost item claim question, or campus desk assistance request..."
                  className="w-full px-3 py-2 text-xs bg-[#f8faf6] border border-[#d4ded0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#153931]/30 focus:border-[#153931]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-[#112923] to-[#1e5246] hover:from-[#0a1b17] hover:to-[#174339] text-white text-xs font-bold rounded-full transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#112923]/20 active:scale-98"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Inquiry to Campus Desk</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
