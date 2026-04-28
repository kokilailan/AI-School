import React, { useEffect } from 'react'

const GoogleAnalytics = ({ trackingId }) => {
  useEffect(() => {
    if (!trackingId) return

    // Load Google Analytics script
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`
    document.head.appendChild(script)

    // Initialize Google Analytics
    script.onload = () => {
      window.dataLayer = window.dataLayer || []
      function gtag() {
        window.dataLayer.push(arguments)
      }
      gtag('js', new Date())
      gtag('config', trackingId, {
        page_path: window.location.pathname,
      })
      window.gtag = gtag
    }

    return () => {
      // Cleanup script if component unmounts
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [trackingId])

  return null
}

export default GoogleAnalytics
