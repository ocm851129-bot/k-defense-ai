import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  opacityDir: number
}

interface Props {
  count?: number
  color?: string
  className?: string
}

export default function ParticleField({ count = 80, color = '#00d4ff', className = '' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let W = 0
    let H = 0

    const resize = () => {
      W = canvas.width = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    window.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', () => { mouseRef.current = { x: -9999, y: -9999 } })

    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      opacityDir: Math.random() > 0.5 ? 1 : -1,
    }))

    const hexToRgb = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16)
      const g = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)
      return `${r},${g},${b}`
    }
    const rgb = hexToRgb(color)
    const CONNECT_DIST = 120
    const MOUSE_DIST = 140

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      const particles = particlesRef.current
      const mouse = mouseRef.current

      // Update + draw particles
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1
        p.opacity += p.opacityDir * 0.003
        if (p.opacity > 0.6 || p.opacity < 0.05) p.opacityDir *= -1

        // Mouse repulsion
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_DIST) {
          const force = (MOUSE_DIST - dist) / MOUSE_DIST * 0.015
          p.x += (dx / dist) * force * 8
          p.y += (dy / dist) * force * 8
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb},${p.opacity})`
        ctx.fill()
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECT_DIST) {
            const opacity = (1 - dist / CONNECT_DIST) * 0.15
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(${rgb},${opacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Mouse connections
      for (const p of particles) {
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_DIST) {
          const opacity = (1 - dist / MOUSE_DIST) * 0.5
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = `rgba(${rgb},${opacity})`
          ctx.lineWidth = 0.7
          ctx.stroke()
        }
      }

      animRef.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [count, color])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  )
}
