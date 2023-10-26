import type { Game } from '@dreamlab.gg/core'
import { createContext } from 'https://esm.sh/react@18.2.0'

export const GameContext = createContext<Game<false> | null>(null)
