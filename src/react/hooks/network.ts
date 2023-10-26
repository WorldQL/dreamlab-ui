import type {
  MessageListenerClient,
  NetClient,
} from '@dreamlab.gg/core/network'
import { useEffect, useMemo } from 'https://esm.sh/react@18.2.0'
import { useGame } from './useGame.ts'

export const useNetwork = (): NetClient | undefined => {
  const game = useGame()
  return useMemo(() => game.client.network, [game.client.network])
}

export const useCustomMessageListener = (
  channel: string,
  listener: MessageListenerClient,
) => {
  const network = useNetwork()

  useEffect(() => {
    if (!network) return
    network.addCustomMessageListener(channel, listener)

    return () => {
      network.removeCustomMessageListener(channel, listener)
    }
  }, [network, channel, listener])
}
