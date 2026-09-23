"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RefreshButton() {
  const router = useRouter();
  const [spinning, setSpinning] = useState(false);
  return (
    <button
      onClick={() => {
        setSpinning(true);
        router.refresh();
        setTimeout(() => setSpinning(false), 800);
      }}
      className="inline-flex items-center gap-2 rounded-sm bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white hover:bg-white/20"
    >
      <svg
        viewBox="0 0 24 24"
        className={`h-3.5 w-3.5 ${spinning ? "animate-spin" : ""}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
      >
        <path
          d="M20 12a8 8 0 1 1-2.34-5.66M20 4v4h-4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Refresh
    </button>
  );
}
