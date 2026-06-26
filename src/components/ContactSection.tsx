import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Send, Building2, Mail, Phone, MapPin, CheckCircle } from 'lucide-react'

const CONTACT_INFO = [
  { icon: Building2, label: '회사명', value: '메타아이씨티 주식회사' },
  { icon: Mail,      label: '이메일', value: 'defense@metaict.co.kr' },
  { icon: Phone,     label: '전화',   value: '02-0000-0000' },
  { icon: MapPin,    label: '주소',   value: '서울특별시 강남구 테헤란로 123' },
]

const INQUIRY_TYPES = ['솔루션 도입 문의', '기술 파트너십', '연구개발 협력', '시스템 데모 요청', '기타 문의']

export default function ContactSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm] = useState({ name: '', org: '', email: '', type: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  const inp = 'w-full bg-white border border-gray-200 text-gray-800 text-sm px-4 py-3 rounded-xl outline-none focus:border-[#00d4ff] focus:ring-1 focus:ring-[#00d4ff]/20 transition-all placeholder:text-gray-300'

  return (
    <section id="contact" className="relative bg-[#0a0a0a] py-28 overflow-hidden font-inter">
      {/* 글로우 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[400px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(ellipse, #00d4ff 0%, transparent 70%)' }} />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* 헤더 */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="text-center mb-16">
          <p className="text-[#00d4ff]/50 text-[10px] tracking-[0.3em] uppercase font-black mb-4">Contact & Partnership</p>
          <h2 className="font-askan text-white text-[2rem] sm:text-[3rem] lg:text-[3.75rem] leading-[1.05] tracking-tight mb-4">
            도입 문의
          </h2>
          <p className="text-white/40 text-sm max-w-md mx-auto leading-relaxed">
            K-Defense AI 도입 및 기술 파트너십에 관해 문의해 주세요. 전담 팀이 신속히 응대합니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* 연락처 정보 */}
          <motion.div initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-4">

            <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-7">
              <p className="text-[10px] font-black tracking-[0.2em] text-[#00d4ff] uppercase mb-6">Meta ICT Defense</p>
              <div className="space-y-5">
                {CONTACT_INFO.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl bg-[#00d4ff]/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#00d4ff]" />
                    </div>
                    <div>
                      <div className="text-[9px] font-bold tracking-[0.15em] text-white/30 uppercase mb-1">{label}</div>
                      <div className="text-sm text-white/70">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 보안 안내 */}
            <div className="bg-[#ff2d55]/[0.06] border border-[#ff2d55]/15 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#ff2d55] mt-1.5 shrink-0 animate-pulse" />
                <div>
                  <div className="text-[10px] font-black text-[#ff2d55] tracking-[0.1em] mb-1.5">SECURITY NOTICE</div>
                  <p className="text-xs text-white/35 leading-relaxed">
                    본 플랫폼은 국가 안보 관련 솔루션을 제공합니다. 모든 문의는 보안 심사 후 처리됩니다.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 문의 폼 */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <p className="text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase mb-7">문의 양식</p>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-14 text-center">
                  <div className="w-14 h-14 rounded-full bg-[#00ff88]/10 flex items-center justify-center mb-5">
                    <CheckCircle className="w-7 h-7 text-[#00ff88]" />
                  </div>
                  <h3 className="font-askan text-gray-900 text-2xl mb-2">전송 완료</h3>
                  <p className="text-sm text-gray-400">담당자가 확인 후 연락드리겠습니다.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold tracking-[0.1em] text-gray-400 uppercase mb-2">이름 *</label>
                      <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={inp} placeholder="홍길동" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold tracking-[0.1em] text-gray-400 uppercase mb-2">소속 기관</label>
                      <input value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })}
                        className={inp} placeholder="국방부" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-[0.1em] text-gray-400 uppercase mb-2">이메일 *</label>
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inp} placeholder="contact@example.go.kr" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-[0.1em] text-gray-400 uppercase mb-2">문의 유형</label>
                    <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                      className={`${inp} text-gray-500`}>
                      <option value="">선택하세요</option>
                      {INQUIRY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-[0.1em] text-gray-400 uppercase mb-2">문의 내용 *</label>
                    <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={`${inp} resize-none`} placeholder="문의 내용을 자세히 입력해 주세요..." />
                  </div>
                  <button type="submit"
                    className="w-full flex items-center justify-center gap-2 py-4 bg-[#00d4ff] text-[#020b18] text-sm font-bold rounded-xl hover:bg-[#00eeff] transition-colors">
                    <Send className="w-4 h-4" /> 보안 채널로 전송
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
