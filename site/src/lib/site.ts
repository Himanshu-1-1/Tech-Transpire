// Site-wide configuration: build mode, navigation, contact details and approval switches.
export const MODE = __SITE_MODE__;
export const isReview = MODE === 'review';

// Approval switches. Each flips to true when the decisions register records the approval.
export const approvals = {
  healthcarePage: false, // N-05 draft, D-06: Industries hidden from primary nav until approved
  privacyPolicy: false, // N-07, legal review (launch blocker)
  outcomeThemeCopy: false, // N-02 lines and the section heading
  akhaniParagraph: false, // N-06, legal wording
  newFormOptions: false, // N-16 "Event or presentation", "Existing client or colleague"
};

export const showIndustries = isReview || approvals.healthcarePage;

export type NavItem = { label: string; href: string };
export const primaryNav: NavItem[] = [
  { label: 'Expertise', href: '/services' },
  ...(showIndustries ? [{ label: 'Industries', href: '/industries' }] : []),
  { label: 'Insights', href: '/insights' },
  { label: 'About', href: '/about-us' },
];

// [E] TT-PG-005-B02, B03: exact values.
export const contact = {
  email: 'info@techtranspire.com',
  phone: '+1 (979) 479-2779',
  tel: '+19794792779',
  linkedin: 'https://www.linkedin.com/company/techtranspire',
  booking: 'https://outlook.office.com/book/IntroCallwithTechTranspire@techtranspire.com/?ismsaljsauthenabled',
};

export const entityLine = 'Tech Transpire is a DBA of Akhani LLC.';
export const SITE_NAME = 'Tech Transpire';
