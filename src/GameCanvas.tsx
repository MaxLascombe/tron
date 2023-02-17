import { useEffect, useRef } from 'react'
import { useAnimationFrame } from './hooks/useAnimationFrame'
import { useCollisions } from './hooks/useCollisions'
import { useKeyAction } from './hooks/useKeyAction'
import { usePlayer } from './hooks/usePlayer'

const GameCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const playerSize = 10

  const {
    position: redPos,
    updatePosition: redUpdatePosition,
    turn: redTurn,
    vertices: redVertices,
  } = usePlayer([50, 100], 'down')
  const {
    position: bluePos,
    updatePosition: blueUpdatePosition,
    turn: blueTurn,
    vertices: blueVertices,
  } = usePlayer([100, 50])

  const loser = useCollisions([
    [...redVertices, redPos],
    [...blueVertices, bluePos],
  ])

  const animationRef = useAnimationFrame(
    dt => {
      redUpdatePosition(dt)
      blueUpdatePosition(dt)

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

      return () => context.clearRect(0, 0, canvas.width, canvas.height)
    },
    loser < 0,
    redPos,
    bluePos
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
  }

  useEffect(() => {
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [])

  return (
    <div
      ref={containerRef}
      className='h-full w-full overflow-hidden rounded border border-yellow-400'>
      <canvas className='h-full w-full' ref={canvasRef} />
    </div>
  )
}

export default GameCanvas
