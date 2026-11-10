import React, { useState, useEffect } from 'react';

// --- Data Definitions ---
const SECTIONS = [
  { id: 'overview', title: 'Overview', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { id: 'cancellation', title: 'Cancellation', icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { id: 'refunds', title: 'Refunds (New IAP Policy)', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
  { id: 'upgrades', title: 'Upgrades', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
  { id: 'scenarios', title: 'Practice Scenarios', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
  { id: 'quiz', title: 'Knowledge Check', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' }
];

const SCENARIOS = [
  { 
    title: "Scenario 1 — Apple Cancellation", 
    setup: "The customer says they subscribed through the Wyze app on an iPhone and wants to stop the next renewal.", 
    resolution: "Confirm it is an Apple-billed subscription. Explain that Apple manages the subscription and guide the customer to iPhone Settings → Apple Account → Subscriptions → Wyze → Cancel. Do not claim you have canceled it from Wyze's side." 
  },
  { 
    title: "Scenario 2 — Google Play Refund Demand", 
    setup: "The customer purchased through Google Play and wants their latest charge refunded immediately.", 
    resolution: "Follow the standard process: Verify the account, check the Services tab, and request the transaction ID. Explain Wyze cannot issue refunds directly. Offer approved compensation via wizards_services_livesupport. ONLY if they decline AND you get explicit approval from SME Services Support, assist with Google Play refund steps." 
  },
  { 
    title: "Scenario 3 — Website Cancel & Refund Request", 
    setup: "Customer says they paid on the Wyze website and wants to cancel and get a refund for their recent renewal.", 
    resolution: "Verify account and purchase details. Post the request in the wizards_services_livesupport channel using the required format: ZD:, Service:, Issue/Question:, Key Details:." 
  },
  { 
    title: "Scenario 4 — Irate Apple IAP Refund Demand", 
    setup: "Customer is unhappy and demands a refund for an Apple IAP. They refused the initial compensation offer.", 
    resolution: "Do not immediately provide Apple refund links. You MUST get explicit approval from SME Services Support first. Once approved by SME, you may guide them to reportaproblem.apple.com." 
  },
  { 
    title: "Scenario 5 — Upgrade 'Double' Charge", 
    setup: "Customer believes they were charged twice after moving to a higher-tier plan.", 
    resolution: "Do not assume duplicate charge. Verify original/new plan, source, dates, and billing. Explain the applicable upgrade proration/credit behavior ONLY after confirming the platform process." 
  }
];

const QUIZ_QUESTIONS = [
  { q: "What is the FIRST step for any In-App Purchase (IAP) concern?", options: ["Send them to Apple/Google refund pages", "Verify account, check Services tab, request transaction ID", "Issue a Wyze credit immediately"], correct: 1, explanation: "Always follow the standard process first: Verify the customer's account, check the Services tab, and request screenshots or the transaction ID." },
  { q: "If a charge is confirmed as an IAP (Apple/Google), what should you offer first instead of a refund?", options: ["A free camera", "Approved compensation as guided by wizards_services_livesupport", "A direct website refund"], correct: 1, explanation: "Explain Wyze cannot issue refunds directly and offer approved compensation as guided by wizards_services_livesupport." },
  { q: "When are you allowed to assist a customer with Apple/Google refund steps?", options: ["Whenever the customer asks for it", "Only if explicitly approved by SME Services Support", "After 30 days of the purchase"], correct: 1, explanation: "If the customer declines compensation, you may assist with platform refund steps ONLY if explicitly approved by SME Services Support." },
  { q: "Who manages billing and cancellation for a Google Play In-App Purchase?", options: ["Wyze website", "Google Play", "Apple"], correct: 1, explanation: "Google Play manages Google Play subscription billing and cancellation." },
  { q: "Does canceling a subscription automatically refund the remaining paid time?", options: ["Yes, always", "No, they are separate processes", "Only for website purchases"], correct: 1, explanation: "Cancellation generally stops future renewal. Refund eligibility is a separate matter entirely." }
];

export default function WyzeTrainingSimulator() {
  const [currentSection, setCurrentSection] = useState('overview');
  const [visitedSections, setVisitedSections] = useState(new Set(['overview']));
  const [quizAnswers, setQuizAnswers] = useState(new Array(QUIZ_QUESTIONS.length).fill(null));
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [modalMessage, setModalMessage] = useState(null);

  // Mark section as visited when it changes
  useEffect(() => {
    setVisitedSections(prev => {
      const newSet = new Set(prev);
      newSet.add(currentSection);
      return newSet;
    });
  }, [currentSection]);

  const progress = Math.round((visitedSections.size / SECTIONS.length) * 100);

  const handleExportCSV = (score, passed) => {
    const timestamp = new Date().toISOString();
    const total = QUIZ_QUESTIONS.length;
    const status = passed ? 'Pass' : 'Fail';
    
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Timestamp,AgentID,Score,TotalQuestions,Percentage,Status,Module\n";
    csvContent += `${timestamp},SimUser,${score},${total},${Math.round((score/total)*100)},${status},Wyze_Subscriptions_IAP_Update\n`;
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Wyze_Training_Result_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setModalMessage({
      title: "Export Successful",
      body: "Data exported successfully. You can now upload this CSV to Google Looker Studio."
    });
  };

  const renderSidebar = () => (
    <aside className="w-full md:w-72 bg-slate-900 text-slate-300 flex flex-col flex-shrink-0 z-20 shadow-xl transition-all">
      <div className="p-6 bg-slate-950">
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <svg className="w-6 h-6 text-[#65a30d]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          Wyze Training
        </h1>
        <p className="text-xs text-slate-400 mt-2">IAP Guidance Simulator</p>
      </div>

      <div className="px-6 py-4 border-b border-slate-800">
        <div className="flex justify-between text-xs mb-1 font-medium">
          <span>Training Progress</span>
          <span className="text-white">{progress}%</span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-[#65a30d] transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        {SECTIONS.map(sec => (
          <button
            key={sec.id}
            onClick={() => setCurrentSection(sec.id)}
            className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors border-l-2 ${
              currentSection === sec.id 
                ? 'border-[#65a30d] text-white bg-slate-800/50' 
                : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-800/30'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={sec.icon} />
            </svg>
            {sec.title}
            {visitedSections.has(sec.id) && sec.id !== currentSection && (
              <svg className="w-4 h-4 ml-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center">
        Wyze Services Internal
      </div>
    </aside>
  );

  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-50 font-sans overflow-hidden">
      {renderSidebar()}
      
      <main className="flex-1 overflow-y-auto p-6 md:p-10 lg:p-14 relative">
        <div className="max-w-5xl mx-auto pb-20 animate-fade-in">
          {currentSection === 'overview' && <OverviewSection />}
          {currentSection === 'cancellation' && <CancellationSection />}
          {currentSection === 'refunds' && <RefundsSection />}
          {currentSection === 'upgrades' && <UpgradesSection />}
          {currentSection === 'scenarios' && <ScenariosSection />}
          {currentSection === 'quiz' && (
            <QuizSection 
              quizAnswers={quizAnswers} 
              setQuizAnswers={setQuizAnswers} 
              quizSubmitted={quizSubmitted} 
              setQuizSubmitted={setQuizSubmitted} 
              onExport={handleExportCSV}
            />
          )}
        </div>
      </main>

      {/* Custom Modal */}
      {modalMessage && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-bold text-slate-900 mb-2">{modalMessage.title}</h3>
            <p className="text-slate-600 mb-6 text-sm">{modalMessage.body}</p>
            <div className="flex justify-end">
              <button 
                onClick={() => setModalMessage(null)} 
                className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Section Components ---

function OverviewSection() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome to the Simulator</h2>
        <p className="mt-2 text-slate-600 text-lg">Identify purchase sources and explain the correct processes, following the latest IAP guidance.</p>
      </div>
      
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-600 p-6 rounded-r-xl mb-10 shadow-sm">
        <h3 className="text-lg font-bold text-red-900 mb-1">🚨 New Quick IAP Guidance Active</h3>
        <p className="text-red-800 text-sm">
          Agents must <strong>NOT</strong> provide Apple/Google refund steps immediately. You must follow the standard process, offer approved compensation via <code className="bg-red-100 px-1 rounded">wizards_services_livesupport</code>, and gain explicit approval from <strong>SME Services Support</strong> before assisting with platform refunds.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="w-12 h-12 bg-slate-100 text-slate-700 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
          </div>
          <h4 className="text-lg font-bold text-slate-900 mb-2">Website Purchase</h4>
          <p className="text-sm text-slate-600 leading-relaxed">Wyze-managed billing. Review account in internal tools. Coordinate with Services for approved retention options.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm.135-4.144c-2.457 0-4.004-1.386-4.004-3.584 0-2.184 1.638-3.57 4.025-3.57 2.457 0 3.99 1.386 3.99 3.57 0 2.198-1.617 3.584-4.011 3.584zm.014-1.148c1.554 0 2.373-.966 2.373-2.436 0-1.47-.798-2.436-2.352-2.436-1.554 0-2.394.966-2.394 2.436 0 1.47.819 2.436 2.373 2.436z"/></svg>
          </div>
          <h4 className="text-lg font-bold text-slate-900 mb-2">Apple IAP</h4>
          <p className="text-sm text-slate-600 leading-relaxed">Subject to new Quick IAP Guidance. Do not promise refunds or offer Apple steps without SME approval.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M3.705 2.115A2 2 0 002 4v16a2 2 0 001.705 1.885l11-5.5a2 2 0 000-3.77l-11-5.5z"/></svg>
          </div>
          <h4 className="text-lg font-bold text-slate-900 mb-2">Google Play IAP</h4>
          <p className="text-sm text-slate-600 leading-relaxed">Subject to new Quick IAP Guidance. Follow standard process and compensation paths first.</p>
        </div>
      </div>
    </div>
  );
}

function CancellationSection() {
  const [activeTab, setActiveTab] = useState('website');

  const content = {
    website: (
      <>
        <h3 className="font-bold text-lg text-slate-800 mb-3">Customer self-service steps (Website)</h3>
        <ol className="list-decimal pl-5 space-y-2 text-slate-600">
          <li>Go to <a href="#" className="text-blue-600 hover:underline">my.wyze.com/account/plans</a>.</li>
          <li>Sign in using the email associated with the subscription.</li>
          <li>Locate the plan and select <strong className="text-slate-800">Manage Plan</strong>.</li>
          <li>Select <strong className="text-slate-800">Cancel Plan</strong> and follow the confirmation prompts.</li>
        </ol>
        <div className="mt-4 p-5 bg-slate-100 rounded-xl text-sm text-slate-700 border border-slate-200">
          <strong>Agent Action (Assisted Cancel/Refund):</strong> If the customer requests you to cancel or request cancel and refund for a website purchase, post it under <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 font-semibold text-blue-700">wizards_services_livesupport</code> using this exact format:
          <pre className="mt-3 bg-slate-800 text-slate-300 p-4 rounded-lg text-sm whitespace-pre-wrap font-mono leading-relaxed shadow-inner">
{`ZD: 
Service: 
Issue/Question:
Key Details:`}
          </pre>
        </div>
      </>
    ),
    apple: (
      <>
        <h3 className="font-bold text-lg text-slate-800 mb-3">Apple cancellation steps (iOS)</h3>
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800">
          <strong>Note:</strong> The images below are placeholders in this web preview. To see your actual screenshots, download this code and place the image files in the same folder as the HTML file.
        </div>
        <ol className="list-decimal pl-5 space-y-8 text-slate-600">
          <li>
            <p className="mb-3">Open <strong className="text-slate-800">Settings</strong> on the iPhone or iPad and tap the customer's <strong className="text-slate-800">Apple Account</strong> name.</p>
            <img src="https://placehold.co/300x600/17212b/ffffff?text=IMG_9306.PNG" alt="Apple Settings" className="max-h-80 rounded-xl shadow-md border border-slate-200 object-contain" />
          </li>
          <li>
            <p className="mb-3">Tap <strong className="text-slate-800">Subscriptions</strong>.</p>
            <img src="https://placehold.co/300x600/17212b/ffffff?text=IMG_9307.PNG" alt="Apple Account Subscriptions" className="max-h-80 rounded-xl shadow-md border border-slate-200 object-contain" />
          </li>
          <li>
            <p className="mb-3">Select the Wyze subscription and tap <strong className="text-slate-800">Cancel Subscription</strong>.</p>
            <img src="https://placehold.co/300x600/17212b/ffffff?text=IMG_9308.jpg" alt="Apple Subscriptions List" className="max-h-80 rounded-xl shadow-md border border-slate-200 object-contain" />
          </li>
        </ol>
      </>
    ),
    google: (
      <>
        <h3 className="font-bold text-lg text-slate-800 mb-3">Google Play cancellation steps (Android)</h3>
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800">
          <strong>Note:</strong> The images below are placeholders in this web preview. To see your actual screenshots, download this code and place the image files in the same folder as the HTML file.
        </div>
        <ol className="list-decimal pl-5 space-y-8 text-slate-600">
          <li>
            <p className="mb-3">Open the <strong className="text-slate-800">Google Play Store</strong> and tap the profile icon.</p>
            <img src="https://placehold.co/300x600/17212b/ffffff?text=Screenshot_2026-11-11-02-27-35-712_com.android.vending.jpg" alt="Google Play Profile" className="max-h-80 max-w-xs rounded-xl shadow-md border border-slate-200 object-contain" />
          </li>
          <li>
            <p className="mb-3">Select <strong className="text-slate-800">Payments & subscriptions</strong>.</p>
            <img src="https://placehold.co/300x600/17212b/ffffff?text=Screenshot_2026-11-11-02-27-45-905_com.android.vending.jpg" alt="Payments and subscriptions menu" className="max-h-80 max-w-xs rounded-xl shadow-md border border-slate-200 object-contain" />
          </li>
          <li>
            <p className="mb-3">Tap <strong className="text-slate-800">Subscriptions</strong>.</p>
            <img src="https://placehold.co/300x600/17212b/ffffff?text=Screenshot_2026-11-11-02-27-52-247_com.android.vending.jpg" alt="Subscriptions option" className="max-h-80 max-w-xs rounded-xl shadow-md border border-slate-200 object-contain" />
          </li>
          <li>
            <p className="mb-3">Select the Wyze subscription and tap <strong className="text-slate-800">Cancel subscription</strong>.</p>
            <img src="https://placehold.co/300x600/17212b/ffffff?text=Screenshot_2026-11-11-02-28-13-166_com.android.vending.jpg" alt="Cancel subscription" className="max-h-80 max-w-xs rounded-xl shadow-md border border-slate-200 object-contain" />
          </li>
        </ol>
      </>
    )
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Subscription Cancellation</h2>
        <p className="mt-2 text-slate-600 text-lg">Select the purchase source to view specific cancellation instructions.</p>
      </div>
      
      <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-xl mb-8 flex gap-4">
        <svg className="w-6 h-6 text-amber-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        <div className="text-sm text-amber-800">
          <strong className="block mb-1">Agent Reminder</strong>
          Cancellation generally stops future renewal. It does not automatically mean a refund for the remaining period.
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="flex border-b border-slate-200 bg-slate-50 p-2 gap-2">
          {['website', 'apple', 'google'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${activeTab === tab ? 'bg-white text-slate-800 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'}`}
            >
              {tab === 'website' ? 'Wyze Website' : tab === 'apple' ? 'Apple App Store' : 'Google Play'}
            </button>
          ))}
        </div>
        <div className="p-6 md:p-8 animate-fade-in">
          {content[activeTab]}
        </div>
      </div>
    </div>
  );
}

function RefundsSection() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Refund Handling (Quick IAP Guidance & Website)</h2>
        <p className="mt-2 text-slate-600 text-lg">Follow the strict protocol for handling any refund requests based on purchase source.</p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 mb-8">
        <h3 className="font-bold text-xl text-slate-900 mb-4 flex items-center gap-2">
          <span className="bg-slate-100 text-slate-700 w-8 h-8 rounded-full flex items-center justify-center text-sm border border-slate-300">W</span>
          Website Purchase Cancel/Refund Requests
        </h3>
        <p className="text-slate-700 ml-10 mb-4">
          If a customer requests to cancel or requests to cancel and refund a <strong>website purchase</strong>, post the request under the <code className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 font-semibold text-blue-700">wizards_services_livesupport</code> channel using this exact format:
        </p>
        <div className="ml-10 bg-slate-800 p-5 rounded-xl text-slate-300 font-mono text-sm whitespace-pre shadow-inner">
{`ZD: 
Service: 
Issue/Question:
Key Details:`}
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 mb-8">
        <h3 className="font-bold text-xl text-slate-900 mb-6 flex items-center gap-2">
          <span className="bg-red-100 text-red-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
          Standard Process for IAP (Required First)
        </h3>
        <ul className="space-y-4 text-slate-700 ml-10">
          <li className="flex items-start gap-3">
            <svg className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
            Verify the customer's account.
          </li>
          <li className="flex items-start gap-3">
            <svg className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
            Check the <strong>Services tab</strong>.
          </li>
          <li className="flex items-start gap-3">
            <svg className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
            Request screenshots or the transaction ID.
          </li>
        </ul>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 mb-8">
        <h3 className="font-bold text-xl text-slate-900 mb-6 flex items-center gap-2">
          <span className="bg-red-100 text-red-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
          Confirmed IAP (Apple/Google) Handling
        </h3>
        <p className="text-slate-700 ml-10 mb-4">
          Explain that <strong>Wyze cannot issue refunds directly</strong>, as refunds for IAPs are handled by Apple or Google.
        </p>
        <div className="ml-10 bg-green-50 border border-green-200 p-4 rounded-xl text-green-900">
          <strong>Action:</strong> Offer the approved compensation as guided by <code className="bg-white px-2 py-0.5 rounded text-sm shadow-sm border border-green-100">wizards_services_livesupport</code>.
        </div>
      </div>

      <div className="bg-slate-900 p-6 md:p-8 rounded-2xl shadow-lg border border-slate-800 text-white">
        <h3 className="font-bold text-xl mb-4 flex items-center gap-2 text-red-400">
          <span className="bg-red-900 text-red-200 w-8 h-8 rounded-full flex items-center justify-center text-sm border border-red-700">3</span>
          If Customer Declines Compensation
        </h3>
        <p className="ml-10 text-slate-300 leading-relaxed">
          If the customer declines the compensation and still requests a refund, you may assist them with Apple/Google refund steps <strong className="text-white bg-red-600/30 px-2 py-0.5 rounded underline decoration-red-500 underline-offset-4">only if explicitly approved by SME Services Support.</strong>
        </p>
      </div>
    </div>
  );
}

function UpgradesSection() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Subscription Upgrades</h2>
        <p className="mt-2 text-slate-600 text-lg">Verify the customer's plan, purchase source, and details before explaining charges.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-t-slate-800 border-x border-b border-slate-200">
          <h4 className="text-lg font-bold text-slate-900 mb-2">Wyze Website</h4>
          <p className="text-sm text-slate-600">New plan may be charged upfront. The remaining value of the current plan is applied toward the new plan's renewal.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-t-blue-500 border-x border-b border-slate-200">
          <h4 className="text-lg font-bold text-slate-900 mb-2">Apple In-App</h4>
          <p className="text-sm text-slate-600">For eligible upgrades, unused time may be refunded by Apple to original payment method. Apple controls transaction.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-t-green-500 border-x border-b border-slate-200">
          <h4 className="text-lg font-bold text-slate-900 mb-2">Google Play In-App</h4>
          <p className="text-sm text-slate-600">For eligible upgrades, unused time may be credited toward the new plan. Google controls the billing transaction.</p>
        </div>
      </div>
    </div>
  );
}

function ScenariosSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Practice Scenarios</h2>
        <p className="mt-2 text-slate-600 text-lg">Click to reveal the recommended handling for each scenario.</p>
      </div>
      
      <div className="space-y-4">
        {SCENARIOS.map((s, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all duration-300">
              <button 
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full text-left p-6 flex justify-between items-center hover:bg-slate-50 focus:outline-none"
              >
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#65a30d] mb-1">Scenario {idx + 1}</div>
                  <h3 className="font-bold text-slate-900 text-lg">{s.title.split('—')[1]}</h3>
                  <p className="text-sm text-slate-600 mt-2 pr-8">{s.setup}</p>
                </div>
                <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                  <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="pt-4 border-t border-slate-100">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Action Plan</div>
                  <p className="text-sm text-slate-800 leading-relaxed font-medium bg-slate-50 p-4 rounded-xl border border-slate-100">{s.resolution}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function QuizSection({ quizAnswers, setQuizAnswers, quizSubmitted, setQuizSubmitted, onExport }) {
  const handleSelect = (qIndex, oIndex) => {
    if (quizSubmitted) return;
    const newAnswers = [...quizAnswers];
    newAnswers[qIndex] = oIndex;
    setQuizAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (quizAnswers.includes(null)) {
      alert("Please answer all questions before submitting."); // Fallback if modal isn't handy, but we requested no alert.
      return;
    }
    setQuizSubmitted(true);
  };

  if (quizSubmitted) {
    let score = 0;
    quizAnswers.forEach((ans, idx) => {
      if (ans === QUIZ_QUESTIONS[idx].correct) score++;
    });
    const passed = score >= Math.ceil(QUIZ_QUESTIONS.length * 0.8);

    return (
      <div className="animate-fade-in">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Quiz Results</h2>
        </div>
        
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center mb-10 relative overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${passed ? 'from-green-50 to-white' : 'from-amber-50 to-white'} z-0`}></div>
          <div className="relative z-10">
            <div className={`text-6xl font-black ${passed ? 'text-[#65a30d]' : 'text-amber-600'} mb-2`}>{score}/{QUIZ_QUESTIONS.length}</div>
            <p className="text-xl font-medium text-slate-800">{passed ? 'Great job! You understand the new IAP process.' : 'Please review the Quick IAP Guidance and try again.'}</p>
            
            <div className="mt-8 flex justify-center gap-4">
              <button 
                onClick={() => { setQuizAnswers(new Array(QUIZ_QUESTIONS.length).fill(null)); setQuizSubmitted(false); }} 
                className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-medium transition-colors"
              >
                Retake Quiz
              </button>
              <button 
                onClick={() => onExport(score, passed)} 
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-md transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Export Data for Google Studio
              </button>
            </div>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-slate-900 mb-6">Detailed Review</h3>
        <div className="space-y-6">
          {QUIZ_QUESTIONS.map((q, i) => {
            const isCorrect = quizAnswers[i] === q.correct;
            return (
              <div key={i} className={`bg-white p-6 rounded-2xl shadow-sm border ${isCorrect ? 'border-green-200' : 'border-red-200'}`}>
                <h4 className="font-semibold text-slate-900 text-lg mb-2">{q.q}</h4>
                <p className="text-sm text-slate-500 mb-3">Your answer: <span className={`${isCorrect ? 'text-green-700' : 'text-red-600'} font-medium`}>{q.options[quizAnswers[i]]}</span></p>
                <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-700">
                  <strong>Explanation:</strong> {q.explanation}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Knowledge Check</h2>
        <p className="mt-2 text-slate-600 text-lg">Test your understanding of the new IAP refund process.</p>
      </div>
      <div className="space-y-8">
        {QUIZ_QUESTIONS.map((q, qIndex) => (
          <div key={qIndex} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-4 text-lg"><span className="text-[#65a30d] mr-2">{qIndex + 1}.</span> {q.q}</h3>
            <div className="space-y-3">
              {q.options.map((opt, oIndex) => {
                const isSelected = quizAnswers[qIndex] === oIndex;
                return (
                  <button 
                    key={oIndex}
                    onClick={() => handleSelect(qIndex, oIndex)}
                    className={`w-full text-left px-5 py-3 rounded-xl border transition-all ${isSelected ? 'border-[#65a30d] bg-green-50 shadow-sm' : 'border-slate-200 hover:border-[#65a30d] hover:bg-slate-50'} text-slate-700`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        
        <div className="flex justify-end pt-4">
          <button 
            onClick={handleSubmit} 
            disabled={quizAnswers.includes(null)}
            className={`px-8 py-3 text-white rounded-xl font-bold shadow-lg transition-colors flex items-center gap-2 ${quizAnswers.includes(null) ? 'bg-slate-400 cursor-not-allowed' : 'bg-[#65a30d] hover:bg-[#4d7c0f]'}`}
          >
            Submit Answers
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}