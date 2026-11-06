import React, { useState } from 'react';
import { X, User, Mail, Lock, CheckCircle2, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'signup';
  onClose: () => void;
  onSuccess: (user: { name: string; email: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'login',
  onClose,
  onSuccess
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [studentId, setStudentId] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid university email');
      return;
    }
    if (!password.trim() || password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (mode === 'signup' && !name.trim()) {
      setError('Please enter your full name');
      return;
    }

    setError('');
    setIsSuccess(true);
    setTimeout(() => {
      onSuccess({
        name: name.trim() || email.split('@')[0],
        email: email.trim()
      });
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div 
        className="relative bg-white rounded-3xl max-w-md w-full shadow-2xl border border-[#dce6d5] overflow-hidden my-6 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-[#e8f3ef] text-[#153931] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#153931] font-display">
              {mode === 'login' ? 'Welcome Back!' : 'Account Created!'}
            </h3>
            <p className="text-xs text-[#526b63]">
              Redirecting you to the verified campus network...
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Header & Mode Switcher */}
            <div className="text-center space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-[#e5eee0] text-[#153931] flex items-center justify-center mx-auto mb-1">
                <User className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-extrabold text-[#112a24] font-display tracking-tight">
                {mode === 'login' ? 'Sign in to Lost & Found' : 'Join the Campus Network'}
              </h2>
              <p className="text-xs text-[#637d74]">
                {mode === 'login'
                  ? 'Access your reported items and status notifications'
                  : 'Report lost property and help fellow students recover items'}
              </p>
            </div>

            {/* Segmented Mode Toggle */}
            <div className="grid grid-cols-2 gap-1 p-1 bg-[#f0f4ec] rounded-full text-xs font-semibold">
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setError('');
                }}
                className={`py-2 rounded-full transition-all ${
                  mode === 'login'
                    ? 'bg-white text-[#153931] shadow-xs'
                    : 'text-[#58736a] hover:text-[#153931]'
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setError('');
                }}
                className={`py-2 rounded-full transition-all ${
                  mode === 'signup'
                    ? 'bg-white text-[#153931] shadow-xs'
                    : 'text-[#58736a] hover:text-[#153931]'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {error && (
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                  {error}
                </div>
              )}

              {mode === 'signup' && (
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#1e3831]">
                    Full Name
                  </label>
                  <div className="relative flex items-center">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Maya Chen"
                      className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#f8faf6] border border-[#d4ded0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#153931]/30 focus:border-[#153931]"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#1e3831]">
                  Campus Email
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@university.edu"
                    className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#f8faf6] border border-[#d4ded0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#153931]/30 focus:border-[#153931]"
                  />
                </div>
              </div>

              {mode === 'signup' && (
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#1e3831]">
                    Student ID Number (Optional)
                  </label>
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="e.g. 98402914"
                    className="w-full px-3 py-2.5 text-xs bg-[#f8faf6] border border-[#d4ded0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#153931]/30 focus:border-[#153931]"
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#1e3831]">
                  Password
                </label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#f8faf6] border border-[#d4ded0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#153931]/30 focus:border-[#153931]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-[#153931] hover:bg-[#0e2722] active:bg-[#071613] text-white text-xs font-semibold rounded-full transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>{mode === 'login' ? 'Sign In to Campus Portal' : 'Create Student Account'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  className="text-xs text-[#3b5b52] hover:text-[#153931] font-semibold"
                >
                  {mode === 'login'
                    ? "Don't have an account? Sign Up"
                    : 'Already have an account? Login'}
                </button>
              </div>
            </form>

          </div>
        )}

      </div>
    </div>
  );
};
