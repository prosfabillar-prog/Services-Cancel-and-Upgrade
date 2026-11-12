import React from 'react';
import { AlertTriangle, Globe, Apple, Play, ArrowRight, ShieldCheck, CheckCircle2, FileText } from 'lucide-react';
import { SectionId } from '../types';

interface OverviewSectionProps {
  onNavigate: (section: SectionId) => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* Title */}
      <div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          Wyze Subscription &amp; IAP Training
        </h2>
        <p className="mt-2 text-slate-600 text-sm md:text-base leading-relaxed max-w-3xl">
          Master purchase platform identification, customer self-service cancellation paths, and the updated Quick In-App Purchase (IAP) policy for Apple and Google subscriptions.
        </p>
      </div>

      {/* Mandatory Quick IAP Guidance Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 md:p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-700 flex items-center justify-center shrink-0 border border-amber-300/40">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-amber-950">
                New Quick IAP Guidance Active
              </h3>
              <span className="text-[11px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                Mandatory Protocol
              </span>
            </div>
            <p className="text-xs md:text-sm text-amber-900 leading-relaxed">
              Support agents must <strong>NOT</strong> provide Apple or Google Play refund steps immediately upon demand. You must complete the 3-step verification (Console check, Services Tab confirmation, and alternate email/screenshot if not located), explain platform constraints, and obtain <strong>explicit approval from SME Services Support</strong> in <code className="bg-amber-200/60 text-amber-950 px-1.5 py-0.5 rounded font-mono text-xs">#wizards_services_livesupport</code> before providing any platform refund instructions.
            </p>
          </div>
        </div>
      </div>

      {/* Website Upgrade & Proration Policy Notice */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 md:p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-emerald-950">
                Website Upgrade Policy (Cam Plus Annual: $29.99/yr)
              </h3>
              <span className="text-[11px] font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded">
                Updated Standard
              </span>
            </div>
            <p className="text-xs md:text-sm text-emerald-900 leading-relaxed">
              Any website-purchased subscription <strong>will cancel automatically</strong> when upgrading to the <strong>Cam Unlimited Plan</strong> and its remaining paid duration is <strong>added as a Free Trial</strong> onto Cam Unlimited!
            </p>
            <p className="text-xs text-red-700 font-semibold pt-1 border-t border-emerald-200">
              ⚠️ CRITICAL CONDITION: If customer has remaining In-App subscriptions (Apple/Google), they WILL NOT cancel automatically — the customer must cancel them manually in their device settings.
            </p>
          </div>
        </div>
      </div>

      {/* 3 Core Purchase Sources */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">
          Three Primary Billing Channels
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Website Card */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 transition-colors flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center mb-4">
                <Globe className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1">Wyze Website</h4>
              <p className="text-xs text-slate-500 mb-3 font-medium">Billed through Wyze.com (Stripe/Recurly)</p>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Wyze controls billing directly. Customers cancel at <code className="bg-slate-100 px-1 py-0.5 rounded text-[11px]">my.wyze.com</code>. Assisted cancellations and refund reviews must be posted to internal Microsoft Teams (<code className="bg-slate-100 px-1 py-0.5 rounded text-[11px]">#wizards_services_livesupport</code>).
              </p>
            </div>
            <button
              onClick={() => onNavigate('cancellation')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 pt-3 border-t border-slate-100"
            >
              <span>View Website Flow</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Apple IAP Card */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 transition-colors flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
                <Apple className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1">Apple App Store (iOS)</h4>
              <p className="text-xs text-slate-500 mb-3 font-medium">In-App Purchase via iPhone / iPad</p>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Apple controls the recurring billing and charges. Customer must cancel inside iOS Settings. Wyze cannot issue refunds directly. Verify Console/Services tab first; SME approval required before providing refund steps.
              </p>
            </div>
            <button
              onClick={() => onNavigate('cancellation')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-800 pt-3 border-t border-slate-100"
            >
              <span>View Apple iOS Screenshots</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Google Play Card */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 transition-colors flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-green-50 text-green-700 flex items-center justify-center mb-4">
                <Play className="w-5 h-5 fill-green-600" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1">Google Play Store (Android)</h4>
              <p className="text-xs text-slate-500 mb-3 font-medium">In-App Purchase via Google Play</p>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Google controls payment processing. Customer cancels inside Google Play Store. Transaction ID begins with <code className="bg-slate-100 px-1 py-0.5 rounded text-[11px]">GPA.</code>. Strict Console verification &amp; SME gatekeeping applies.
              </p>
            </div>
            <button
              onClick={() => onNavigate('cancellation')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 hover:text-green-800 pt-3 border-t border-slate-100"
            >
              <span>View Google Play Screenshots</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* The 3 Golden Rules Grid */}
      <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-6 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          The 3 Golden Rules for IAP Concerns
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-400">RULE 01</div>
            <h4 className="text-sm font-semibold text-slate-900">Standard Process for IAP (Required First)</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              1. Locate customer email in Console and check user profile status.<br />
              2. Check Services Tab - Confirm the subscription source shows Apple IAP or Google Play IAP.<br />
              3. If cx email cannot be located, ask for another email; if still not showing, ask for a screenshot of the charge.
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-400">RULE 02</div>
            <h4 className="text-sm font-semibold text-slate-900">Explain Platform Constraints</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Clarify that Wyze cannot issue refunds directly for mobile store purchases because Apple and Google handle payment processing and credentials directly.
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-400">RULE 03</div>
            <h4 className="text-sm font-semibold text-slate-900">SME Approval Gate</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              If the customer requests platform refund steps, do NOT send Apple or Google refund links yet. You must receive <strong>explicit SME approval</strong> from <code className="bg-slate-100 px-1 rounded text-[11px]">#wizards_services_livesupport</code> before providing refund steps.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Interactive Actions */}
      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          onClick={() => onNavigate('scenarios')}
          className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-2 shadow-sm"
        >
          <span>Start Practice Scenarios</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => onNavigate('decision-tool')}
          className="px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-2"
        >
          <FileText className="w-4 h-4 text-emerald-600" />
          <span>Launch Policy Checker</span>
        </button>
        <button
          onClick={() => onNavigate('quiz')}
          className="px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Take Knowledge Check</span>
        </button>
      </div>
    </div>
  );
};
