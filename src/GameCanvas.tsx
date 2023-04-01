import { useEffect, useRef, Dispatch, SetStateAction, useState } from 'react'

import ButtonGroup from './components/ButtonGroup'
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

  const [{ width, height }, setCanvasSize] = useState<{
    width: number
    height: number
  }>({ width: 60, height: 60 })
  const initialBluePos = [width - 50, height - 50] as [number, number]

  const {
    position: redPos,
    prevPosition: redPrev,
    updatePosition: redUpdatePosition,
    turn: redTurn,
    leftTurn: redLeft,
    rightTurn: redRight,
    vertices: redVertices,
  } = usePlayer([50, 50], 'down', gameStatus)
  const {
    position: bluePos,
    prevPosition: bluePrev,
    updatePosition: blueUpdatePosition,
    turn: blueTurn,
    leftTurn: blueLeft,
    rightTurn: blueRight,
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
    ],
    { width, height }
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
      function: () => blueTurn('up'),
    },
    {
      key: 'ArrowRight',
      function: () => blueTurn('right'),
    },
    {
      key: 'ArrowDown',
      function: () => blueTurn('down'),
    },
    {
      key: 'ArrowLeft',
      function: () => blueTurn('left'),
    },
    {
      key: 'w',
      function: () => redTurn('up'),
    },
    {
      key: 'd',
      function: () => redTurn('right'),
    },
    {
      key: 's',
      function: () => redTurn('down'),
    },
    {
      key: 'a',
      function: () => redTurn('left'),
    },
  ])

  const resizeCanvas = () => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    canvas.width = container.clientWidth
    canvas.height = container.clientHeight

    if (gameStatus === 'menu')
      setCanvasSize({ width: canvas.width, height: canvas.height })
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
        'fixed left-4 right-4 top-4 bottom-4 z-0 overflow-hidden rounded-lg border-2 ' +
        (loser === 0
          ? 'border-blue-800'
          : loser === 1
          ? 'border-red-600'
          : 'border-white')
      }>
      <ButtonGroup
        position={width > height ? 'left' : 'top'}
        leftClick={redLeft}
        rightClick={redRight}
      />
      <ButtonGroup
        position={width > height ? 'right' : 'bottom'}
        leftClick={blueLeft}
        rightClick={blueRight}
      />
      <canvas className='h-full w-full' ref={canvasRef} />
    </div>
  )
}

export default GameCanvas
