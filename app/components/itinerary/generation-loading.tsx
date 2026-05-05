"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkle,
  MapTrifold,
  Camera,
  ForkKnife,
  Airplane,
  Globe,
  Image as ImageIcon,
  Warning,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// ─── Configuration ──────────────────────────────────────────────
const LOADING_STEPS = [
  { icon: Globe, text: "Analyzing destination..." },
  { icon: Sparkle, text: "Consulting AI travel experts..." },
  { icon: MapTrifold, text: "Optimizing daily routes..." },
  { icon: ForkKnife, text: "Curating local culinary gems..." },
  { icon: Camera, text: "Fetching scenic images..." },
  { icon: Airplane, text: "Finalizing your journey..." },
];

const IMAGE_COUNT = 4;

// ─── Sub-Components ─────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="aspect-[4/3] rounded-[2rem] bg-white border border-black/5 overflow-hidden relative shadow-sm">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-zinc-50/60 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <ImageIcon className="w-8 h-8 text-zinc-100" weight="light" />
      </div>
    </div>
  );
}

function ImageCard({ src, index }: { src: string; index: number }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="aspect-[4/3] rounded-[2rem] overflow-hidden relative bg-white border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] group"
    >
      {!loaded && !error && (
        <div className="absolute inset-0 z-10 bg-zinc-50/50">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/80 to-transparent" />
        </div>
      )}

      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-50">
          <Warning className="w-6 h-6 text-zinc-200" />
        </div>
      ) : (
        <Image
          src={src}
          alt={`Preview ${index + 1}`}
          fill
          className={cn(
            "object-cover transition-all duration-1000 ease-out group-hover:scale-105",
            loaded ? "opacity-100 blur-0" : "opacity-0 blur-md"
          )}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          sizes="400px"
        />
      )}
      <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
    </motion.div>
  );
}

// ─── Main Component ─────────────────────────────────────────────

export default function GenerationLoading({ itineraryId }: { itineraryId: string }) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [discoveredImages, setDiscoveredImages] = useState<string[]>([]);
  const [status, setStatus] = useState<string>("PROCESSING");
  const [phase, setPhase] = useState<"loading" | "exiting">("loading");

  const discoveredRef = useRef<string[]>([]);
  discoveredRef.current = discoveredImages;

  // Polling Logic
  useEffect(() => {
    let pollInterval: ReturnType<typeof setInterval>;

    const checkStatus = async () => {
      try {
        const res = await fetch(`/api/itinerary/${itineraryId}/status`);
        if (!res.ok) return;
        const data = await res.json();
        setStatus(data.status);

        if (data.data) {
          const images: string[] = [];
          if (data.data.heroImage) images.push(data.data.heroImage);
          data.data.days?.forEach((day: any) => {
            day.activities?.forEach((activity: any) => {
              if (activity.image && !images.includes(activity.image)) {
                images.push(activity.image);
              }
            });
          });

          const current = discoveredRef.current;
          const newImages = images.filter((img) => !current.includes(img));

          if (newImages.length > 0) {
            const slotsLeft = IMAGE_COUNT - current.length;
            newImages.slice(0, slotsLeft).forEach((img, i) => {
              setTimeout(() => {
                setDiscoveredImages((prev) => {
                  if (prev.includes(img) || prev.length >= IMAGE_COUNT) return prev;
                  return [...prev, img];
                });
              }, i * 400);
            });
          }

          if (data.status === "DONE" && (current.length + newImages.length) >= Math.min(images.length, IMAGE_COUNT)) {
            clearInterval(pollInterval);
            setTimeout(() => setPhase("exiting"), 2000);
          }
        } else if (data.status === "DONE") {
          clearInterval(pollInterval);
          setPhase("exiting");
        }
      } catch (error) {
        console.error("Polling error:", error);
      }
    };

    pollInterval = setInterval(checkStatus, 3000);
    checkStatus();
    return () => clearInterval(pollInterval);
  }, [itineraryId]);

  // Step Rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % LOADING_STEPS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Exit Handler
  useEffect(() => {
    if (phase === "exiting") {
      setTimeout(() => router.refresh(), 800);
    }
  }, [phase, router]);

  const progress = Math.min(5 + (discoveredImages.length / IMAGE_COUNT) * 95, 100);

  return (
    <AnimatePresence>
      {phase !== "exiting" && (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center bg-[#F6F6F7] p-6 overflow-y-auto font-sans"
        >
          <div className="relative w-full max-w-2xl flex flex-col items-center py-8 my-auto">

            {/* ── 2×2 BENTO GRID ── */}
            <div className="w-full grid grid-cols-2 gap-4 mb-8">
              {Array.from({ length: IMAGE_COUNT }).map((_, idx) => {
                const src = discoveredImages[idx];
                return src ? (
                  <ImageCard key={src} src={src} index={idx} />
                ) : (
                  <SkeletonCard key={`skel-${idx}`} />
                );
              })}
            </div>

            {/* ── CONTENT ── */}
            <div className="flex flex-col items-center text-center space-y-10 w-full max-w-md">
              <div className="space-y-4">
                <h2 className="text-3xl font-serif text-zinc-900 tracking-tight">
                  Crafting your journey
                </h2>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-zinc-400 text-[10px] font-semibold uppercase tracking-[0.4em]"
                  >
                    {LOADING_STEPS[currentStep].text}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
