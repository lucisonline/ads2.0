import { ReactLenis } from 'lenis/react'
import {
  TheSplit,
  Transition,
} from './components/StrategicSections'
import { GovBlock1, GovBlock2 } from './components/GovStyleBlocks'
import AgentPages from './components/AgentPages'
import LolaCarousel from './components/LolaCarousel'
import EndPage from './components/EndPage'
import CriteoStatement from './components/CriteoStatement'
import './App.css'

function App() {
  return (
    <ReactLenis root>
      <EndPage />
      <GovBlock1 />
      <GovBlock2 />
      <AgentPages />
      <TheSplit />
      <CriteoStatement />
      <Transition />
      <LolaCarousel />
    </ReactLenis>
  )
}

export default App
