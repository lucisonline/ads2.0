import { ReactLenis } from 'lenis/react'
import {
  TheSplit,
} from './components/StrategicSections'
import { GovBlock1, GovBlock2 } from './components/GovStyleBlocks'
import AgentPages from './components/AgentPages'
import EndPage from './components/EndPage'
import CriteoStatement from './components/CriteoStatement'
import { LolaTransition, LolaAgentStory } from './components/LolaIntro'
import Resources from './components/Resources'
import StickyFooter from './components/StickyFooter'
import './App.css'

function App() {
  return (
    <ReactLenis root>
      <div className="main-content">
        <EndPage />
        <GovBlock1 />
        <GovBlock2 />
        <AgentPages />
        <TheSplit />
        <CriteoStatement />
        <LolaTransition />
        <LolaAgentStory />
        <Resources />
      </div>
      <StickyFooter />
    </ReactLenis>
  )
}

export default App
