import type { BareSpawnableFunction } from '@dreamlab.gg/core'
import type { EventHandler } from '@dreamlab.gg/core/events'
import { useCallback, useEffect } from 'https://esm.sh/react@18.2.0'
import { useForceUpdate } from './useForceUpdate.ts'
import { useGame } from './useGame.ts'

export const useRegistered = (): readonly (readonly [
  name: string,
  fn: BareSpawnableFunction,
])[] => {
  const game = useGame()
  const forceUpdate = useForceUpdate()

  type Handler = EventHandler<'onRegister'>
  const onRegister = useCallback<Handler>(() => forceUpdate(), [forceUpdate])

  useEffect(() => {
    game.events.common.addListener('onRegister', onRegister)

    return () => {
      game.events.common.removeListener('onRegister', onRegister)
    }
  }, [game.events.common, onRegister])

  return game.registered
}
