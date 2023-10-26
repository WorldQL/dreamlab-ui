import type { KeyCode } from '@dreamlab.gg/core/input'
import { useCallback, useEffect } from 'https://esm.sh/react@18.2.0'
import type { LiteralUnion } from 'type-fest'
import { useGame } from './useGame.ts'

type Input = LiteralUnion<KeyCode, string>
export type InputHandler = (pressed: boolean) => void
export type InputPressedHandler = () => void

export const useInput = (
  input: Input,
  handler: (pressed: boolean) => void,
): void => {
  const game = useGame()

  useEffect(() => {
    game.client.inputs.addListener(input, handler)

    return () => {
      game.client.inputs.removeListener(input, handler)
    }
  }, [game, input, handler])
}

export const useInputPressed = (input: Input, handler: () => void): void => {
  const game = useGame()

  const fn = useCallback(
    (pressed: boolean) => {
      if (pressed) handler()
    },
    [handler],
  )

  useEffect(() => {
    game.client.inputs.addListener(input, fn)

    return () => {
      game.client.inputs.removeListener(input, fn)
    }
  }, [game, input, fn])
}
