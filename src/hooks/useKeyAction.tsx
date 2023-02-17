import { useCallback, useEffect } from 'react'

type KeyAction = {
  key:
    | 'ArrowUp'
    | 'ArrowDown'
    | 'ArrowLeft'
    | 'ArrowRight'
    | 'a'
    | 's'
    | 'd'
    | 'w'
  function: (e: KeyboardEvent) => void
}

export const useKeyAction = (keyActions: KeyAction[]) => {
  const callback = useCallback(
    (e: KeyboardEvent) => {
      for (const kA of keyActions) if (kA.key === e.key) kA.function(e)
    },
    [keyActions]
  )
  return useEffect(() => {
    document.addEventListener('keydown', callback)
    return () => {
      document.removeEventListener('keydown', callback)
    }
  }, [keyActions, event, callback])
}
