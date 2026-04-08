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
  const lenis = useLenis()
  const snapRef = useRef(null)

  useEffect(() => {
    if (!lenis || snapRef.current) return

    const snap = new Snap(lenis, {
      type: 'proximity',
      lerp: 0.035,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      duration: 1.5,
      debounce: 200,
    })
    snapRef.current = snap

    document.querySelectorAll('[data-lenis-snap]').forEach((el) => {
      snap.addElement(el, { align: ['start'], ignoreSticky: true })
    })

    return () => {
      snap.destroy()
      snapRef.current = null
    }
  }, [lenis])

  return null
}

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.04, duration: 1.8 }}>
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
