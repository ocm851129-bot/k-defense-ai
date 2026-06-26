import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const TESTIMONIALS = [
  {
    quote: 'I\'ve tried every meditation app out there. Aurai is the first thing that actually felt like someone was listening.',
    name: 'Maya R.',
    role: 'Graphic designer, 29',
    accent: '#c4b5a0',
  },
  {
    quote: 'At 3am during a panic attack, I didn\'t know what to do. Aurai walked me through it step by step. I felt safe.',
    name: 'James K.',
    role: 'Software engineer, 34',
    accent: '#a0b5a4',
  },
  {
    quote: 'It noticed patterns in my mood that I completely missed. That awareness alone has been life-changing.',
    name: 'Priya S.',
    role: 'Teacher, 41',
    accent: '#b5a0c4',
  },
  {
    quote: 'I was skeptical that AI could help with mental health. Two months in, I\'m a complete convert.',
    name: 'Daniel W.',
    role: 'Marketing manager, 27',
    accent: '#c4b5a0',
  },
  {
    quote: 'My therapist actually recommended Aurai as a complement to our sessions. That tells you everything.',
    name: 'Sofia M.',
    role: 'Graduate student, 24',
    accent: '#a0b5a4',
  },
  {
    quote: 'The guided sessions feel genuinely warm — not robotic at all. Like talking to a calm, wise friend.',
    name: 'Tom L.',
    role: 'Freelance writer, 38',
    accent: '#b5a0c4',
  },
]

const PRESS = [
  { name: 'TechCrunch', quote: '"The wellness app we\'ve been waiting for."' },
  { name: 'Forbes', quote: '"Aurai is setting a new standard for digital mental health."' },
  { name: 'Wired', quote: '"Thoughtfully built, genuinely useful."' },
  { name: 'Vogue', quote: '"Self-care, elevated."' },
]

export default function ReportsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="reports" className="relative bg-[#f8f6f2] py-28 overflow-hidden font-inter">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c4b5a0]/30 to-transparent" />

      <div ref={ref} className="relative max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-gray-400 text-xs sm:text-sm tracking-[0.25em] uppercase mb-4 font-medium">
            Voices of healing
          </p>
          <h2 className="font-askan text-gray-900 text-[2rem] sm:text-[3rem] md:text-[3.75rem] leading-[1.05] tracking-tight">
            Real people. Real calm.
          </h2>
        </motion.div>

        {/* Testimonial grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="bg-white rounded-2xl border border-gray-100 p-7 shadow-sm flex flex-col"
            >
              {/* Quote mark */}
              <div className="font-askan text-5xl leading-none mb-4" style={{ color: `${t.accent}60` }}>
                "
              </div>

              <p className="text-gray-700 text-sm sm:text-base leading-relaxed flex-1 mb-6">
                {t.quote}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                {/* Avatar placeholder */}
                <div className="w-9 h-9 rounded-full flex-shrink-0"
                  style={{ background: `${t.accent}30` }} />
                <div>
                  <div className="text-sm font-medium text-gray-900">{t.name}</div>
                  <div className="text-xs text-gray-400">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Press section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <p className="text-center text-gray-400 text-xs tracking-[0.2em] uppercase mb-8 font-medium">
            As featured in
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {PRESS.map((p) => (
              <div key={p.name}
                className="bg-white rounded-xl border border-gray-100 p-5 text-center shadow-sm">
                <div className="font-askan text-gray-800 text-lg mb-2">{p.name}</div>
                <p className="text-gray-400 text-xs leading-relaxed italic">{p.quote}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
