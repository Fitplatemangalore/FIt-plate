'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollAnimations() {
  const pathname = usePathname()

  useEffect(() => {
    // 1. Scroll Reveal Animations (.reveal elements)
    const revealEls = document.querySelectorAll('.reveal')
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, idx) => {
          if (entry.isIntersecting) {
            // Set dynamic index styling if not already set inline
            const targetEl = entry.target as HTMLElement
            if (!targetEl.style.getPropertyValue('--i')) {
              targetEl.style.setProperty('--i', String(idx % 8))
            }
            targetEl.classList.add('in')
            revealObserver.unobserve(targetEl)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    )
    revealEls.forEach((el) => revealObserver.observe(el))

    // 2. Animated Numerical Counters ([data-count] elements)
    const counters = document.querySelectorAll('[data-count]')
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          const target = parseFloat(el.dataset.count || '0')
          const suffix = el.dataset.suffix || ''
          const duration = 1400
          const start = performance.now()

          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3) // cubic ease-out
            const value = target < 10
              ? (target * eased).toFixed(1)
              : Math.round(target * eased)

            el.textContent = value + suffix

            if (progress < 1) {
              requestAnimationFrame(step)
            }
          }
          requestAnimationFrame(step)
          counterObserver.unobserve(el)
        })
      },
      { threshold: 0.5 }
    )
    counters.forEach((el) => counterObserver.observe(el))

    // 3. Header states, Hero Background Parallax, and Features Strip Perspective Zoom
    const header = document.querySelector('.site-header')
    const heroBg = document.querySelector('.hero-bg') as HTMLElement | null
    const featuresStrip = document.querySelector('.features-strip') as HTMLElement | null

    const handleScroll = () => {
      // Toggle header scrolled state
      if (header) {
        if (window.scrollY > 40) {
          header.classList.add('is-scrolled')
        } else {
          header.classList.remove('is-scrolled')
        }
      }

      // Parallax effect on hero background
      if (heroBg) {
        const scrollOffset = window.scrollY * 0.35
        heroBg.style.transform = `translate3d(0, ${scrollOffset}px, 0)`
      }

      // 3D perspective zoom on Features Strip
      if (featuresStrip) {
        const rect = featuresStrip.getBoundingClientRect()
        if (rect.top >= 0) {
          featuresStrip.style.transform = 'none'
        } else {
          const scrolledPast = -rect.top
          const sectionHeight = featuresStrip.offsetHeight
          const progress = Math.min(1, scrolledPast / sectionHeight)
          const scale = 1 + progress * 0.14
          featuresStrip.style.transform = `perspective(700px) scale3d(${scale}, ${scale}, 1)`
        }
      }
    }

    // Run once on load/change
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Clean up observers and event listeners
    return () => {
      revealObserver.disconnect()
      counterObserver.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [pathname])

  return null
}
