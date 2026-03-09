import type { Metadata } from 'next'
import { Geist_Mono, Noto_Sans_SC } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-sans',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Vfan Lee | Web Developer',
  description:
    'Personal portfolio of Vfan Lee — a web developer specialising in React, Next.js, and Vue.js. Building fast, accessible, and beautiful web experiences.',
  keywords: ['Web Developer', 'React', 'Next.js', 'Vue.js', 'Frontend', 'Vfan Lee'],
  authors: [{ name: 'Vfan Lee' }],
  openGraph: {
    title: 'Vfan Lee | Web Developer',
    description: 'Personal portfolio of Vfan Lee — Frontend Engineer.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn('font-sans', notoSansSC.variable)} suppressHydrationWarning>
      <body className={`${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <SmoothScrollProvider>
            <Navbar />
            <div className="relative min-h-screen overflow-x-hidden">{children}</div>
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
