import { isPlayer } from '@dreamlab.gg/core/entities'
import type { Player } from '@dreamlab.gg/core/entities'
import type { EventHandler } from '@dreamlab.gg/core/events'
import { useCallback, useEffect } from 'https://esm.sh/v136/react@18.2.0'
import { useForceUpdate } from './useForceUpdate.ts'
import { useGame } from './useGame.ts'

/**
 * Get a reference to the current Player entity
 *
 * Tracks entity instantiate / destroy and will trigger a re-render if the player is created or destroyed
 */
export const usePlayer = (): Player | undefined => {
  const game = useGame()
  const forceUpdate = useForceUpdate()

  type Handler = EventHandler<'onDestroy' | 'onInstantiate'>
  const onEntityChange = useCallback<Handler>(
    entity => {
      if (isPlayer(entity)) forceUpdate()
    },
    [forceUpdate],
  )

  useEffect(() => {
    game.events.common.addListener('onInstantiate', onEntityChange)
    game.events.common.addListener('onDestroy', onEntityChange)

    return () => {
      game.events.common.removeListener('onInstantiate', onEntityChange)
      game.events.common.removeListener('onDestroy', onEntityChange)
    }
  }, [game.events.common, onEntityChange])

  return game.entities.find(isPlayer)
}
