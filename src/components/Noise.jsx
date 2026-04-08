import { useEffect, useRef } from 'react'

export default function Noise({ opacity = 0.035 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    // Small buffer, scaled up via CSS for performance
    const w = 256
    const h = 256
    canvas.width = w
    canvas.height = h

    const imageData = ctx.createImageData(w, h)
    const buf = imageData.data
    let raf

    function draw() {
      for (let i = 0; i < buf.length; i += 4) {
        const v = (Math.random() * 255) | 0
        buf[i] = v
        buf[i + 1] = v
        buf[i + 2] = v
        buf[i + 3] = 255
      }
      ctx.putImageData(imageData, 0, 0)
      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="noise-overlay"
      style={{ opacity }}
    />
  )
}
