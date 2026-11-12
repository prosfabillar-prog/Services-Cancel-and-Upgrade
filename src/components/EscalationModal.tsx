import React, { useState } from 'react';
import { X, Copy, Check, Headphones, Sparkles } from 'lucide-react';

interface EscalationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EscalationModal: React.FC<EscalationModalProps> = ({ isOpen, onClose }) => {
  const [zd, setZd] = useState<string>('https://wyze.zendesk.com/agent/tickets/891420 (#891420)');
  const [service, setService] = useState<string>('Cam Plus');
  const [issue, setIssue] = useState<string>('Customer requesting cancellation and refund for annual renewal');
  const [keyDetails, setKeyDetails] = useState<string>('Verified website purchase in Recurly. Billed 2 days ago. No prior refunds on account.');
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const formattedOutput = `ZD (Ticket Link / Number): ${zd}
Service: ${service}
Issue/Question: ${issue}
Key Details: ${keyDetails}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative max-w-lg w-full bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-sm">
              <Headphones className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Microsoft Teams Escalation Generator
              </h3>
              <p className="text-[11px] text-slate-500">
                #wizards_services_livesupport channel format
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                ZD Ticket Link / Number (Required)
              </label>
              <span className="text-[10px] text-indigo-600 font-semibold">
                Include direct ticket URL or #
              </span>
            </div>
            <input
              type="text"
              value={zd}
              onChange={(e) => setZd(e.target.value)}
              placeholder="e.g. https://wyze.zendesk.com/agent/tickets/891420 or #891420"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
            />
            <p className="text-[10px] text-slate-500 mt-1">
              Always provide the Zendesk ticket link or ticket number so SMEs can access the customer record immediately.
            </p>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
              Service
            </label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Cam Plus">Cam Plus (Single)</option>
              <option value="Cam Plus Unlimited">Cam Plus Unlimited</option>
              <option value="Cam Protect">Cam Protect</option>
              <option value="Wyze Home Monitoring">Wyze Home Monitoring</option>
              <option value="Sprinkler Plus">Sprinkler Plus</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
              Issue / Question
            </label>
            <input
              type="text"
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              placeholder="Summary of customer issue or approval request"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
              Key Details
            </label>
            <textarea
              rows={3}
              value={keyDetails}
              onChange={(e) => setKeyDetails(e.target.value)}
              placeholder="Platform, verified in Console/Services tab, SME refund authorization request, etc."
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Formatted Preview */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
              Microsoft Teams Message Preview
            </span>
            <pre className="p-3.5 bg-slate-900 text-slate-200 rounded-lg text-xs font-mono whitespace-pre-wrap leading-relaxed shadow-inner">
              {formattedOutput}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Paste into Microsoft Teams (#wizards_services_livesupport)
          </span>
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Teams Message</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
