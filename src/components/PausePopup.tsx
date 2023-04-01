import { useState } from 'react'

import Popup from './Popup'
import { useAnimationTimeout } from '../hooks/useAnimationFrame'

const PausePopup = ({
  paused,
  unpauseClick,
}: {
  paused: boolean
  unpauseClick: () => void
}) => {
  const [clicked, setClicked] = useState(false)
  useAnimationTimeout(() => setClicked(c => !c), 500)

  return (
    <Popup show={paused} blur={true}>
      Paused.
      <br />
      Press Space to continue.
      <div className='mt-2'>
        <button
          onClick={unpauseClick}
          className={
            'inline-block rounded-xl border-2 border-white px-8 py-2 text-xs ' +
            (clicked ? 'mb-0.5 mt-1 border-b-2' : 'border-b-8')
          }>
          SPACE
        </button>
      </div>
    </Popup>
  )
}

export default PausePopup
