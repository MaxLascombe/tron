import { useState } from 'react'

import Popup from './Popup'
import { useAnimationTimeout } from '../hooks/useAnimationFrame'

const PausePopup = ({ show, winner }: { show: boolean; winner: string }) => {
  const [clicked, setClicked] = useState(false)
  useAnimationTimeout(() => setClicked(c => !c), 500)

  return (
    <Popup show={show} blur={true}>
      Game over!
      <br />
      <span
        className={
          'text-xl uppercase ' +
          (winner === 'red' ? 'text-red-600' : 'text-blue-800')
        }>
        {winner} wins!
      </span>
      <br />
      Press Space to start another game.
      <div className='mt-2'>
        <div
          className={
            'inline-block rounded-xl border-2 border-white px-8 py-2 text-xs ' +
            (clicked ? 'mb-0.5 mt-1 border-b-2' : 'border-b-8')
          }>
          SPACE
        </div>
      </div>
    </Popup>
  )
}

export default PausePopup
