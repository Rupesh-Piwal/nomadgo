import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import {
  CreditCard,
  Heart,
  MapPin,
  Airplane,
  Plus,
  ArrowRight,
  Globe,
  Compass
} from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  // Fetch everything we need for the overview
  const [credit, wishlistCount, itineraryCount, recentWishlist, recentItineraries] = await Promise.all([
    prisma.credit.findUnique({ where: { userId: session.user.id } }),
    prisma.wishlistItem.count({ where: { userId: session.user.id } }),
    prisma.itinerary.count({ where: { userId: session.user.id } }),
    prisma.wishlistItem.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
    prisma.itinerary.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 2,
    }),
  ]);

  const balance = credit?.balance ?? 5;
  const userName = session.user.name?.split(" ")[0] || "Traveler";

  return (
    <div className="h-screen max-w-7xl mx-auto flex flex-col gap-6 p-6 lg:p-6 overflow-hidden bg-background/50">
      {/* 1. Cinematic Header */}
      <header className="flex-none">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl md:text-5xl font-sans font-light tracking-tight text-foreground leading-tight">
            Welcome{" "}
            <span className="text-terracotta">{userName}</span>
          </h1>
        </div>
      </header>

      {/* 2. Quick Stats Grid */}
      <div className="grid grid-cols-3 lg:grid-cols-12 gap-4 md:gap-6 flex-none">
        {/* Credits Card */}
        <Card className="relative col-span-3 h-[110px] md:h-[130px] w-full overflow-hidden border-border/50 bg-card/40 backdrop-blur-sm p-4 md:p-5 group transition-all hover:shadow-sm hover:shadow-orange-500/10">
          <div className="flex flex-col justify-between h-full">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-[12px] bg-orange-500/10 flex items-center justify-center border border-orange-500/10">
              <CreditCard className="w-4 h-4 md:w-5 md:h-5 text-orange-500" weight="fill" />
            </div>
            <div className="space-y-0.5">
              <p className="text-[9px] md:text-[10px] font-semibold uppercase tracking-wider text-muted-foreground truncate">Credits</p>
              <p className="text-xl md:text-3xl font-black font-sans tracking-tight">{balance}</p>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-[0.09] group-hover:opacity-[0.12] transition-opacity">
            <CreditCard size={120} weight="fill" />
          </div>
        </Card>

        {/* Wishlist Stats */}
        <Card className="relative col-span-3 h-[110px] md:h-[130px] w-full overflow-hidden border-border/50 bg-card/40 backdrop-blur-sm p-4 md:p-5 group transition-all hover:shadow-sm hover:shadow-red-500/10">
          <div className="flex flex-col justify-between h-full">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-[12px] bg-red-500/10 flex items-center justify-center border border-red-500/10">
              <Heart className="w-4 h-4 md:w-5 md:h-5 text-red-500" weight="fill" />
            </div>
            <div className="space-y-0.5">
              <p className="text-[9px] md:text-[10px] font-semibold uppercase tracking-wider text-muted-foreground truncate">Pinned</p>
              <p className="text-xl md:text-3xl font-black font-sans tracking-tight">{wishlistCount}</p>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-[0.09] group-hover:opacity-[0.12] transition-opacity">
            <Heart size={120} weight="fill" />
          </div>
        </Card>

        {/* Trips Stats */}
        <Card className="relative col-span-3 h-[110px] md:h-[130px] w-full overflow-hidden border-border/50 bg-card/40 backdrop-blur-sm p-4 md:p-5 group transition-all hover:shadow-sm hover:shadow-blue-500/10">
          <div className="flex flex-col justify-between h-full">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-[12px] bg-blue-500/10 flex items-center justify-center border border-blue-500/10">
              <Airplane className="w-4 h-4 md:w-5 md:h-5 text-blue-500" weight="fill" />
            </div>
            <div className="space-y-0.5">
              <p className="text-[9px] md:text-[10px] font-semibold uppercase tracking-wider text-muted-foreground truncate">Trips</p>
              <p className="text-xl md:text-3xl font-black font-sans tracking-tight">{itineraryCount}</p>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-[0.09] group-hover:opacity-[0.12] transition-opacity">
            <Airplane size={120} weight="fill" />
          </div>
        </Card>

        {/* Immersive CTA Card */}
        <div className="col-span-3 relative overflow-hidden rounded-[20px] bg-[#C4632C] p-4 md:p-5 text-white shadow-2xl shadow-orange-950/20">
          <div className="relative z-10 h-full flex flex-col justify-between gap-2">
            <div className="space-y-1">
              <h3 className="text-lg md:text-xl font-semibold tracking-tight leading-tight">Your next story <br />starts here.</h3>
              <p className="text-white/60 text-xs leading-relaxed">Tailor-made journeys powered by AI.</p>
            </div>
            <Link href="/dashboard/itinerary/new" className="cursor-pointer">
              <Button className="w-full bg-white text-[#C4632C] hover:bg-[#C4632C] hover:text-white rounded-xl h-10 font-semibold gap-2 text-xs">
                <Plus className="w-3.5 h-3.5" weight="bold" />
                Plan New Trip
              </Button>
            </Link>
          </div>
          <div className="absolute -right-8 -bottom-8 opacity-10 rotate-12">
            <Airplane size={180} weight="fill" />
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 overflow-hidden">
        {/* 3. Wishlist Spotlight (Left Column) */}
        <div className="lg:col-span-7 flex flex-col gap-4 min-h-0">
          <div className="flex items-center justify-between flex-none">
            <h2 className="text-lg font-semibold tracking-tight">Recent Pins</h2>
            <Link href="/dashboard/wishlist" className="text-xs font-semibold text-[#C4632C] uppercase tracking-widest hover:underline">View All</Link>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-2 gap-4">
            {recentWishlist.length > 0 ? (
              recentWishlist.slice(0, 2).map((item) => (
                <Link
                  href="/dashboard/wishlist"
                  key={item.id}
                  className="group relative rounded-[16px] aspect-video overflow-hidden border border-border/50 transition-all hover:shadow-xl h-full"
                >
                  <img src={item.photoUrl} alt={item.destination} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white font-semibold text-lg tracking-tight leading-tight">{item.destination}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="w-3 h-3 text-orange-500/60" weight="fill" />
                      <span className="text-[9px] uppercase font-light tracking-widest text-white/60">Pinned Place</span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full h-full rounded-2xl border-2 border-dashed border-border/50 flex flex-col items-center justify-center gap-4 bg-accent/5">
                <Globe className="w-8 h-8 text-orange-500/40" weight="light" />
                <p className="text-xs font-medium text-muted-foreground text-center">Your dream board is empty.</p>
                <Link href="/explore">
                  <Button variant="outline" className="rounded-full px-4 h-8 text-[10px] font-bold uppercase tracking-widest">Explore</Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* 4. Recent Activity (Right Column) */}
        <div className="lg:col-span-5 flex flex-col gap-4 min-h-0">
          <div className="flex items-center justify-between flex-none">
            <h2 className="text-lg font-semibold tracking-tight">Recent Activity</h2>
            <Link href="/dashboard/history" className="text-xs font-semibold text-[#C4632C] uppercase tracking-widest hover:underline">Trip History</Link>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto pr-2 custom-scrollbar">
            <div className="space-y-3">
              {recentItineraries.length > 0 ? (
                recentItineraries.map((trip) => (
                  <Link
                    href={`/dashboard/itinerary/${trip.id}`}
                    key={trip.id}
                    className="flex items-center gap-4 p-3 rounded-2xl bg-card/30 border border-border/50 hover:bg-card/50 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shrink-0 border border-border/50 overflow-hidden">
                      <Compass className="w-6 h-6 text-muted-foreground group-hover:text-orange-500 transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{trip.destination}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium mt-0.5">{trip.days} Days • {trip.vibe}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-all" />
                  </Link>
                ))
              ) : (
                <div className="h-40 rounded-2xl border border-border/50 bg-card/20 flex flex-col items-center justify-center gap-3 text-center p-6">
                  <Airplane className="w-8 h-8 text-muted-foreground/30" weight="light" />
                  <p className="text-xs text-muted-foreground">No trips planned yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
