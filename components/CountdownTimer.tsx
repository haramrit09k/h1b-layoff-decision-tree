"use client";

import { useState, useEffect } from "react";
import { UrgencyLevel } from "@/lib/calculator";

interface CountdownTimerProps {
  gracePeriodEnd: Date;
  urgency: UrgencyLevel;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

function getTimeLeft(end: Date): TimeLeft {
  const diff = end.getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds, expired: false };
}

const urgencyStyles: Record<
  UrgencyLevel,
  { bg: string; text: string; border: string; badge: string }
> = {
  safe: {
    bg: "bg-green-50",
    text: "text-green-800",
    border: "border-green-200",
    badge: "bg-green-100 text-green-800",
  },
  warning: {
    bg: "bg-yellow-50",
    text: "text-yellow-800",
    border: "border-yellow-200",
    badge: "bg-yellow-100 text-yellow-800",
  },
  critical: {
    bg: "bg-red-50",
    text: "text-red-800",
    border: "border-red-200",
    badge: "bg-red-100 text-red-800",
  },
  expired: {
    bg: "bg-gray-50",
    text: "text-gray-800",
    border: "border-gray-200",
    badge: "bg-gray-100 text-gray-800",
  },
};

const urgencyLabel: Record<UrgencyLevel, string> = {
  safe: "You have time — act now",
  warning: "Urgent — file within days",
  critical: "Critical — file immediately",
  expired: "Grace period may have ended",
};

export default function CountdownTimer({
  gracePeriodEnd,
  urgency,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(
    getTimeLeft(gracePeriodEnd)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(gracePeriodEnd));
    }, 1000);
    return () => clearInterval(interval);
  }, [gracePeriodEnd]);

  const styles = urgencyStyles[urgency];

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      className={`rounded-2xl border-2 ${styles.border} ${styles.bg} p-6 text-center`}
    >
      <span
        className={`inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4 ${styles.badge}`}
      >
        {urgencyLabel[urgency]}
      </span>

      {timeLeft.expired ? (
        <p className={`text-2xl font-bold ${styles.text}`}>
          Grace period has ended
        </p>
      ) : (
        <>
          <div className={`flex justify-center gap-4 mb-3 ${styles.text}`}>
            {[
              { value: timeLeft.days, label: "Days" },
              { value: timeLeft.hours, label: "Hours" },
              { value: timeLeft.minutes, label: "Min" },
              { value: timeLeft.seconds, label: "Sec" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center">
                <span className="text-5xl font-bold tabular-nums leading-none">
                  {label === "Days" ? value : pad(value)}
                </span>
                <span className="text-xs font-medium mt-1 opacity-70">
                  {label}
                </span>
              </div>
            ))}
          </div>
          <p className={`text-sm font-medium ${styles.text} opacity-80`}>
            Grace period ends:{" "}
            <strong>
              {gracePeriodEnd.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </strong>
          </p>
        </>
      )}
    </div>
  );
}
