import { AnimatePresence, motion } from 'framer-motion'
import { useAlerts, LEVEL_COLORS } from '../contexts/AlertContext'
import { X, AlertTriangle, Info, Zap } from 'lucide-react'

const LEVEL_ICONS = {
  CRITICAL: AlertTriangle,
  HIGH: Zap,
  MED: AlertTriangle,
  INFO: Info,
}

export default function NotificationToast() {
  const { latestToast, dismissToast } = useAlerts()

  return (
    <div className="fixed bottom-6 right-6 z-[100] pointer-events-none">
      <AnimatePresence>
        {latestToast && (
          <motion.div
            key={latestToast.id}
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="pointer-events-auto w-80 clip-corner bg-[#041526]/95 backdrop-blur-xl border p-4"
            style={{ borderColor: `${LEVEL_COLORS[latestToast.level]}40` }}
          >
            {/* Progress bar */}
            <motion.div
              className="absolute top-0 left-0 h-0.5 rounded-full"
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 5, ease: 'linear' }}
              style={{ background: LEVEL_COLORS[latestToast.level] }}
            />

            <div className="flex items-start gap-3">
              <div
                className="w-8 h-8 clip-corner-sm flex items-center justify-center shrink-0"
                style={{ background: `${LEVEL_COLORS[latestToast.level]}15` }}
              >
                {(() => {
                  const Icon = LEVEL_ICONS[latestToast.level]
                  return <Icon className="w-4 h-4" style={{ color: LEVEL_COLORS[latestToast.level] }} />
                })()}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-[8px] font-black tracking-[0.15em] px-1.5 py-0.5"
                    style={{ color: LEVEL_COLORS[latestToast.level], background: `${LEVEL_COLORS[latestToast.level]}15` }}
                  >
                    {latestToast.level}
                  </span>
                  <span className="text-[9px] text-[#4a7a9b]">{latestToast.source}</span>
                  <span className="text-[9px] font-mono text-[#4a7a9b] ml-auto">{latestToast.timestamp}</span>
                </div>
                <div className="text-[12px] font-bold text-white mb-0.5">{latestToast.title}</div>
                <div className="text-[11px] text-[#4a7a9b] leading-tight">{latestToast.message}</div>
              </div>

              <button
                onClick={dismissToast}
                className="text-[#4a7a9b] hover:text-white transition-colors shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
