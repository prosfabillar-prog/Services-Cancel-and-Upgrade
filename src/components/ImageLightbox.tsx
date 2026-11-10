import React, { useEffect } from 'react';
import { X, ZoomIn, Info } from 'lucide-react';

interface LightboxProps {
  imageSrc: string;
  title: string;
  caption: string;
  instruction?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ImageLightbox: React.FC<LightboxProps> = ({
  imageSrc,
  title,
  caption,
  instruction,
  isOpen,
  onClose
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl w-full max-h-[92vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <ZoomIn className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">{title}</h3>
              <p className="text-xs text-slate-400">High-resolution verification screenshot</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close image preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image viewport */}
        <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-black/40">
          <img 
            src={imageSrc} 
            alt={title}
            className="max-h-[65vh] w-auto max-w-full object-contain rounded-xl shadow-lg border border-slate-800"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Footer caption & instruction */}
        <div className="px-6 py-4 bg-slate-950/90 border-t border-slate-800 text-xs text-slate-300 space-y-2">
          <p className="font-medium text-slate-200 flex items-center gap-2">
            <Info className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{caption}</span>
          </p>
          {instruction && (
            <p className="text-slate-400 pl-6 leading-relaxed">
              <strong className="text-emerald-400 font-semibold">Agent Guidance:</strong> {instruction}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
