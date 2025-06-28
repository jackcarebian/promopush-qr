import { SidebarProvider, Sidebar, SidebarInset, SidebarTrigger, SidebarHeader } from "@/components/ui/sidebar";
import { SidebarNav } from "./components/sidebar-nav";
import { UserNav } from "./components/user-nav";
import { Logo } from "@/components/logo";
import { CampaignsProvider } from "./contexts/campaign-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CampaignsProvider>
      <SidebarProvider>
        <Sidebar>
          <SidebarNav />
        </Sidebar>
        <SidebarInset>
          <header className="sticky top-0 z-40 w-full border-b bg-background">
            <div className="container flex h-16 items-center space-x-4">
              <div className="md:hidden">
                <SidebarTrigger />
              </div>
              <div className="hidden md:block">
                <Logo />
              </div>
              <div className="flex-1" />
              <UserNav />
            </div>
          </header>
          <main className="flex-1 p-4 md:p-8">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </CampaignsProvider>
  );
}
