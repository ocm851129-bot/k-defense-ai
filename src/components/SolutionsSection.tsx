import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const FEATURES = [
  {
    emoji: '🌙',
    title: '24/7 AI Companion',
    desc: 'Aurai never sleeps. Whether it\'s a panic attack at midnight or a moment of grief on a Tuesday afternoon — support is always one tap away.',
    accent: '#b5a0c4',
    tag: 'Always on',
  },
  {
    emoji: '🧠',
    title: 'Expert-Built Frameworks',
    desc: 'Every conversation is guided by evidence-based modalities: CBT, DBT, ACT, and mindfulness — curated by licensed psychologists.',
    accent: '#a0b5a4',
    tag: 'Clinically validated',
  },
  {
    emoji: '📊',
    title: 'Mood Pattern Insights',
    desc: 'Aurai tracks your emotional patterns over time and gently surfaces the connections you might have missed — helping you understand yourself.',
    accent: '#c4b5a0',
    tag: 'Self-awareness',
  },
  {
    emoji: '🌬️',
    title: 'Guided Breathing & Meditation',
    desc: 'From box breathing for panic to body scans for sleep — a library of guided practices tailored to exactly what you\'re feeling right now.',
    accent: '#a0b5a4',
    tag: 'Instant calm',
  },
  {
    emoji: '🛡️',
    title: 'Crisis Support',
    desc: 'When things feel overwhelming, Aurai doesn\'t leave you alone. Immediate grounding exercises, coping tools, and escalation paths if needed.',
    accent: '#c4a0a0',
    tag: 'Safety first',
  },
  {
    emoji: '📓',
    title: 'Progress Journal',
    desc: 'Watch yourself grow. Your insights, breakthroughs, and patterns are logged privately — a record of your healing journey that belongs to you.',
    accent: '#b5a0c4',
    tag: 'Your story',
  },
]

export default function SolutionsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="solutions" className="relative bg-[#0a0a0a] py-28 overflow-hidden font-inter">

      {/* Background glows */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] opacity-[0.04] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom left, #b5a0c4, transparent)' }} />
      <div className="absolute top-0 right-0 w-[400px] h-[300px] opacity-[0.04] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top right, #a0b5a4, transparent)' }} />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-white/40 text-xs sm:text-sm tracking-[0.25em] uppercase mb-4 font-medium">
            What Aurai offers
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="font-askan text-white text-[2rem] sm:text-[3rem] md:text-[3.75rem] leading-[1.05] tracking-tight max-w-lg">
              Everything you need to feel okay.
            </h2>
            <p className="text-white/40 text-sm max-w-xs leading-relaxed sm:text-right">
              One companion. Every tool. All in your pocket.
            </p>
          </div>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group bg-white/[0.03] border border-white/8 rounded-2xl p-7 hover:bg-white/[0.06] hover:border-white/15 transition-all duration-400 cursor-default"
            >
              {/* Emoji + tag row */}
              <div className="flex items-start justify-between mb-5">
                <span className="text-3xl">{feat.emoji}</span>
                <span className="text-[10px] font-medium tracking-wide px-2.5 py-1 rounded-full"
                  style={{ color: feat.accent, background: `${feat.accent}15`, border: `1px solid ${feat.accent}25` }}>
                  {feat.tag}
                </span>
              </div>

              <h3 className="font-askan text-white text-lg sm:text-xl mb-3 group-hover:text-white transition-colors leading-tight">
                {feat.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/65 transition-colors">
                {feat.desc}
              </p>

              {/* Bottom accent line on hover */}
              <div className="mt-5 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full"
                style={{ background: `linear-gradient(90deg, ${feat.accent}, transparent)` }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
