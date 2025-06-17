"use client"

import { useEffect } from "react"

export function AdManager() {
  useEffect(() => {
    // Load the popunder script
    const script = document.createElement("script")
    script.type = "text/javascript"
    script.src = "//pl26876153.profitableratecpm.com/a7/66/b2/a766b2a718487caba94eabfc7e0a3369.js"
    script.async = true
    document.head.appendChild(script)

    // Set up 15-second interval for popunders
    const popunderInterval = setInterval(() => {
      // Trigger popunder every 15 seconds
      if (typeof window !== "undefined" && (window as any).popMagic) {
        try {
          ;(window as any).popMagic.trigger()
        } catch (error) {
          console.log("Popunder trigger attempt")
        }
      }
    }, 15000) // 15 seconds = 15000 milliseconds

    // Cleanup function
    return () => {
      clearInterval(popunderInterval)
      // Remove script when component unmounts
      const existingScript = document.querySelector(`script[src="${script.src}"]`)
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [])

  return null // This component doesn't render anything visible
}
