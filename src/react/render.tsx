import type { Game } from '@dreamlab.gg/core'
import { createRoot } from 'https://esm.sh/v136/react-dom@18.2.0/client'
import { StrictMode } from 'https://esm.sh/v136/react@18.2.0'
import type { ReactNode } from 'https://esm.sh/v136/react@18.2.0'
import { GameContext } from '~/react/context.ts'

interface RenderOptions {
  /**
   * Container to mount in, will create one if unset
   */
  container?: HTMLDivElement

  /**
   * Enable React Strict Mode, defaults to `true`
   */
  strict?: boolean

  /**
   * Make the UI div interactable on mount, defaults to `false`
   */
  interactable?: boolean
}

interface UI {
  /**
   * UI Shadow Root
   */
  readonly root: ShadowRoot

  /**
   * React Root
   */
  readonly container: HTMLDivElement

  /**
   * Unmount the React tree from the UI
   */
  unmount(this: void): void
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
): UI => {
  const interactable = options.interactable ?? false
  const dom = game.client.ui.create(interactable)

  const div = options.container ?? document.createElement('div')
  dom.append(div)

  const strict = options.strict ?? true
  const root = createRoot(div)

  const tree = <GameContext.Provider value={game}>{ui}</GameContext.Provider>
  root.render(strict ? <StrictMode>{tree}</StrictMode> : tree)

  return Object.freeze({
    get root(): ShadowRoot {
      return dom
    },

    get container(): HTMLDivElement {
      return div
    },

    unmount: () => {
      game.client.ui.remove(dom)
      root.unmount()
    },
  })
}
