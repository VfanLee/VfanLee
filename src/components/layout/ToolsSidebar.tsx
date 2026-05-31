'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { toolGroups } from '@/data/tools'
import { ChevronRight } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

export function ToolsSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-border/60 border-r">
      <SidebarContent>
        {toolGroups.map((group) => (
          <Collapsible key={group.name} defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                  {group.name}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.tools.map((tool) => (
                      <SidebarMenuItem key={tool.href}>
                        <SidebarMenuButton
                          asChild
                          isActive={pathname === tool.href}
                          className="text-sm transition-colors"
                        >
                          <Link href={tool.href}>{tool.title}</Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}
