import React from "react";

export default function ItineraryLoading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-[#F6F6F7] overflow-y-auto overflow-x-hidden font-sans">
      
      {/* ─── Hero Section Skeleton ─── */}
      <section className="hidden lg:block w-full bg-white border-b border-zinc-100">
        <div className="flex flex-col lg:flex-row min-h-[100vh]">
          {/* LEFT: Text Content Skeleton */}
          <div className="relative w-full lg:w-[35%] flex flex-col justify-center px-8 md:px-16 lg:px-20 py-16">
            <div className="absolute top-[20px] left-[30px] w-32 h-8 bg-zinc-100 animate-pulse rounded-md" />
            
            <div className="w-3/4 h-20 bg-zinc-100 animate-pulse rounded-2xl mb-4" />
            <div className="w-1/2 h-8 bg-zinc-50 animate-pulse rounded-lg mb-8" />
            
            {/* Trip Summary Skeleton */}
            <div className="flex gap-4 mb-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex-1 h-20 bg-zinc-50 animate-pulse rounded-2xl border border-zinc-100" />
              ))}
            </div>
            
            <div className="w-48 h-12 bg-zinc-900/5 animate-pulse rounded-full" />
          </div>

          {/* RIGHT: Hero Image Skeleton */}
          <div className="w-full lg:w-[65%] min-h-[400px] lg:min-h-0 relative overflow-hidden bg-zinc-100 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-200/50 to-transparent" />
          </div>
        </div>
      </section>

      {/* ─── Mobile Hero Skeleton ─── */}
      <div className="block lg:hidden w-full h-[60vh] bg-zinc-200 animate-pulse" />

      {/* ─── Content Split Skeleton ─── */}
      <div className="flex-1 w-full relative">
        <div className="flex flex-col lg:flex-row w-full">
          
          {/* LEFT: Scrollable Content Skeleton */}
          <div className="w-full lg:w-[60%] xl:w-[65%] px-6 md:px-12 lg:pl-20 lg:pr-16 py-12 lg:py-16">
            
            {/* Essential Intel Skeleton */}
            <div className="mb-16">
              <div className="h-px w-full bg-zinc-100 mb-8" />
              <div className="flex gap-4 mb-10">
                <div className="w-40 h-12 bg-white animate-pulse rounded-[16px] border border-zinc-100" />
                <div className="w-40 h-12 bg-white animate-pulse rounded-[16px] border border-zinc-100" />
              </div>
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="h-4 w-full bg-zinc-100 animate-pulse rounded" />
                ))}
              </div>
            </div>

            {/* Day Section Skeleton */}
            {[1, 2].map((day) => (
              <div key={day} className="mb-20">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-10 bg-zinc-200 rounded-full" />
                  <div className="w-32 h-8 bg-zinc-100 animate-pulse rounded-lg" />
                </div>
                
                {/* Carousel Skeleton */}
                <div className="flex gap-6 overflow-hidden mb-8">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-[300px] md:w-[400px] aspect-[16/10] bg-zinc-100 animate-pulse rounded-[24px] shrink-0" />
                  ))}
                </div>

                {/* Timeline Skeleton */}
                <div className="space-y-12 pl-1">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="relative pl-8 border-l border-zinc-100 pb-8">
                      <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-zinc-200" />
                      <div className="w-1/3 h-5 bg-zinc-100 animate-pulse rounded mb-2" />
                      <div className="w-full h-4 bg-zinc-50 animate-pulse rounded mb-1" />
                      <div className="w-2/3 h-4 bg-zinc-50 animate-pulse rounded" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Sticky Map Skeleton */}
          <div className="hidden lg:block lg:w-[40%] xl:w-[35%] border-l border-zinc-200">
            <div className="sticky top-0 h-screen bg-zinc-50 animate-pulse">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-100/30 to-transparent" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
