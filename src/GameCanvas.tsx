import { useEffect, useRef } from 'react'
import { useAnimationFrame } from './hooks/useAnimationFrame'
import { usePlayer } from './hooks/usePlayer'

const GameCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const playerSize = 10

  const { position: redPos, updatePosition: redUpdatePosition } = usePlayer([
    10, 10,
  ])
  const { position: bluePos, updatePosition: blueUpdatePosition } = usePlayer([
    20, 20,
  ])

  useAnimationFrame(
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

      return () => context.clearRect(0, 0, canvas.width, canvas.height)
    },
    redPos,
    bluePos
  )

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
