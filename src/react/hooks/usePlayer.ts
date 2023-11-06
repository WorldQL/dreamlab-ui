import { isPlayer } from '@dreamlab.gg/core/entities'
import type { Player } from '@dreamlab.gg/core/entities'
import type { EventHandler } from '@dreamlab.gg/core/events'
import { useCallback, useEffect, useState } from 'https://esm.sh/react@18.2.0'
import { useGame } from './useGame.ts'

export const usePlayer = (): Player | undefined => {
  const game = useGame()

  const [, updateState] = useState<unknown>()
  const forceUpdate = useCallback(() => updateState({}), [])

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
