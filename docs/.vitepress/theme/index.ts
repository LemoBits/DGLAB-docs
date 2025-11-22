import type { EnhanceAppContext } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import 'katex/dist/katex.min.css'
import './mermaid.css'

export default {
  extends: DefaultTheme,
  enhanceApp: (ctx: EnhanceAppContext) => {
    DefaultTheme.enhanceApp?.(ctx)

    if (typeof window === 'undefined') return

    const renderMermaid = async () => {
      const mermaid = (await import('mermaid')).default
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'loose'
      })

      const blocks = Array.from(document.querySelectorAll<HTMLElement>('.vp-mermaid'))
      await Promise.all(
        blocks.map(async (block, index) => {
          const code = block.textContent?.trim()
          if (!code) return
          try {
            const { svg } = await mermaid.render(`mermaid-${index}-${Date.now()}`, code)
            const wrapper = document.createElement('div')
            wrapper.classList.add('mermaid', 'is-rendered')
            wrapper.innerHTML = svg
            block.replaceWith(wrapper)
          } catch (err) {
            console.error(err)
          }
        })
      )
    }

    const queueRender = () => {
      // Run after DOM updates to ensure Mermaid finds the blocks.
      requestAnimationFrame(() => {
        renderMermaid().catch((err) => console.error(err))
      })
    }

    ctx.router.onAfterRouteChanged = queueRender
    queueRender()
  }
}
