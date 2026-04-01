import processingTimesData from "@/data/processing-times.json";

export default function ProcessingTimesFootnote() {
  const date = new Date(processingTimesData.lastUpdated);
  const formatted = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <p className="text-xs text-gray-400 mt-2">
      Processing times last updated:{" "}
      <span className="font-medium text-gray-500">{formatted}</span>.{" "}
      <a
        href={processingTimesData.source}
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-gray-700"
      >
        View current times on USCIS.gov
      </a>
    </p>
  );
}
