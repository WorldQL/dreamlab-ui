import type { Camera } from '@dreamlab.gg/core/entities'
import { useGame } from './useGame.ts'

export const useCamera = (): Camera => {
  const game = useGame()
  return game.client.render.camera
}
