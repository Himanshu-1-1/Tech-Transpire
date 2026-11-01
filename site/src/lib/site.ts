// Site-wide configuration: build mode, navigation, contact details and approval switches.
export const MODE = __SITE_MODE__;
export const isReview = MODE === 'review';
// On-page review markers (amber tags, the "Review build" strip, review notes). Off by default
// at the company's request (2026-10-30); REVIEW_MARKERS=1 shows them for an approval session.
// The items they mark stay tracked in docs/website-architecture/12 and 19.
export const showMarkers = isReview && __REVIEW_MARKERS__;
// The static GitHub Pages review preview: no server, so the contact form cannot deliver.
export const isPagesPreview = __PAGES__;

// Approval switches. Each flips to true when the decisions register records the approval.
export const approvals = {
  healthcarePage: false, // N-05 draft, D-06: Industries hidden from primary nav until approved
  privacyPolicy: false, // N-07, legal review (launch blocker)
  outcomeThemeCopy: false, // N-02 lines and the section heading
  akhaniParagraph: false, // N-06, legal wording
  newFormOptions: false, // N-16 "Event or presentation", "Existing client or colleague"
  advisors: false, // D-38–D-40: imported from trueleansolutions.com, role lines rewritten for Tech Transpire (draft); figures and each advisor's agreement to confirm
};

// The Privacy Policy draft carries counsel notes and placeholders, so it is shown only in an
// approval session (REVIEW_MARKERS=1) until counsel approves it (N-07), never on the shared preview.
export const showPrivacy = showMarkers || approvals.privacyPolicy;

export const showIndustries = isReview || approvals.healthcarePage;

export type NavItem = { label: string; href: string };
// Header order and labels match the company's reference header (2026-11-01, D-41). Industries
// stays reachable from the footer and search.
export const primaryNav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about-us' },
  { label: 'Services', href: '/services' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact Us', href: '/contact-us' },
];

// [E] TT-PG-005-B02, B03: exact values.
export const contact = {
  email: 'info@techtranspire.com',
  phone: '+1 (979) 479-2779',
  tel: '+19794792779',
  linkedin: 'https://www.linkedin.com/company/techtranspire/',
  booking: 'https://outlook.office.com/book/IntroCallwithTechTranspire@techtranspire.com/?ismsaljsauthenabled',
};

export const entityLine = 'Tech Transpire is a DBA of Akhani LLC.';

// D-27 (approved 2026-10-29): city-region only, never a street address.
export const location = { label: 'Dallas–Fort Worth, Texas', locality: 'Dallas–Fort Worth', region: 'TX' };
export const SITE_NAME = 'Tech Transpire';
