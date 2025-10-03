'use client'

import { useRef, useEffect } from 'react'

export function PulseActivite() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let raf = 0
    const pulses: Array<{ x: number; y: number; r: number; a: number; hue: number }> = []
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    const spawn = () => {
      pulses.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 0,
        a: 0.35,
        hue: 240 + Math.random() * 60
      })
    }
    const tick = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pulses.forEach((p, i) => {
        p.r += 0.8
        p.a *= 0.985
        if (p.a < 0.02) pulses.splice(i, 1)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.strokeStyle = `hsla(${p.hue},70%,60%,${p.a})`
        ctx.lineWidth = 1
        ctx.stroke()
      })
      if (Math.random() < 0.06) spawn()
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('resize', resize)
    tick()
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [])
  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[1] opacity-20 dark:opacity-15" />
}
