import { Ref } from 'react'

type Point = [number, number]
type Path = Point[]

function intersects(
  a: number,
  b: number,
  c: number,
  d: number,
  p: number,
  q: number,
  r: number,
  s: number
) {
  var det, gamma, lambda
  det = (c - a) * (s - q) - (r - p) * (d - b)
  if (det === 0) {
    return false
  } else {
    lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det
    gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det
    return 0 < lambda && lambda < 1 && 0 < gamma && gamma < 1
  }
}

export const useCollisions = (
  curMoves: [number, number, number, number][],
  paths: Path[]
) => {
  if (curMoves.length !== paths.length) throw new Error()
  for (let i = 0; i < paths.length; i++) {
    const path = paths[i]
    const currentSegment = [
      [curMoves[i][0], curMoves[i][1]],
      [curMoves[i][2], curMoves[i][3]],
    ] as const
    for (let j = 0; j < path.length - 2; j++) {
      const segment = [path[j], path[j + 1]]
      if (
        intersects(
          currentSegment[0][0],
          currentSegment[0][1],
          currentSegment[1][0],
          currentSegment[1][1],
          segment[0][0],
          segment[0][1],
          segment[1][0],
          segment[1][1]
        )
      )
        return i
    }
    for (let j = 0; j < paths.length; j++) {
      if (i === j) continue
      for (let k = 0; k < paths[j].length - 1; k++) {
        const segment = [paths[j][k], paths[j][k + 1]]
        if (
          intersects(
            currentSegment[0][0],
            currentSegment[0][1],
            currentSegment[1][0],
            currentSegment[1][1],
            segment[0][0],
            segment[0][1],
            segment[1][0],
            segment[1][1]
          )
        )
          return i
      }
    }
  }
  return -1
}
