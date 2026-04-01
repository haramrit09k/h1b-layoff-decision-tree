import { EligiblePath } from "@/lib/calculator";
import processingTimesData from "@/data/processing-times.json";
import DocumentChecklist from "./DocumentChecklist";

interface OptionCardProps {
  result: EligiblePath;
  rank?: number; // 1-based rank among eligible paths
}

const riskColors = {
  low: "text-green-700 bg-green-50",
  medium: "text-yellow-700 bg-yellow-50",
  high: "text-red-700 bg-red-50",
};

export default function OptionCard({ result, rank }: OptionCardProps) {
  const { path, eligible, ineligibilityReason } = result;
  const processingTime =
    processingTimesData.forms[
      path.processingTimeKey as keyof typeof processingTimesData.forms
    ];

  return (
    <div
      className={`rounded-xl border-2 p-5 ${
        eligible
          ? "border-gray-200 bg-white"
          : "border-gray-100 bg-gray-50 opacity-70"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          {eligible && rank && (
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
              {rank}
            </span>
          )}
          <div>
            <h3 className="font-bold text-gray-900 text-base leading-tight">
              {path.name}
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">{path.tagline}</p>
          </div>
        </div>

        {/* Eligibility badge */}
        {eligible ? (
          <span className="flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-800">
            Eligible
          </span>
        ) : (
          <span className="flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-500">
            Not eligible
          </span>
        )}
      </div>

      {/* Ineligibility reason */}
      {!eligible && ineligibilityReason && (
        <p className="text-sm text-gray-500 italic mb-3">
          {ineligibilityReason}
        </p>
      )}

      {eligible && (
        <>
          {/* Key stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <Stat
              label="Can work?"
              value={path.workAuthorized ? "Yes" : "No"}
              highlight={path.workAuthorized}
            />
            <Stat
              label="Timeline"
              value={`${path.timelineWeeks[0]}–${path.timelineWeeks[1]} weeks`}
            />
            <Stat
              label="Standard processing"
              value={processingTime?.standard ?? "Varies"}
            />
            <Stat
              label="Premium available"
              value={
                path.premiumAvailable
                  ? `${path.premiumTimelineDays} biz days`
                  : "No"
              }
            />
          </div>

          {/* Work authorization note */}
          <div className={`text-xs rounded-lg px-3 py-2 mb-3 ${path.workAuthorized ? "bg-green-50 text-green-800" : "bg-amber-50 text-amber-800"}`}>
            <span className="font-semibold">Work authorization: </span>
            {path.workAuthNote}
          </div>

          {/* Filing deadline */}
          <div className="text-xs bg-blue-50 text-blue-800 rounded-lg px-3 py-2 mb-3">
            <span className="font-semibold">Filing deadline: </span>
            {path.filingDeadlineNote}
          </div>

          {/* Fees */}
          <div className="text-xs text-gray-600 mb-3">
            <span className="font-semibold">Fees: </span>
            {path.fees.label}
          </div>

          {/* Risk level */}
          <div
            className={`text-xs rounded-lg px-3 py-2 mb-1 ${riskColors[path.riskLevel]}`}
          >
            <span className="font-semibold capitalize">
              {path.riskLevel} risk:{" "}
            </span>
            {path.riskNote}
          </div>

          {/* Document checklist */}
          <DocumentChecklist documents={path.documents} />

          {/* USCIS link */}
          <a
            href={path.uscisUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1 text-xs text-blue-600 hover:underline"
          >
            Official USCIS page
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="bg-gray-50 rounded-lg px-3 py-2">
      <p className="text-xs text-gray-500 mb-0.5">{label}</p>
      <p
        className={`text-sm font-semibold ${
          highlight === true
            ? "text-green-700"
            : highlight === false
              ? "text-red-600"
              : "text-gray-900"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
