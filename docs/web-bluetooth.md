# 郊狼 Web 蓝牙直连测试

便于在浏览器直接验证蓝牙连通性与双通道波形播放。

## 在线示例

直接在页面内加载 `bluetooth.html` 进行测试：

<iframe src="/web-bluetooth/bluetooth.html" allow="bluetooth" style="width: 100%; min-height: 900px; border: 1px solid #e5e7eb; border-radius: 8px;"></iframe>

## 快速开始

- 仅支持 Chrome 浏览器。
- 本仓库已内置 `docs/public/web-bluetooth/bluetooth.html`，也可通过上方示例直接使用。
- 确保设备蓝牙已开启，点击“扫描郊狼设备”并选择设备。
- 当前支持双通道同时播放波形，可在此基础上继续扩展。

## 建议

- 调试时保持与 V3 协议一致的 100ms 写入节奏，便于迁移到实际应用。
- 若需要更复杂的 UI/交互，可将示例作为最小可运行样板再扩展组件。
