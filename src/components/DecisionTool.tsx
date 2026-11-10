import React, { useState } from 'react';
import { 
  GitBranch, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Copy, 
  Check, 
  HelpCircle,
  FileCheck2,
  RefreshCw
} from 'lucide-react';
import { CUSTOMER_MACROS } from '../data/trainingData';

export const DecisionTool: React.FC = () => {
  const [platform, setPlatform] = useState<'website' | 'apple' | 'google'>('apple');
  const [intent, setIntent] = useState<'cancel_only' | 'refund_demand' | 'upgrade' | 'refused_comp'>('refund_demand');
  const [status, setStatus] = useState<'initial' | 'verified' | 'comp_offered' | 'sme_approved'>('initial');
  const [copied, setCopied] = useState<boolean>(false);

  // Calculate resolution and guidance
  const getGuidance = () => {
    if (intent === 'cancel_only') {
      if (platform === 'website') {
        return {
          status: 'compliant',
          title: 'Direct to my.wyze.com / Assist if needed',
          alertType: 'info',
          rule: 'Explain self-service cancellation on my.wyze.com/account/plans. If agent assistance requested, post to #wizards_services_livesupport.',
          actionList: [
            'Provide steps to my.wyze.com/account/plans',
            'Advise service continues until cycle end date',
            'No SME approval needed for self-service cancellation'
          ],
          macro: 'You can cancel your Wyze subscription anytime by logging in at my.wyze.com/account/plans, clicking Manage Plan, and selecting Cancel Plan.'
        };
      } else if (platform === 'apple') {
        return {
          status: 'compliant',
          title: 'Guide Customer to iOS Settings (Self-Service)',
          alertType: 'success',
          rule: 'Apple manages recurring billing. Guide customer to iPhone Settings → Apple Account → Subscriptions → Wyze → Cancel.',
          actionList: [
            'Explain Apple manages billing tokens',
            'Provide 4-step iOS Settings guide',
            'CRITICAL: Never claim you canceled it from Wyze internal tools'
          ],
          macro: CUSTOMER_MACROS.appleCancel
        };
      } else {
        return {
          status: 'compliant',
          title: 'Guide Customer to Google Play Store (Self-Service)',
          alertType: 'success',
          rule: 'Google Play manages subscription billing. Guide customer to Play Store → Profile Icon → Payments & Subscriptions → Subscriptions → Cancel.',
          actionList: [
            'Explain Google Play manages billing tokens',
            'Provide Play Store step-by-step navigation',
            'Customer subscription will not renew next cycle'
          ],
          macro: CUSTOMER_MACROS.googleCancel
        };
      }
    }

    if (intent === 'upgrade') {
      return {
        status: 'compliant',
        title: 'Website Auto-Cancel + Value-Based Free Trial (Check for In-App Manual Cancel)',
        alertType: 'info',
        rule: 'Website purchases cancel automatically and roll over remaining monetary value as a Free Trial on Cam Unlimited ($9.99/mo or $99.99/yr) based on dollar amount, not literal calendar days. CRITICAL: Remaining In-App (Apple/Google) subscriptions DO NOT cancel automatically and must be manually canceled by the customer.',
        actionList: [
          'Verify original plan, new plan, and billing platforms in Services tab',
          'Website purchase: previous website plan cancels automatically; remaining dollar value is divided by Cam Unlimited daily rate to calculate Free Trial days',
          'Explain price tier difference ($2.99/$29.99 Cam Plus vs $9.99/$99.99 Cam Unlimited) explains why trial days do not match calendar days',
          'CRITICAL CONDITION: If customer has remaining Apple or Google In-App subscriptions, explain they WILL NOT cancel automatically and they must manually cancel them in their device settings',
          'Do NOT assume an erroneous duplicate charge'
        ],
        macro: CUSTOMER_MACROS.websiteUpgradeExplanation
      };
    }

    // Refund demand handling
    if (platform === 'website') {
      return {
        status: 'compliant',
        title: 'Post Assisted Cancel/Refund to wizards_services_livesupport',
        alertType: 'info',
        rule: 'Wyze controls website transactions. Post ticket details in Slack using the mandatory 4-field template.',
        actionList: [
          'Verify transaction in Stripe / Recurly under Services tab',
          'Post using ZD:, Service:, Issue/Question:, Key Details:',
          'Wait for Tier 2 / Services support review'
        ],
        macro: `ZD: [Ticket #]\nService: [Cam Plus]\nIssue/Question: Customer requested cancel and refund for renewal\nKey Details: Verified website purchase.`
      };
    }

    // Apple / Google IAP Refund Demand
    if (status === 'initial') {
      return {
        status: 'blocked',
        title: 'STOP: Verify Account & Check Services Tab First',
        alertType: 'danger',
        rule: 'DO NOT provide platform refund steps. You must first verify account, inspect Services tab, and request the Transaction ID.',
        actionList: [
          'Verify customer email in CRM',
          'Confirm subscription is an Apple or Google IAP in Services tab',
          'Request Google GPA transaction ID or Apple invoice screenshot',
          'DO NOT send reportaproblem.apple.com or Google refund links yet'
        ],
        macro: 'To help you with this subscription charge, could you please provide your order transaction ID (for Google Play: starts with GPA, for Apple: invoice screenshot)? This allows me to verify your account in our services system.'
      };
    }

    if (status === 'verified') {
      return {
        status: 'warning',
        title: 'Offer Approved Compensation (Gate 2)',
        alertType: 'warning',
        rule: 'Explain Wyze cannot refund IAPs directly. Present approved compensation as guided by wizards_services_livesupport.',
        actionList: [
          'Explain Wyze cannot issue refunds directly for IAP charges',
          'Offer approved compensation (e.g., 2 free months of service or service credit)',
          'Wait for customer reaction before any further escalation',
          'DO NOT provide platform refund steps at this stage'
        ],
        macro: CUSTOMER_MACROS.iapRefundRefusalOffer
      };
    }

    if (status === 'comp_offered') {
      return {
        status: 'blocked',
        title: 'HALT: SME Services Support Approval Required (Gate 3)',
        alertType: 'danger',
        rule: 'Customer declined compensation. You are FORBIDDEN from giving platform refund steps without explicit SME approval.',
        actionList: [
          'Acknowledge customer refusal calmly',
          'Post ticket details to #wizards_services_livesupport requesting refund step authorization',
          'WAIT for explicit SME approval',
          'DO NOT send refund URLs until green light is granted'
        ],
        macro: 'I completely understand your position. I am conferring directly with our Senior Services Support team regarding your account details. Please allow me a brief moment while I check on the approved options for your case.'
      };
    }

    if (status === 'sme_approved') {
      return {
        status: 'compliant',
        title: 'SME Approved: Assist with Platform Refund Steps',
        alertType: 'success',
        rule: 'SME Services Support has granted explicit approval. You may now guide the customer to Apple or Google refund portals.',
        actionList: [
          platform === 'apple'
            ? 'Guide customer to reportaproblem.apple.com'
            : 'Guide customer to support.google.com/googleplay/workflow/8511911',
          'Explain the platform will evaluate and issue the refund directly',
          'Document SME approval in the internal ticket notes'
        ],
        macro: platform === 'apple' 
          ? CUSTOMER_MACROS.smeApprovedAppleRefund 
          : 'Since your purchase was billed by Google Play and approved by our support team, you can request a refund directly via Google Play Support at support.google.com/googleplay or through your Google Play order history.'
      };
    }

    return {
      status: 'info',
      title: 'Follow Standard Workflow',
      alertType: 'info',
      actionList: ['Verify details'],
      rule: 'Proceed according to policy.',
      macro: ''
    };
  };

  const guidance = getGuidance();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Title */}
      <div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          Interactive Policy Checker
        </h2>
        <p className="mt-2 text-slate-600 text-sm md:text-base leading-relaxed">
          Triage any live customer inquiry. Select the purchase channel, customer request, and current step to verify policy compliance and generate the approved response.
        </p>
      </div>

      {/* Interactive Form Controls */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1: Platform */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              1. Purchase Platform
            </label>
            <div className="space-y-2">
              {[
                { id: 'apple', label: 'Apple iOS App Store' },
                { id: 'google', label: 'Google Play (Android)' },
                { id: 'website', label: 'Wyze Website (Wyze.com)' }
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPlatform(p.id as any)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    platform === p.id
                      ? 'border-[#65a30d] bg-emerald-50/50 text-slate-900 shadow-sm'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Intent */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              2. Customer Intent
            </label>
            <div className="space-y-2">
              {[
                { id: 'cancel_only', label: 'Cancel upcoming renewal only' },
                { id: 'refund_demand', label: 'Demanding refund for charge' },
                { id: 'upgrade', label: 'Questions about upgrade / double bill' }
              ].map((it) => (
                <button
                  key={it.id}
                  onClick={() => setIntent(it.id as any)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    intent === it.id
                      ? 'border-[#65a30d] bg-emerald-50/50 text-slate-900 shadow-sm'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  {it.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Current State */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              3. Current Case Status
            </label>
            <div className="space-y-2">
              {[
                { id: 'initial', label: '1. Initial contact (Unverified)' },
                { id: 'verified', label: '2. Verified in Services + Has Tx ID' },
                { id: 'comp_offered', label: '3. Offered comp (Customer DECLINED)' },
                { id: 'sme_approved', label: '4. SME Services Support APPROVED' }
              ].map((st) => (
                <button
                  key={st.id}
                  onClick={() => setStatus(st.id as any)}
                  disabled={platform === 'website' || intent === 'cancel_only'}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    platform === 'website' || intent === 'cancel_only'
                      ? 'opacity-40 cursor-not-allowed bg-slate-50 border-slate-200 text-slate-400'
                      : status === st.id
                      ? 'border-[#65a30d] bg-emerald-50/50 text-slate-900 shadow-sm'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Result Card */}
      <div className={`p-6 md:p-8 rounded-xl border shadow-sm space-y-6 ${
        guidance.alertType === 'danger'
          ? 'bg-red-50 border-red-200 text-red-950'
          : guidance.alertType === 'warning'
          ? 'bg-amber-50 border-amber-200 text-amber-950'
          : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4 border-slate-200/60">
          <div className="flex items-center gap-3">
            {guidance.alertType === 'danger' ? (
              <XCircle className="w-7 h-7 text-red-600 shrink-0" />
            ) : guidance.alertType === 'warning' ? (
              <AlertCircle className="w-7 h-7 text-amber-600 shrink-0" />
            ) : (
              <CheckCircle className="w-7 h-7 text-emerald-600 shrink-0" />
            )}
            <div>
              <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                guidance.alertType === 'danger'
                  ? 'bg-red-200 text-red-900'
                  : guidance.alertType === 'warning'
                  ? 'bg-amber-200 text-amber-900'
                  : 'bg-emerald-100 text-emerald-800'
              }`}>
                {guidance.status === 'blocked' ? 'ACTION BLOCKED' : guidance.status === 'warning' ? 'INTERMEDIATE GATE' : 'POLICY APPROVED'}
              </span>
              <h3 className="text-lg font-bold mt-1 text-slate-900">{guidance.title}</h3>
            </div>
          </div>

          <button
            onClick={() => {
              setPlatform('apple');
              setIntent('refund_demand');
              setStatus('initial');
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors self-start md:self-auto cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Form</span>
          </button>
        </div>

        {/* Governing Policy Rule */}
        <div className="space-y-1">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Governing Policy Rule
          </h4>
          <p className="text-sm text-slate-800 leading-relaxed font-medium">
            {guidance.rule}
          </p>
        </div>

        {/* Mandatory Action Checklist */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Mandatory Action Checklist
          </h4>
          <ul className="space-y-2">
            {guidance.actionList.map((act, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                <FileCheck2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{act}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Approved Customer Macro to Send */}
        {guidance.macro && (
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Approved Response Script
              </h4>
              <button
                onClick={() => handleCopy(guidance.macro)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                )}
                <span>{copied ? 'Copied' : 'Copy Response'}</span>
              </button>
            </div>
            <pre className="p-4 bg-slate-900 text-slate-200 rounded-lg text-xs font-mono whitespace-pre-wrap leading-relaxed shadow-inner">
              {guidance.macro}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
