import type { Game } from '@dreamlab.gg/core'
import { createRoot } from 'https://esm.sh/react-dom@18.2.0/client'
import type { ReactNode } from 'https://esm.sh/react@18.2.0'
import { GameContext } from '~/react/context.ts'

/**
 * Render a React tree as Dreamlab UI
 *
 * @param game - Game client
 * @param ui - React tree to render
 * @param container - Container to mount in, defaults to the parent of the game canvas
 * @returns Cleanup function, unmounts React tree and removes from the UI system
 */
export const renderUI = (
  game: Game<false>,
  ui: ReactNode,
  container?: HTMLDivElement,
): (() => void) => {
  const div = container ?? document.createElement('div')
  game.client.ui.add(div)

  const root = createRoot(div)
  root.render(<GameContext.Provider value={game}>{ui}</GameContext.Provider>)

  return () => {
    game.client.ui.remove(div)
    root.unmount()
  }
}
