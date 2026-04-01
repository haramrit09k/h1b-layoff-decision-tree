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
              shorten or deny the grace period. Recent enforcement actions have
              affected holders within the grace period. This tool&apos;s
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
