import React, { useState } from 'react';
import { X, Copy, Check, Headphones, Sparkles } from 'lucide-react';

interface EscalationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EscalationModal: React.FC<EscalationModalProps> = ({ isOpen, onClose }) => {
  const [zd, setZd] = useState<string>('891420');
  const [service, setService] = useState<string>('Cam Plus');
  const [issue, setIssue] = useState<string>('Customer requesting cancellation and refund for annual renewal');
  const [keyDetails, setKeyDetails] = useState<string>('Verified website purchase in Recurly. Billed 2 days ago. No prior refunds on account.');
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const formattedOutput = `ZD: ${zd}
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
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
              <Headphones className="w-4 h-4 text-[#65a30d]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Slack Escalation Generator
              </h3>
              <p className="text-[11px] text-slate-500">
                #wizards_services_livesupport format
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
            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
              ZD (Ticket Number)
            </label>
            <input
              type="text"
              value={zd}
              onChange={(e) => setZd(e.target.value)}
              placeholder="e.g. 1289410"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#65a30d]"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
              Service
            </label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#65a30d]"
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
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#65a30d]"
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
              placeholder="Platform, transaction ID, compensation offered/refused, etc."
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#65a30d]"
            />
          </div>

          {/* Formatted Preview */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
              Output Preview
            </span>
            <pre className="p-3.5 bg-slate-900 text-slate-200 rounded-lg text-xs font-mono whitespace-pre-wrap leading-relaxed shadow-inner">
              {formattedOutput}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Paste into Slack or internal ticket note
          </span>
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Formatted Message</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
