import React, { useState } from 'react';
import { Lock, Mail, KeyRound, AlertCircle, Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react';

interface AuthGateProps {
  onSuccess: (email: string) => void;
}

// Authorized domains specified by user
const ALLOWED_DOMAINS = [
  'ececonsutltinggroup.net',
  'ececonsultinggroup.net',
  'ececontactcenters.net',
  'ececontactcenters.com'
];

const REQUIRED_PASSWORD = 'Wyze@2026';

export const AuthGate: React.FC<AuthGateProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!trimmedEmail) {
      setError('Please enter your work email address.');
      return;
    }

    // Check email format
    const emailParts = trimmedEmail.split('@');
    if (emailParts.length !== 2) {
      setError('Please enter a valid email address.');
      return;
    }

    const domain = emailParts[1].toLowerCase();
    const isDomainAllowed = ALLOWED_DOMAINS.some(
      (allowed) => domain === allowed || domain.endsWith('.' + allowed)
    );

    if (!isDomainAllowed) {
      setError(
        'Access Restricted: Only authorized domain accounts (@ececontactcenters.net, @ececontactcenters.com, @ececonsultinggroup.net) may access this training simulator.'
      );
      return;
    }

    if (trimmedPassword !== REQUIRED_PASSWORD) {
      setError('Incorrect passcode. Please enter the authorized training access password.');
      return;
    }

    // Store in storage if rememberMe is enabled
    if (rememberMe) {
      localStorage.setItem('wyze_training_auth_user', trimmedEmail);
    } else {
      sessionStorage.setItem('wyze_training_auth_user', trimmedEmail);
    }

    onSuccess(trimmedEmail);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Subtle Gradient Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#65a30d]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Login Card */}
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8 sm:p-10 text-white z-10 space-y-6">
        {/* Brand & Security Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#65a30d] text-white font-black text-xl shadow-lg shadow-[#65a30d]/20 mb-2">
            WZ
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Wyze Services Academy
          </h1>
          <p className="text-xs text-slate-400">
            Internal IAP &amp; Subscription Training Simulator
          </p>
        </div>

        {/* Security Badge */}
        <div className="flex items-center gap-2.5 p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 text-xs text-slate-300">
          <ShieldCheck className="w-4 h-4 text-[#65a30d] shrink-0" />
          <span className="text-[11px] leading-tight">
            Restricted Training Environment · Domain Verification Required
          </span>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="p-3.5 bg-red-950/80 border border-red-800 rounded-xl flex items-start gap-2.5 text-xs text-red-200 animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
              Work Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@ececontactcenters.net"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-700 rounded-xl text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#65a30d] focus:border-transparent transition-all"
                autoComplete="email"
                required
              />
            </div>
            <p className="text-[10px] text-slate-500">
              Allowed: <span className="font-mono text-slate-400">@ececontactcenters.net</span>, <span className="font-mono text-slate-400">@ececontactcenters.com</span>, <span className="font-mono text-slate-400">@ececonsultinggroup.net</span>
            </p>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
              Simulator Passcode
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter access password"
                className="w-full pl-10 pr-10 py-2.5 bg-slate-950/80 border border-slate-700 rounded-xl text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#65a30d] focus:border-transparent transition-all"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 focus:outline-none cursor-pointer"
                aria-label={showPassword ? 'Hide passcode' : 'Show passcode'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember me toggle */}
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-400 hover:text-slate-200">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-700 bg-slate-950 text-[#65a30d] focus:ring-[#65a30d] accent-[#65a30d]"
              />
              <span>Remember session on this browser</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#65a30d] hover:bg-[#558b0b] text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-[#65a30d]/20 flex items-center justify-center gap-2 cursor-pointer pt-3"
          >
            <span>Enter Training Simulator</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer info */}
        <div className="pt-4 border-t border-slate-800 text-center">
          <p className="text-[11px] text-slate-500">
            For access credentials, contact your Team Leader or QA Training Department.
          </p>
        </div>
      </div>
    </div>
  );
};
