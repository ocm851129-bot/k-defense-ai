import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function ContactSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
    setEmail('')
  }

  return (
    <section id="contact" className="relative bg-[#0a0a0a] py-32 overflow-hidden font-inter">

      {/* Central glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[500px] rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(ellipse, #c4b5a0 0%, transparent 70%)' }} />
      </div>

      <div ref={ref} className="relative z-10 max-w-3xl mx-auto px-6 sm:px-10 text-center">

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-white/40 text-xs sm:text-sm tracking-[0.25em] uppercase mb-6 font-medium"
        >
          Early access
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-askan text-white text-[2.25rem] sm:text-[3.25rem] md:text-[4.25rem] leading-[1.05] tracking-tight mb-6"
        >
          Be the first to experience calm.
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/50 text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-12"
        >
          Join the waitlist for early access to Aurai. Limited spots available — we're
          rolling out thoughtfully, one person at a time.
        </motion.p>

        {/* Email form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {submitted ? (
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl px-8 py-10">
              <div className="text-4xl mb-4">🌿</div>
              <h3 className="font-askan text-white text-2xl mb-2">You're on the list.</h3>
              <p className="text-white/50 text-sm">
                We'll reach out soon. Take a breath — calm is on the way.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <div className="flex-1 bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-full px-6 py-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full bg-transparent text-white placeholder-white/35 text-sm outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-white text-gray-900 font-medium text-sm px-8 py-4 rounded-full hover:bg-white/90 transition-colors whitespace-nowrap shrink-0"
              >
                Join the list
              </button>
            </form>
          )}

          <p className="text-white/25 text-xs mt-5">
            No spam. Unsubscribe anytime. Your data stays private.
          </p>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mt-16"
        >
          {[
            { text: 'Free during beta', accent: '#c4b5a0' },
            { text: 'No credit card required', accent: '#a0b5a4' },
            { text: 'Cancel anytime', accent: '#b5a0c4' },
          ].map((item) => (
            <span key={item.text}
              className="text-xs px-4 py-2 rounded-full border"
              style={{ color: item.accent, borderColor: `${item.accent}30`, background: `${item.accent}08` }}>
              {item.text}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
