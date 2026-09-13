"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Snapshot = {
  currentTemp: number;
  currentIcon: string;
  currentLabel: string;
};

export function HeaderWeather() {
  const [weather, setWeather] = useState<Snapshot | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/weather?city=johannesburg")
      .then((response) => response.json())
      .then((data: { ok?: boolean; city?: Snapshot }) => {
        if (!cancelled && data.ok && data.city) {
          setWeather(data.city);
        }
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  if (!weather) {
    return (
      <Link href="/weather" className="text-white/70 hover:text-white">
        Joburg weather
      </Link>
    );
  }

  return (
    <Link href="/weather" className="text-white/80 hover:text-white">
      Joburg {weather.currentIcon} {weather.currentTemp}° · {weather.currentLabel}
    </Link>
  );
}
