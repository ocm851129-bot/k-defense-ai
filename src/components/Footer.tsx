function AuraiLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 256" className={className} fill="currentColor" aria-hidden="true">
      <path d="M 228 0 C 172.772 0 128 44.772 128 100 L 128 0 L 0 0 L 0 28 C 0 83.228 44.772 128 100 128 L 0 128 L 0 256 L 28 256 C 83.228 256 128 211.228 128 156 L 128 256 L 256 256 L 256 228 C 256 172.772 211.228 128 156 128 L 256 128 L 256 0 Z" />
    </svg>
  )
}

const FOOTER_LINKS = [
  { label: 'How it works', href: '#intelligence' },
  { label: 'Features', href: '#solutions' },
  { label: 'Testimonials', href: '#reports' },
  { label: 'Join waitlist', href: '#contact' },
]

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Cookie Policy', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/[0.06] font-inter">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 py-16">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-14">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <AuraiLogo className="w-6 h-6 text-white" />
              <span className="font-askan text-white text-xl tracking-wide">Aurai</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Your always-on wellness companion. Built by leading therapists. Available whenever you need it.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-white/25 text-[10px] tracking-[0.2em] uppercase font-medium mb-5">Navigate</p>
            <ul className="space-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href}
                    className="text-white/50 text-sm hover:text-white/80 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Waitlist CTA */}
          <div>
            <p className="text-white/25 text-[10px] tracking-[0.2em] uppercase font-medium mb-5">Get early access</p>
            <p className="text-white/40 text-sm mb-4 leading-relaxed">
              Limited spots available for our beta launch.
            </p>
            <a href="#contact"
              className="inline-block bg-white text-gray-900 text-sm font-medium px-6 py-3 rounded-full hover:bg-white/90 transition-colors">
              Join the list
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs">
            © 2026 Aurai. All rights reserved. Made with care.
          </p>
          <div className="flex items-center gap-6">
            {LEGAL_LINKS.map((link) => (
              <a key={link.label} href={link.href}
                className="text-white/25 text-xs hover:text-white/50 transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
