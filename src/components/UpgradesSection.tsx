import React, { useState } from 'react';
import { 
  Globe, 
  Apple, 
  Play, 
  AlertTriangle, 
  Calculator, 
  Sparkles, 
  ShieldAlert,
  Copy,
  Check,
  Smartphone,
  ArrowRight,
  DollarSign,
  Calendar,
  Layers
} from 'lucide-react';
import { CUSTOMER_MACROS } from '../data/trainingData';

export const UpgradesSection: React.FC = () => {
  // Simulator state
  const [priorPlanType, setPriorPlanType] = useState<'annual' | 'monthly'>('annual');
  const [targetPlanType, setTargetPlanType] = useState<'annual' | 'monthly'>('annual');
  const [remainingDaysInput, setRemainingDaysInput] = useState<number>(180);
  const [priorSource, setPriorSource] = useState<'website' | 'in_app'>('website');
  const [copiedMacro, setCopiedMacro] = useState<boolean>(false);

  // Exact pricing defined in user instructions
  // Cam Plus: $2.99/mo, $29.99/yr
  const CAM_PLUS_MONTHLY = 2.99;
  const CAM_PLUS_ANNUAL = 29.99;
  // Cam Unlimited: $9.99/mo, $99.99/yr
  const CAM_UNLIMITED_MONTHLY = 9.99;
  const CAM_UNLIMITED_ANNUAL = 99.99;

  // Prior Plan specs
  const priorPrice = priorPlanType === 'annual' ? CAM_PLUS_ANNUAL : CAM_PLUS_MONTHLY;
  const priorTotalDays = priorPlanType === 'annual' ? 365 : 30;
  const priorDailyRate = priorPrice / priorTotalDays;

  // Target Plan specs
  const targetPrice = targetPlanType === 'annual' ? CAM_UNLIMITED_ANNUAL : CAM_UNLIMITED_MONTHLY;
  const targetTotalDays = targetPlanType === 'annual' ? 365 : 30;
  const targetDailyRate = targetPrice / targetTotalDays;

  // Max input days for slider
  const maxDays = priorPlanType === 'annual' ? 365 : 30;
  const safeRemainingDays = Math.min(remainingDaysInput, maxDays);

  // Remaining dollar value calculation: based on remaining monetary amount of the plan
  const remainingDollarValue = Number((safeRemainingDays * priorDailyRate).toFixed(2));

  // Converted Free Trial Days on Cam Unlimited:
  // Remaining Dollar Value divided by the daily rate of the Cam Unlimited plan
  const convertedFreeTrialDays = targetDailyRate > 0 
    ? Math.floor(remainingDollarValue / targetDailyRate) 
    : 0;

  const handleCopy = () => {
    navigator.clipboard.writeText(CUSTOMER_MACROS.websiteUpgradeExplanation);
    setCopiedMacro(true);
    setTimeout(() => setCopiedMacro(false), 2000);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* Title */}
      <div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          Subscription Upgrades &amp; Proration Calculator
        </h2>
        <p className="mt-2 text-slate-600 text-sm md:text-base leading-relaxed">
          Master how free trial duration is calculated when upgrading to the <strong>Cam Unlimited Plan</strong>. Conversions are based on <strong>remaining monetary value</strong>, not literal calendar days, due to price tier differences.
        </p>
      </div>

      {/* CORE RULE 1: Monetary-Based Free Trial Rollover */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 shadow-sm space-y-3">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-emerald-950">
                Website Upgrade Rule: Auto-Cancel &amp; Value-Based Free Trial
              </h3>
              <span className="text-[11px] font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded">
                Website Policy
              </span>
            </div>
            <p className="text-xs md:text-sm text-emerald-900 leading-relaxed font-medium">
              Any website-purchased subscription <strong>cancels automatically</strong> upon upgrading to the <strong>Cam Unlimited Plan</strong>. The remaining unused time is converted based on its <strong>remaining monetary amount</strong> and added as a <strong>Free Trial</strong> onto the new Cam Unlimited Plan before regular billing commences.
            </p>
          </div>
        </div>
      </div>

      {/* CORE RULE 2: CRITICAL CONDITION FOR IN-APP PURCHASES */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 shadow-sm space-y-3">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-red-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-red-950">
                CRITICAL CONDITION: In-App Subscriptions DO NOT Cancel Automatically
              </h3>
              <span className="text-[11px] font-bold bg-red-200 text-red-900 px-2 py-0.5 rounded">
                Manual Action Required
              </span>
            </div>
            <p className="text-xs md:text-sm text-red-900 leading-relaxed font-medium">
              If the customer holds a remaining <strong>In-App subscription (Apple App Store or Google Play)</strong>, it <strong>WILL NOT cancel automatically</strong> when upgrading on the website! The customer <strong>needs to manually cancel them</strong> in their device settings (iOS Settings → Apple Account → Subscriptions, or Google Play Store → Subscriptions). Otherwise, Apple or Google will continue to bill them for the old single-cam plan.
            </p>
          </div>
        </div>
      </div>

      {/* PLAN PRICING COMPARISON TABLE */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-600" />
            Official Pricing &amp; Daily Rate Benchmark
          </h3>
          <span className="text-xs text-slate-500 font-medium">Current Wyze Services Matrix</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Cam Plus Single */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                Cam Plus (Single Camera)
              </h4>
              <span className="text-[11px] font-semibold text-slate-500">Tier 1</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs pt-1">
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[11px]">Monthly</span>
                <span className="text-sm font-bold text-slate-900">$2.99 / mo</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">≈ $0.100 / day</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[11px]">Annual</span>
                <span className="text-sm font-bold text-slate-900">$29.99 / yr</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">≈ $0.082 / day</span>
              </div>
            </div>
          </div>

          {/* Cam Unlimited */}
          <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-emerald-950 text-xs uppercase tracking-wider">
                Cam Unlimited Plan (All Cameras)
              </h4>
              <span className="text-[11px] font-semibold text-emerald-700">Tier 2</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs pt-1">
              <div className="bg-white p-2.5 rounded-lg border border-emerald-200">
                <span className="text-slate-500 block text-[11px]">Monthly</span>
                <span className="text-sm font-bold text-emerald-950">$9.99 / mo</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">≈ $0.333 / day</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-emerald-200">
                <span className="text-slate-500 block text-[11px]">Annual</span>
                <span className="text-sm font-bold text-emerald-950">$99.99 / yr</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">≈ $0.274 / day</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* INTERACTIVE VALUE-BASED PRORATION CALCULATOR */}
      <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900">
              Interactive Value-Based Free Trial Calculator
            </h3>
          </div>
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md self-start sm:self-auto">
            Monetary Amount Method
          </span>
        </div>

        {/* Informational Formula Callout */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1.5">
          <div className="font-bold text-slate-900 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-emerald-600" />
            <span>Why is it NOT literal remaining days?</span>
          </div>
          <p className="leading-relaxed">
            Because of the price difference between plans (Cam Plus is <strong>$2.99/mo or $29.99/yr</strong>, while Cam Unlimited is <strong>$9.99/mo or $99.99/yr</strong>), 1 day of Cam Plus ($0.082/day) does not equal 1 day of Cam Unlimited ($0.274/day). The system converts the <strong>remaining dollar amount</strong> into equivalent days on the new plan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-5 bg-slate-50 p-6 rounded-xl border border-slate-100">
            {/* Purchase Channel */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                1. Prior Subscription Billing Channel
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setPriorSource('website')}
                  className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    priorSource === 'website'
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Wyze Website (Auto-Cancels)
                </button>
                <button
                  onClick={() => setPriorSource('in_app')}
                  className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    priorSource === 'in_app'
                      ? 'bg-red-700 text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Apple / Google In-App (Manual)
                </button>
              </div>
            </div>

            {/* Prior Plan Cycle */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                2. Prior Cam Plus Plan Cycle
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setPriorPlanType('annual');
                    setRemainingDaysInput(180);
                  }}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    priorPlanType === 'annual'
                      ? 'bg-slate-900 text-white'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Annual ($29.99/yr)
                </button>
                <button
                  onClick={() => {
                    setPriorPlanType('monthly');
                    setRemainingDaysInput(15);
                  }}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    priorPlanType === 'monthly'
                      ? 'bg-slate-900 text-white'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Monthly ($2.99/mo)
                </button>
              </div>
            </div>

            {/* Target Upgrade Plan */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                3. Upgraded Cam Unlimited Plan Target
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setTargetPlanType('annual')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    targetPlanType === 'annual'
                      ? 'bg-emerald-700 text-white'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Cam Unlimited Annual ($99.99/yr)
                </button>
                <button
                  onClick={() => setTargetPlanType('monthly')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    targetPlanType === 'monthly'
                      ? 'bg-emerald-700 text-white'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Cam Unlimited Monthly ($9.99/mo)
                </button>
              </div>
            </div>

            {/* Remaining Duration Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                <span>Remaining Duration on Prior Plan:</span>
                <span className="text-emerald-700 font-extrabold text-sm">
                  {safeRemainingDays} Days {priorPlanType === 'annual' ? `(~${(safeRemainingDays / 30).toFixed(1)} mos)` : ''}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max={maxDays}
                value={safeRemainingDays}
                onChange={(e) => setRemainingDaysInput(Number(e.target.value))}
                className="w-full accent-[#65a30d] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>1 day</span>
                <span>{Math.round(maxDays / 2)} days</span>
                <span>{maxDays} days</span>
              </div>
            </div>
          </div>

          {/* Detailed Calculations Ledger */}
          <div className="lg:col-span-6 bg-slate-900 text-white p-6 rounded-xl space-y-5 shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Value-Based Conversion Breakdown
                </h4>
                <p className="text-[11px] text-slate-400">Step-by-step mathematical proration</p>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                priorSource === 'website' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
              }`}>
                {priorSource === 'website' ? 'WEBSITE AUTO-CANCEL' : 'IN-APP MANUAL CANCEL'}
              </span>
            </div>

            {/* Step 1 */}
            <div className="bg-slate-800/70 p-3.5 rounded-lg border border-slate-700 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-medium">Step 1: Remaining Dollar Amount</span>
                <span className="font-bold text-emerald-400">${remainingDollarValue.toFixed(2)}</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed font-mono">
                {safeRemainingDays} days × (${priorPrice} ÷ {priorTotalDays} days/yr) = <strong>${remainingDollarValue.toFixed(2)}</strong>
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-800/70 p-3.5 rounded-lg border border-slate-700 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-medium">Step 2: Target Cam Unlimited Daily Rate</span>
                <span className="font-bold text-slate-200">${targetDailyRate.toFixed(3)} / day</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed font-mono">
                ${targetPrice} ÷ {targetTotalDays} days = <strong>${targetDailyRate.toFixed(3)}/day</strong>
              </p>
            </div>

            {/* Step 3: Resulting Free Trial Days */}
            <div className="bg-emerald-950/60 p-4 rounded-lg border border-emerald-700/80 space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-emerald-300 font-bold uppercase tracking-wider">
                  Resulting Cam Unlimited Free Trial:
                </span>
                <span className="text-xl font-extrabold text-emerald-400 tabular-nums">
                  {priorSource === 'website' ? `${convertedFreeTrialDays} Days` : '0 Days (In-App)'}
                </span>
              </div>
              {priorSource === 'website' ? (
                <p className="text-[11px] text-emerald-200/90 leading-relaxed font-mono">
                  ${remainingDollarValue.toFixed(2)} remaining ÷ ${targetDailyRate.toFixed(3)}/day = <strong>{convertedFreeTrialDays} Days of Free Trial</strong>
                </p>
              ) : (
                <p className="text-[11px] text-red-300 leading-relaxed font-semibold">
                  ⚠️ In-App subscriptions do not roll over to website free trials and DO NOT cancel automatically!
                </p>
              )}
            </div>

            {/* Comparison Callout */}
            <div className="text-xs text-slate-300 space-y-2 pt-1 border-t border-slate-800">
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Literal Calendar Days of Prior Plan:</span>
                <span className="line-through text-slate-500">{safeRemainingDays} days</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Actual Free Trial Days Granted:</span>
                <span className="font-bold text-white">
                  {priorSource === 'website' ? `${convertedFreeTrialDays} days` : 'Manual cancellation required'}
                </span>
              </div>
            </div>

            {/* Agent Script for Customer */}
            <div className="p-3 bg-black/40 rounded-lg text-xs leading-relaxed text-slate-300 border border-slate-800">
              {priorSource === 'website' ? (
                <p>
                  <strong className="text-emerald-400">How to explain to customer:</strong> "Your ${remainingDollarValue.toFixed(2)} in remaining Cam Plus balance was converted into <strong>{convertedFreeTrialDays} days of Free Trial</strong> for the Cam Unlimited Plan. Because Cam Unlimited is ${targetPrice}/period with all-camera coverage, the free trial is calculated by your dollar balance rather than literal calendar days."
                </p>
              ) : (
                <p className="text-red-300">
                  <strong className="text-red-400">MANDATORY IN-APP WARNING:</strong> "Since your original plan is billed by Apple/Google, it will NOT cancel automatically and cannot be credited toward website plans. Please cancel it manually in your device settings to prevent double billing."
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Copyable Macro for Agents */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Smartphone className="w-4 h-4 text-emerald-600" />
            Customer Macro: Value-Based Upgrade Free Trial &amp; In-App Warning
          </h4>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            {copiedMacro ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copy Script</span>
              </>
            )}
          </button>
        </div>
        <pre className="p-4 bg-slate-900 text-slate-200 rounded-lg text-xs font-mono whitespace-pre-wrap leading-relaxed shadow-inner">
          {CUSTOMER_MACROS.websiteUpgradeExplanation}
        </pre>
      </div>
    </div>
  );
};
