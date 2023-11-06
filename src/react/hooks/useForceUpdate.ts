import { useCallback, useState } from 'https://esm.sh/react@18.2.0'

export const useForceUpdate = () => {
  const [, updateState] = useState<unknown>()
  return useCallback(() => updateState({}), [])
}
