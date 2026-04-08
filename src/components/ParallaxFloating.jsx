import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react'
import { useAnimationFrame } from 'framer-motion'

/* ── mouse-position ref hook ── */
function useMousePositionRef(containerRef) {
  const positionRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const update = (x, y) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect()
        positionRef.current = { x: x - rect.left, y: y - rect.top }
      } else {
        positionRef.current = { x, y }
      }
    }
    const onMouse = (e) => update(e.clientX, e.clientY)
    const onTouch = (e) => {
      const t = e.touches[0]
      update(t.clientX, t.clientY)
    }
    window.addEventListener('mousemove', onMouse)
    window.addEventListener('touchmove', onTouch)
    return () => {
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('touchmove', onTouch)
    }
  }, [containerRef])

  return positionRef
}

/* ── context ── */
const FloatingContext = createContext(null)

/* ── Floating (container) ── */
export default function Floating({
  children,
  className = '',
  sensitivity = 1,
  easingFactor = 0.05,
  style,
}) {
  const containerRef = useRef(null)
  const elementsMap = useRef(new Map())
  const mouseRef = useMousePositionRef(containerRef)

  const registerElement = useCallback((id, element, depth) => {
    elementsMap.current.set(id, {
      element,
      depth,
      currentPosition: { x: 0, y: 0 },
    })
  }, [])

  const unregisterElement = useCallback((id) => {
    elementsMap.current.delete(id)
  }, [])

  useAnimationFrame(() => {
    if (!containerRef.current) return
    elementsMap.current.forEach((data) => {
      const strength = (data.depth * sensitivity) / 20
      const tx = mouseRef.current.x * strength
      const ty = mouseRef.current.y * strength
      data.currentPosition.x += (tx - data.currentPosition.x) * easingFactor
      data.currentPosition.y += (ty - data.currentPosition.y) * easingFactor
      data.element.style.transform = `translate3d(${data.currentPosition.x}px, ${data.currentPosition.y}px, 0)`
    })
  })

  return (
    <FloatingContext.Provider value={{ registerElement, unregisterElement }}>
      <div ref={containerRef} className={className} style={{ position: 'absolute', inset: 0, ...style }}>
        {children}
      </div>
    </FloatingContext.Provider>
  )
}

/* ── FloatingElement (child) ── */
export function FloatingElement({ children, className = '', depth = 1, style }) {
  const ref = useRef(null)
  const idRef = useRef(Math.random().toString(36).substring(7))
  const ctx = useContext(FloatingContext)

  useEffect(() => {
    if (!ref.current || !ctx) return
    ctx.registerElement(idRef.current, ref.current, depth ?? 0.01)
    return () => ctx.unregisterElement(idRef.current)
  }, [depth, ctx])

  return (
    <div ref={ref} className={className} style={{ position: 'absolute', willChange: 'transform', ...style }}>
      {children}
    </div>
  )
}
