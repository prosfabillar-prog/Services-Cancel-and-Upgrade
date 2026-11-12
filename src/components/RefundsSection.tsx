import React, { useState } from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Copy, 
  Check, 
  HelpCircle,
  ArrowRight,
  Send,
  Lock,
  MessageSquare,
  ExternalLink,
  Play,
  Apple,
  AlertOctagon,
  FileText
} from 'lucide-react';
import { CUSTOMER_MACROS } from '../data/trainingData';

export const RefundsSection: React.FC = () => {
  const [copiedFormat, setCopiedFormat] = useState<boolean>(false);
  const [copiedOfferMacro, setCopiedOfferMacro] = useState<boolean>(false);
  const [copiedSmeAppleMacro, setCopiedSmeAppleMacro] = useState<boolean>(false);
  const [copiedSmeGoogleMacro, setCopiedSmeGoogleMacro] = useState<boolean>(false);
  const [copiedGoogleDisputeMacro, setCopiedGoogleDisputeMacro] = useState<boolean>(false);
  const [activePlatformGuide, setActivePlatformGuide] = useState<'google_refund' | 'google_dispute' | 'apple_refund'>('google_refund');

  const websiteTemplate = `ZD (Ticket Link / Number): https://wyze.zendesk.com/agent/tickets/
Service: 
Issue/Question: 
Key Details:`;

  const handleCopy = (text: string, type: 'format' | 'offer' | 'apple' | 'google' | 'dispute') => {
    navigator.clipboard.writeText(text);
    if (type === 'format') {
      setCopiedFormat(true);
      setTimeout(() => setCopiedFormat(false), 2000);
    } else if (type === 'offer') {
      setCopiedOfferMacro(true);
      setTimeout(() => setCopiedOfferMacro(false), 2000);
    } else if (type === 'apple') {
      setCopiedSmeAppleMacro(true);
      setTimeout(() => setCopiedSmeAppleMacro(false), 2000);
    } else if (type === 'google') {
      setCopiedSmeGoogleMacro(true);
      setTimeout(() => setCopiedSmeGoogleMacro(false), 2000);
    } else if (type === 'dispute') {
      setCopiedGoogleDisputeMacro(true);
      setTimeout(() => setCopiedGoogleDisputeMacro(false), 2000);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* Title */}
      <div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          Refund Handling &amp; Quick IAP Guidance
        </h2>
        <p className="mt-2 text-slate-600 text-sm md:text-base leading-relaxed">
          Follow the strict 3-stage protocol for handling customer refund demands across mobile app stores and the Wyze website.
        </p>
      </div>

      {/* Website vs IAP Comparison Bar */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center">
              W
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Wyze Website Purchase Refunds
              </h3>
              <p className="text-xs text-slate-500">
                Direct merchant transactions via Stripe / Recurly
              </p>
            </div>
          </div>
          <button
            onClick={() => handleCopy(websiteTemplate, 'format')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            {copiedFormat ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied Template</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copy Teams Template</span>
              </>
            )}
          </button>
        </div>

        <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
          If a customer requests to cancel or requests to cancel and refund a <strong>website purchase</strong>, post the request under the <code className="bg-slate-100 px-2 py-0.5 rounded text-indigo-700 font-semibold text-xs">#wizards_services_livesupport</code> channel in Microsoft Teams using this exact standardized format (including the direct ZD ticket link or number):
        </p>

        <pre className="p-4 bg-slate-900 text-slate-200 rounded-lg text-xs font-mono whitespace-pre-wrap leading-relaxed shadow-inner">
{websiteTemplate}
        </pre>
      </div>

      {/* 3-Stage IAP Refund Protocol */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            The 3-Stage In-App Purchase Protocol (Apple &amp; Google)
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Every step must be completed sequentially. Skipping directly to platform refund links is a policy violation.
          </p>
        </div>

        {/* Gate 1: Verification */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                1
              </span>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Standard Process for IAP (Required First)
                </h4>
                <p className="text-xs text-slate-500">
                  Tool verification and purchase authentication
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
              Mandatory Gate 1
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-xs text-slate-700 space-y-1">
              <strong className="block text-slate-900 font-semibold">1. Locate in Console</strong>
              <p>Locate customer email in Console and check user profile status.</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-xs text-slate-700 space-y-1">
              <strong className="block text-slate-900 font-semibold">2. Check Services Tab</strong>
              <p>Confirm the subscription source shows Apple IAP or Google Play IAP.</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-xs text-slate-700 space-y-1">
              <strong className="block text-slate-900 font-semibold">3. Alternate Email / Screenshot</strong>
              <p>If the cx email provided cannot be located, asked another email to locate the charge if still not showing asked a screenshot of the charge.</p>
            </div>
          </div>
        </div>

        {/* Gate 2: Platform Constraints Explanation */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                2
              </span>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Confirmed IAP Handling (Platform Constraints)
                </h4>
                <p className="text-xs text-slate-500">
                  Explain mobile store payment ownership
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-blue-800 bg-blue-100 px-2.5 py-1 rounded-md">
              Mandatory Gate 2
            </span>
          </div>

          <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
            Explain clearly that <strong>Wyze cannot issue refunds directly</strong>, as payments for mobile in-app subscriptions are managed directly by Apple or Google.
          </p>

          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Agent Response Script (Direct IAP Explanation)
              </span>
              <button
                onClick={() => handleCopy(CUSTOMER_MACROS.iapDirectExplanation, 'offer')}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
              >
                {copiedOfferMacro ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                )}
                <span>{copiedOfferMacro ? 'Copied' : 'Copy Macro'}</span>
              </button>
            </div>
            <pre className="p-4 bg-slate-900 text-slate-200 rounded-lg text-xs font-mono whitespace-pre-wrap leading-relaxed shadow-inner">
              {CUSTOMER_MACROS.iapDirectExplanation}
            </pre>
          </div>
        </div>

        {/* Gate 3: SME Services Support Approval Gate */}
        <div className="bg-slate-950 text-white rounded-xl border border-slate-800 p-6 md:p-8 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-red-600 text-white font-bold text-xs flex items-center justify-center">
                3
              </span>
              <div>
                <h4 className="text-base font-bold text-red-400">
                  Platform Refund Steps (SME Approval Gate)
                </h4>
                <p className="text-xs text-slate-400">
                  Strict authorization threshold before external steps
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-red-300 bg-red-950/80 border border-red-800 px-2.5 py-1 rounded-md flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-red-400" />
              <span>SME Gate</span>
            </span>
          </div>

          <div className="p-4 bg-red-950/40 border border-red-800/80 rounded-lg text-xs md:text-sm text-red-200 leading-relaxed">
            If the customer requests a refund for an In-App Purchase, you may assist them with Apple or Google refund steps <strong>ONLY if explicitly approved by SME Services Support</strong>.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-1.5">
              <strong className="text-white font-semibold flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-red-500" />
                DO NOT DO THIS:
              </strong>
              <p className="text-slate-400 leading-relaxed">
                Do NOT send{' '}
                <a 
                  href="https://reportaproblem.apple.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-red-400 hover:text-red-300 underline font-mono inline-flex items-center gap-0.5"
                >
                  reportaproblem.apple.com
                  <ExternalLink className="w-3 h-3" />
                </a>{' '}
                or Google refund URLs immediately just because a customer is angry or demands a refund.
              </p>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-1.5">
              <strong className="text-white font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                CORRECT ESCALATION:
              </strong>
              <p className="text-slate-400 leading-relaxed">
                Consult SME Services Support in <code className="text-emerald-400 bg-black/40 px-1 py-0.5 rounded">#wizards_services_livesupport</code> with the ticket details. Once the SME responds with explicit approval, guide the customer.
              </p>
            </div>
          </div>

          {/* Platform Refund Guides & Macros (SME Approved Only) */}
          <div className="pt-2 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                SME-Approved Platform Instructions (Provide ONLY after SME approval)
              </span>
              <span className="text-[11px] text-emerald-400 font-mono bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded">
                Requires SME Green Light
              </span>
            </div>

            {/* Platform Sub-Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1 bg-slate-900 rounded-lg border border-slate-800">
              <button
                onClick={() => setActivePlatformGuide('google_refund')}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  activePlatformGuide === 'google_refund'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Google Play Refund (9 Steps)</span>
              </button>

              <button
                onClick={() => setActivePlatformGuide('google_dispute')}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  activePlatformGuide === 'google_dispute'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <AlertOctagon className="w-3.5 h-3.5" />
                <span>Google Play Dispute Process</span>
              </button>

              <button
                onClick={() => setActivePlatformGuide('apple_refund')}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  activePlatformGuide === 'apple_refund'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Apple className="w-3.5 h-3.5" />
                <span>Apple Store Refund</span>
              </button>
            </div>

            {/* TAB 1: Google Play Refund Request (9 Steps) */}
            {activePlatformGuide === 'google_refund' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="p-4 bg-emerald-950/40 border border-emerald-800/60 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                      <h5 className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                        Google Play Official Webpage
                      </h5>
                    </div>
                    <a
                      href="https://play.google.com/refund"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 underline font-mono"
                    >
                      <span>play.google.com/refund</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Once on the page, the customer should scroll down to the <strong>Refund Request</strong> section. It is very important that they are logged into their Google account with the email associated with the subscription.
                  </p>
                </div>

                {/* 9 Step Visual Breakdown Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
                  {[
                    { num: '1', title: 'Open Google Play', desc: 'Go to play.google.com on web browser.' },
                    { num: '2', title: 'Sign In', desc: 'Click "Sign In" in top-right corner with the subscription Google account.' },
                    { num: '3', title: 'Access Account Settings', desc: 'Click profile icon in top-right, then select "Payments & subscriptions".' },
                    { num: '4', title: 'Navigate to Order History', desc: 'Click "Budget & order history" to view purchases and subscription details.' },
                    { num: '5', title: 'Select the Transaction', desc: 'Find the Wyze subscription charge and click it to open details.' },
                    { num: '6', title: 'Click "Report a Problem"', desc: 'Under transaction details, click the "Report a problem" button.' },
                    { num: '7', title: 'Choose Your Issue', desc: 'Select the refund reason (e.g., accidental purchase, unintended buy).' },
                    { num: '8', title: 'Submit the Request', desc: 'Follow prompts to submit with any additional clarifying comments.' },
                    { num: '9', title: 'Confirmation', desc: 'Customer receives email confirmation; Google reviews and notifies of decision.' }
                  ].map((step) => (
                    <div key={step.num} className="bg-slate-900/90 border border-slate-800 p-3 rounded-lg space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px] flex items-center justify-center shrink-0 border border-emerald-500/30">
                          {step.num}
                        </span>
                        <strong className="text-white text-xs font-semibold">{step.title}</strong>
                      </div>
                      <p className="text-slate-400 text-[11px] leading-relaxed pl-7">{step.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Copyable Script */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Agent Response Script (9-Step Google Refund Instructions)
                    </span>
                    <button
                      onClick={() => handleCopy(CUSTOMER_MACROS.smeApprovedGoogleRefund, 'google')}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-md transition-colors cursor-pointer"
                    >
                      {copiedSmeGoogleMacro ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                      )}
                      <span>{copiedSmeGoogleMacro ? 'Copied' : 'Copy Google Refund Macro'}</span>
                    </button>
                  </div>
                  <pre className="p-4 bg-black/60 text-slate-300 rounded-lg text-xs font-mono whitespace-pre-wrap leading-relaxed border border-slate-800 max-h-72 overflow-y-auto">
                    {CUSTOMER_MACROS.smeApprovedGoogleRefund}
                  </pre>
                </div>
              </div>
            )}

            {/* TAB 2: File Refund Dispute Through Google */}
            {activePlatformGuide === 'google_dispute' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="p-4 bg-amber-950/40 border border-amber-800/60 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertOctagon className="w-4 h-4 text-amber-400" />
                      <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                        Google Play Dispute &amp; Unauthorized Charge Process
                      </h5>
                    </div>
                    <a
                      href="https://pay.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 underline font-mono"
                    >
                      <span>pay.google.com</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Provide this process when Google Play's initial automated refund was <strong>denied</strong>, or when the customer reports an <strong>unauthorized or unrecognized charge</strong> on their payment card.
                  </p>
                </div>

                {/* 5 Dispute Process Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-lg space-y-1">
                    <strong className="text-white font-semibold flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold text-[10px] flex items-center justify-center shrink-0 border border-amber-500/30">1</span>
                      Locate GPA Transaction ID
                    </strong>
                    <p className="text-slate-400 text-[11px] leading-relaxed pl-7">
                      Look on bank/card statement for <code className="text-amber-300 font-mono">GOOGLE*Wyze</code>. Obtain the 17-digit Google Play order number starting with <code className="text-amber-300 font-mono">GPA.</code> from receipt email or pay.google.com.
                    </p>
                  </div>

                  <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-lg space-y-1">
                    <strong className="text-white font-semibold flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold text-[10px] flex items-center justify-center shrink-0 border border-amber-500/30">2</span>
                      Verify Household Members
                    </strong>
                    <p className="text-slate-400 text-[11px] leading-relaxed pl-7">
                      Ensure a family member, child, or linked family group member did not initiate the renewal before submitting an unauthorized claim.
                    </p>
                  </div>

                  <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-lg space-y-1">
                    <strong className="text-white font-semibold flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold text-[10px] flex items-center justify-center shrink-0 border border-amber-500/30">3</span>
                      Submit Unauthorized Claim (Google Pay)
                    </strong>
                    <p className="text-slate-400 text-[11px] leading-relaxed pl-7">
                      Visit <a href="https://pay.google.com" target="_blank" rel="noopener noreferrer" className="text-amber-400 underline">pay.google.com</a> &rarr; "Report unauthorized charges" to submit the dispute form with GPA order number and transaction date.
                    </p>
                  </div>

                  <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-lg space-y-1">
                    <strong className="text-white font-semibold flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold text-[10px] flex items-center justify-center shrink-0 border border-amber-500/30">4</span>
                      Appeal a Denied Refund
                    </strong>
                    <p className="text-slate-400 text-[11px] leading-relaxed pl-7">
                      Reply directly to the Google Play denial decision email with context, or visit <a href="https://support.google.com/googleplay/gethelp" target="_blank" rel="noopener noreferrer" className="text-amber-400 underline">support.google.com/googleplay/gethelp</a> for live chat/phone support.
                    </p>
                  </div>

                  <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-lg space-y-1 md:col-span-2">
                    <strong className="text-white font-semibold flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px] flex items-center justify-center shrink-0 border border-emerald-500/30">5</span>
                      Resolution Timeline
                    </strong>
                    <p className="text-slate-400 text-[11px] leading-relaxed pl-7">
                      Google typically evaluates disputes and appeals within <strong>3 to 10 business days</strong> and sends status notices directly to the customer's Google email.
                    </p>
                  </div>
                </div>

                {/* Copyable Script */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Agent Response Script (Google Play Dispute &amp; Unauthorized Charge Guide)
                    </span>
                    <button
                      onClick={() => handleCopy(CUSTOMER_MACROS.googleDisputeProcess, 'dispute')}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-md transition-colors cursor-pointer"
                    >
                      {copiedGoogleDisputeMacro ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                      )}
                      <span>{copiedGoogleDisputeMacro ? 'Copied' : 'Copy Dispute Macro'}</span>
                    </button>
                  </div>
                  <pre className="p-4 bg-black/60 text-slate-300 rounded-lg text-xs font-mono whitespace-pre-wrap leading-relaxed border border-slate-800 max-h-72 overflow-y-auto">
                    {CUSTOMER_MACROS.googleDisputeProcess}
                  </pre>
                </div>
              </div>
            )}

            {/* TAB 3: Apple Store Refund */}
            {activePlatformGuide === 'apple_refund' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="p-4 bg-blue-950/40 border border-blue-800/60 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Apple className="w-4 h-4 text-blue-400" />
                      <h5 className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                        Apple Report a Problem Portal
                      </h5>
                    </div>
                    <a
                      href="https://reportaproblem.apple.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 underline font-mono"
                    >
                      <span>reportaproblem.apple.com</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Customer must sign in with their Apple ID on iPhone, iPad, or web browser to submit the refund request directly to Apple Support.
                  </p>
                </div>

                {/* Copyable Script */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Agent Response Script (Apple Store Refund Macro)
                    </span>
                    <button
                      onClick={() => handleCopy(CUSTOMER_MACROS.smeApprovedAppleRefund, 'apple')}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-md transition-colors cursor-pointer"
                    >
                      {copiedSmeAppleMacro ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                      )}
                      <span>{copiedSmeAppleMacro ? 'Copied' : 'Copy Apple Macro'}</span>
                    </button>
                  </div>
                  <pre className="p-4 bg-black/60 text-slate-300 rounded-lg text-xs font-mono whitespace-pre-wrap leading-relaxed border border-slate-800">
                    {CUSTOMER_MACROS.smeApprovedAppleRefund}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
