import { katex } from '@mdit/plugin-katex'
import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'DG-LAB 开源文档',
  description: 'DG-LAB 协议与开放接口的简明指南',
  markdown: {
    config: (md) => {
      md.use(katex)
      const fence = md.renderer.rules.fence?.bind(md.renderer.rules)
      md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
        const token = tokens[idx]
        const info = token.info.trim()
        const content = token.content.trim()
        const firstLine = content.split(/\n/)[0].trim()
        const likelyMermaid =
          info === 'mermaid' ||
          firstLine === 'sequenceDiagram' ||
          firstLine.startsWith('graph ') ||
          firstLine === 'gantt'

        if (!likelyMermaid) {
          return fence ? fence(tokens, idx, options, env, slf) : slf.renderToken(tokens, idx, options)
        }

        const escaped = md.utils.escapeHtml(content)
        return `<pre class="vp-mermaid">${escaped}</pre>`
      }
    }
  },
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '郊狼 V3', link: '/coyote-v3' },
      { text: '郊狼 V2', link: '/coyote-v2' },
      { text: '波形', link: '/waveform' },
      { text: 'Socket', link: '/socket-control' },
      { text: '爪印', link: '/pawprints-voltage' }
    ],
    sidebar: [
      {
        text: '协议',
        items: [
          { text: '郊狼 V3 蓝牙协议', link: '/coyote-v3' },
          { text: '郊狼 V2 蓝牙协议', link: '/coyote-v2' }
        ]
      },
      {
        text: '波形与示例',
        items: [
          { text: '波形概念与转换', link: '/waveform' }
        ]
      },
      {
        text: '联动控制',
        items: [
          { text: 'SOCKET 控制', link: '/socket-control' },
          { text: 'Web 蓝牙直连', link: '/web-bluetooth' }
        ]
      },
      {
        text: '硬件扩展',
        items: [
          { text: '爪印外部电压检测', link: '/pawprints-voltage' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/DG-LAB' }
    ]
  }
})
