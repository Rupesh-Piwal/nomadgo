"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PlaneTakeoff, Building, Upload, Check, Clock, Star, Utensils, Car, Lightbulb, MapPin, ArrowRight } from "lucide-react";

export default function MapPlanningSection() {
  return (
    <section className="bg-[#FEFEFF] py-[30px] md:py-[60px] px-6 md:px-[8vw] relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center">
        {/* Header Text */}
        <div className="text-center mb-16 md:mb-20 max-w-3xl flex flex-col items-center">

          <div className="text-[20px] md:text-[32px] font-serif italic leading-none text-terracotta mb-2"
          >
            Map-Integrated Planning
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-navy text-[28px] md:text-[44px] font-sans font-medium tracking-tighter leading-[1.1] mb-8"
          >
            See everything on a map as you plan.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-navy/60 text-[17px] md:text-[20px] max-w-2xl leading-relaxed mx-auto"
          >
            Hotels and attractions appear on a live map as you explore. Visualize neighborhoods, distances, and how your days fit together.
          </motion.p>
        </div>

        {/* UI Mockup Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="w-full rounded-[24px] overflow-hidden border border-navy/5"
        >
          <div className="flex flex-col md:flex-row h-[800px] md:h-[650px]">
            {/* Left Side: Map */}
            <div className="relative w-full md:w-[55%] h-1/2 md:h-full  border-b md:border-b-0 md:border-r border-navy/10 overflow-hidden">
              <Image
                src="/map-landing.png"
                alt="Map View"
                fill
                className="object-cover"
              />
            </div>

            {/* Right Side: Details Panel */}
            <div className="w-full md:w-[45%] h-1/2 md:h-full flex flex-col">
              {/* Top Image */}
              <div className="relative h-[240px] w-full shrink-0">
                <Image
                  src="https://images.pexels.com/photos/30912162/pexels-photo-30912162.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt="Hawaii Landscape"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[22px] font-bold text-navy tracking-tight">Waikiki Hotels $150/Night</h3>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 bg-[#0F1923] text-white rounded-full text-xs font-semibold mb-8 hover:bg-[#0F1923]/90 transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  Share
                </button>

                {/* Itinerary Sections */}
                <div className="space-y-10">
                  {/* MORNING */}
                  <div>
                    <h4 className="text-[13px] font-bold uppercase tracking-wider text-terracotta mb-6">Morning</h4>

                    <div className="space-y-10 relative">
                      {/* Vertical Line */}
                      <div className="absolute left-[5px] top-2 bottom-2 w-[2px] bg-navy/5" />

                      {/* Item 1 */}
                      <div className="relative pl-8">
                        <div className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-terracotta border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.1)]" />
                        <div className="mb-2">
                          <h5 className="text-[16px] font-bold text-navy inline">Breakfast at Barnum Roma</h5>
                          <span className="text-navy/30 mx-2">—</span>
                          <span className="text-[13px] text-navy/40">Via del Pellegrino, 87, 00186 Roma RM, Italy</span>
                        </div>
                        <p className="text-[14px] text-navy/70 leading-relaxed mb-4">
                          A cozy, chic café known for artisan coffee, homemade pastries, and a modern twist on Roman breakfast staples.
                        </p>

                        {/* Insight Box */}
                        <div className="bg-[#FAF3F0] rounded-2xl p-4 mb-4 flex gap-3 border border-terracotta/5">
                          <Lightbulb className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                          <p className="text-[13px] text-terracotta/80 leading-snug">
                            This spot perfectly blends Rome's traditional 'caffè' culture with a modern artisan vibe, matching your cultural interest.
                          </p>
                        </div>

                        {/* Meta Tags */}
                        <div className="flex flex-wrap items-center gap-4 text-[12px] text-navy/40 font-medium">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>1 hour</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Star className="w-3.5 h-3.5 text-terracotta fill-terracotta" />
                            <span className="text-navy/60 font-bold">4.6</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Utensils className="w-3.5 h-3.5" />
                            <span>Italian Bakery</span>
                          </div>
                        </div>
                      </div>

                      {/* Item 2 */}
                      <div className="relative pl-8">
                        <div className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-navy/10 border-2 border-white" />
                        <div className="mb-2">
                          <h5 className="text-[16px] font-bold text-navy inline">The Colosseum & Roman Forum</h5>
                          <span className="text-navy/30 mx-2">—</span>
                          <span className="text-[13px] text-navy/40">Piazza del Colosseo, 1, 00184 Roma RM, Italy</span>
                        </div>
                        <p className="text-[14px] text-navy/70 leading-relaxed mb-4">
                          The world's most famous amphitheater and the center of ancient Roman public life.
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-[12px] text-navy/40 font-medium">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>3 hours</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Star className="w-3.5 h-3.5 text-terracotta fill-terracotta" />
                            <span className="text-navy/60 font-bold">4.8</span>
                          </div>
                          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-navy/5 border border-navy/5 text-navy/60">
                            <Car className="w-3 h-3" />
                            <span>taxi • 12 mins</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AFTERNOON */}
                  <div>
                    <h4 className="text-[13px] font-bold uppercase tracking-wider text-terracotta mb-6">Afternoon</h4>

                    <div className="space-y-10 relative">
                      {/* Vertical Line */}
                      <div className="absolute left-[5px] top-2 bottom-2 w-[2px] bg-navy/5" />

                      {/* Item 1: Lunch */}
                      <div className="relative pl-8">
                        <div className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-navy/10 border-2 border-white" />
                        <div className="mb-2">
                          <h5 className="text-[16px] font-bold text-navy inline">Lunch at Taverna dei Fori Imperiali</h5>
                          <span className="text-navy/30 mx-2">—</span>
                          <span className="text-[13px] text-navy/40">Via della Madonna dei Monti, 9, 00184 Roma RM, Italy</span>
                        </div>
                        <p className="text-[14px] text-navy/70 leading-relaxed mb-4">
                          A family-run gem serving authentic Roman pasta dishes just steps away from the ancient ruins.
                        </p>

                        {/* Insight Box */}
                        <div className="bg-[#FAF3F0] rounded-2xl p-4 mb-4 flex gap-3 border border-terracotta/5">
                          <Lightbulb className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                          <p className="text-[13px] text-terracotta/80 leading-snug">
                            The Carbonara here is widely considered among the best in the city, using top-tier guanciale.
                          </p>
                        </div>

                        {/* Meta Tags */}
                        <div className="flex flex-wrap items-center gap-4 text-[12px] text-navy/40 font-medium">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>1.5 hours</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Star className="w-3.5 h-3.5 text-terracotta fill-terracotta" />
                            <span className="text-navy/60 font-bold">4.5</span>
                          </div>
                          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-navy/5 border border-navy/5 text-navy/60">
                            <motion.div animate={{ x: [0, 2, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                              <ArrowRight className="w-3 h-3" />
                            </motion.div>
                            <span>walk • 7 mins</span>
                          </div>
                        </div>
                      </div>

                      {/* Item 2: Monti */}
                      <div className="relative pl-8">
                        <div className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-navy/10 border-2 border-white" />
                        <div className="mb-2">
                          <h5 className="text-[16px] font-bold text-navy inline">Explore the Monti District</h5>
                          <span className="text-navy/30 mx-2">—</span>
                          <span className="text-[13px] text-navy/40">Via Urbana, 00184 Roma RM, Italy</span>
                        </div>
                        <p className="text-[14px] text-navy/70 leading-relaxed mb-4">
                          Rome's most charming neighborhood, filled with artisan boutiques, vintage shops, and ivy-draped alleyways.
                        </p>

                        {/* Insight Box */}
                        <div className="bg-[#FAF3F0] rounded-2xl p-4 mb-4 flex gap-3 border border-terracotta/5">
                          <Lightbulb className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                          <p className="text-[13px] text-terracotta/80 leading-snug">
                            This area captures the 'Rione' spirit where traditional life meets contemporary creativity.
                          </p>
                        </div>

                        {/* Meta Tags */}
                        <div className="flex flex-wrap items-center gap-4 text-[12px] text-navy/40 font-medium">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>2 hours</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Star className="w-3.5 h-3.5 text-terracotta fill-terracotta" />
                            <span className="text-navy/60 font-bold">4.7</span>
                          </div>
                          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-navy/5 border border-navy/5 text-navy/60">
                            <motion.div animate={{ x: [0, 2, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                              <ArrowRight className="w-3 h-3" />
                            </motion.div>
                            <span>walk • 5 mins</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
