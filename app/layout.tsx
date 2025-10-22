import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
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
        <Analytics
          debug={process.env.NODE_ENV !== 'production'}
          beforeSend={(event) => {
            if (event.url.includes('/private')) {
              if (process.env.NODE_ENV !== 'production') {
                console.log('[Analytics] Ignored event for private path', event)
              }
              return null
            }
            if (process.env.NODE_ENV !== 'production') {
              console.log('[Analytics] Sending event', event)
            }
            return event
          }}
        />
      </body>
    </html>
  )
}
