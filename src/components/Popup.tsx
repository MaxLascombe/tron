import { ReactNode } from 'react'

const Popup = ({
  blur,
  children,
  show,
}: {
  blur: boolean
  children: ReactNode
  show: boolean
}) => (
  <>
    <div
      className={`absolute top-0 left-0 h-full w-full blur ${
        show && blur ? 'block' : 'hidden'
      }`}
    />
    <div
      className={
        'absolute top-1/2 left-1/2 max-w-sm -translate-x-1/2 -translate-y-1/2 transform rounded-xl border-2 border-white bg-black p-4 text-center text-xs text-white ' +
        (show ? '' : 'hidden ')
      }>
      {children}
    </div>
  </>
)

export default Popup
