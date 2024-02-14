import { isSpawnableEntity } from '@dreamlab.gg/core'
import type { Entity, Game, SpawnableEntity } from '@dreamlab.gg/core'
import type { EventHandler } from '@dreamlab.gg/core/events'
import { useCallback, useEffect } from 'https://esm.sh/v136/react@18.2.0'
import { useForceUpdate } from './useForceUpdate.ts'
import { useGame } from './useGame.ts'

export type RegisteredSpawnables = Game<boolean>['registered']

/**
 * List all registered spawnable entity functions
 */
export const useRegisteredSpawnables = (): RegisteredSpawnables => {
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

/**
 * List all entities
 */
export const useEntities = (): readonly Entity[] => {
  const game = useGame()
  const forceUpdate = useForceUpdate()

  useEffect(() => {
    game.events.common.addListener('onInstantiate', forceUpdate)
    game.events.common.addListener('onDestroy', forceUpdate)

    return () => {
      game.events.common.removeListener('onInstantiate', forceUpdate)
      game.events.common.removeListener('onDestroy', forceUpdate)
    }
  }, [game.events.common, forceUpdate])

  return game.entities
}

/**
 * List all spawnable entities
 */
export const useSpawnableEntities = (): readonly SpawnableEntity[] => {
  const entities = useEntities()
  return entities.filter(isSpawnableEntity)
}
