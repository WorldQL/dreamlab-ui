import type { Game } from '@dreamlab.gg/core'
import { createRoot } from 'https://esm.sh/react-dom@18.2.0/client'
import type { ReactNode } from 'https://esm.sh/react@18.2.0'
import { GameContext } from '~/react/context.ts'

export const renderUI = (
  game: Game<false>,
  ui: ReactNode,
  container?: HTMLDivElement,
) => {
  const div = container ?? document.createElement('div')
  game.client.ui.add(div)

  const root = createRoot(div)
  root.render(<GameContext.Provider value={game}>{ui}</GameContext.Provider>)
}
