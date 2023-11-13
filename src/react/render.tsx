import type { Game } from '@dreamlab.gg/core'
import { createRoot } from 'https://esm.sh/react-dom@18.2.0/client'
import { StrictMode } from 'https://esm.sh/react@18.2.0'
import type { ReactNode } from 'https://esm.sh/react@18.2.0'
import { GameContext } from '~/react/context.ts'

interface RenderOptions {
  /**
   * Container to mount in, defaults to the parent of the game canvas
   */
  container?: HTMLDivElement

  /**
   * Enable React Strict Mode, defaults to `true`
   */
  strict?: boolean
}

/**
 * Render a React tree as Dreamlab UI
 *
 * @param game - Game client
 * @param ui - React tree to render
 * @param options - Additional options
 * @returns Cleanup function, unmounts React tree and removes from the UI system
 */
export const renderUI = (
  game: Game<false>,
  ui: ReactNode,
  options: RenderOptions = {},
): { readonly container: HTMLDivElement; unmount(this: void): void } => {
  const div = options.container ?? document.createElement('div')
  game.client.ui.add(div)

  const strict = options.strict ?? true
  const root = createRoot(div)

  const tree = <GameContext.Provider value={game}>{ui}</GameContext.Provider>
  root.render(strict ? <StrictMode>{tree}</StrictMode> : tree)

  return {
    get container(): HTMLDivElement {
      return div
    },

    unmount: () => {
      game.client.ui.remove(div)
      root.unmount()
    },
  }
}
