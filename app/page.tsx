import CalculatorForm from "@/components/CalculatorForm";

export default function HomePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 text-sm font-medium px-4 py-2 rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse inline-block" />
          60-day clock is ticking
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
          H-1B Layoff Navigator
        </h1>
        <p className="text-lg text-gray-600 mb-2">
          Enter your dates and situation below. Get your exact grace period
          deadline, all visa options you qualify for, and document checklists —
          in 60 seconds.
        </p>
        <p className="text-sm text-gray-400">
          Free · No account needed · Not legal advice
        </p>
      </div>

      {/* Value props */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { icon: "⏱", label: "Exact deadline", sub: "Grace period end date" },
          { icon: "📋", label: "Ranked options", sub: "Filtered by eligibility" },
          { icon: "✅", label: "Doc checklists", sub: "For each visa path" },
        ].map(({ icon, label, sub }) => (
          <div key={label} className="text-center bg-gray-50 rounded-xl p-4">
            <span className="text-2xl">{icon}</span>
            <p className="text-sm font-semibold text-gray-800 mt-1">{label}</p>
            <p className="text-xs text-gray-500">{sub}</p>
          </div>
        ))}
      </div>

      {/* Form card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6">
          Your situation
        </h2>
        <CalculatorForm />
      </div>

      {/* Grace period explainer */}
      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-5">
        <h3 className="text-sm font-bold text-blue-900 mb-2">
          How does the 60-day grace period work?
        </h3>
        <p className="text-sm text-blue-800">
          Under USCIS regulations, H-1B workers who lose their job involuntarily
          have a grace period to find a new sponsor, change status, or depart.
          The grace period is{" "}
          <strong>the shorter of 60 calendar days</strong> from your last day of
          employment, or your I-94 expiry date. During this time, no work is
          permitted. USCIS can shorten or deny the grace period at its
          discretion.
        </p>
      </div>
    </div>
  );
}
