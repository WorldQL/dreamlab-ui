import type { Game } from '@dreamlab.gg/core'
import { createRoot } from 'https://esm.sh/react-dom@18.2.0/client'
import type { ReactNode } from 'https://esm.sh/react@18.2.0'
import { GameContext } from '~/react/context.tsx'

export const renderUI = (game: Game<false>, ui: ReactNode) => {
  const container = document.createElement('div')
  game.client.ui.add(container)

  const root = createRoot(container)
  root.render(<GameContext.Provider value={game}>{ui}</GameContext.Provider>)
}
