"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import {
  calculateGracePeriod,
  daysRemaining,
  getUrgencyLevel,
  evaluatePaths,
  getGracePeriodLimiter,
  formatDate,
} from "@/lib/calculator";
import { decodeParamsToInputs, buildResultsUrl } from "@/lib/url-state";
import CountdownTimer from "@/components/CountdownTimer";
import OptionCard from "@/components/OptionCard";
import ShareButton from "@/components/ShareButton";
import ProcessingTimesFootnote from "@/components/ProcessingTimesFootnote";
import AdUnit from "@/components/AdUnit";
import MoneyMovingCard from "@/components/MoneyMovingCard";
import { trackEvent } from "@/lib/analytics";

function ResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const inputs = decodeParamsToInputs(searchParams);

  if (!inputs) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500 mb-4">
          Missing required information. Please fill out the calculator.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Go back
        </Link>
      </div>
    );
  }

  const layoffDate = new Date(inputs.layoffDate + "T12:00:00");
  const i94Expiry = new Date(inputs.i94Expiry + "T12:00:00");
  const gracePeriodEnd = calculateGracePeriod(layoffDate, i94Expiry);
  const days = daysRemaining(gracePeriodEnd);
  const urgency = getUrgencyLevel(days);
  const limiter = getGracePeriodLimiter(layoffDate, i94Expiry);
  const eligiblePaths = evaluatePaths(inputs);
  const eligibleCount = eligiblePaths.filter((p) => p.eligible).length;

  // Build shareable URL from current window location
  const shareUrl =
    typeof window !== "undefined"
      ? buildResultsUrl(inputs, window.location.origin)
      : buildResultsUrl(inputs);

  let eligibleRank = 0;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Back link */}
      <button
        onClick={() => router.back()}
        className="text-sm text-gray-500 hover:text-gray-700 mb-6 flex items-center gap-1"
      >
        ← Edit my situation
      </button>

      {/* Countdown */}
      <div className="mb-6">
        <CountdownTimer gracePeriodEnd={gracePeriodEnd} urgency={urgency} />
      </div>

      {/* Grace period explainer */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6 text-sm text-gray-700">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Layoff date</p>
            <p className="font-semibold">
              {layoffDate.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">I-94 expiry</p>
            <p className="font-semibold">
              {i94Expiry.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Grace period ends</p>
            <p className="font-semibold text-red-700">
              {formatDate(gracePeriodEnd)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Limited by</p>
            <p className="font-semibold">
              {limiter === "60-days" ? "60-day rule" : "I-94 expiry"}
            </p>
          </div>
        </div>

        {limiter === "i94-expiry" && (
          <div className="mt-4 bg-amber-50 border border-amber-100 rounded-lg p-3 text-xs text-amber-800">
            <strong>Your I-94 expires before the 60-day window.</strong> Your
            effective grace period is shorter than 60 days because it ends at
            your I-94 expiry date. You have less time than the standard 60 days.
          </div>
        )}
      </div>

      <AdUnit slot="results-mid" className="my-4" />

      {/* Share button row */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">
          {eligibleCount} option{eligibleCount !== 1 ? "s" : ""} available to
          you
        </h2>
        <ShareButton url={shareUrl} />
      </div>

      {/* I-140 note if approved */}
      {inputs.i140Status === "approved" && (
        <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-6 text-sm text-green-800">
          <strong>Your I-140 is approved.</strong> If it has been approved for
          180+ days, your H-1B transfer benefits from AC21 portability —
          stronger protection and more flexibility in changing employers. Mention
          this to any new employer&apos;s immigration attorney.
        </div>
      )}

      {/* Option cards */}
      <div className="space-y-4 mb-8">
        {eligiblePaths.map((result) => {
          if (result.eligible) eligibleRank++;
          return (
            <OptionCard
              key={result.path.id}
              result={result}
              rank={result.eligible ? eligibleRank : undefined}
            />
          );
        })}
      </div>

      {/* Processing times footnote */}
      <ProcessingTimesFootnote />

      <MoneyMovingCard />

      {/* Legal disclaimer */}
      <div className="mt-8 bg-gray-50 border border-gray-100 rounded-xl p-5 text-xs text-gray-500">
        <p className="font-semibold text-gray-700 mb-1">
          Important disclaimer
        </p>
        <p>
          This tool is for informational purposes only and does not constitute
          legal advice. Immigration law is highly fact-specific. Processing
          times, fees, and requirements change frequently. Always consult a
          qualified immigration attorney before taking action on your visa
          status. USCIS has discretion in all immigration decisions.
        </p>
        <p className="mt-2">
          <a
            href="https://www.uscis.gov/working-in-the-united-states/information-for-employers-and-employees/options-for-nonimmigrant-workers-following-termination-of-employment"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-700"
          >
            Official USCIS guidance on options after employment termination →
          </a>
        </p>
      </div>

      {/* Lawyer CTA */}
      <div className="mt-6 bg-blue-600 rounded-2xl p-6 text-white text-center">
        <h3 className="font-bold text-lg mb-1">Need a lawyer?</h3>
        <p className="text-sm text-blue-100 mb-4">
          This tool helps you understand your options — but immigration law is
          complex. A 30-minute consultation can clarify your specific situation.
        </p>
        <a
          href="https://ailalawyer.com"
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={() => trackEvent("lawyer_cta_click")}
          className="inline-block bg-white text-blue-700 font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-blue-50 transition-colors"
        >
          Find an immigration attorney →
        </a>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-3xl mx-auto px-4 py-16 text-center text-gray-400">
          Loading your results…
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
