'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { House, Star } from 'lucide-react'
import { toolGroups } from '@/data/tools'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui'

export function ToolsSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-border/60 border-r">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === '/tools'} tooltip="首页">
                  <Link href="/tools">
                    <House />
                    <span>首页</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === '/tools/favorites'} tooltip="收藏">
                  <Link href="/tools/favorites">
                    <Star />
                    <span>收藏</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="mx-0" />

        {toolGroups.map((group) => (
          <SidebarGroup key={group.name}>
            <SidebarGroupLabel>{group.name}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.tools.map((tool) => {
                  const Icon = tool.icon
                  return (
                    <SidebarMenuItem key={tool.href}>
                      <SidebarMenuButton asChild isActive={pathname === tool.href} tooltip={tool.title}>
                        <Link href={tool.href}>
                          <Icon />
                          <span>{tool.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}
