import React, { useState, useEffect } from 'react';
import { SectionId, ScreenshotStep } from './types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { OverviewSection } from './components/OverviewSection';
import { CancellationSection } from './components/CancellationSection';
import { RefundsSection } from './components/RefundsSection';
import { DecisionTool } from './components/DecisionTool';
import { UpgradesSection } from './components/UpgradesSection';
import { ScenariosSection } from './components/ScenariosSection';
import { QuizSection } from './components/QuizSection';
import { ImageLightbox } from './components/ImageLightbox';
import { EscalationModal } from './components/EscalationModal';
import { AuthGate } from './components/AuthGate';
import { Menu } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<string | null>(() => {
    return (
      localStorage.getItem('wyze_training_auth_user') ||
      sessionStorage.getItem('wyze_training_auth_user') ||
      null
    );
  });

  const [currentSection, setCurrentSection] = useState<SectionId>('overview');
  const [visitedSections, setVisitedSections] = useState<Set<SectionId>>(new Set(['overview']));
  const [lightboxStep, setLightboxStep] = useState<ScreenshotStep | null>(null);
  const [isEscalationOpen, setIsEscalationOpen] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  const handleLogout = () => {
    localStorage.removeItem('wyze_training_auth_user');
    sessionStorage.removeItem('wyze_training_auth_user');
    setCurrentUser(null);
  };

  // Track progress when section changes
  const handleSelectSection = (id: SectionId) => {
    setCurrentSection(id);
    setVisitedSections((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    // Scroll content container to top
    const mainEl = document.getElementById('main-content-scroll');
    if (mainEl) {
      mainEl.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // If not authenticated, display login gate
  if (!currentUser) {
    return <AuthGate onSuccess={(email) => setCurrentUser(email)} />;
  }

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar
        currentSection={currentSection}
        visitedSections={visitedSections}
        onSelectSection={handleSelectSection}
        isOpenMobile={isMobileSidebarOpen}
        onToggleMobile={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        userEmail={currentUser}
        onLogout={handleLogout}
      />

      {/* Main App Stage */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center bg-white border-b border-slate-200">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="md:hidden p-3.5 text-slate-600 hover:text-slate-900 focus:outline-none"
            aria-label="Open sidebar menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <Header
              currentSection={currentSection}
              onSelectSection={handleSelectSection}
              onOpenEscalation={() => setIsEscalationOpen(true)}
            />
          </div>
        </div>

        {/* Scrollable Content Viewport */}
        <main
          id="main-content-scroll"
          className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-10 lg:p-12"
        >
          <div className="max-w-5xl mx-auto pb-16">
            {currentSection === 'overview' && (
              <OverviewSection onNavigate={handleSelectSection} />
            )}
            {currentSection === 'cancellation' && (
              <CancellationSection
                onOpenLightbox={(step) => setLightboxStep(step)}
              />
            )}
            {currentSection === 'refunds' && <RefundsSection />}
            {currentSection === 'decision-tool' && <DecisionTool />}
            {currentSection === 'upgrades' && <UpgradesSection />}
            {currentSection === 'scenarios' && <ScenariosSection />}
            {currentSection === 'quiz' && <QuizSection userEmail={currentUser} />}
          </div>
        </main>
      </div>

      {/* Screenshot Lightbox Modal */}
      {lightboxStep && (
        <ImageLightbox
          isOpen={Boolean(lightboxStep)}
          imageSrc={lightboxStep.imageSrc}
          title={lightboxStep.title}
          caption={lightboxStep.caption}
          instruction={lightboxStep.instruction}
          onClose={() => setLightboxStep(null)}
        />
      )}

      {/* Escalation Template Generator Modal */}
      <EscalationModal
        isOpen={isEscalationOpen}
        onClose={() => setIsEscalationOpen(false)}
      />
    </div>
  );
}
