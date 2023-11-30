import type {
  ClientEvents,
  CommonEvents,
  Event,
  EventHandler,
} from '@dreamlab.gg/core/events'
import { useEffect } from 'https://esm.sh/v136/react@18.2.0'
import { useGame } from './useGame.ts'

export const useClientEventListener = <T extends Event<ClientEvents>>(
  event: T,
  handler: EventHandler<T, ClientEvents>,
): void => {
  const game = useGame()

  useEffect(() => {
    // @ts-expect-error Generic Narrowing
    game.events.client.addListener(event, handler)

    return () => {
      // @ts-expect-error Generic Narrowing
      game.events.client.removeListener(event, handler)
    }
  }, [game, event, handler])
}

export const useCommonEventListener = <T extends Event<CommonEvents>>(
  event: T,
  handler: EventHandler<T, CommonEvents>,
): void => {
  const game = useGame()

  useEffect(() => {
    // @ts-expect-error Generic Narrowing
    game.events.common.addListener(event, handler)

    return () => {
      // @ts-expect-error Generic Narrowing
      game.events.common.removeListener(event, handler)
    }
  }, [game, event, handler])
}
