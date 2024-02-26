import { useCallback, useState } from 'https://esm.sh/react@18.2.0'

/**
 * Allows you to force a re-render
 *
 * Useful for tracking game state and forcing the UI to react to events
 */
export const useForceUpdate = () => {
  const [, updateState] = useState<unknown>()
  return useCallback(() => updateState({}), [])
}
