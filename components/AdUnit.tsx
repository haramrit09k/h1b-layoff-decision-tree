"use client";

import { useEffect } from "react";

interface AdUnitProps {
  slot: string;
  className?: string;
}

const ADSENSE_ID = "ca-pub-4216024074835971";

export default function AdUnit({ slot, className }: AdUnitProps) {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch {}
  }, []);

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
