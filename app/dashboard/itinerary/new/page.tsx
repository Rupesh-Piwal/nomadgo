"use client";

import { useTransition, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkle,
  Plus,
  Minus,
  Mountains,
  ForkKnife,
  Bank,
  CloudSun,
  Heart as HeartIcon,
  Camera,
  Lightning,
  MapPin,
  Calendar,
  Globe,
} from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { generateItinerary } from "@/app/actions/itinerary";
import {
  itinerarySchema,
  type ItineraryFormValues,
} from "@/lib/schemas/itinerary";
import LocationInput from "@/app/components/itinerary/location-input";
import { useCredits } from "@/hooks/useCredits";
import { Slider } from "@/components/ui/slider";

const budgets = [
  { label: "Budget" },
  { label: "Mid-Range" },
  { label: "Luxury" },
] as const;

const vibes = [
  { label: "Adventure", icon: Mountains },
  { label: "Foodie", icon: ForkKnife },
  { label: "Cultural", icon: Bank },
  { label: "Relaxation", icon: CloudSun },
  { label: "Romantic", icon: HeartIcon },
  { label: "Photography", icon: Camera },
] as const;

export default function NewItineraryPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { credits } = useCredits();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ItineraryFormValues>({
    resolver: zodResolver(itinerarySchema),
    defaultValues: {
      budget: "Mid-Range",
      vibe: "",
      duration: 3,
    },
  });

  const selectedBudget = watch("budget");
  const selectedVibe = watch("vibe");
  const duration = watch("duration");

  const onSubmit = async (data: ItineraryFormValues) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("destination", data.destination);
      formData.append("duration", data.duration.toString());
      formData.append("budget", data.budget);
      formData.append("vibe", data.vibe);

      const result = await generateItinerary(formData);

      if (result.success) {
        toast.success("Itinerary generated successfully!");
        router.push(`/dashboard/itinerary/${result.id}`);
      } else {
        if (result.error === "INSUFFICIENT_CREDITS") {
          toast.error("Insufficient Credits", {
            description:
              "You've used all your credits for today. Credits reset every 24 hours.",
            duration: 5000,
          });
        } else if (result.error === "RATE_LIMIT") {
          toast.error("AI is Busy", {
            description:
              "Our travel guides are currently busy. Please wait about 30 seconds and try again.",
            duration: 5000,
          });
        } else {
          toast.error("Generation Failed", {
            description: "Something went wrong while crafting your trip.",
          });
        }
      }
    });
  };

  const SubmitButton = ({ className }: { className?: string }) => (
    <Button
      type="submit"
      disabled={isPending}
      className={cn(
        "h-12 w-full bg-black hover:bg-zinc-800 text-white rounded-xl font-medium shadow-lg transition-all active:scale-[0.98] disabled:opacity-70 border-none",
        className
      )}
    >
      {isPending ? (
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          <span>Crafting...</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Sparkle weight="fill" className="w-4 h-4 text-amber-400" />
          <span>Generate Itinerary</span>
        </div>
      )}
    </Button>
  );

  return (
    <div className="min-h-full bg-gray-50/50">
      <div className="md:max-w-[800px] mx-auto px-4 lg:px-0">
        <header className="mb-8 text-left lg:text-center">
          <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight text-zinc-900">
            Plan a new Journey
          </h1>
          <p className="text-zinc-500 text-sm mt-2">
            Fill in the details to craft your perfect travel story.
          </p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 lg:p-8 space-y-8">

            {/* Section 1: Destination */}
            <div className="space-y-3">
              <Label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Destination
              </Label>
              <div className="relative">
                <LocationInput
                  defaultValue={watch("destination")}
                  onSelect={(loc) => {
                    const fullName = loc.isFeatured
                      ? `${loc.name}, ${loc.country}`
                      : `${loc.name}${loc.city ? `, ${loc.city}` : ""}, ${loc.country}`;
                    setValue("destination", fullName, { shouldValidate: true });
                  }}
                  disabled={isPending}
                  className="h-12 rounded-xl border-gray-200 focus:ring-black/5"
                  dropdownClassName="w-full bg-white border border-gray-200 shadow-xl rounded-xl mt-2 overflow-hidden z-50"
                />
              </div>
              <AnimatePresence>
                {errors.destination && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-500 mt-1">
                    {errors.destination.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Section 2: Days Stepper */}
            <div className="space-y-3">
              <Label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Duration
              </Label>
              <div className="flex items-center justify-between h-12 bg-gray-50/50 border border-gray-100 rounded-xl px-2 w-full sm:w-48">
                <button
                  type="button"
                  disabled={duration <= 1 || isPending}
                  onClick={() => setValue("duration", Math.max(1, duration - 1))}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 shadow-sm hover:bg-gray-50 disabled:opacity-30 transition-all"
                >
                  <Minus weight="bold" className="w-3 h-3" />
                </button>
                <span className="text-sm font-semibold text-zinc-900 tabular-nums">
                  {duration} {duration === 1 ? 'Day' : 'Days'}
                </span>
                <button
                  type="button"
                  disabled={duration >= 3 || isPending}
                  onClick={() => setValue("duration", Math.min(3, duration + 1))}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 shadow-sm hover:bg-gray-50 disabled:opacity-30 transition-all"
                >
                  <Plus weight="bold" className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Section 3: Vibe Selection */}
            <div className="space-y-4">
              <Label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Trip Vibe
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {vibes.map((v) => (
                  <button
                    key={v.label}
                    type="button"
                    onClick={() => setValue("vibe", v.label as any)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-3 rounded-xl border text-left transition-all duration-200",
                      selectedVibe === v.label
                        ? "bg-zinc-900 border-zinc-900 text-white shadow-md ring-2 ring-black/5"
                        : "bg-white border-gray-200 text-zinc-600 hover:border-zinc-300 hover:bg-gray-50"
                    )}
                  >
                    <v.icon className={cn("w-4 h-4", selectedVibe === v.label ? "text-amber-400" : "text-zinc-400")} />
                    <span className="text-xs font-medium">{v.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Section 4: Budget Level */}
            <div className="space-y-6">
              <Label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Budget Level
              </Label>
              <div className="px-2">
                <Slider
                  min={0}
                  max={2}
                  step={1}
                  value={[budgets.findIndex((b) => b.label === selectedBudget)]}
                  onValueChange={(vals) => setValue("budget", budgets[vals[0]].label as any)}
                  className="[&_[data-slot=slider-range]]:bg-zinc-900 [&_[data-slot=slider-thumb]]:border-zinc-900"
                />
                <div className="mt-4 flex w-full items-center justify-between text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  {budgets.map((b) => (
                    <span key={b.label} className={cn("transition-colors", selectedBudget === b.label ? "text-zinc-900" : "")}>
                      {b.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:block pt-4">
              <SubmitButton />
              {/* <div className="mt-4 flex justify-center items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                <Lightning weight="fill" className="w-3 h-3 text-amber-400" />
                <span>{credits ?? "—"} Credits Available</span>
              </div> */}
            </div>

          </div>
        </form>

        {/* Mobile Sticky CTA */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 pb-8 z-50 shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
          <div className="max-w-[640px] mx-auto flex flex-col gap-3">
            <div className="flex justify-center items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              <Lightning weight="fill" className="w-3 h-3 text-amber-400" />
              <span>{credits ?? "—"} Credits Available</span>
            </div>
            <SubmitButton />
          </div>
        </div>
      </div>
    </div>
  );
}
