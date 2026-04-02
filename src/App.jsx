import {
  TitleScreen,
  TheThreat,
  TheSplit,
  ProtocolAgnostic,
  CriteoPosition,
  Transition,
} from './components/StrategicSections'
import LolaStory from './components/LolaStory'
import './App.css'

function App() {
  return (
    <>
      <TitleScreen />
      <TheThreat />
      <TheSplit />
      <ProtocolAgnostic />
      <CriteoPosition />
      <Transition />
      <LolaStory />
    </>
  )
}

export default App
