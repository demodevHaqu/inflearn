'use client'

import { Analytics } from '@vercel/analytics/next'

export default function AnalyticsClient() {
  const debug = process.env.NODE_ENV !== 'production'

  const beforeSend = (event: any) => {
    if (typeof event?.url === 'string' && event.url.includes('/private')) {
      if (debug) {
        console.log('[Analytics] Ignored event for private path', event)
      }
      return null
    }
    if (debug) {
      console.log('[Analytics] Sending event', event)
      console.log('event', event)
    }
    return event
  }

  return <Analytics debug={debug} beforeSend={beforeSend} />
}


