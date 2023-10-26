import { isPlayer } from '@dreamlab.gg/core/entities'
import type { Player } from '@dreamlab.gg/core/entities'
import { useGame } from './useGame.ts'

export const usePlayer = (): Player | undefined => {
  const game = useGame()
  return game.entities.find(isPlayer)
}
