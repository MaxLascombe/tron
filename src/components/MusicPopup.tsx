import { SiSpotify, SiApplemusic, SiYoutubemusic } from 'react-icons/si'

import Popup from './Popup'

const MUSIC_LINKS = [
  {
    name: 'Spotify',
    link: 'https://open.spotify.com/track/7hqlHZIXhwAzpWQxm9KzBd?si=a30cb4cea60944c6',
    icon: SiSpotify,
  },
  {
    name: 'Apple Music',
    link: 'https://music.apple.com/us/song/derezzed/1440617959',
    icon: SiApplemusic,
  },
  {
    name: 'YouTube Music',
    link: 'https://www.youtube.com/watch?v=F4eccPBFEjE',
    icon: SiYoutubemusic,
  },
]

const MusicPopup = ({ close }: { close: () => void }) => (
  <Popup show={true} blur={true}>
    Before we begin, please select your music player:
    <div className='mt-4 flex justify-center'>
      {MUSIC_LINKS.map(({ name, link, icon: Icon }) => (
        <a
          key={name}
          href={link}
          target='_blank'
          rel='noreferrer'
          onClick={close}>
          <Icon className='mx-2 inline-block h-8 w-8' />
        </a>
      ))}
    </div>
  </Popup>
)

export default MusicPopup
