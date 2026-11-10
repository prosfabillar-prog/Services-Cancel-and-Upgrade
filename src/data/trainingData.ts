import { PracticeScenario, QuizQuestion, ScreenshotStep, SectionMeta } from '../types';

export const SECTIONS: SectionMeta[] = [
  { 
    id: 'overview', 
    title: 'Overview & Guidance', 
    shortTitle: 'Overview',
    description: 'Core rules, platform comparison, and new Quick IAP Guidance',
    iconName: 'BookOpen' 
  },
  { 
    id: 'cancellation', 
    title: 'Subscription Cancellation', 
    shortTitle: 'Cancellation',
    description: 'Visual step-by-step guides for Website, Apple iOS, and Google Play',
    iconName: 'ShieldAlert' 
  },
  { 
    id: 'refunds', 
    title: 'Refund Policy & Gatekeeping', 
    shortTitle: 'Refunds (New IAP Policy)',
    description: 'Strict 3-step IAP protocol, wizards_services_livesupport format & SME gate',
    iconName: 'CreditCard' 
  },
  { 
    id: 'decision-tool', 
    title: 'Interactive Policy Checker', 
    shortTitle: 'Policy Checker',
    description: 'Live case triage tool to determine immediate compliant next actions',
    iconName: 'GitBranch' 
  },
  { 
    id: 'upgrades', 
    title: 'Upgrades & Proration', 
    shortTitle: 'Upgrades',
    description: 'Website auto-cancel & free trial rollover, In-App manual cancellation condition',
    iconName: 'TrendingUp' 
  },
  { 
    id: 'scenarios', 
    title: 'Interactive Practice Scenarios', 
    shortTitle: 'Practice Scenarios',
    description: '5 realistic customer situations with immediate coaching feedback',
    iconName: 'MessageSquareText' 
  },
  { 
    id: 'quiz', 
    title: 'Knowledge Check & Certification', 
    shortTitle: 'Knowledge Check',
    description: 'Test your understanding and export compliance CSV for Looker Studio',
    iconName: 'GraduationCap' 
  }
];

export const APPLE_STEPS: ScreenshotStep[] = [
  {
    stepNumber: 1,
    title: 'Open Settings & Tap Apple Account',
    instruction: 'Instruct customer to open the Settings app on their iPhone or iPad and tap their Apple Account name at the very top.',
    imageSrc: '/assets/aistudio/IMG_9306_937b5e8c.PNG',
    caption: 'iOS Settings screen — The Apple Account name profile card is at the top of the menu.',
    keyAction: 'Tap Apple Account banner at the top of Settings.',
    highlightCoordinates: {
      top: '23%',
      left: '4%',
      width: '92%',
      height: '14%',
      label: 'Tap Profile Name (Apple Account)'
    }
  },
  {
    stepNumber: 2,
    title: 'Select "Subscriptions"',
    instruction: 'In the Apple Account page, instruct them to tap the "Subscriptions" option located in the first account block.',
    imageSrc: '/assets/aistudio/IMG_9307_9b903000.PNG',
    caption: 'Apple Account page — Subscriptions item with the circular reload icon.',
    keyAction: 'Tap Subscriptions directly below Payment & Shipping.',
    highlightCoordinates: {
      top: '53%',
      left: '4%',
      width: '92%',
      height: '5%',
      label: 'Tap Subscriptions'
    }
  },
  {
    stepNumber: 3,
    title: 'Select Wyze App & Cancel',
    instruction: 'In the Subscriptions list, find "The Official Wyze App / Wyze Cam Plus", tap it, and tap "Cancel Subscription". Confirm the prompt.',
    imageSrc: '/assets/aistudio/IMG_9308_5cdf84c5.PNG',
    caption: 'Active/Inactive Subscriptions list showing The Official Wyze App with Wyze Cam Plus.',
    keyAction: 'Select Wyze App, tap Cancel Subscription and confirm.',
    highlightCoordinates: {
      top: '58%',
      left: '4%',
      width: '92%',
      height: '9%',
      label: 'Locate "The Official Wyze App" & Cancel'
    }
  }
];

export const GOOGLE_STEPS: ScreenshotStep[] = [
  {
    stepNumber: 1,
    title: 'Open Play Store & Tap Profile Icon',
    instruction: 'Instruct customer to open the Google Play Store on Android and tap their profile circle icon in the top right corner.',
    imageSrc: '/assets/aistudio/Screenshot_2026-11-11-02-27-35-712_com.android.vending_369ffaf8.jpg',
    caption: 'Google Play Store home screen — Profile icon is located at the top-right next to notifications.',
    keyAction: 'Tap Google Profile avatar in top-right corner of Google Play.',
    highlightCoordinates: {
      top: '5%',
      left: '88%',
      width: '10%',
      height: '4%',
      label: 'Tap Profile Icon'
    }
  },
  {
    stepNumber: 2,
    title: 'Tap "Payments and subscriptions"',
    instruction: 'From the account popup menu, instruct the customer to select "Payments and subscriptions".',
    imageSrc: '/assets/aistudio/Screenshot_2026-11-11-02-27-45-905_com.android.vending_4d85c9b3.jpg',
    caption: 'Google Play menu modal — Payments and subscriptions is listed below Notifications.',
    keyAction: 'Tap Payments and subscriptions item.',
    highlightCoordinates: {
      top: '46%',
      left: '3%',
      width: '94%',
      height: '6%',
      label: 'Select Payments & subscriptions'
    }
  },
  {
    stepNumber: 3,
    title: 'Tap "Subscriptions"',
    instruction: 'In the Payments and subscriptions screen, tap "Subscriptions" (with the circular arrows icon).',
    imageSrc: '/assets/aistudio/Screenshot_2026-11-11-02-27-52-247_com.android.vending_0b29b188.jpg',
    caption: 'Payments & subscriptions sub-menu with Payment methods, Subscriptions, and Budget & history.',
    keyAction: 'Select Subscriptions option.',
    highlightCoordinates: {
      top: '21%',
      left: '3%',
      width: '94%',
      height: '5%',
      label: 'Tap Subscriptions'
    }
  },
  {
    stepNumber: 4,
    title: 'Select Wyze & Tap "Cancel subscription"',
    instruction: 'Locate the active Wyze subscription under Active, tap on it, and select "Cancel subscription" at the bottom of the details.',
    imageSrc: '/assets/aistudio/Screenshot_2026-11-11-02-28-13-166_com.android.vending_5b3ab791.jpg',
    caption: 'Subscriptions management page showing Active and Expired subscriptions.',
    keyAction: 'Select Wyze subscription and tap Cancel subscription.',
    highlightCoordinates: {
      top: '16%',
      left: '3%',
      width: '94%',
      height: '8%',
      label: 'Select Wyze Subscription to Cancel'
    }
  }
];

export const SCENARIOS: PracticeScenario[] = [
  {
    id: 'sc-1',
    title: 'Apple In-App Cancellation Request',
    platform: 'Apple iOS',
    customerSentiment: 'Calm',
    customerMessage: "Hi, I subscribed to Cam Plus on my iPhone last month through the Wyze app. I don't want it to renew next week. Can you cancel it for me right now?",
    customerDetails: {
      ticketId: 'ZD #891244',
      customerEmail: 'afabillar1998@icloud.com',
      servicesTab: 'IAP (Apple App Store) - Renews in 6 days',
      purchasePlatform: 'Apple iOS In-App Purchase',
      subscription: 'Cam Plus (Monthly)'
    },
    options: [
      {
        id: 'opt-1a',
        text: 'Tell the customer "I have canceled your subscription on our end, you will not be charged again."',
        isCorrect: false,
        feedback: 'Violates policy! Wyze cannot cancel Apple-billed subscriptions from our internal tools. If the customer does not cancel in iOS Settings, Apple will continue to bill them automatically.',
        policyReference: 'Never claim you canceled an Apple subscription on Wyze\'s side.'
      },
      {
        id: 'opt-1b',
        text: 'Confirm it is an Apple-billed subscription. Explain Apple manages recurring billing and guide them step-by-step through iPhone Settings → Apple Account → Subscriptions → The Official Wyze App → Cancel.',
        isCorrect: true,
        feedback: 'Correct! You identified the purchase source correctly, set expectations that Apple manages the billing relationship, and provided precise customer self-service steps.',
        policyReference: 'Guide customers to iOS Settings without claiming Wyze canceled it.'
      },
      {
        id: 'opt-1c',
        text: 'Immediately send the customer reportaproblem.apple.com to request a refund.',
        isCorrect: false,
        feedback: 'Incorrect. The customer only asked to cancel the upcoming renewal, not refund a past charge. Sending refund links unprompted causes confusion and violates guidance.',
        policyReference: 'Differentiate between cancellation requests and refund requests.'
      }
    ],
    resolutionSummary: 'Confirm Apple billing. Explain Apple manages the subscription. Guide customer to iOS Settings → Apple Account → Subscriptions → Wyze → Cancel. Never claim Wyze canceled it.'
  },
  {
    id: 'sc-2',
    title: 'Google Play Refund Demand',
    platform: 'Google Play',
    customerSentiment: 'Frustrated',
    customerMessage: "I just got billed $29.99 for my yearly Wyze Cam Plus on Google Play yesterday and I didn't want it! Refund my credit card immediately, I expect this money back today.",
    customerDetails: {
      ticketId: 'ZD #891302',
      customerEmail: 'jlloydtorres234@gmail.com',
      servicesTab: 'IAP (Google Play) - Charged 1 day ago ($29.99/yr) - GPA.3341-8921-0021-99182',
      purchasePlatform: 'Google Play Android',
      subscription: 'Cam Plus (Annual - $29.99)'
    },
    options: [
      {
        id: 'opt-2a',
        text: 'Send the Google Play refund request URL immediately to defuse the customer\'s anger.',
        isCorrect: false,
        feedback: 'CRITICAL POLICY BREACH! Agents must NOT provide Google Play refund steps immediately upon demand. You must follow the standard process, verify details, and offer approved compensation first.',
        policyReference: 'Quick IAP Guidance: Never provide platform refund steps upfront.'
      },
      {
        id: 'opt-2b',
        text: 'Follow the standard process: verify the account, check Services tab, request transaction ID (GPA format). Explain Wyze cannot issue IAP refunds directly. Offer approved compensation via wizards_services_livesupport. Only if declined AND SME approves, provide refund steps.',
        isCorrect: true,
        feedback: 'Excellent! Follows the exact mandatory sequence: 1) Verify & get GPA ID, 2) Explain Wyze cannot refund IAP directly, 3) Offer approved compensation, 4) Await customer response before any escalation to SME.',
        policyReference: 'Standard 3-gate process: Verify -> Offer Compensation -> SME approval gate.'
      },
      {
        id: 'opt-2c',
        text: 'Post in wizards_services_livesupport asking for a direct credit card refund to be processed by the Wyze billing department.',
        isCorrect: false,
        feedback: 'Incorrect. Wyze does not have the customer\'s credit card information for Google Play IAPs. Google holds the payment token; Wyze billing cannot refund a Google Play transaction.',
        policyReference: 'Wyze cannot process direct credit card refunds for IAPs.'
      }
    ],
    resolutionSummary: 'Standard protocol: Verify account, check Services tab, request GPA transaction ID. Explain Wyze cannot refund IAPs directly. Offer approved compensation via wizards_services_livesupport. Escalate to SME only if compensation is declined.'
  },
  {
    id: 'sc-3',
    title: 'Website Cancel & Refund Request',
    platform: 'Website',
    customerSentiment: 'Calm',
    customerMessage: "Hello, I noticed my Cam Protect renewed on my credit card via your website two days ago for $99. I don't use this camera anymore. Can you please cancel and refund this for me?",
    customerDetails: {
      ticketId: 'ZD #891410',
      customerEmail: 'sarah.miller@example.com',
      servicesTab: 'Website Stripe / Recurly - Billed Nov 8, 2026',
      purchasePlatform: 'Wyze.com (Website)',
      subscription: 'Cam Protect (Annual)'
    },
    options: [
      {
        id: 'opt-3a',
        text: 'Verify account and purchase details. Post the assisted cancel and refund request under the wizards_services_livesupport channel using the exact format: ZD:, Service:, Issue/Question:, Key Details:.',
        isCorrect: true,
        feedback: 'Spot on! For website purchases, assisted cancellation and refund handling must be posted in wizards_services_livesupport with the standardized format.',
        policyReference: 'Website assisted cancel/refund requests require the exact Slack template format.'
      },
      {
        id: 'opt-3b',
        text: 'Tell the customer they can only cancel on my.wyze.com/account/plans and that Wyze has a strict no-refund policy under any circumstances.',
        isCorrect: false,
        feedback: 'Incorrect. While customer self-service cancellation exists on my.wyze.com, when a customer requests agent assistance for cancel & refund of a website renewal, we post to wizards_services_livesupport for review.',
        policyReference: 'Website refunds are reviewed through wizards_services_livesupport.'
      },
      {
        id: 'opt-3c',
        text: 'Tell the customer to file a dispute with their bank or credit card company.',
        isCorrect: false,
        feedback: 'Never advise customers to file chargebacks. Chargebacks incur penalties and lock customer accounts. Always handle through internal support channels.',
        policyReference: 'Always resolve through standard internal channels.'
      }
    ],
    resolutionSummary: 'Verify account and purchase on Services tab. Post under wizards_services_livesupport with the exact ZD / Service / Issue / Key Details template.'
  },
  {
    id: 'sc-4',
    title: 'Irate Apple IAP Refund Demand (Compensation Declined)',
    platform: 'Apple iOS',
    customerSentiment: 'Urgent',
    customerMessage: "I do not want your free months of service or replacement sensors! I bought this through the App Store and I want my $39.99 back right now! Give me the refund steps immediately or I will file a formal complaint!",
    customerDetails: {
      ticketId: 'ZD #891552',
      customerEmail: 'm.davies@company.net',
      servicesTab: 'IAP (Apple) - Transaction ID verified - Declined 2 months compensation offer',
      purchasePlatform: 'Apple iOS In-App Purchase',
      subscription: 'Cam Plus Unlimited (Annual)'
    },
    options: [
      {
        id: 'opt-4a',
        text: 'Since the customer is irate and already refused compensation, paste reportaproblem.apple.com in the chat immediately to de-escalate.',
        isCorrect: false,
        feedback: 'CRITICAL POLICY VIOLATION! Even if the customer is irate and has declined compensation, you MUST NOT provide Apple refund steps until you have EXPLICIT approval from SME Services Support.',
        policyReference: 'SME Services Support approval is mandatory before providing Apple/Google refund steps.'
      },
      {
        id: 'opt-4b',
        text: 'Acknowledge their frustration calmly. Reach out to SME Services Support in the designated internal channel to request explicit approval for platform refund steps. Once approval is granted by SME, provide reportaproblem.apple.com instructions.',
        isCorrect: true,
        feedback: 'Perfect! You held the required approval gate. SME Services Support must explicitly approve providing the platform refund steps. Only after SME gives the green light may you guide them to Apple.',
        policyReference: 'Mandatory approval gate: Customer declines compensation -> SME explicitly approves -> Provide platform refund steps.'
      },
      {
        id: 'opt-4c',
        text: 'Argue with the customer that Apple never refunds subscriptions under any circumstances.',
        isCorrect: false,
        feedback: 'Incorrect. Apple does review and issue refunds for eligible IAPs through reportaproblem.apple.com. Never give inaccurate platform claims.',
        policyReference: 'Remain professional and follow SME escalation protocol.'
      }
    ],
    resolutionSummary: 'Customer declined compensation. DO NOT send Apple link yet. Consult SME Services Support first. With explicit SME approval, guide them to reportaproblem.apple.com.'
  },
  {
    id: 'sc-5',
    title: 'Customer Reports "Double Charge" on Plan Upgrade',
    platform: 'Cross-Platform',
    customerSentiment: 'Confused',
    customerMessage: "I upgraded my Cam Plus single camera to the Cam Unlimited Plan on your website last week, and I see two charges on my statement: $29.99 for my yearly plan from last month and now $99.99! Plus I also have a camera subscription on my iPhone. You guys double charged me!",
    customerDetails: {
      ticketId: 'ZD #891620',
      customerEmail: 'b.thompson@icloud.com',
      servicesTab: 'Prior Website Sub: Cam Plus Single ($29.99/yr) + Prior In-App: Cam Plus Apple IAP ($2.99/mo) -> Upgraded to Cam Unlimited Plan ($99.99/yr)',
      purchasePlatform: 'Wyze Website & Apple iOS (Dual source)',
      subscription: 'Cam Unlimited Plan ($99.99/yr)'
    },
    options: [
      {
        id: 'opt-5a',
        text: 'Immediately agree that it is an accidental double charge and issue a $29.99 refund ticket without checking how the upgrade was processed.',
        isCorrect: false,
        feedback: 'Do not assume an error! When upgrading on the Wyze website, any website-purchased subscription cancels automatically and the remaining monetary balance is converted and added as a Free Trial to the Cam Unlimited Plan ($99.99/yr). Always check their billing sources first.',
        policyReference: 'Website upgrades auto-cancel prior website plans and add remaining monetary value as a free trial.'
      },
      {
        id: 'opt-5b',
        text: 'Explain that the prior website plan cancels automatically and its remaining monetary amount is converted into Free Trial days on the Cam Unlimited Plan (based on dollar value, not literal calendar days, due to the price difference between $29.99 and $99.99). Crucially, instruct the customer that their Apple In-App subscription WILL NOT cancel automatically and must be manually canceled in iOS Settings.',
        isCorrect: true,
        feedback: 'Outstanding mastery! You accurately explained that remaining days are calculated from the remaining monetary amount of the prior plan divided by the Cam Unlimited daily rate (not literal calendar days). You also enforced the mandatory rule that In-App subscriptions never cancel automatically and require manual cancellation.',
        policyReference: 'Value-based free trial conversion + In-App manual cancellation condition.'
      },
      {
        id: 'opt-5c',
        text: 'Tell the customer that all Apple and Google subscriptions cancel automatically whenever they make any purchase on the Wyze website.',
        isCorrect: false,
        feedback: 'CRITICAL ERROR! Apple and Google Play subscriptions NEVER cancel automatically through Wyze website transactions. Only website-purchased subscriptions auto-cancel. If you tell the customer this, they will be surprised by unexpected Apple renewals.',
        policyReference: 'Condition: In-App subscriptions never cancel automatically from website upgrades.'
      }
    ],
    resolutionSummary: 'Explain that website-purchased subscriptions cancel automatically and roll over remaining monetary value as a Free Trial for the Cam Unlimited Plan ($99.99/yr). Clarify that trial days are based on the dollar balance, not literal calendar days. Emphasize the critical condition: remaining In-App subscriptions DO NOT cancel automatically and must be manually canceled by the customer.'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the FIRST step for any In-App Purchase (IAP) concern?",
    options: [
      "Send them directly to the Apple or Google Play refund request page",
      "Verify the customer's account, check the Services tab, and request the transaction ID or screenshots",
      "Issue an immediate Wyze store credit without checking tools"
    ],
    correct: 1,
    explanation: "Always follow the standard process first: Verify the customer's account, check the internal Services tab, and request screenshots or the transaction ID (e.g. GPA number for Google, invoice for Apple).",
    policyReference: "Quick IAP Guidance: Standard Process for IAP (Required First)"
  },
  {
    id: 2,
    question: "If a charge is confirmed as an IAP (Apple/Google), what should you offer first instead of a refund?",
    options: [
      "A free Wyze Cam v4",
      "Approved compensation as guided by wizards_services_livesupport",
      "A direct refund back to their personal credit card from Wyze"
    ],
    correct: 1,
    explanation: "Wyze cannot issue refunds directly for IAPs since Apple and Google handle payment processing. The agent must offer approved compensation as guided by wizards_services_livesupport.",
    policyReference: "Quick IAP Guidance: Confirmed IAP Handling"
  },
  {
    id: 3,
    question: "When are you allowed to assist a customer with Apple/Google platform refund steps?",
    options: [
      "Whenever the customer asks for it or appears upset",
      "Only if the customer declines compensation AND you get explicit approval from SME Services Support",
      "After 30 days have elapsed from the purchase date"
    ],
    correct: 1,
    explanation: "If the customer declines approved compensation, agents may assist with platform refund steps ONLY if explicitly approved by SME Services Support.",
    policyReference: "Quick IAP Guidance: Customer Declines Compensation Gate"
  },
  {
    id: 4,
    question: "Who manages billing and cancellation for a Google Play In-App Purchase?",
    options: [
      "Wyze website billing portal",
      "Google Play Store",
      "Apple Store Connect"
    ],
    correct: 1,
    explanation: "Google Play manages all subscription billing, payment tokens, renewals, and cancellations for Android IAPs.",
    policyReference: "Platform Ownership & Verification"
  },
  {
    id: 5,
    question: "Does canceling a subscription automatically refund the remaining paid time on the customer's account?",
    options: [
      "Yes, always automatically prorated to their card",
      "No, cancellation stops future renewals; refund eligibility is a separate matter governed by policy",
      "Only for website purchases, but never for mobile purchases"
    ],
    correct: 1,
    explanation: "Cancellation stops recurring renewal at the end of the billing cycle. It does not automatically generate a refund.",
    policyReference: "Cancellation vs Refund Separation"
  },
  {
    id: 6,
    question: "What is the mandatory format to post an assisted cancel/refund request for a Website purchase in wizards_services_livesupport?",
    options: [
      "Help! Need refund for user@example.com",
      "ZD: [ticket], Service: [service], Issue/Question: [issue], Key Details: [details]",
      "Ticket #12345 - Please refund $29.99 ASAP"
    ],
    correct: 1,
    explanation: "Assisted cancel/refund requests for website purchases must strictly adhere to the 4-field format: ZD:, Service:, Issue/Question:, Key Details:.",
    policyReference: "Website Assisted Cancel/Refund Escalation Standard"
  }
];

export const CUSTOMER_MACROS = {
  appleCancel: `To cancel your Wyze Cam Plus subscription billed through Apple:
1. Open the Settings app on your iPhone or iPad.
2. Tap your Apple Account name at the top of the screen.
3. Tap "Subscriptions".
4. Select "The Official Wyze App / Wyze Cam Plus" and tap "Cancel Subscription".
5. Confirm the cancellation. Your service will remain active until the end of your current billing period without renewing.`,

  googleCancel: `To cancel your Wyze subscription billed through Google Play:
1. Open the Google Play Store on your Android device.
2. Tap your profile icon in the top right corner.
3. Tap "Payments and subscriptions", then tap "Subscriptions".
4. Select your Wyze subscription and tap "Cancel subscription".
5. Follow the on-screen prompts to confirm. Your subscription will not renew at the next billing cycle.`,

  iapRefundRefusalOffer: `Thank you for reaching out regarding your subscription charge. Because this subscription was purchased directly through [Apple App Store / Google Play Store], Wyze does not have direct access to your payment information to issue a refund directly. 

To help make this right for you today, I would love to offer you [Approved Compensation: e.g. 2 complimentary months of Cam Plus / service credit] applied directly to your Wyze account so you can continue enjoying uninterrupted features. Please let me know if you would like me to apply this for you!`,

  smeApprovedAppleRefund: `Thank you for your patience. Since your subscription was purchased through Apple, you can submit a refund request directly to Apple Support:
1. Go to reportaproblem.apple.com in your web browser.
2. Sign in with the Apple ID you used for the purchase.
3. Select "I'd like to...", then choose "Request a refund".
4. Select the reason you want a refund and choose "Next".
5. Select your Wyze subscription charge and tap "Submit".

Apple will review your request and send an update to your email within 48 hours.`,

  websiteUpgradeExplanation: `When you upgrade to the Cam Unlimited Plan ($9.99/mo or $99.99/yr) on the Wyze website, any existing subscription purchased through our website is canceled automatically. Your remaining paid balance from Cam Plus ($2.99/mo or $29.99/yr) is converted based on its remaining monetary amount and applied as a Free Trial onto your new Cam Unlimited Plan!

NOTE ON FREE TRIAL DURATION: The free trial length is calculated from your remaining dollar balance divided by the daily rate of Cam Unlimited (rather than literal calendar days, reflecting the price tier difference).

CRITICAL NOTE FOR IN-APP PURCHASES: If you also have any camera subscriptions purchased through Apple App Store or Google Play, they will NOT cancel automatically. You must manually cancel them in your device settings (iPhone Settings -> Apple Account -> Subscriptions, or Google Play -> Subscriptions) to avoid simultaneous billing.`
};
