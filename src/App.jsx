import { ReactLenis } from 'lenis/react'
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

function App() {
  return (
    <ReactLenis root>
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
