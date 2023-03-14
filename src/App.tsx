import { useState } from 'react'

import GameCanvas from './GameCanvas'
import Menu from './components/Menu'
import MusicPopup from './components/MusicPopup'
import PausePopup from './components/PausePopup'
import { useKeyAction } from './hooks/useKeyAction'
import { GameStatus } from './types'

const App = () => {
  const [gameStatus, setGameStatus] = useState<GameStatus>('menu')
  const [gameKey, setGameKey] = useState(0)

  useKeyAction([
    {
      key: ' ',
      function: () =>
        setGameStatus(gs =>
          gs === 'paused' || gs === 'menu'
            ? 'running'
            : gs === 'running'
            ? 'paused'
            : gs
        ),
    },
  ])

  return (
    <div className='h-screen w-full bg-black p-4 font-mono'>
      <Menu show={gameStatus === 'menu'} />
      <PausePopup paused={gameStatus === 'paused'} />
      <GameCanvas key={gameKey} {...{ gameStatus, setGameStatus }} />
    </div>
  )
}

export default App
