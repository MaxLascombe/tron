import { useState } from 'react'
import { SiSpotify, SiApplemusic, SiYoutubemusic } from 'react-icons/si'

import Popup from './Popup'

const MusicPopup = () => {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <Popup show={isOpen} blur={true}>
      Before we begin, please select your music player:
      <div className='mt-4 flex justify-center'>
        <a
          href='https://open.spotify.com/track/7hqlHZIXhwAzpWQxm9KzBd?si=a30cb4cea60944c6'
          target='_blank'
          rel='noreferrer'
          onClick={() => setIsOpen(false)}>
          <SiSpotify className='mx-2 inline-block h-8 w-8' />
        </a>
        <a
          href='https://music.apple.com/us/song/derezzed/1440617959'
          target='_blank'
          rel='noreferrer'
          onClick={() => setIsOpen(false)}>
          <SiApplemusic className='mx-2 inline-block h-8 w-8' />
        </a>
        <a
          href='https://www.youtube.com/watch?v=F4eccPBFEjE'
          target='_blank'
          rel='noreferrer'
          onClick={() => setIsOpen(false)}>
          <SiYoutubemusic className='mx-2 inline-block h-8 w-8' />
        </a>
      </div>
    </Popup>
  )
}
export default MusicPopup
