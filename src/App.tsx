import { useState } from 'react'

import GameCanvas from './GameCanvas'
import MusicPopup from './components/MusicPopup'
import PausePopup from './components/PausePopup'
import { useKeyAction } from './hooks/useKeyAction'
import { GameStatus } from './types'

const App = () => {
  const [gameStatus, setGameStatus] = useState<GameStatus>('menu')
  const [gameKey, setGameKey] = useState(-1)

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
      {gameStatus === 'menu' && gameKey === -1 && <MusicPopup />}
      <PausePopup paused={gameStatus === 'paused'} />
      {gameStatus !== 'menu' && (
        <GameCanvas key={gameKey} {...{ gameStatus, setGameStatus }} />
      )}
    </div>
  )
}

export default App
