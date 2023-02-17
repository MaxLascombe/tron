export const usePlayer = (
  initialPosition = [0, 0],
  initialDirection = 'right'
) => {
  return {
    position: [0, 0],
    segments: [],
  }
}
