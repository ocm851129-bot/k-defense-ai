import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STEPS = [
  {
    number: '01',
    title: 'Share your world',
    desc: 'Tell Aurai how you feel — what you\'re carrying, what keeps you up at night. There\'s no judgment, only understanding.',
    accent: '#c4b5a0',
    detail: 'Voice, text, or guided prompts — you choose how to show up.',
  },
  {
    number: '02',
    title: 'Aurai learns you',
    desc: 'Built on frameworks from leading therapists, Aurai maps your emotional patterns and adapts to your unique rhythm over time.',
    accent: '#a0b5a4',
    detail: 'Powered by evidence-based CBT, DBT, and mindfulness science.',
  },
  {
    number: '03',
    title: 'Always there',
    desc: 'At 3am or 3pm — get real-time support, guided sessions, and gentle insights exactly when you need them most.',
    accent: '#b5a0c4',
    detail: 'No appointments. No waiting rooms. No judgment.',
  },
]

export default function IntelligenceSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="intelligence" className="relative bg-[#0a0a0a] py-28 overflow-hidden font-inter">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(ellipse, #c4b5a0 0%, transparent 70%)' }} />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-white/40 text-xs sm:text-sm tracking-[0.25em] uppercase mb-4 font-medium">
            How it works
          </p>
          <h2 className="font-askan text-white text-[2rem] sm:text-[3rem] md:text-[3.75rem] leading-[1.05] tracking-tight max-w-2xl mx-auto">
            Calm is a practice. We make it possible.
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="relative group"
            >
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-px z-0"
                  style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.08), transparent)' }} />
              )}

              <div className="relative bg-white/[0.03] border border-white/10 rounded-2xl p-7 sm:p-8 hover:bg-white/[0.05] transition-all duration-500">
                {/* Step number */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-askan text-[2.5rem] leading-none" style={{ color: step.accent }}>
                    {step.number}
                  </span>
                  <div className="h-px flex-1" style={{ background: `${step.accent}30` }} />
                </div>

                <h3 className="font-askan text-white text-xl sm:text-2xl mb-3 leading-tight">
                  {step.title}
                </h3>
                <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-5">
                  {step.desc}
                </p>
                <p className="text-white/30 text-xs leading-relaxed border-t border-white/8 pt-4">
                  {step.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-white/30 text-sm">Designed with clinical psychologists · Available 24/7 · No subscription lock-in</p>
        </motion.div>
      </div>
    </section>
  )
}
