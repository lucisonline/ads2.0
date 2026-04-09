import { useEffect, useRef } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import Snap from 'lenis/snap'
import { TheSplit } from './components/StrategicSections'
import { GovBlock1, GovBlock2 } from './components/GovStyleBlocks'
import AgentPages from './components/AgentPages'
import EndPage from './components/EndPage'
import CriteoStatement from './components/CriteoStatement'
import { LolaTransition, LolaAgentStory } from './components/LolaIntro'
import LolaCarousel from './components/LolaCarousel'
import Resources from './components/Resources'
import StickyFooter from './components/StickyFooter'
import './App.css'

function SnapSetup() {
  const lenis = useLenis()
  const snapRef = useRef(null)

  useEffect(() => {
    if (!lenis || snapRef.current) return
    try {
      const snap = new Snap(lenis, {
        type: 'proximity',
        lerp: 0.08,
        easing: (t) => 1 - Math.pow(1 - t, 4),
        duration: 1.1,
        distanceThreshold: '40%',
        debounce: 350,
      })
      snapRef.current = snap

      document.querySelectorAll('[data-lenis-snap]').forEach((el) => {
        snap.addElement(el, { align: ['start'], ignoreSticky: true })
      })
    } catch (err) {
      console.warn('Snap setup failed:', err)
    }

    return () => {
      if (snapRef.current) {
        snapRef.current.destroy()
        snapRef.current = null
      }
    }
  }, [lenis])

  return null
}

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.04, duration: 1.8 }}>
      <SnapSetup />
      <div className="main-content">
        <EndPage />
        <GovBlock1 />
        <GovBlock2 />
        <AgentPages />
        <TheSplit />
        <CriteoStatement />
        <LolaTransition />
        <LolaAgentStory />
        <LolaCarousel />
        <Resources />
      </div>
      <StickyFooter />
    </ReactLenis>
  )
}

export default App
