import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Send, Shield, Building2, Phone, Mail, MapPin, ChevronRight } from 'lucide-react'

const CONTACT_INFO = [
  { icon: Building2, label: '회사명', value: '메타아이씨티 주식회사' },
  { icon: Mail, label: '이메일', value: 'defense@metaict.co.kr' },
  { icon: Phone, label: '전화', value: '02-0000-0000' },
  { icon: MapPin, label: '주소', value: '서울특별시 강남구 테헤란로 123' },
]

const INQUIRY_TYPES = ['솔루션 도입 문의', '기술 파트너십', '연구개발 협력', '시스템 데모 요청', '기타 문의']

export default function ContactSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm] = useState({ name: '', org: '', email: '', type: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="relative py-24">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#020b18] via-[#041526]/50 to-[#020b18]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#00d4ff]" />
            <span className="text-[10px] font-black tracking-[0.3em] text-[#00d4ff] uppercase">Contact & Partnership</span>
            <div className="w-8 h-px bg-[#00d4ff]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            도입 <span className="text-[#00d4ff] glow-text">문의</span>
          </h2>
          <p className="mt-3 text-sm text-[#4a7a9b]">
            K-Defense AI Intelligence 도입 및 기술 파트너십에 관해 문의해 주세요.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/10 p-6 glow-border">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-5 h-5 text-[#00d4ff]" />
                <span className="text-[11px] font-black tracking-[0.15em] text-[#00d4ff] uppercase">Meta ICT Defense</span>
              </div>
              <div className="space-y-4">
                {CONTACT_INFO.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-8 h-8 clip-corner-sm bg-[#00d4ff]/10 flex items-center justify-center shrink-0">
                      <Icon className="w-3.5 h-3.5 text-[#00d4ff]" />
                    </div>
                    <div>
                      <div className="text-[9px] font-bold tracking-[0.15em] text-[#4a7a9b] uppercase mb-0.5">{label}</div>
                      <div className="text-[12px] text-[#8ab8d4]">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Notice */}
            <div className="clip-corner-sm bg-[#ff2d55]/5 border border-[#ff2d55]/20 p-4">
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-[#ff2d55] mt-0.5 shrink-0" />
                <div>
                  <div className="text-[10px] font-black text-[#ff2d55] tracking-[0.1em] mb-1">SECURITY NOTICE</div>
                  <p className="text-[11px] text-[#4a7a9b] leading-relaxed">
                    본 플랫폼은 국가 안보 관련 솔루션을 제공합니다.
                    모든 문의는 보안 심사 후 처리됩니다.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/10 p-6 glow-border">
              <div className="text-[10px] font-black tracking-[0.2em] text-[#00d4ff] uppercase mb-6">
                문의 양식 // Inquiry Form
              </div>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-12 h-12 clip-corner bg-[#00ff88]/10 border border-[#00ff88]/30 flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-[#00ff88]" />
                  </div>
                  <div className="text-lg font-black text-[#00ff88] mb-2">전송 완료</div>
                  <p className="text-sm text-[#4a7a9b]">담당자가 확인 후 연락드리겠습니다.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] font-black tracking-[0.15em] text-[#4a7a9b] uppercase mb-1.5">
                        이름 *
                      </label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-[#020b18] border border-[#0a3050] text-[12px] text-[#8ab8d4] px-3 py-2.5 outline-none focus:border-[#00d4ff]/50 transition-colors placeholder:text-[#2a4a5e]"
                        placeholder="홍길동"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black tracking-[0.15em] text-[#4a7a9b] uppercase mb-1.5">
                        소속 기관
                      </label>
                      <input
                        value={form.org}
                        onChange={(e) => setForm({ ...form, org: e.target.value })}
                        className="w-full bg-[#020b18] border border-[#0a3050] text-[12px] text-[#8ab8d4] px-3 py-2.5 outline-none focus:border-[#00d4ff]/50 transition-colors placeholder:text-[#2a4a5e]"
                        placeholder="국방부"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] font-black tracking-[0.15em] text-[#4a7a9b] uppercase mb-1.5">
                      이메일 *
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-[#020b18] border border-[#0a3050] text-[12px] text-[#8ab8d4] px-3 py-2.5 outline-none focus:border-[#00d4ff]/50 transition-colors placeholder:text-[#2a4a5e]"
                      placeholder="contact@example.go.kr"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-black tracking-[0.15em] text-[#4a7a9b] uppercase mb-1.5">
                      문의 유형
                    </label>
                    <select
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value })}
                      className="w-full bg-[#020b18] border border-[#0a3050] text-[12px] text-[#8ab8d4] px-3 py-2.5 outline-none focus:border-[#00d4ff]/50 transition-colors"
                    >
                      <option value="">선택하세요</option>
                      {INQUIRY_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[9px] font-black tracking-[0.15em] text-[#4a7a9b] uppercase mb-1.5">
                      문의 내용 *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-[#020b18] border border-[#0a3050] text-[12px] text-[#8ab8d4] px-3 py-2.5 outline-none focus:border-[#00d4ff]/50 transition-colors resize-none placeholder:text-[#2a4a5e]"
                      placeholder="문의 내용을 자세히 입력해 주세요..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="clip-corner w-full flex items-center justify-center gap-2 py-3.5 bg-[#00d4ff] text-[#020b18] text-[11px] font-black tracking-[0.15em] uppercase hover:bg-[#00eeff] transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    보안 채널로 전송
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
