import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, X } from 'lucide-react'

interface ConfirmDialogProps {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  danger?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDialog({
  open, title, message,
  confirmLabel = '확인', danger = false,
  onConfirm, onCancel,
}: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#020b18]/80 backdrop-blur-sm"
          onClick={onCancel}
        >
          <motion.div
            initial={{ scale: 0.92, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="clip-corner bg-[#041526] border w-full max-w-sm mx-4"
            style={{ borderColor: danger ? '#ff2d5540' : '#00d4ff30' }}
          >
            {/* Top accent */}
            <div className="h-0.5" style={{ background: danger ? '#ff2d55' : '#00d4ff' }} />

            <div className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <div
                  className="w-9 h-9 clip-corner-sm flex items-center justify-center shrink-0"
                  style={{ background: danger ? '#ff2d5518' : '#00d4ff18' }}
                >
                  <AlertTriangle className="w-4 h-4" style={{ color: danger ? '#ff2d55' : '#00d4ff' }} />
                </div>
                <div>
                  <div className="text-[10px] font-black tracking-[0.15em] mb-1" style={{ color: danger ? '#ff2d55' : '#00d4ff' }}>
                    {danger ? 'DANGER — 작전 확인 필요' : '확인 필요'}
                  </div>
                  <h3 className="text-[14px] font-black text-white">{title}</h3>
                </div>
                <button onClick={onCancel} className="ml-auto text-[#4a7a9b] hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[12px] text-[#8ab8d4] leading-relaxed mb-6 pl-12">{message}</p>

              <div className="flex gap-3">
                <button
                  onClick={onCancel}
                  className="flex-1 py-2.5 border border-[#1a3a5a] text-[11px] font-bold text-[#4a7a9b] hover:border-[#00d4ff]/30 hover:text-white transition-all clip-corner-sm"
                >
                  취소
                </button>
                <button
                  onClick={() => { onConfirm(); }}
                  className="flex-1 py-2.5 text-[11px] font-black tracking-[0.1em] text-[#020b18] transition-all clip-corner-sm"
                  style={{ background: danger ? '#ff2d55' : '#00d4ff' }}
                >
                  {confirmLabel}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
