import { ToolsSidebar } from '@/components/layout/ToolsSidebar'
import { ToolsNavbar } from '@/components/layout/ToolsNavbar'
import { SidebarProvider } from '@/components/ui/sidebar'

export default function ToolsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="bg-background text-foreground relative flex h-screen flex-col overflow-hidden">
      <div className="relative flex h-full flex-col">
        <ToolsNavbar />
        <SidebarProvider className="flex min-h-0 flex-1">
          <ToolsSidebar />
          <main className="flex-1 overflow-y-auto scroll-smooth">{children}</main>
        </SidebarProvider>
      </div>
    </div>
  )
}
