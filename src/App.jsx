import { useEffect, useRef } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import Snap from 'lenis/snap'
import {
  TitleScreen,
  TheSplit,
  ProtocolAgnostic,
  CriteoPosition,
  Transition,
} from './components/StrategicSections'
import ScrollRevealText from './components/ScrollRevealText'
import LolaCarousel from './components/LolaCarousel'
import './App.css'

function SnapSetup() {
  const snapRef = useRef(null)

  useLenis((lenis) => {
    // Initialize snap once on first lenis callback
    if (snapRef.current) return

    const snap = new Snap(lenis, {
      type: 'mandatory',
      lerp: 0.1,
      debounce: 150,
    })
    snapRef.current = snap

    // Snap to all fullscreen sections (100vh ones)
    document.querySelectorAll('[data-lenis-snap]').forEach((el) => {
      snap.addElement(el, { align: ['start'] })
    })
  })

  useEffect(() => {
    return () => {
      if (snapRef.current) {
        snapRef.current.destroy()
        snapRef.current = null
      }
    }
  }, [])

  return null
}

function App() {
  return (
    <ReactLenis root>
      <SnapSetup />
      <TitleScreen />
      <ScrollRevealText />
      <TheSplit />
      <ProtocolAgnostic />
      <CriteoPosition />
      <Transition />
      <LolaCarousel />
    </ReactLenis>
  )
}

export default App
