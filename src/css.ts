import { resolve } from '@dreamlab.gg/core/sdk'

export const css = (root: ShadowRoot, url: string): void => {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = resolve(url)

  root.append(link)
}
