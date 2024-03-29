import { useState } from 'react'

import Popup from './Popup'
import { useAnimationTimeout } from '../hooks/useAnimationFrame'

const Menu = ({
  show,
  startClick,
}: {
  show: boolean
  startClick: () => void
}) => {
  const [clicked, setClicked] = useState(false)
  useAnimationTimeout(() => setClicked(c => !c), 500)

  return (
    <Popup show={show} blur={true}>
      Welcome to
      <h1 className='hidden p-4 text-3xl'>TRON</h1>
      <img
        style={{ imageRendering: 'pixelated' }}
        src='/logo.png'
        alt='logo'
        className='my-4 mx-auto h-auto w-32'
      />
      Press Space to begin.
      <div className='mt-2'>
        <button
          onClick={startClick}
          className={
            'inline-block rounded-xl border-2 border-white px-8 py-2 text-xs ' +
            (clicked ? 'mb-0.5 mt-1 border-b-2' : 'border-b-8')
          }>
          START
        </button>
      </div>
    </Popup>
  )
}

export default Menu
