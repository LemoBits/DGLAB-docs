# SOCKET 控制-控制端开源（V3）

功能仅支持郊狼脉冲主机 3.0。

## 说明

SOCKET 控制功能：DG-LAB APP 通过 Socket 服务连接到外部第三方控制端，第三方通过 SOCKET 向 APP 发送指令使郊狼输出脉冲。可在局域网或公网控制，方案为 N(APP)-SOCKET-N(第三方) 的 N 对 N 模式，便于多人使用。

## 项目

- 前端控制：逻辑控制、数据展示、行为操作、指令生成等  
- SOCKET 后端：关系绑定、数据转发等  
- 目录：
  - `/socket/BackEnd(Node)` -> 后端代码，部署见 `/socket/BackEnd(Node)/document.txt`
  - `/socket/FrontEnd(Html+Css+Js)` -> 前端代码，部署见 `/socket/FrontEnd(Html+Css+Js)/document.txt`

![项目结构](/image/socket_project.png)

### 两端连接流程

![两端连接流程](/image/socket_bind.png)

```mermaid
flowchart LR
  A[第三方终端] -- 建立WS -> S[SOCKET服务]
  B[DG-LAB APP] -- 建立WS -> S
  S -- 返回各自唯一ID -> A
  S -- 返回各自唯一ID -> B
  B -- 发送bind(clientId,targetId,DGLAB) -> S
  S -- 建立ID绑定 -> A
  S -- 建立ID绑定 -> B
  A & B -- heartbeat/msg/break/error --> S
```

## APP 收信协议（总则）

1. 所有消息均为 json，格式：`{"type":"xxx","clientId":"xxx","targetId":"xxx","message":"xxx"}`
2. type 指令：
   1. heartbeat -> 心跳包数据
   2. bind -> ID 关系绑定
   3. msg -> 波形下发/强度变化/队列清空等
   4. break -> 连接断开
   5. error -> 服务错误
3. clientId: 第三方终端 ID
4. targetId: APP ID
5. message: 消息/指令
6. json 字符最大长度 1950，超出将被丢弃
7. 除 SOCKET 返回 ID 时 targetId 可空外，其余指令必须且仅包含 type,clientId,targetId,message 4 个 key，value 不可空
8. SOCKET 生成的 ID 必须唯一，推荐长度 32 位(uuidV4)

## 关系绑定

1. SOCKET 通道与终端绑定：终端或 APP 连接后生成唯一 ID，绑定 websocket 对象存储 Map，返回 ID  
   - 返回：`{"type":"bind","clientId":"xxxx-...","targetId":"","message":"targetId"}`  
   - 终端/APP 收到 type=bind,message=targetID 即确认 clientId 为自身 ID，本地保存。
2. 两边终端关系绑定：APP 将两边 ID 发送给 SOCKET，服务绑定存储 Map  
   - 上行：`{"type":"bind","clientId":"终端ID","targetId":"APPID","message":"DGLAB"}`
3. 绑定结果下发双方  
   - 下发：`{"type":"bind","clientId":"终端ID","targetId":"APPID","message":"200"}`（或其他错误码）

## 接收强度数据（APP→第三方）

APP 通道强度或上限变化时同步：  
`{"type":"msg","clientId":"APPID","targetId":"终端ID","message":"strength-x+x+x+x"}`

- 解释：strength-A通道强度+B通道强度+A强度上限+B强度上限
- 值范围 0~200
- 示例：`strength-11+7+100+35` 表示 A=11，B=7，A 上限=100，B 上限=35

## 强度操作（第三方→APP）

发送：`{"type":"msg","clientId":"终端ID","targetId":"APPID","message":"strength-x+x+x"}`

- 通道: 1-A；2-B  
- 强度变化模式: 0-减少；1-增加；2-指定数值  
- 数值范围(0~200)
- 示例：  
  1. A 通道强度+5 -> `strength-1+1+5`  
  2. B 通道强度归零 -> `strength-2+2+0`  
  3. B 通道强度-20 -> `strength-2+0+20`  
  4. A 通道强度指定为35 -> `strength-1+2+35`

- Tips 指令必须严格按照协议编辑，非法指令会在 APP 端丢弃。

## 波形操作（第三方→APP）

发送：`{"type":"msg","clientId":"终端ID","targetId":"APPID","message":"pulse-x:[\"xxxxxxxxxxxxxxxx\",...]"}`  
SOCKET 转发后 APP 输出波形。

- 通道: A/B
- 数据数组最大长度 100（最多 10s 数据），超出丢弃
- 单条波形数据必须是 8 字节 HEX（详见 [V3 蓝牙协议](/coyote-v3)）

- Tips 每条波形数据代表 100ms；若每次发送 10 条即 1s，网络有延时，发送间隔建议略小于数据时长(<1s)。  
- Tips APP 波形队列最大 500 条（50s），超出部分丢弃。

## 清空波形队列

发送：`{"type":"msg","clientId":"终端ID","targetId":"APPID","message":"clear-x"}`  
通道: 1-A；2-B。

- Tips 清空后设定时间间隔再下发新波形，避免网络延迟导致清空晚于数据而丢失。

## APP 反馈

APP 点击不同形状按钮会上发反馈：  
`{"type":"msg","clientId":"APPID","targetId":"终端ID","message":"feedback-x"}`

- index: A 通道 5 个按钮角标 0~4；B 通道 5 个按钮角标 5~9  
- Tips 可自定义不同形状代表的反馈含义。

## 前端协议（仅当使用官方后端代码时，重要差异）

> 注意：前端协议的消息不能直接发送到 app，会导致无法解析。App 实际收到的消息请以 APP 收信协议为准。

1. **强度操作**  
   - type : 1 减少; 2 增加; 3 归零; 4 指定为某值  
   - strength: 变化量/指定值（type 为 1/2 时强制为 1）  
   - message: 'set channel'  
   - channel: 1-A；2-B  
   - 示例：A 通道强度减 5 -> `{type:1,strength:5,message:'set channel',channel:1,...}`

2. **波形数据**  
   - 后端默认发送间隔 200ms，可修改 timeSpace  
   - type: clientMsg  
   - message / message2: A/B 通道波形数据（16 进制 HEX 数组 json）  
   - time1 / time2: A/B 持续发送时长

3. **清空波形队列**  
   - type: msg  
   - message: clear-1 清 A；clear-2 清 B

## 终端二维码规范

二维码内容：`https://www.dungeon-lab.com/app-download.php#DGLAB-SOCKET#xxxxxxxxx`

要求：

1. 必含 APP 官网下载地址  
2. 必含标签：DGLAB-SOCKET  
3. 必含 SOCKET 服务地址且含终端 ID，服务地址与 ID 之间不得有其他内容  
   - 正确：`wss://ws.dungeon-lab.cn/xxxx-...`  
   - 错误：`wss://ws.dungeon-lab.cn/xxxx/xxxx-...`
4. 仅有两个 `#` 分割上述三部分，否则无法识别
5. 不可添加额外内容，否则可能无法识别

## 错误码

- 200 - 成功
- 209 - 对方客户端已断开
- 210 - 二维码中没有有效的 clientID
- 211 - socket 连接上了，但服务器迟迟不下发 app 端的 id 来绑定
- 400 - 此 id 已被其他客户端绑定关系
- 401 - 要绑定的目标客户端不存在
- 402 - 收信方和寄信方不是绑定关系
- 403 - 发送的内容不是标准 json 对象
- 404 - 未找到收信人（离线）
- 405 - 下发的 message 长度大于 1950
- 500 - 服务器内部异常

> 如有问题，请咨询 service@dungeon-lab.com 或发起 issues
