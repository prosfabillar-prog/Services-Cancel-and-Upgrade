import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  RefreshCw, 
  Sparkles, 
  MessageSquare, 
  User, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { SCENARIOS } from '../data/trainingData';

export const ScenariosSection: React.FC = () => {
  const [selectedScenarioIdx, setSelectedScenarioIdx] = useState<number>(0);
  const [userChoices, setUserChoices] = useState<Record<string, string>>({});
  const [showResolution, setShowResolution] = useState<Record<string, boolean>>({});

  const scenario = SCENARIOS[selectedScenarioIdx];
  const currentChoiceId = userChoices[scenario.id];
  const selectedOption = scenario.options.find(o => o.id === currentChoiceId);

  const handleSelectOption = (scenarioId: string, optionId: string) => {
    setUserChoices(prev => ({ ...prev, [scenarioId]: optionId }));
    setShowResolution(prev => ({ ...prev, [scenarioId]: true }));
  };

  const handleResetScenario = (scenarioId: string) => {
    setUserChoices(prev => {
      const copy = { ...prev };
      delete copy[scenarioId];
      return copy;
    });
    setShowResolution(prev => {
      const copy = { ...prev };
      delete copy[scenarioId];
      return copy;
    });
  };

  const completedCount = Object.keys(userChoices).length;
  const correctCount = SCENARIOS.filter(s => {
    const choiceId = userChoices[s.id];
    const opt = s.options.find(o => o.id === choiceId);
    return opt?.isCorrect;
  }).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Interactive Practice Scenarios
          </h2>
          <p className="mt-2 text-slate-600 text-sm md:text-base leading-relaxed">
            Test your decision-making against real-world customer support interactions. Select your response to receive immediate coaching feedback.
          </p>
        </div>

        {/* Scorecard */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 self-start md:self-auto shrink-0">
          <div className="text-right">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
              Completed
            </span>
            <span className="text-sm font-extrabold text-slate-900 tabular-nums">
              {completedCount} of {SCENARIOS.length}
            </span>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div className="text-right">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
              Accuracy
            </span>
            <span className="text-sm font-extrabold text-emerald-700 tabular-nums">
              {completedCount > 0 ? Math.round((correctCount / completedCount) * 100) : 0}%
            </span>
          </div>
        </div>
      </div>

      {/* Scenario Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {SCENARIOS.map((s, idx) => {
          const isDone = Boolean(userChoices[s.id]);
          const chosenOpt = s.options.find(o => o.id === userChoices[s.id]);
          const isCorrect = chosenOpt?.isCorrect;

          return (
            <button
              key={s.id}
              onClick={() => setSelectedScenarioIdx(idx)}
              className={`px-4 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border flex items-center gap-2 cursor-pointer ${
                selectedScenarioIdx === idx
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>Scenario {idx + 1}</span>
              {isDone && (
                <span className={`w-2 h-2 rounded-full ${isCorrect ? 'bg-emerald-400' : 'bg-red-400'}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* Active Scenario Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Scenario Header Bar */}
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Scenario {selectedScenarioIdx + 1}
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-xs font-medium text-slate-600">
                {scenario.platform}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {scenario.title}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
              scenario.customerSentiment === 'Urgent' || scenario.customerSentiment === 'Frustrated'
                ? 'bg-red-50 text-red-700 border border-red-200'
                : 'bg-slate-100 text-slate-700'
            }`}>
              Sentiment: {scenario.customerSentiment}
            </span>
            {currentChoiceId && (
              <button
                onClick={() => handleResetScenario(scenario.id)}
                className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 font-semibold transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry</span>
              </button>
            )}
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          {/* Customer Support Context Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100 text-xs">
            <div>
              <span className="text-slate-600 block">Zendesk Ticket:</span>
              <span className="font-mono font-bold text-slate-800">{scenario.customerDetails.ticketId}</span>
            </div>
            <div>
              <span className="text-slate-600 block">Customer Email:</span>
              <span className="font-mono font-bold text-slate-800">{scenario.customerDetails.customerEmail}</span>
            </div>
            <div>
              <span className="text-slate-600 block">Services Tab Record:</span>
              <span className="font-bold text-slate-800">{scenario.customerDetails.servicesTab}</span>
            </div>
          </div>

          {/* Customer Chat Message Bubble */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
              Incoming Customer Message
            </span>
            <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl rounded-tl-sm text-sm leading-relaxed shadow-sm font-medium">
              "{scenario.customerMessage}"
            </div>
          </div>

          {/* Action Options */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
              Choose the Compliant Agent Action:
            </span>
            <div className="space-y-3">
              {scenario.options.map((option, idx) => {
                const isSelected = currentChoiceId === option.id;
                let optionStyle = 'border-slate-200 hover:border-slate-400 bg-white text-slate-800';

                if (isSelected) {
                  optionStyle = option.isCorrect
                    ? 'border-emerald-500 bg-emerald-50/70 text-slate-900 ring-2 ring-emerald-500/20'
                    : 'border-red-500 bg-red-50/70 text-slate-900 ring-2 ring-red-500/20';
                }

                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelectOption(scenario.id, option.id)}
                    className={`w-full text-left p-4 rounded-xl border text-xs md:text-sm leading-relaxed transition-all flex items-start gap-3 cursor-pointer ${optionStyle}`}
                  >
                    <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1 font-medium">{option.text}</span>
                    {isSelected && (
                      <span className="shrink-0 mt-0.5">
                        {option.isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Coaching Feedback Card */}
          {selectedOption && (
            <div className={`p-5 rounded-xl border animate-in fade-in duration-200 ${
              selectedOption.isCorrect 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950' 
                : 'bg-red-50 border-red-200 text-red-950'
            }`}>
              <div className="flex items-start gap-3">
                {selectedOption.isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                )}
                <div className="space-y-2">
                  <h4 className="text-sm font-bold">
                    {selectedOption.isCorrect ? 'Policy Compliant Action!' : 'Policy Violation Detected'}
                  </h4>
                  <p className="text-xs md:text-sm leading-relaxed">
                    {selectedOption.feedback}
                  </p>
                  <div className="text-xs font-semibold pt-1 text-slate-700">
                    <strong>Governing Standard:</strong> {selectedOption.policyReference}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Plan Resolution Summary */}
          {selectedOption && (
            <div className="pt-4 border-t border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Official Action Plan Summary
              </span>
              <p className="text-xs md:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-100 font-medium">
                {scenario.resolutionSummary}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
