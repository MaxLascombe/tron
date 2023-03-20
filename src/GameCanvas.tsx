import { useEffect, useRef, Dispatch, SetStateAction, useState } from 'react'
import { useAnimationFrame } from './hooks/useAnimationFrame'
import { useCollisions } from './hooks/useCollisions'
import { useKeyAction } from './hooks/useKeyAction'
import { usePlayer } from './hooks/usePlayer'
import { GameStatus } from './types'

const GameCanvas = ({
  gameStatus,
  setGameStatus,
  setWinner,
}: {
  gameStatus: GameStatus
  setGameStatus: Dispatch<SetStateAction<GameStatus>>
  setWinner: Dispatch<SetStateAction<'red' | 'blue'>>
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const playerSize = 5

  const [initialBluePos, setInitialBluePos] = useState<[number, number]>([
    50, 50,
  ])

  const {
    position: redPos,
    prevPosition: redPrev,
    updatePosition: redUpdatePosition,
    turn: redTurn,
    vertices: redVertices,
  } = usePlayer([50, 50], 'down', gameStatus)
  const {
    position: bluePos,
    prevPosition: bluePrev,
    updatePosition: blueUpdatePosition,
    turn: blueTurn,
    vertices: blueVertices,
  } = usePlayer(initialBluePos, 'up', gameStatus)

  const loser = useCollisions(
    [
      [redPrev[0], redPrev[1], redPos[0], redPos[1]],
      [bluePrev[0], bluePrev[1], bluePos[0], bluePos[1]],
    ],
    [
      [...redVertices, redPos],
      [...blueVertices, bluePos],
    ]
  )

  if (loser >= 0 && gameStatus !== 'over') {
    setGameStatus('over')
    setWinner(loser === 0 ? 'blue' : 'red')
  }

  useAnimationFrame(
    dt => {
      if (gameStatus === 'running') {
        redUpdatePosition(dt)
        blueUpdatePosition(dt)
      }

      const canvas = canvasRef.current
      if (!canvas) return
      const context = canvas.getContext('2d')
      if (!context) return

      context.clearRect(0, 0, canvas.width, canvas.height)

      context.fillStyle = 'red'
      context.fillRect(
        redPos[0] - playerSize / 2,
        redPos[1] - playerSize / 2,
        playerSize,
        playerSize
      )
      context.fillStyle = 'blue'
      context.fillRect(
        bluePos[0] - playerSize / 2,
        bluePos[1] - playerSize / 2,
        playerSize,
        playerSize
      )

      context.strokeStyle = 'red'
      context.lineWidth = 2
      context.beginPath()
      context.moveTo(redVertices[0][0], redVertices[0][1])
      for (let i = 1; i < redVertices.length; i++)
        context.lineTo(redVertices[i][0], redVertices[i][1])
      context.lineTo(redPos[0], redPos[1])
      context.stroke()

      context.strokeStyle = 'blue'
      context.beginPath()
      context.moveTo(blueVertices[0][0], blueVertices[0][1])
      for (let i = 1; i < blueVertices.length; i++)
        context.lineTo(blueVertices[i][0], blueVertices[i][1])
      context.lineTo(bluePos[0], bluePos[1])
      context.stroke()
    },
    redPos,
    bluePos,
    gameStatus
  )

  useKeyAction([
    {
      key: 'ArrowUp',
      function: () => redTurn('up'),
    },
    {
      key: 'ArrowRight',
      function: () => redTurn('right'),
    },
    {
      key: 'ArrowDown',
      function: () => redTurn('down'),
    },
    {
      key: 'ArrowLeft',
      function: () => redTurn('left'),
    },
    {
      key: 'w',
      function: () => blueTurn('up'),
    },
    {
      key: 'd',
      function: () => blueTurn('right'),
    },
    {
      key: 's',
      function: () => blueTurn('down'),
    },
    {
      key: 'a',
      function: () => blueTurn('left'),
    },
  ])

  const resizeCanvas = () => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    canvas.width = container.clientWidth
    canvas.height = container.clientHeight

    if (gameStatus === 'menu')
      setInitialBluePos([canvas.width - 50, canvas.height - 50])
  }

  useEffect(() => {
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [])

  return (
    <div
      ref={containerRef}
      className={
        'h-full w-full overflow-hidden rounded-lg border-2 ' +
        (loser === 0
          ? 'border-blue-800'
          : loser === 1
          ? 'border-red-600'
          : 'border-white')
      }>
      <canvas className='h-full w-full' ref={canvasRef} />
    </div>
  )
}

export default GameCanvas
