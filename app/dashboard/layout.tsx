import { DashboardSidebar } from "@/components/dashboard-sidebar";
import Navbar from "../components/navbar/page";
import { auth } from "@/auth";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    return (
        <SidebarProvider>
            <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
                <DashboardSidebar />
                <SidebarInset className="flex flex-col overflow-hidden">
                    <Navbar user={session?.user} />
                    <main className="flex-1 p-4 md:p-8 pt-20 md:pt-24 overflow-y-auto no-scrollbar">
                        {children}
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}
