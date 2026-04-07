import { ReactLenis } from 'lenis/react'
import {
  TitleScreen,
  TheSplit,
  CriteoPosition,
  Transition,
} from './components/StrategicSections'
import { GovBlock1, GovBlock2, GovBlock3 } from './components/GovStyleBlocks'
import LolaCarousel from './components/LolaCarousel'
import './App.css'

function App() {
  return (
    <ReactLenis root>

      <TitleScreen />
      <GovBlock1 />
      <GovBlock2 />
      <GovBlock3 />
      <TheSplit />
      <CriteoPosition />
      <Transition />
      <LolaCarousel />
    </ReactLenis>
  )
}

export default App
