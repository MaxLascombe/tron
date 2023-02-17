import { useState } from 'react'

type Direction = 'up' | 'right' | 'down' | 'left'
export const usePlayer = (
  initialPosition: [number, number] = [0, 0],
  initialDirection: Direction = 'right'
) => {
  const [position, setPosition] = useState<[number, number]>(initialPosition)
  const [direction, setDirection] = useState<Direction>(initialDirection)
  const [vertices, setVertices] = useState([initialPosition])

  const updatePosition = (dt: number) => {
    switch (direction) {
      case 'up':
        setPosition(([x, y]) => [x, y - dt * 0.1])
        break
      case 'down':
        setPosition(([x, y]) => [x, y + dt * 0.1])
        break
      case 'left':
        setPosition(([x, y]) => [x - dt * 0.1, y])
        break
      case 'right':
        setPosition(([x, y]) => [x + dt * 0.1, y])
        break
    }
  }

  const turn = (newDirection: Direction) => {
    if (newDirection === 'up' && direction === 'down') return
    if (newDirection === 'down' && direction === 'up') return
    if (newDirection === 'left' && direction === 'right') return
    if (newDirection === 'right' && direction === 'left') return
    if (newDirection === direction) return
    setDirection(newDirection)
    setVertices(v => [...v, position])
  }

  return {
    position,
    updatePosition,
    turn,
    vertices,
  }
}
