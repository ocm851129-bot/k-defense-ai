import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { value: 94,  suffix: '%', label: 'feel calmer within 2 weeks',       accent: '#c4b5a0' },
  { value: 87,  suffix: '%', label: 'reduction in anxiety symptoms',     accent: '#a0b5a4' },
  { value: 4.9, suffix: '★', label: 'average session rating',            accent: '#b5a0c4', decimal: true },
  { value: 50,  suffix: 'K+', label: 'guided sessions completed',        accent: '#c4b5a0' },
]

const TESTIMONIAL_STRIP = [
  '"Finally, something that actually helps."',
  '"Like a therapist in my pocket."',
  '"I understand myself so much better now."',
  '"The 3am support changed everything for me."',
  '"Aurai noticed patterns I couldn\'t see."',
]

function CountUp({ to, suffix, decimal, accent, inView }: {
  to: number; suffix: string; decimal?: boolean; accent: string; inView: boolean
}) {
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start: number
    const duration = 1800
    const raf = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setVal(parseFloat((ease * to).toFixed(decimal ? 1 : 0)))
      if (p < 1) requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [inView, to, decimal])

  return (
    <span style={{ color: accent }}>
      {decimal ? val.toFixed(1) : val}{suffix}
    </span>
  )
}

export default function AnalyticsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="analytics" className="relative bg-[#f8f6f2] py-28 overflow-hidden font-inter">
      {/* Warm top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c4b5a0]/40 to-transparent" />

      <div ref={ref} className="relative max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-gray-400 text-xs sm:text-sm tracking-[0.25em] uppercase mb-4 font-medium">
            The science
          </p>
          <h2 className="font-askan text-gray-900 text-[2rem] sm:text-[3rem] md:text-[3.75rem] leading-[1.05] tracking-tight">
            Results that speak for themselves.
          </h2>
          <p className="mt-5 text-gray-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Built on decades of clinical research. Validated by therapists. Felt by real people.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 text-center shadow-sm"
            >
              <div className="font-askan text-3xl sm:text-4xl lg:text-5xl mb-3 leading-none">
                <CountUp to={s.value} suffix={s.suffix} decimal={s.decimal} accent={s.accent} inView={inView} />
              </div>
              <p className="text-gray-500 text-xs sm:text-sm leading-snug">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Scrolling quote strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative overflow-hidden"
        >
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#f8f6f2] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#f8f6f2] to-transparent z-10" />
          <div className="flex gap-12 animate-[scroll_30s_linear_infinite] whitespace-nowrap">
            {[...TESTIMONIAL_STRIP, ...TESTIMONIAL_STRIP].map((q, i) => (
              <span key={i} className="text-gray-400 text-sm sm:text-base italic shrink-0">{q}</span>
            ))}
          </div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-wrap justify-center gap-4 mt-16"
        >
          {[
            'Built with licensed therapists',
            'HIPAA-compliant infrastructure',
            'End-to-end encrypted sessions',
            'No data sold — ever',
          ].map((badge) => (
            <span key={badge}
              className="bg-white border border-gray-100 text-gray-500 text-xs px-4 py-2 rounded-full shadow-sm">
              {badge}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
