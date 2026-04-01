/**
 * Fetches current USCIS processing times for the forms we track and updates
 * data/processing-times.json.
 *
 * USCIS exposes an internal JSON API used by egov.uscis.gov/processing-times/.
 * The endpoint pattern is:
 *   GET https://egov.uscis.gov/processing-times/api/processingtime/{FORM}/{FORM_TYPE}
 *
 * We fall back to the published ranges from the website if the API changes.
 * Run with: node scripts/update-processing-times.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = join(__dirname, "../data/processing-times.json");

// Mapping of our internal keys → USCIS API form/subtype pairs
// Form types must match the exact identifiers from the USCIS processing times API.
// Verify at: https://egov.uscis.gov/processing-times/
const FORM_QUERIES = [
  {
    key: "I-129-H1B",
    form: "I-129",
    formType: "H-1B - Specialty Occupations",
    // Multiple service centers — we take the median/typical range
  },
  {
    key: "I-539-H4",
    form: "I-539",
    formType: "Change of Status to H-4",
  },
  {
    key: "I-539-B2",
    form: "I-539",
    formType: "Change of Status to B-2",
  },
  {
    key: "I-539-F1",
    form: "I-539",
    formType: "Change of Status to F-1 Student",
  },
  {
    key: "I-129-O1",
    form: "I-129",
    formType: "O-1 - Extraordinary Ability/Achievement",
  },
];

const USCIS_API_BASE =
  "https://egov.uscis.gov/processing-times/api/processingtime";

/**
 * Fetch processing time for a single form/type combination.
 * Returns a string like "3 Months" to "5 Months" or null on failure.
 */
async function fetchProcessingTime(form, formType) {
  const encodedType = encodeURIComponent(formType);
  const url = `${USCIS_API_BASE}/${form}/${encodedType}`;

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; H1B-Navigator/1.0)",
        Accept: "application/json",
        Referer: "https://egov.uscis.gov/processing-times/",
      },
    });

    if (!res.ok) {
      console.warn(`USCIS API returned ${res.status} for ${form} / ${formType}`);
      return null;
    }

    const data = await res.json();

    // The USCIS API returns an array of service center results.
    // We aggregate to a range across all centers.
    if (!data || !Array.isArray(data.data)) return null;

    const months = data.data
      .map((center) => {
        const range = center?.subtypes?.[0]?.range;
        return range ? range : null;
      })
      .filter(Boolean);

    if (months.length === 0) return null;

    // Build a combined range string
    const allMonths = months.flatMap((r) => {
      // Range format from USCIS is typically: "X Months" or "X.5 Months to Y Months"
      const nums = r.match(/[\d.]+/g)?.map(Number) ?? [];
      return nums;
    });

    if (allMonths.length === 0) return null;

    const minMonths = Math.min(...allMonths);
    const maxMonths = Math.max(...allMonths);

    if (minMonths === maxMonths) {
      return `${minMonths} months`;
    }
    return `${minMonths}–${maxMonths} months`;
  } catch (err) {
    console.warn(`Failed to fetch ${form} / ${formType}:`, err.message);
    return null;
  }
}

async function main() {
  console.log("Fetching USCIS processing times…");

  const current = JSON.parse(readFileSync(DATA_FILE, "utf8"));
  let updated = false;

  for (const { key, form, formType } of FORM_QUERIES) {
    process.stdout.write(`  ${key} (${formType})… `);
    const standard = await fetchProcessingTime(form, formType);

    if (standard) {
      const prev = current.forms[key]?.standard;
      if (prev !== standard) {
        console.log(`updated: "${prev}" → "${standard}"`);
        current.forms[key].standard = standard;
        updated = true;
      } else {
        console.log(`unchanged (${standard})`);
      }
    } else {
      console.log("could not fetch — keeping existing value");
    }

    // Polite delay between requests
    await new Promise((r) => setTimeout(r, 1500));
  }

  // Always update lastUpdated timestamp
  const today = new Date().toISOString().split("T")[0];
  if (current.lastUpdated !== today || updated) {
    current.lastUpdated = today;
    writeFileSync(DATA_FILE, JSON.stringify(current, null, 2) + "\n");
    console.log(`\n✓ Wrote updated processing-times.json (lastUpdated: ${today})`);
  } else {
    console.log("\nNo changes detected.");
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
