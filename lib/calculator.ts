import { UserInputs, VisaPath, visaPaths } from "@/data/visa-paths";

/**
 * Grace period ends at the earlier of:
 *   1. layoff date + 60 calendar days
 *   2. I-94 expiry date
 * Returns the grace period end date.
 */
export function calculateGracePeriod(
  layoffDate: Date,
  i94Expiry: Date
): Date {
  const sixtyDaysOut = new Date(layoffDate);
  sixtyDaysOut.setDate(sixtyDaysOut.getDate() + 60);
  return sixtyDaysOut < i94Expiry ? sixtyDaysOut : i94Expiry;
}

/**
 * Returns days remaining from now until the grace period deadline.
 * Negative means already expired.
 */
export function daysRemaining(gracePeriodEnd: Date): number {
  const now = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.floor((gracePeriodEnd.getTime() - now.getTime()) / msPerDay);
}

export type UrgencyLevel = "safe" | "warning" | "critical" | "expired";

export function getUrgencyLevel(days: number): UrgencyLevel {
  if (days < 0) return "expired";
  if (days < 15) return "critical";
  if (days < 30) return "warning";
  return "safe";
}

export interface EligiblePath {
  path: VisaPath;
  eligible: boolean;
  ineligibilityReason: string | null;
}

/**
 * Returns all visa paths with eligibility status, sorted by priority.
 * Eligible paths come first.
 */
export function evaluatePaths(inputs: UserInputs): EligiblePath[] {
  const results: EligiblePath[] = visaPaths.map((path) => ({
    path,
    eligible: path.eligible(inputs),
    ineligibilityReason: path.eligibilityNote(inputs),
  }));

  return results.sort((a, b) => {
    // Eligible paths first
    if (a.eligible && !b.eligible) return -1;
    if (!a.eligible && b.eligible) return 1;
    // Then by priority within each group
    return a.path.priority - b.path.priority;
  });
}

/**
 * Determines which grace period limiter applied.
 */
export function getGracePeriodLimiter(
  layoffDate: Date,
  i94Expiry: Date
): "60-days" | "i94-expiry" {
  const sixtyDaysOut = new Date(layoffDate);
  sixtyDaysOut.setDate(sixtyDaysOut.getDate() + 60);
  return sixtyDaysOut <= i94Expiry ? "60-days" : "i94-expiry";
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
