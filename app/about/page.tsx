import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
        About H-1B Navigator
      </h1>
      <p className="text-gray-500 mb-8">
        What this tool is, what it isn&apos;t, and how to use it responsibly.
      </p>

      <section className="space-y-8 text-sm text-gray-700 leading-relaxed">
        <div>
          <h2 className="text-base font-bold text-gray-900 mb-2">
            What this tool does
          </h2>
          <p>
            H-1B Navigator is a free, informational tool that helps H-1B visa
            holders understand their options after a layoff. It calculates your
            grace period deadline based on your layoff date and I-94 expiry,
            shows visa path options filtered by your eligibility, and provides
            document checklists for each path.
          </p>
          <p className="mt-2">
            It was built because tens of thousands of H-1B holders face layoffs
            each year and have no clear, structured resource to understand their
            timeline and options — often paying $300+/hr for information that is
            publicly available but fragmented.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <h2 className="text-base font-bold text-amber-900 mb-2">
            ⚠️ Legal disclaimer — please read
          </h2>
          <ul className="space-y-2 text-amber-900">
            <li>
              <strong>This is not legal advice.</strong> Nothing on this site
              constitutes legal advice or creates an attorney-client
              relationship.
            </li>
            <li>
              <strong>Immigration law is fact-specific.</strong> Your situation
              may have details that materially change the analysis. This tool
              cannot account for every scenario.
            </li>
            <li>
              <strong>Rules change.</strong> USCIS regulations, processing
              times, and fees can change at any time. Always verify current
              requirements at{" "}
              <a
                href="https://www.uscis.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                USCIS.gov
              </a>
              .
            </li>
            <li>
              <strong>The grace period is discretionary.</strong> USCIS can
              shorten or deny the grace period. H-1B oversight has tightened
              (see &quot;Recent developments&quot; below). This tool&apos;s
              calculations are based on published rules, not guarantees.
            </li>
            <li>
              <strong>Always consult an attorney</strong> before making
              decisions about your immigration status.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-base font-bold text-gray-900 mb-2">
            Recent developments
          </h2>
          <p className="text-xs text-gray-500 mb-2">
            Last reviewed October 11, 2026. Based on law-firm and news
            summaries of USCIS and White House actions; confirm details on
            USCIS.gov.
          </p>
          <ul className="space-y-2 ml-4 list-disc">
            <li>
              <strong>$100,000 H-1B payment — extended, but court-blocked.</strong>{" "}
              A September 18, 2026 proclamation extended the payment on H-1B
              petitions for workers entering from abroad through September 21,
              2027. USCIS has said it does not apply to people already in the
              U.S. who transfer employers or change status, which covers the
              transfer and change-of-status paths shown here. A federal court
              vacated the implementing guidance on June 8, 2026, and the First
              Circuit denied a stay on July 24, 2026, so it is not currently
              being collected — but an appeal could reinstate it. If you leave
              the U.S. and a new employer petitions for you from abroad, this
              is the scenario where it could matter.
            </li>
            <li>
              <strong>Employer layoffs under scrutiny.</strong> A September 18,
              2026 executive order directs agencies to consider an H-1B
              sponsor&apos;s recent layoffs when reviewing labor condition
              applications, petitions, and visas. It does not change your
              eligibility to transfer, but ask a prospective employer about
              their own layoff history and expect more questions.
            </li>
            <li>
              <strong>Higher fees.</strong> Premium processing rose on March 1,
              2026 (H-1B and O-1 I-129: $2,965; F-1 change of status I-539:
              $2,075). Base fees since April 2024: I-129 $780 plus a $600
              Asylum Program Fee (both paid by the employer), and I-539 $470
              on paper or $420 online, with biometrics included.
            </li>
            <li>
              <strong>H-4 EAD no longer auto-extends.</strong> For renewals
              filed on or after October 30, 2025, work authorization ends on
              the card&apos;s expiration date even while a renewal is pending.
            </li>
            <li>
              <strong>B-2 &quot;bridge&quot; filings get a closer look.</strong>{" "}
              Practitioners report more scrutiny of B-2 change-of-status
              requests filed to buy time before an H-1B petition. The 60-day
              grace period rule itself has not changed.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-base font-bold text-gray-900 mb-2">
            How we calculate the grace period
          </h2>
          <p>
            Per{" "}
            <a
              href="https://www.uscis.gov/working-in-the-united-states/information-for-employers-and-employees/options-for-nonimmigrant-workers-following-termination-of-employment"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              USCIS guidance
            </a>
            , the grace period for H-1B workers is the <strong>shorter</strong>{" "}
            of:
          </p>
          <ul className="mt-2 ml-4 list-disc space-y-1">
            <li>60 consecutive calendar days from your last day of employment</li>
            <li>The end date on your I-94 admission record</li>
          </ul>
          <p className="mt-2">
            We use <code className="bg-gray-100 px-1 rounded">min(layoff + 60 days, I-94 expiry)</code>.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-gray-900 mb-2">
            Data sources
          </h2>
          <ul className="space-y-1 ml-4 list-disc">
            <li>
              Grace period rules:{" "}
              <a
                href="https://www.uscis.gov/working-in-the-united-states/information-for-employers-and-employees/options-for-nonimmigrant-workers-following-termination-of-employment"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                USCIS.gov
              </a>
            </li>
            <li>
              Processing times:{" "}
              <a
                href="https://egov.uscis.gov/processing-times/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                USCIS Processing Times tool
              </a>{" "}
              (updated periodically by this site)
            </li>
            <li>
              Document requirements: USCIS form instructions and official
              guidance pages
            </li>
            <li>
              AC21 portability:{" "}
              <a
                href="https://www.uscis.gov/policy-manual/volume-7-part-e-chapter-5"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                USCIS Policy Manual Vol. 7, Part E, Ch. 5
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-base font-bold text-gray-900 mb-2">
            Privacy
          </h2>
          <p>
            This tool does not store any data you enter. All inputs are encoded
            in the URL of your browser and are never sent to any server. There
            is no database, no account, and no tracking of individual
            situations.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-gray-900 mb-2">
            Report an error
          </h2>
          <p>
            If you believe any information on this site is inaccurate, please
            open an issue on our GitHub repository. Immigration rules change
            frequently and community help keeping this up-to-date is welcome.
          </p>
        </div>
      </section>

      <div className="mt-10">
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          ← Back to calculator
        </Link>
      </div>
    </div>
  );
}
