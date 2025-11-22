import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'DG-LAB 开源文档',
  description: 'DG-LAB 协议与开放接口的简明指南',
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
      },
      {
        text: '更新记录',
        items: [
          { text: '更新日志', link: '/changelog' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/DG-LAB' }
    ]
  }
})
