import { useState } from 'react'

type Direction = 'up' | 'right' | 'down' | 'left'
export const usePlayer = (
  initialPosition: [number, number] = [0, 0],
  initialDirection: Direction
) => {
  const [position, setPosition] = useState<[number, number]>(initialPosition)
  const [prevPosition, setPrevPosition] =
    useState<[number, number]>(initialPosition)
  const [direction, setDirection] = useState<Direction>(initialDirection)
  const [vertices, setVertices] = useState([initialPosition])

  const updatePosition = (dt: number) => {
    setPrevPosition(position)
    setPosition(([x, y]) => [
      x +
        (direction === 'right' ? 1 : direction === 'left' ? -1 : 0) * dt * 0.1,
      y + (direction === 'down' ? 1 : direction === 'up' ? -1 : 0) * dt * 0.1,
    ])

    if (
      (direction === 'up' || direction === 'down') &&
      vertices[vertices.length - 1][0] !== position[0]
    )
      setVertices(v => [...v.slice(0, -1), [position[0], v[v.length - 1][1]]])

    if (
      (direction === 'left' || direction === 'right') &&
      vertices[vertices.length - 1][1] !== position[1]
    )
      setVertices(v => [...v.slice(0, -1), [v[v.length - 1][0], position[1]]])
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
    prevPosition,
    updatePosition,
    turn,
    vertices,
  }
}
