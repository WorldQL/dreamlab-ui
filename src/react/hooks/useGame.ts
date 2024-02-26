import type { Game } from '@dreamlab.gg/core'
import { useContext } from 'https://esm.sh/react@18.2.0'
import { GameContext } from '~/react/context.ts'

/**
 * Get a reference to the current game instance
 *
 * Requires that you use `renderUI()` to render your React tree
 *
 * @returns Game instance
 */
export const useGame = (): Game<false> => {
  const game = useContext(GameContext)
  if (!game) {
    throw new Error(
      'you must use the renderUI() function from @dreamlab.gg/ui/react',
    )
  }

  return game
}
