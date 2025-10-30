import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import AnalyticsClient from '@/components/analytics'
import FontLogger from '@/components/font-logger'
import { Toaster } from 'sonner'
import './globals.css'
 

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Toaster position="top-center" richColors />
        <AnalyticsClient />
        <FontLogger />
      </body>
    </html>
  )
}
