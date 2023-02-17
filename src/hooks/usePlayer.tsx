import { useState } from 'react'

export const usePlayer = (
  initialPosition = [0, 0],
  initialDirection = 'right'
) => {
  const [position, setPosition] = useState(initialPosition)
  const [direction, setDirection] = useState(initialDirection)

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

  return {
    position,
    updatePosition,
    segments: [],
    setDirection,
  }
}
