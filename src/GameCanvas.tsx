import { useEffect, useRef } from 'react'
import { useAnimationFrame } from './hooks/useAnimationFrame'

const GameCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useAnimationFrame(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return
    context.fillStyle = 'red'
    context.fillRect(0, 0, 100, 100)
    return () => context.clearRect(0, 0, canvas.width, canvas.height)
  })

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
