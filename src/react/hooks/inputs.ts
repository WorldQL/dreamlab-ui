import type { InputCode } from '@dreamlab.gg/core/input'
import { useCallback, useEffect } from 'https://esm.sh/react@18.2.0'
import type { LiteralUnion } from 'type-fest'
import { useGame } from './useGame.ts'

type KeyOrInput = LiteralUnion<InputCode, string>
export type InputHandler = (pressed: boolean) => void
export type InputPressedHandler = () => void

/**
 * Trigger a callback when an input is pressed / unpressed
 *
 * @param input - Key Code or Mapped Input
 * @param handler - Callback function
 */
export const useInput = (
  input: KeyOrInput,
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

/**
 * Trigger a callback *only* when an input is **pressed**
 *
 * @param input - Key Code or Mapped Input
 * @param handler - Callback function
 */
export const useInputPressed = (
  input: KeyOrInput,
  handler: () => void,
): void => {
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
