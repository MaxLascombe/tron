import GameCanvas from './GameCanvas'
import MusicWidget from './MusicWidget'

const App = () => (
  <div className='h-screen w-full bg-black p-4'>
    <MusicWidget />
    <GameCanvas />
  </div>
)

export default App
