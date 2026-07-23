import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="/assets/logo-white.png" alt="Fit Plate" style={{ maxHeight: '80px', width: 'auto' }} />
            <p>Pure. Fresh. Nutritious. Made for a better you. Locally grown microgreens for hotels, restaurants and caterers.</p>
            <div className="social-row">
              <a href="https://instagram.com/fitplateventures" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" />
                </svg>
              </a>
              <a href="mailto:greens@fitplate.in" aria-label="Email">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 6-10 7L2 6" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/varieties">Our Microgreens</Link></li>
              <li><Link href="/benefits">Benefits</Link></li>
              <li><Link href="/blogs">Blogs</Link></li>
            </ul>
          </div>
          <div>
            <h4>Business</h4>
            <ul>
              <li><Link href="/benefits#business">For Hotels & Restaurants</Link></li>
              <li><Link href="/contact">Request Wholesale Pricing</Link></li>
              <li><Link href="/contact">Get in Touch</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href="#">Fitplate Ventures, Kodikal, Mangalore</a></li>
              <li><a href="mailto:greens@fitplate.in">greens@fitplate.in</a></li>
              <li><a href="tel:8217304370">+91 82173 04370</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; {currentYear} Fitplate Ventures. All rights reserved.</span>
          <span>Small greens. Big impact.</span>
        </div>
      </div>
    </footer>
  )
}
