import React from 'react';
import { 
  BookOpen, 
  ShieldAlert, 
  CreditCard, 
  GitBranch, 
  TrendingUp, 
  MessageSquareText, 
  GraduationCap, 
  Check, 
  Headphones,
  Menu,
  X,
  LogOut,
  UserCheck
} from 'lucide-react';
import { SectionId } from '../types';
import { SECTIONS } from '../data/trainingData';

interface SidebarProps {
  currentSection: SectionId;
  visitedSections: Set<SectionId>;
  onSelectSection: (id: SectionId) => void;
  isOpenMobile: boolean;
  onToggleMobile: () => void;
  userEmail?: string;
  onLogout?: () => void;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  BookOpen,
  ShieldAlert,
  CreditCard,
  GitBranch,
  TrendingUp,
  MessageSquareText,
  GraduationCap
};

export const Sidebar: React.FC<SidebarProps> = ({
  currentSection,
  visitedSections,
  onSelectSection,
  isOpenMobile,
  onToggleMobile,
  userEmail,
  onLogout
}) => {
  const progressPercent = Math.round((visitedSections.size / SECTIONS.length) * 100);

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 md:hidden"
          onClick={onToggleMobile}
        />
      )}

      {/* Main Sidebar */}
      <aside 
        className={`fixed md:static inset-y-0 left-0 z-40 w-72 bg-slate-900 text-slate-300 flex flex-col flex-shrink-0 border-r border-slate-800 transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 bg-slate-950 flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#65a30d] text-white flex items-center justify-center font-black text-sm tracking-tighter shadow-md">
                WZ
              </div>
              <div>
                <h1 className="text-sm font-bold text-white tracking-tight leading-tight">
                  Wyze Training
                </h1>
                <p className="text-[11px] text-slate-400">IAP Guidance Simulator</p>
              </div>
            </div>
          </div>
          <button 
            onClick={onToggleMobile}
            className="md:hidden text-slate-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Training Progress Metric */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="text-slate-400 font-medium">Curriculum Progress</span>
            <span className="font-semibold text-white tabular-nums">{progressPercent}%</span>
          </div>
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#65a30d] transition-all duration-500 ease-out" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            {visitedSections.size} of {SECTIONS.length} modules completed
          </p>
        </div>

        {/* Section Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
          {SECTIONS.map((section) => {
            const Icon = ICON_MAP[section.iconName] || BookOpen;
            const isActive = currentSection === section.id;
            const isCompleted = visitedSections.has(section.id);

            return (
              <button
                key={section.id}
                onClick={() => {
                  onSelectSection(section.id);
                  if (isOpenMobile) onToggleMobile();
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-medium rounded-lg transition-colors text-left ${
                  isActive 
                    ? 'bg-slate-800 text-white font-semibold' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                <div className={`shrink-0 ${isActive ? 'text-[#65a30d]' : 'text-slate-400'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 truncate">
                  <span className="block truncate">{section.shortTitle}</span>
                </div>
                {isCompleted && (
                  <span className="shrink-0 text-emerald-400">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Account & Support Channel Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/70 text-xs space-y-3">
          {userEmail && (
            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-6 h-6 rounded-md bg-[#65a30d]/20 text-[#65a30d] flex items-center justify-center shrink-0">
                  <UserCheck className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 block leading-none font-medium">Logged in as</span>
                  <span className="text-xs text-white font-semibold truncate block mt-0.5" title={userEmail}>
                    {userEmail}
                  </span>
                </div>
              </div>
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="p-1.5 text-slate-400 hover:text-red-400 rounded-md hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                  title="Sign out of training session"
                  aria-label="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          <div>
            <div className="flex items-center gap-2 text-slate-400 mb-1.5 font-medium">
              <Headphones className="w-3.5 h-3.5 text-[#65a30d]" />
              <span>Escalation Channel</span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono bg-slate-900 border border-slate-800 px-2 py-1 rounded">
              #wizards_services_livesupport
            </p>
            <p className="text-[10px] text-slate-400 mt-2">
              Internal Wyze Services Tier 1 &amp; Tier 2 Training
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
