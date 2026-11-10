export type SectionId = 'overview' | 'cancellation' | 'refunds' | 'upgrades' | 'scenarios' | 'quiz' | 'decision-tool';

export interface SectionMeta {
  id: SectionId;
  title: string;
  shortTitle: string;
  description: string;
  iconName: string;
}

export interface ScreenshotStep {
  stepNumber: number;
  title: string;
  instruction: string;
  imageSrc: string;
  caption: string;
  keyAction: string;
  highlightCoordinates?: { top: string; left: string; width: string; height: string; label: string };
}

export interface PracticeScenario {
  id: string;
  title: string;
  platform: 'Apple iOS' | 'Google Play' | 'Website' | 'Cross-Platform';
  customerSentiment: 'Calm' | 'Frustrated' | 'Confused' | 'Urgent';
  customerMessage: string;
  customerDetails: {
    ticketId: string;
    customerEmail: string;
    servicesTab: string;
    purchasePlatform: string;
    subscription: string;
  };
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
    policyReference: string;
  }[];
  resolutionSummary: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  policyReference?: string;
  policyNote?: string;
}
