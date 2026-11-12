import React, { useState } from 'react';
import { 
  Apple, 
  Play, 
  Globe, 
  ChevronRight, 
  ChevronLeft, 
  Maximize2, 
  Copy, 
  Check, 
  AlertCircle, 
  Smartphone, 
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { APPLE_STEPS, GOOGLE_STEPS, CUSTOMER_MACROS } from '../data/trainingData';
import { ScreenshotStep } from '../types';

interface CancellationSectionProps {
  onOpenLightbox: (step: ScreenshotStep) => void;
}

export const CancellationSection: React.FC<CancellationSectionProps> = ({ onOpenLightbox }) => {
  const [platform, setPlatform] = useState<'apple' | 'google' | 'website'>('apple');
  const [appleStepIdx, setAppleStepIdx] = useState<number>(0);
  const [googleStepIdx, setGoogleStepIdx] = useState<number>(0);
  const [copiedMacro, setCopiedMacro] = useState<boolean>(false);
  const [showHighlight, setShowHighlight] = useState<boolean>(true);

  const currentAppleStep = APPLE_STEPS[appleStepIdx];
  const currentGoogleStep = GOOGLE_STEPS[googleStepIdx];

  const handleCopyMacro = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMacro(true);
    setTimeout(() => setCopiedMacro(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Title */}
      <div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          Subscription Cancellation Guides
        </h2>
        <p className="mt-2 text-slate-600 text-sm md:text-base leading-relaxed">
          Walk customers through self-service cancellation on their device. Explore real mobile screenshots with highlighted touch targets and customer-ready macros.
        </p>
      </div>

      {/* Crucial Policy Reminder */}
      <div className="bg-slate-900 text-white p-5 rounded-xl border border-slate-800 flex items-start gap-4 shadow-sm">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
          <AlertCircle className="w-5 h-5" />
        </div>
        <div className="text-xs md:text-sm text-slate-300 leading-relaxed">
          <strong className="text-white block mb-0.5">Core Agent Requirement:</strong>
          Canceling a subscription only prevents <strong>future automatic renewals</strong> at the expiration date. It does not automatically initiate a refund for the already-paid subscription period.
        </div>
      </div>

      {/* Platform Switcher Tabs */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto pb-px">
        <button
          onClick={() => setPlatform('apple')}
          className={`flex items-center gap-2 px-5 py-3 text-xs md:text-sm font-semibold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
            platform === 'apple'
              ? 'border-blue-600 text-blue-600 bg-blue-50/50 rounded-t-lg'
              : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100/50'
          }`}
        >
          <Apple className="w-4 h-4" />
          <span>Apple App Store (iOS)</span>
        </button>

        <button
          onClick={() => setPlatform('google')}
          className={`flex items-center gap-2 px-5 py-3 text-xs md:text-sm font-semibold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
            platform === 'google'
              ? 'border-green-600 text-green-700 bg-green-50/50 rounded-t-lg'
              : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100/50'
          }`}
        >
          <Play className="w-4 h-4 fill-green-600" />
          <span>Google Play Store (Android)</span>
        </button>

        <button
          onClick={() => setPlatform('website')}
          className={`flex items-center gap-2 px-5 py-3 text-xs md:text-sm font-semibold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
            platform === 'website'
              ? 'border-slate-800 text-slate-900 bg-slate-100/60 rounded-t-lg'
              : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100/50'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>Wyze Website (my.wyze.com)</span>
        </button>
      </div>

      {/* APPLE FLOW */}
      {platform === 'apple' && (
        <div className="space-y-6">
          {/* Step Selector Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white rounded-xl border border-slate-200">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider pl-1">
                Step:
              </span>
              <div className="flex items-center gap-1.5">
                {APPLE_STEPS.map((st, i) => (
                  <button
                    key={st.stepNumber}
                    onClick={() => setAppleStepIdx(i)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      appleStepIdx === i
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Step {st.stepNumber}: {st.title.split('&')[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowHighlight(!showHighlight)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 cursor-pointer ${
                  showHighlight 
                    ? 'border-blue-300 text-blue-700 bg-blue-50' 
                    : 'border-slate-200 text-slate-600 bg-white'
                }`}
                title="Toggle interactive touch target highlight"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{showHighlight ? 'Highlight On' : 'Highlight Off'}</span>
              </button>

              <div className="flex items-center gap-1">
                <button
                  disabled={appleStepIdx === 0}
                  onClick={() => setAppleStepIdx((prev) => Math.max(0, prev - 1))}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  disabled={appleStepIdx === APPLE_STEPS.length - 1}
                  onClick={() => setAppleStepIdx((prev) => Math.min(APPLE_STEPS.length - 1, prev + 1))}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Step Visualizer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Phone Screen Container */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative group w-full max-w-[340px] bg-slate-950 p-3 rounded-[36px] shadow-2xl border-4 border-slate-800">
                {/* iPhone speaker notch pill */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-20 pointer-events-none" />

                {/* Screenshot Display */}
                <div className="relative overflow-hidden rounded-[26px] bg-black aspect-[9/19.5]">
                  <img
                    src={currentAppleStep.imageSrc}
                    alt={currentAppleStep.title}
                    className="w-full h-full object-cover select-none"
                    referrerPolicy="no-referrer"
                  />

                  {/* Highlight Overlay */}
                  {showHighlight && currentAppleStep.highlightCoordinates && (
                    <div
                      className="absolute border-2 border-emerald-400 bg-emerald-400/20 rounded-lg animate-pulse z-10 transition-all pointer-events-none shadow-[0_0_15px_rgba(52,211,153,0.5)]"
                      style={{
                        top: currentAppleStep.highlightCoordinates.top,
                        left: currentAppleStep.highlightCoordinates.left,
                        width: currentAppleStep.highlightCoordinates.width,
                        height: currentAppleStep.highlightCoordinates.height
                      }}
                    >
                      <span className="absolute -top-6 left-0 bg-emerald-500 text-black text-[10px] font-black px-1.5 py-0.5 rounded shadow whitespace-nowrap">
                        {currentAppleStep.highlightCoordinates.label}
                      </span>
                    </div>
                  )}

                  {/* Zoom Action Hover */}
                  <button
                    onClick={() => onOpenLightbox(currentAppleStep)}
                    className="absolute bottom-3 right-3 p-2 bg-slate-900/80 hover:bg-slate-900 text-white rounded-lg backdrop-blur shadow-md text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Zoom</span>
                  </button>
                </div>
              </div>
              <p className="text-[11px] text-slate-600 mt-3 text-center">
                Click zoom to view the full resolution iOS screenshot
              </p>
            </div>

            {/* Right: Step Guidance & Customer Macro */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                      {currentAppleStep.stepNumber}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">
                      {currentAppleStep.title}
                    </h3>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">
                    Apple iOS 18 / 26
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Customer Instructions
                    </h4>
                    <p className="text-sm text-slate-800 leading-relaxed font-medium">
                      {currentAppleStep.instruction}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Visual Cue on Screen
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                      {currentAppleStep.caption}
                    </p>
                  </div>

                  <div className="pt-2">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Action Required
                    </h4>
                    <div className="p-3 bg-blue-50 text-blue-900 rounded-lg text-xs font-semibold border border-blue-100">
                      {currentAppleStep.keyAction}
                    </div>
                  </div>
                </div>
              </div>

              {/* Ready-to-Send Customer Script */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-blue-600" />
                    Customer Chat / Ticket Macro (Complete Apple Guide)
                  </h4>
                  <button
                    onClick={() => handleCopyMacro(CUSTOMER_MACROS.appleCancel)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                  >
                    {copiedMacro ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                        <span>Copy Script</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 bg-slate-900 text-slate-200 rounded-lg text-xs leading-relaxed font-mono whitespace-pre-wrap overflow-x-auto shadow-inner">
                  {CUSTOMER_MACROS.appleCancel}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GOOGLE PLAY FLOW */}
      {platform === 'google' && (
        <div className="space-y-6">
          {/* Step Selector Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white rounded-xl border border-slate-200">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider pl-1">
                Step:
              </span>
              <div className="flex items-center gap-1.5">
                {GOOGLE_STEPS.map((st, i) => (
                  <button
                    key={st.stepNumber}
                    onClick={() => setGoogleStepIdx(i)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      googleStepIdx === i
                        ? 'bg-green-700 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Step {st.stepNumber}: {st.title.split('&')[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowHighlight(!showHighlight)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 cursor-pointer ${
                  showHighlight 
                    ? 'border-green-300 text-green-700 bg-green-50' 
                    : 'border-slate-200 text-slate-600 bg-white'
                }`}
                title="Toggle interactive touch target highlight"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{showHighlight ? 'Highlight On' : 'Highlight Off'}</span>
              </button>

              <div className="flex items-center gap-1">
                <button
                  disabled={googleStepIdx === 0}
                  onClick={() => setGoogleStepIdx((prev) => Math.max(0, prev - 1))}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  disabled={googleStepIdx === GOOGLE_STEPS.length - 1}
                  onClick={() => setGoogleStepIdx((prev) => Math.min(GOOGLE_STEPS.length - 1, prev + 1))}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Step Visualizer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Phone Screen Container */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative group w-full max-w-[340px] bg-slate-950 p-3 rounded-[36px] shadow-2xl border-4 border-slate-800">
                {/* Camera punch hole */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-black rounded-full z-20 pointer-events-none" />

                {/* Screenshot Display */}
                <div className="relative overflow-hidden rounded-[26px] bg-black aspect-[9/20]">
                  <img
                    src={currentGoogleStep.imageSrc}
                    alt={currentGoogleStep.title}
                    className="w-full h-full object-cover select-none"
                    referrerPolicy="no-referrer"
                  />

                  {/* Highlight Overlay */}
                  {showHighlight && currentGoogleStep.highlightCoordinates && (
                    <div
                      className="absolute border-2 border-emerald-400 bg-emerald-400/20 rounded-lg animate-pulse z-10 transition-all pointer-events-none shadow-[0_0_15px_rgba(52,211,153,0.5)]"
                      style={{
                        top: currentGoogleStep.highlightCoordinates.top,
                        left: currentGoogleStep.highlightCoordinates.left,
                        width: currentGoogleStep.highlightCoordinates.width,
                        height: currentGoogleStep.highlightCoordinates.height
                      }}
                    >
                      <span className="absolute -top-6 left-0 bg-emerald-500 text-black text-[10px] font-black px-1.5 py-0.5 rounded shadow whitespace-nowrap">
                        {currentGoogleStep.highlightCoordinates.label}
                      </span>
                    </div>
                  )}

                  {/* Zoom Action Hover */}
                  <button
                    onClick={() => onOpenLightbox(currentGoogleStep)}
                    className="absolute bottom-3 right-3 p-2 bg-slate-900/80 hover:bg-slate-900 text-white rounded-lg backdrop-blur shadow-md text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Zoom</span>
                  </button>
                </div>
              </div>
              <p className="text-[11px] text-slate-600 mt-3 text-center">
                Click zoom to view the full resolution Android screenshot
              </p>
            </div>

            {/* Right: Step Guidance & Customer Macro */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-green-700 text-white font-bold text-xs flex items-center justify-center">
                      {currentGoogleStep.stepNumber}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">
                      {currentGoogleStep.title}
                    </h3>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">
                    Google Play Store
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Customer Instructions
                    </h4>
                    <p className="text-sm text-slate-800 leading-relaxed font-medium">
                      {currentGoogleStep.instruction}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Visual Cue on Screen
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                      {currentGoogleStep.caption}
                    </p>
                  </div>

                  <div className="pt-2">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Action Required
                    </h4>
                    <div className="p-3 bg-green-50 text-green-950 rounded-lg text-xs font-semibold border border-green-100">
                      {currentGoogleStep.keyAction}
                    </div>
                  </div>
                </div>
              </div>

              {/* Ready-to-Send Customer Script */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-green-700" />
                    Customer Chat / Ticket Macro (Complete Google Play Guide)
                  </h4>
                  <button
                    onClick={() => handleCopyMacro(CUSTOMER_MACROS.googleCancel)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                  >
                    {copiedMacro ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                        <span>Copy Script</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 bg-slate-900 text-slate-200 rounded-lg text-xs leading-relaxed font-mono whitespace-pre-wrap overflow-x-auto shadow-inner">
                  {CUSTOMER_MACROS.googleCancel}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* WEBSITE FLOW */}
      {platform === 'website' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Self-Service Steps */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-600" />
                Customer Self-Service Steps (Wyze.com)
              </h3>
              <ol className="list-decimal pl-5 space-y-3 text-xs md:text-sm text-slate-700 leading-relaxed">
                <li>
                  Go to{' '}
                  <a 
                    href="https://my.wyze.com/account/plans" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-emerald-700 hover:text-emerald-800 underline font-semibold inline-flex items-center gap-1"
                  >
                    my.wyze.com/account/plans
                    <ExternalLink className="w-3 h-3" />
                  </a>{' '}
                  in any browser.
                </li>
                <li>
                  Sign in using the exact email address associated with their Wyze subscription.
                </li>
                <li>
                  Locate the active service plan under <strong className="text-slate-900">My Plans</strong> and click <strong className="text-slate-900">Manage Plan</strong>.
                </li>
                <li>
                  Select <strong className="text-slate-900">Cancel Plan</strong> and confirm the confirmation prompts.
                </li>
              </ol>
              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-600">
                Self-service cancellation immediately stops upcoming renewals while preserving service until the end of the paid cycle.
              </div>
            </div>

            {/* Agent Action for Assisted Cancel/Refund */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-600" />
                  Agent Assisted Escalation Format
                </h3>
                <button
                  onClick={() => handleCopyMacro(`ZD (Ticket Link / Number): https://wyze.zendesk.com/agent/tickets/ \nService: \nIssue/Question: \nKey Details: `)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
                >
                  <Copy className="w-3 h-3 text-slate-500" />
                  <span>Copy</span>
                </button>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                When a customer requests agent assistance to cancel and refund a website purchase, post the request under <code className="bg-slate-100 text-indigo-700 px-1 py-0.5 rounded font-semibold text-xs">#wizards_services_livesupport</code> in Microsoft Teams with this exact format (providing the direct ZD link or number):
              </p>
              <pre className="p-4 bg-slate-900 text-slate-200 rounded-lg text-xs font-mono whitespace-pre-wrap leading-relaxed shadow-inner">
{`ZD (Ticket Link / Number): https://wyze.zendesk.com/agent/tickets/[Ticket #]
Service: [Cam Plus / Cam Protect]
Issue/Question: Customer requesting cancel and refund for recent renewal
Key Details: Verified website purchase in Console / Services tab. Renewal date: [Date].`}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
