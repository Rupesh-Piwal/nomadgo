"use client";

import React from "react";
import { MapPin, Navigation, Gauge } from "lucide-react";

type TripSummaryProps = {
  costINR: { min: number; max: number };
  places: number;
  distanceKm: number;
  difficulty: string;
};

const USD_RATE = 83;

/**
 * Premium, compact summary row for the itinerary hero.
 * Converts INR to USD and displays key trip metrics.
 */
export default function TripSummary({
  costINR,
  places,
  distanceKm,
  difficulty,
}: TripSummaryProps) {
  // Convert INR to USD and round to nearest integer
  const minUSD = Math.round(costINR.min / USD_RATE);
  const maxUSD = Math.round(costINR.max / USD_RATE);

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] font-medium text-zinc-500 mt-2">
      {/* Price Range */}
      <div className="flex items-center gap-1.5">
        <span className="text-zinc-900 font-bold">
          ${minUSD}–${maxUSD}
        </span>
      </div>

      <span className="text-zinc-300 hidden sm:inline">•</span>

      {/* Places Count */}
      <div className="flex items-center gap-1.5">
        <MapPin className="w-3.5 h-3.5 text-zinc-400" />
        <span>{places} places</span>
      </div>

      <span className="text-zinc-300 hidden sm:inline">•</span>

      {/* Total Distance */}
      <div className="flex items-center gap-1.5">
        <Navigation className="w-3.5 h-3.5 text-zinc-400" />
        <span>{distanceKm} km</span>
      </div>

      <span className="text-zinc-300 hidden sm:inline">•</span>

      {/* Difficulty */}
      <div className="flex items-center gap-1.5">
        <Gauge className="w-3.5 h-3.5 text-zinc-400" />
        <span className={getDifficultyColor(difficulty)}>{difficulty}</span>
      </div>
    </div>
  );
}

function getDifficultyColor(difficulty: string) {
  const diff = difficulty.toLowerCase();
  if (diff.includes("easy")) return "text-emerald-600";
  if (diff.includes("moderate")) return "text-amber-600";
  if (diff.includes("hard")) return "text-rose-600";
  return "text-zinc-600";
}
