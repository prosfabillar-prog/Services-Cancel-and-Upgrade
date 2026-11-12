import React, { useState } from 'react';
import { SectionId } from '../types';
import { Link2, Check } from 'lucide-react';

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
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const handleCopyLink = () => {
    const currentUrl = window.location.href;
    const htmlSnippet = `<a href="${currentUrl}" target="_blank" rel="noopener noreferrer">Wyze IAP & Subscription Training Simulator</a>`;
    navigator.clipboard.writeText(htmlSnippet);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };
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

      {/* Zone 3: Actions */}
      <div className="flex items-center gap-2.5 shrink-0">
        <button
          onClick={handleCopyLink}
          className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
          title="Copy HTML Link code to clipboard"
        >
          {copiedLink ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-bold">Copied HTML!</span>
            </>
          ) : (
            <>
              <Link2 className="w-3.5 h-3.5 text-slate-600" />
              <span>Copy HTML Link</span>
            </>
          )}
        </button>
        <button
          onClick={onOpenEscalation}
          className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
        >
          Teams Escalation
        </button>
      </div>
    </header>
  );
};
