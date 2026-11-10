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
  MessageSquare
} from 'lucide-react';
import { CUSTOMER_MACROS } from '../data/trainingData';

export const RefundsSection: React.FC = () => {
  const [copiedFormat, setCopiedFormat] = useState<boolean>(false);
  const [copiedOfferMacro, setCopiedOfferMacro] = useState<boolean>(false);
  const [copiedSmeAppleMacro, setCopiedSmeAppleMacro] = useState<boolean>(false);

  const websiteTemplate = `ZD: 
Service: 
Issue/Question:
Key Details:`;

  const handleCopy = (text: string, type: 'format' | 'offer' | 'apple') => {
    navigator.clipboard.writeText(text);
    if (type === 'format') {
      setCopiedFormat(true);
      setTimeout(() => setCopiedFormat(false), 2000);
    } else if (type === 'offer') {
      setCopiedOfferMacro(true);
      setTimeout(() => setCopiedOfferMacro(false), 2000);
    } else {
      setCopiedSmeAppleMacro(true);
      setTimeout(() => setCopiedSmeAppleMacro(false), 2000);
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
                <span>Copy Slack Template</span>
              </>
            )}
          </button>
        </div>

        <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
          If a customer requests to cancel or requests to cancel and refund a <strong>website purchase</strong>, post the request under the <code className="bg-slate-100 px-2 py-0.5 rounded text-blue-700 font-semibold text-xs">#wizards_services_livesupport</code> channel using this exact standardized format:
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
              <strong className="block text-slate-900 font-semibold">1. Verify Account</strong>
              <p>Locate customer email in CRM and check user profile status.</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-xs text-slate-700 space-y-1">
              <strong className="block text-slate-900 font-semibold">2. Check Services Tab</strong>
              <p>Confirm the subscription source shows Apple IAP or Google Play IAP.</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-xs text-slate-700 space-y-1">
              <strong className="block text-slate-900 font-semibold">3. Request Transaction ID</strong>
              <p>Obtain Google GPA order number or Apple purchase screenshot.</p>
            </div>
          </div>
        </div>

        {/* Gate 2: Compensation First */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                2
              </span>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Confirmed IAP Handling &amp; Compensation Offer
                </h4>
                <p className="text-xs text-slate-500">
                  Explain platform constraints &amp; offer approved retention
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md">
              Mandatory Gate 2
            </span>
          </div>

          <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
            Explain clearly that <strong>Wyze cannot issue refunds directly</strong>, as payments for mobile apps are managed directly by Apple or Google.
          </p>

          <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 text-xs md:text-sm text-emerald-950 space-y-2">
            <strong className="block font-bold">Action Required:</strong>
            <p>
              Offer approved compensation as guided by <code className="bg-emerald-100 text-emerald-950 px-1 py-0.5 rounded font-mono text-xs">wizards_services_livesupport</code> (e.g. extension of service, complimentary renewal period, or account service credits).
            </p>
          </div>

          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Agent Response Script (Explanation + Compensation Offer)
              </span>
              <button
                onClick={() => handleCopy(CUSTOMER_MACROS.iapRefundRefusalOffer, 'offer')}
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
              {CUSTOMER_MACROS.iapRefundRefusalOffer}
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
                  If Customer Declines Compensation (SME Approval Gate)
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
            If the customer declines the compensation and continues to demand a refund, you may assist them with Apple or Google refund steps <strong>ONLY if explicitly approved by SME Services Support</strong>.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-1.5">
              <strong className="text-white font-semibold flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-red-500" />
                DO NOT DO THIS:
              </strong>
              <p className="text-slate-400 leading-relaxed">
                Do NOT send <code className="text-red-400 bg-black/40 px-1 py-0.5 rounded">reportaproblem.apple.com</code> or Google refund URLs immediately just because a customer is angry or refused compensation.
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

          {/* Approved Apple Macro */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                SME-Approved Apple Refund Macro (Provide ONLY after SME approval)
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
                <span>{copiedSmeAppleMacro ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="p-4 bg-black/60 text-slate-300 rounded-lg text-xs font-mono whitespace-pre-wrap leading-relaxed border border-slate-800">
              {CUSTOMER_MACROS.smeApprovedAppleRefund}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
