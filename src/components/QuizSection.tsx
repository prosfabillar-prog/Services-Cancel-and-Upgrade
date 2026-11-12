import React, { useState } from 'react';
import { 
  GraduationCap, 
  CheckCircle2, 
  XCircle, 
  Download, 
  RefreshCw, 
  User, 
  Award,
  AlertCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/trainingData';

interface QuizSectionProps {
  userEmail?: string;
}

export const QuizSection: React.FC<QuizSectionProps> = ({ userEmail }) => {
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(QUIZ_QUESTIONS.length).fill(null));
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [agentId, setAgentId] = useState<string>(userEmail || 'Aldrin Fabillar');
  const [exportSuccess, setExportSuccess] = useState<boolean>(false);

  const handleSelect = (questionIdx: number, optionIdx: number) => {
    if (isSubmitted) return;
    const newAnswers = [...answers];
    newAnswers[questionIdx] = optionIdx;
    setAnswers(newAnswers);
  };

  const handleReset = () => {
    setAnswers(new Array(QUIZ_QUESTIONS.length).fill(null));
    setIsSubmitted(false);
    setExportSuccess(false);
  };

  // Score calculation
  let score = 0;
  answers.forEach((ans, idx) => {
    if (ans === QUIZ_QUESTIONS[idx].correct) score++;
  });
  const total = QUIZ_QUESTIONS.length;
  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= 80;

  const handleExportCSV = () => {
    const timestamp = new Date().toISOString();
    const status = passed ? 'PASS' : 'FAIL';
    const sanitizedAgent = agentId.trim() || 'SimUser';
    
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Timestamp,AgentID,Score,TotalQuestions,Percentage,Status,Module\n';
    csvContent += `"${timestamp}","${sanitizedAgent}",${score},${total},${percentage},"${status}","Wyze_Subscriptions_IAP_Update"\n`;
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Wyze_IAP_Certification_${sanitizedAgent.replace(/\s+/g, '_')}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 4000);
  };

  const allAnswered = !answers.includes(null);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Title */}
      <div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          Knowledge Check &amp; Certification
        </h2>
        <p className="mt-2 text-slate-600 text-sm md:text-base leading-relaxed">
          Validate your mastery of the new Quick IAP Guidance. Attain an 80% passing score to export your verified certification record for Google Looker Studio.
        </p>
      </div>

      {/* Submitted Results View */}
      {isSubmitted ? (
        <div className="space-y-8">
          {/* Result Card */}
          <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center relative overflow-hidden">
            <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-4 ${
              passed ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
            }`}>
              {passed ? <Award className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
            </div>

            <div className="text-5xl font-black text-slate-900 mb-2 tabular-nums">
              {score} / {total}
            </div>

            <div className="flex items-center justify-center gap-2 mb-3">
              <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                passed ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {passed ? 'Certified · 80%+ Benchmark Achieved' : 'Review Needed · 80% Benchmark Required'}
              </span>
              <span className="text-sm font-semibold text-slate-500 tabular-nums">
                ({percentage}%)
              </span>
            </div>

            <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed mb-6">
              {passed 
                ? 'Congratulations! You demonstrated compliant understanding of the Quick IAP Policy, Console & Services verification, and SME approval gates.' 
                : 'Please review the Quick IAP guidance and practice scenarios, then retake the assessment.'}
            </p>

            {/* Agent ID & Export Control Bar */}
            <div className="max-w-md mx-auto p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-slate-500 shrink-0" />
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Agent ID / Full Name:
                </span>
              </div>
              <input
                type="text"
                value={agentId}
                onChange={(e) => setAgentId(e.target.value)}
                placeholder="e.g. Aldrin Fabillar / Agent #1204"
                className="w-full px-3 py-2 text-xs font-semibold bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#65a30d]"
              />
              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <button
                  onClick={handleExportCSV}
                  className="flex-1 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Export for Looker Studio</span>
                </button>
                <button
                  onClick={handleReset}
                  className="py-2.5 px-4 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retake</span>
                </button>
              </div>

              {exportSuccess && (
                <div className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 p-2.5 rounded-lg flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Data exported successfully as CSV for Google Looker Studio upload.</span>
                </div>
              )}
            </div>
          </div>

          {/* Detailed Question Review */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Detailed Question Analysis
            </h3>
            {QUIZ_QUESTIONS.map((q, idx) => {
              const userAns = answers[idx];
              const isCorrect = userAns === q.correct;

              return (
                <div 
                  key={q.id} 
                  className={`bg-white p-6 rounded-xl border shadow-sm space-y-3 ${
                    isCorrect ? 'border-emerald-200' : 'border-red-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-2.5">
                      <span className={`w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                        isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {idx + 1}
                      </span>
                      <h4 className="text-sm font-semibold text-slate-900">{q.question}</h4>
                    </div>
                    {isCorrect ? (
                      <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Correct</span>
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-red-700 flex items-center gap-1 shrink-0">
                        <XCircle className="w-4 h-4" />
                        <span>Incorrect</span>
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-slate-600 space-y-1 pl-7">
                    <p>
                      <strong>Your answer:</strong>{' '}
                      <span className={isCorrect ? 'text-emerald-700 font-semibold' : 'text-red-700 font-semibold'}>
                        {userAns !== null ? q.options[userAns] : 'None selected'}
                      </span>
                    </p>
                    {!isCorrect && (
                      <p className="text-emerald-800">
                        <strong>Correct answer:</strong> {q.options[q.correct]}
                      </p>
                    )}
                  </div>

                  <div className="ml-7 p-3 bg-slate-50 rounded-lg text-xs text-slate-700 border border-slate-100 space-y-1">
                    <strong className="text-slate-900 block">Explanation:</strong>
                    <p className="leading-relaxed">{q.explanation}</p>
                    {q.policyReference && (
                      <p className="text-[11px] text-slate-500 pt-1">
                        <strong>Policy Citation:</strong> {q.policyReference}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Unsubmitted Questions Form */
        <div className="space-y-6">
          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Progress:
              </span>
              <span className="text-xs font-bold text-slate-900 tabular-nums">
                {answers.filter(a => a !== null).length} of {QUIZ_QUESTIONS.length} Answered
              </span>
            </div>
            <div className="text-xs text-slate-400">
              80% required to certify
            </div>
          </div>

          <div className="space-y-6">
            {QUIZ_QUESTIONS.map((q, qIndex) => (
              <div 
                key={q.id}
                className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4"
              >
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center shrink-0">
                    {qIndex + 1}
                  </span>
                  <h3 className="text-sm md:text-base font-bold text-slate-900 leading-snug">
                    {q.question}
                  </h3>
                </div>

                <div className="space-y-2.5 pl-9">
                  {q.options.map((opt, oIndex) => {
                    const isSelected = answers[qIndex] === oIndex;
                    return (
                      <button
                        key={oIndex}
                        onClick={() => handleSelect(qIndex, oIndex)}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs md:text-sm font-medium transition-all flex items-center gap-3 cursor-pointer ${
                          isSelected
                            ? 'border-[#65a30d] bg-emerald-50/70 text-slate-900 shadow-sm'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? 'border-[#65a30d] bg-[#65a30d]' : 'border-slate-300'
                        }`}>
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </span>
                        <span className="flex-1">{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Submit Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="text-xs text-slate-500">
              {!allAnswered ? 'Please answer all questions before submitting.' : 'All questions answered and ready for evaluation.'}
            </div>

            <button
              onClick={() => setIsSubmitted(true)}
              disabled={!allAnswered}
              className={`px-8 py-3 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm ${
                allAnswered
                  ? 'bg-slate-900 hover:bg-slate-800 text-white'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>Submit Evaluation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
