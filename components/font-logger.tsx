'use client'

import { useEffect } from 'react'

export default function FontLogger() {
  useEffect(() => {
    try {
      const before = getComputedStyle(document.body).fontFamily
      console.log('[Font] Applied body font-family (before fonts.ready):', before)
      // Wait for all fonts to be ready, then log again for confirmation
      // Some browsers support document.fonts
      const fonts: any = (document as any).fonts
      if (fonts?.ready?.then) {
        fonts.ready.then(() => {
          const after = getComputedStyle(document.body).fontFamily
          console.log('[Font] Fonts ready. Confirmed body font-family:', after)
        })
      }
    } catch (e) {
      console.log('[Font] Unable to read computed font-family', e)
    }
  }, [])
  return null
}


