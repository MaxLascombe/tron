import GameCanvas from './GameCanvas'
import MusicPopup from './components/MusicPopup'

const App = () => (
  <div className='h-screen w-full bg-black p-4 font-mono'>
    <MusicPopup />
    <GameCanvas />
  </div>
)

export default App
