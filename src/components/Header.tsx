import React from 'react';
import { SectionId } from '../types';

interface HeaderProps {
  currentSection: SectionId;
  onSelectSection: (id: SectionId) => void;
  onOpenEscalation: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSection,
  onSelectSection,
  onOpenEscalation
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-4 bg-white border-b border-slate-200 sticky top-0 z-30">
      {/* Zone 1: Wordmark display title (one line, single element) */}
      <a 
        href="#overview" 
        onClick={(e) => { e.preventDefault(); onSelectSection('overview'); }}
        className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-emerald-700 transition-colors"
      >
        Wyze Services Training
      </a>

      {/* Zone 2: 4-5 concise single-line nav links */}
      <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-slate-600">
        <button
          onClick={() => onSelectSection('overview')}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
            currentSection === 'overview' ? 'border-[#65a30d] text-slate-900 font-bold' : 'border-transparent'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => onSelectSection('cancellation')}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
            currentSection === 'cancellation' ? 'border-[#65a30d] text-slate-900 font-bold' : 'border-transparent'
          }`}
        >
          Visual Guides
        </button>
        <button
          onClick={() => onSelectSection('refunds')}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
            currentSection === 'refunds' ? 'border-[#65a30d] text-slate-900 font-bold' : 'border-transparent'
          }`}
        >
          Refund Rules
        </button>
        <button
          onClick={() => onSelectSection('decision-tool')}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
            currentSection === 'decision-tool' ? 'border-[#65a30d] text-slate-900 font-bold' : 'border-transparent'
          }`}
        >
          Policy Checker
        </button>
        <button
          onClick={() => onSelectSection('scenarios')}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
            currentSection === 'scenarios' ? 'border-[#65a30d] text-slate-900 font-bold' : 'border-transparent'
          }`}
        >
          Practice Scenarios
        </button>
        <button
          onClick={() => onSelectSection('quiz')}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
            currentSection === 'quiz' ? 'border-[#65a30d] text-slate-900 font-bold' : 'border-transparent'
          }`}
        >
          Knowledge Check
        </button>
      </nav>

      {/* Zone 3: Exactly 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onOpenEscalation}
          className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          Escalation Macro
        </button>
      </div>
    </header>
  );
};
