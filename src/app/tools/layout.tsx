import { ToolsShell } from '@/components'

export default function ToolsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ToolsShell>{children}</ToolsShell>
}
