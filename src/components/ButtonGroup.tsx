const ButtonGroup = ({
  position = 'left',
  leftClick,
  rightClick,
}: {
  position?: 'top' | 'right' | 'bottom' | 'left'
  leftClick: () => void
  rightClick: () => void
}) => {
  const cN =
    position === 'top'
      ? 'top-8 left-1/2 -translate-x-1/2 rotate-180'
      : position === 'right'
      ? 'top-1/2 right-8 -translate-y-1/2 -rotate-90'
      : position === 'bottom'
      ? 'bottom-8 left-1/2 -translate-x-1/2'
      : 'top-1/2 left-8 -translate-y-1/2 rotate-90'
  return (
    <div className={'pointer-events-none fixed h-96 w-96 md:hidden ' + cN}>
      <div className='absolute bottom-0 left-1/2 -translate-x-1/2'>
        <div className='space-around flex pl-2 '>
          <Button onClick={leftClick} text='←' />
          <Button onClick={rightClick} text='→' />
        </div>
      </div>
    </div>
    // <div className='fixed left-0 top-1/2 -translate-y-1/2 bg-red-500'>
    //   <div className='abolute relative right-1/2 w-96 translate-y-1/2 rotate-90 bg-blue-500 text-white'>
    //     <button
    //       className='m-2 rounded-xl border-2 border-b-8 p-2'
    //       onClick={upClick}>
    //       Up
    //     </button>
    //   </div>
    // </div>
  )
}

const Button = ({ onClick, text }: { onClick: () => void; text: string }) => (
  <button
    onTouchStart={onClick}
    className='pointer-events-auto mr-2 h-12 w-12 rounded-xl border-2 p-2 text-lg text-white '>
    {text}
  </button>
)

export default ButtonGroup
