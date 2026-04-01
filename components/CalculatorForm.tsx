"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { UserInputs } from "@/data/visa-paths";
import { buildResultsUrl } from "@/lib/url-state";

const today = new Date().toISOString().split("T")[0];

export default function CalculatorForm() {
  const router = useRouter();
  const [inputs, setInputs] = useState<UserInputs>({
    layoffDate: "",
    i94Expiry: "",
    spouseVisa: "none",
    i140Status: "unknown",
    hasSchoolAcceptance: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    if (!inputs.layoffDate) newErrors.layoffDate = "Required";
    if (!inputs.i94Expiry) newErrors.i94Expiry = "Required";
    if (inputs.layoffDate && inputs.i94Expiry) {
      if (new Date(inputs.i94Expiry) <= new Date(inputs.layoffDate)) {
        newErrors.i94Expiry =
          "I-94 expiry must be after your layoff date";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const url = buildResultsUrl(inputs);
    router.push(url);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Layoff Date */}
      <div>
        <label
          htmlFor="layoffDate"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Last day of employment (or expected layoff date)
        </label>
        <input
          id="layoffDate"
          type="date"
          max={today}
          value={inputs.layoffDate}
          onChange={(e) =>
            setInputs((p) => ({ ...p, layoffDate: e.target.value }))
          }
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {errors.layoffDate && (
          <p className="mt-1 text-sm text-red-600">{errors.layoffDate}</p>
        )}
      </div>

      {/* I-94 Expiry */}
      <div>
        <label
          htmlFor="i94Expiry"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          I-94 expiry date (from your admission record)
        </label>
        <p className="text-xs text-gray-500 mb-1.5">
          Find this at{" "}
          <span className="font-mono text-blue-600">
            i94.cbp.dhs.gov
          </span>
        </p>
        <input
          id="i94Expiry"
          type="date"
          value={inputs.i94Expiry}
          onChange={(e) =>
            setInputs((p) => ({ ...p, i94Expiry: e.target.value }))
          }
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {errors.i94Expiry && (
          <p className="mt-1 text-sm text-red-600">{errors.i94Expiry}</p>
        )}
      </div>

      {/* Spouse Visa */}
      <div>
        <label
          htmlFor="spouseVisa"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Spouse&apos;s visa status
        </label>
        <select
          id="spouseVisa"
          value={inputs.spouseVisa}
          onChange={(e) =>
            setInputs((p) => ({
              ...p,
              spouseVisa: e.target.value as UserInputs["spouseVisa"],
            }))
          }
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option value="none">Not married / spouse is not in the U.S.</option>
          <option value="H1B">Spouse has H-1B status</option>
          <option value="other">Spouse has another visa type</option>
        </select>
      </div>

      {/* I-140 Status */}
      <div>
        <label
          htmlFor="i140Status"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Form I-140 (Immigrant Petition for Alien Workers) status
        </label>
        <p className="text-xs text-gray-500 mb-1.5">
          This is your green card petition, filed by your employer. Relevant if
          your layoff happened after 180 days of I-140 approval (AC21
          portability).
        </p>
        <select
          id="i140Status"
          value={inputs.i140Status}
          onChange={(e) =>
            setInputs((p) => ({
              ...p,
              i140Status: e.target.value as UserInputs["i140Status"],
            }))
          }
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option value="unknown">I&apos;m not sure</option>
          <option value="none">No I-140 has been filed</option>
          <option value="pending">I-140 is pending (filed, not yet approved)</option>
          <option value="approved">I-140 is approved</option>
        </select>
      </div>

      {/* School Acceptance */}
      <div className="flex items-start gap-3">
        <input
          id="schoolAcceptance"
          type="checkbox"
          checked={inputs.hasSchoolAcceptance}
          onChange={(e) =>
            setInputs((p) => ({
              ...p,
              hasSchoolAcceptance: e.target.checked,
            }))
          }
          className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="schoolAcceptance" className="text-sm text-gray-700">
          I have been accepted to (or am enrolled in) a U.S. accredited college
          or university and have a valid I-20
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Calculate My Options →
      </button>
    </form>
  );
}
