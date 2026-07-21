'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

export default function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Listen to scroll to toggle headers background fill
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile nav when pathname changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  // Active check helper
  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return 'active'
    if (path !== '/' && pathname.startsWith(path)) return 'active'
    return ''
  }

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="container header-row">
        <Link href="/" className="brand">
          {/* Logo is served from public/assets/logo.png */}
          <img
            src="/assets/logo.png"
            alt="Fit Plate logo"
            style={{ height: 'auto', width: 'auto', maxHeight: '50px' }}
          />
        </Link>
        <nav className={`main-nav ${isOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            <li>
              <Link href="/" className={isActive('/')}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className={isActive('/about')}>
                About Us
              </Link>
            </li>
            <li>
              <Link href="/varieties" className={isActive('/varieties')}>
                Varieties
              </Link>
            </li>
            <li>
              <Link href="/blogs" className={isActive('/blogs')}>
                Blogs
              </Link>
            </li>
            <li>
              <Link href="/contact" className={isActive('/contact')}>
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
        <button
          className={`nav-toggle ${isOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}
