export interface UserInputs {
  layoffDate: string;       // ISO date string YYYY-MM-DD
  i94Expiry: string;        // ISO date string YYYY-MM-DD
  spouseVisa: "H1B" | "other" | "none";
  i140Status: "approved" | "pending" | "none" | "unknown";
  hasSchoolAcceptance: boolean;
}

export interface Document {
  name: string;
  notes?: string;
}

export interface VisaPath {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  eligible: (inputs: UserInputs) => boolean;
  eligibilityNote: (inputs: UserInputs) => string | null; // null = eligible
  workAuthorized: boolean;
  workAuthNote: string;
  timelineWeeks: [number, number];
  premiumAvailable: boolean;
  premiumTimelineDays: number | null;
  filingDeadline: "within-grace-period" | "anytime" | "before-i94";
  filingDeadlineNote: string;
  documents: Document[];
  fees: {
    standard: number;
    premium: number | null;
    label: string;
  };
  processingTimeKey: string; // key into processing-times.json
  priority: number;          // lower = shown first
  riskLevel: "low" | "medium" | "high";
  riskNote: string;
  uscisUrl: string;
}

export const visaPaths: VisaPath[] = [
  {
    id: "h1b-transfer",
    name: "H-1B Transfer (AC21 Portability)",
    shortName: "H-1B Transfer",
    tagline: "Keep working while your new employer files",
    eligible: () => true,
    eligibilityNote: () => null,
    workAuthorized: true,
    workAuthNote:
      "You can start working at the new employer as soon as Form I-129 is properly filed and you have a receipt notice.",
    timelineWeeks: [8, 24],
    premiumAvailable: true,
    premiumTimelineDays: 15,
    filingDeadline: "within-grace-period",
    filingDeadlineNote:
      "New employer must file I-129 before your grace period ends. You can start working immediately upon filing.",
    documents: [
      { name: "Form I-129 (filed by new employer)" },
      { name: "Certified Labor Condition Application (LCA) from DOL", notes: "New employer files this first; takes 7 business days" },
      { name: "Job offer letter from new employer" },
      { name: "Copy of current H-1B approval (Form I-797)" },
      { name: "Copy of current and all prior H-1B petitions" },
      { name: "Copy of passport bio page + visa stamp" },
      { name: "Copy of I-94 arrival/departure record" },
      { name: "Updated resume" },
      { name: "Educational certificates and transcripts" },
      { name: "Pay stubs from previous employer (last 3 months)" },
    ],
    fees: {
      standard: 460,
      premium: 2805,
      label: "Base filing fee ~$460 + optional premium processing $2,805",
    },
    processingTimeKey: "I-129-H1B",
    priority: 1,
    riskLevel: "low",
    riskNote:
      "Lowest risk path. Work authorization maintained from receipt date. Most H-1B holders pursue this as the primary option.",
    uscisUrl:
      "https://www.uscis.gov/working-in-the-united-states/temporary-workers/h-1b-specialty-occupations-dod-cooperative-research-and-development-project-workers-and-fashion-models",
  },
  {
    id: "h4-cos",
    name: "H-4 Dependent Status",
    shortName: "H-4 COS",
    tagline: "Change status as spouse of an H-1B holder",
    eligible: (inputs) => inputs.spouseVisa === "H1B",
    eligibilityNote: (inputs) =>
      inputs.spouseVisa === "H1B"
        ? null
        : "Requires a spouse (or parent, if under 21) who holds valid H-1B status.",
    workAuthorized: false,
    workAuthNote:
      "No work authorization in H-4 status unless you separately apply for and receive an H-4 EAD — only available if your spouse has an approved I-140.",
    timelineWeeks: [8, 16],
    premiumAvailable: false,
    premiumTimelineDays: null,
    filingDeadline: "within-grace-period",
    filingDeadlineNote:
      "File Form I-539 before your grace period ends to maintain valid status while the application is pending.",
    documents: [
      { name: "Form I-539 (Application to Extend/Change Nonimmigrant Status)" },
      { name: "Spouse's H-1B approval notice (Form I-797)" },
      { name: "Spouse's current H-1B visa and passport copies" },
      { name: "Marriage certificate (with certified English translation if applicable)" },
      { name: "Copy of your I-94 arrival/departure record" },
      { name: "Copy of your passport bio page" },
      { name: "Recent pay stubs from spouse (last 3 months)" },
      { name: "Proof of spouse's current H-1B employment (offer letter or recent pay stubs)" },
      {
        name: "Form I-765 (H-4 EAD application)",
        notes: "Separate optional filing for work authorization — only if spouse has approved I-140",
      },
    ],
    fees: {
      standard: 370,
      premium: null,
      label: "Filing fee $370 + $85 biometrics",
    },
    processingTimeKey: "I-539-H4",
    priority: 2,
    riskLevel: "low",
    riskNote:
      "Low risk if filed timely. No work authorization is the main downside. Good bridge option while job hunting.",
    uscisUrl:
      "https://www.uscis.gov/working-in-the-united-states/information-for-employers-and-employees/options-for-nonimmigrant-workers-following-termination-of-employment",
  },
  {
    id: "b1-b2-cos",
    name: "B-1/B-2 Visitor Status",
    shortName: "B-1/B-2 COS",
    tagline: "Bridge status while you plan next steps",
    eligible: () => true,
    eligibilityNote: () => null,
    workAuthorized: false,
    workAuthNote:
      "No work authorization whatsoever — no full-time, part-time, freelance, consulting, or any compensated work.",
    timelineWeeks: [20, 32],
    premiumAvailable: false,
    premiumTimelineDays: null,
    filingDeadline: "within-grace-period",
    filingDeadlineNote:
      "File Form I-539 before your grace period ends. B-1/B-2 is unpredictable; approval is not guaranteed and stay may be less than 6 months.",
    documents: [
      { name: "Form I-539 (Application to Extend/Change Nonimmigrant Status)" },
      { name: "Copy of passport bio page + visa stamp" },
      { name: "Copy of I-94 arrival/departure record" },
      { name: "Financial evidence of self-sufficiency (bank statements, assets)" },
      { name: "Cover letter explaining purpose and intended duration of stay" },
      { name: "Evidence of strong ties to home country (property, family, employment offer)" },
      { name: "Statement of intent to depart U.S. before authorized stay expires" },
    ],
    fees: {
      standard: 370,
      premium: null,
      label: "Filing fee $370 + $85 biometrics",
    },
    processingTimeKey: "I-539-B2",
    priority: 3,
    riskLevel: "medium",
    riskNote:
      "Approval not guaranteed and processing is slow (5–8 months). Best used as a last resort to buy time while other arrangements are made.",
    uscisUrl:
      "https://www.uscis.gov/visit-the-united-states/extend-your-stay/extend-your-stay",
  },
  {
    id: "f1-cos",
    name: "F-1 Student Status",
    shortName: "F-1 COS",
    tagline: "Return to school and maintain legal status",
    eligible: (inputs) => inputs.hasSchoolAcceptance,
    eligibilityNote: (inputs) =>
      inputs.hasSchoolAcceptance
        ? null
        : "Requires acceptance at an accredited U.S. college or university and a valid I-20 form.",
    workAuthorized: false,
    workAuthNote:
      "Limited on-campus work only (20 hrs/week). CPT or OPT work authorization requires additional separate applications after enrollment.",
    timelineWeeks: [32, 52],
    premiumAvailable: false,
    premiumTimelineDays: null,
    filingDeadline: "within-grace-period",
    filingDeadlineNote:
      "Must file Form I-539 before grace period ends. Processing can take 8–13 months — you must maintain your current status until approved.",
    documents: [
      { name: "Form I-539 (Application to Extend/Change Nonimmigrant Status)" },
      { name: "Form I-20 from accredited U.S. institution (signed by DSO)" },
      { name: "Acceptance letter from school" },
      { name: "I-901 SEVIS fee payment receipt ($350)" },
      { name: "Copy of passport bio page + visa stamp" },
      { name: "Copy of I-94 arrival/departure record" },
      { name: "Financial documents proving ability to fund entire academic program" },
      { name: "Cover letter explaining reason for status change" },
    ],
    fees: {
      standard: 370,
      premium: null,
      label: "Filing fee $370 + $85 biometrics + $350 SEVIS fee",
    },
    processingTimeKey: "I-539-F1",
    priority: 4,
    riskLevel: "medium",
    riskNote:
      "Slow processing (8–13 months) and requires genuine school enrollment. Good long-term option if you want to retrain or pursue an advanced degree.",
    uscisUrl:
      "https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors/students-and-employment/changing-to-a-nonimmigrant-f-or-m-student-status",
  },
  {
    id: "o1-visa",
    name: "O-1 Extraordinary Ability Visa",
    shortName: "O-1 Visa",
    tagline: "For workers with nationally/internationally recognized achievements",
    eligible: () => true,
    eligibilityNote: () => null,
    workAuthorized: true,
    workAuthNote:
      "Full work authorization from approval date. Can have multiple concurrent employers. No annual cap or lottery.",
    timelineWeeks: [20, 40],
    premiumAvailable: true,
    premiumTimelineDays: 15,
    filingDeadline: "within-grace-period",
    filingDeadlineNote:
      "New employer files I-129 with O-1 supplement. You can file within or after grace period but status lapses if no petition is pending.",
    documents: [
      { name: "Form I-129 with O-1 classification supplement (filed by employer)" },
      {
        name: "Written advisory opinion from peer group or recognized expert",
        notes: "Must be from a relevant industry association or recognized authority",
      },
      {
        name: "Evidence of extraordinary ability",
        notes:
          "Must satisfy 3+ criteria: major awards, memberships in prestigious associations, published articles, high salary, critical roles in distinguished organizations, media coverage, commercial success",
      },
      { name: "Job offer / itinerary of events" },
      { name: "Contract with employer or agent" },
      { name: "Copy of passport bio page + visa stamp" },
      { name: "Copy of I-94 arrival/departure record" },
    ],
    fees: {
      standard: 460,
      premium: 2965,
      label: "Base filing fee ~$460 + optional premium processing $2,965",
    },
    processingTimeKey: "I-129-O1",
    priority: 5,
    riskLevel: "medium",
    riskNote:
      "High bar for qualification — requires documented extraordinary ability. But no lottery, no cap, and no annual renewal limit. Worth exploring for senior engineers, researchers, and founders.",
    uscisUrl:
      "https://www.uscis.gov/working-in-the-united-states/temporary-workers/o-1-visa-individuals-with-extraordinary-ability-or-achievement",
  },
];
