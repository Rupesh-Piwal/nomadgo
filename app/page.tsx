
"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

const ExploreSection = dynamic(() => import("@/components/sections/ExploreSection"), {
  ssr: false,
  loading: () => <div className="h-96 animate-pulse bg-zinc-50" />
});
const GuidesSection = dynamic(() => import("@/components/sections/GuidesSection"), {
  ssr: false,
  loading: () => <div className="h-96 animate-pulse bg-zinc-50" />
});
const MapPlanningSection = dynamic(() => import("@/components/sections/MapPlanningSection"), {
  ssr: false,
  loading: () => <div className="h-96 animate-pulse bg-zinc-50" />
});
const PricingSection = dynamic(() => import("@/components/sections/PricingSection"), {
  ssr: false,
  loading: () => <div className="h-96 animate-pulse bg-zinc-50" />
});
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

export default function TravelPulseHome() {
  return (
    <div className="font-sans bg-[#FEFEFF] text-[#0F1923] selection:bg-terracotta/30 min-h-screen overflow-x-hidden">
      <main>
        <Hero />
        <ExploreSection />
        <GuidesSection />
        <MapPlanningSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
