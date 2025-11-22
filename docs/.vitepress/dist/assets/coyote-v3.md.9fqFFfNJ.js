import{_ as n,c as s,o as e,ah as t}from"./chunks/framework.BhMyqiMA.js";const g=JSON.parse('{"title":"郊狼情趣脉冲主机 V3 蓝牙协议","description":"","frontmatter":{"title":"郊狼情趣脉冲主机 V3 蓝牙协议","outline":[2,3,4]},"headers":[],"relativePath":"coyote-v3.md","filePath":"coyote-v3.md"}'),p={name:"coyote-v3.md"};function l(i,a,r,c,h,b){return e(),s("div",null,[...a[0]||(a[0]=[t(`<h1 id="郊狼情趣脉冲主机-v3-蓝牙协议" tabindex="-1">郊狼情趣脉冲主机 V3 蓝牙协议 <a class="header-anchor" href="#郊狼情趣脉冲主机-v3-蓝牙协议" aria-label="Permalink to “郊狼情趣脉冲主机 V3 蓝牙协议”">​</a></h1><h2 id="核心概览" tabindex="-1">核心概览 <a class="header-anchor" href="#核心概览" aria-label="Permalink to “核心概览”">​</a></h2><ul><li>双通道（A/B）独立脉冲模块；所有数据通过 0x180C 服务的 0x150A/0x150B 特性交互。</li><li>与 V2 不同：无需大小端转换；B0 一条指令同时携带两通道强度与 4 组波形。</li><li>关键变量：通道强度、通道强度软上限、波形频率、波形强度、频率平衡参数 1、频率平衡参数 2。</li></ul><h2 id="蓝牙特性" tabindex="-1">蓝牙特性 <a class="header-anchor" href="#蓝牙特性" aria-label="Permalink to “蓝牙特性”">​</a></h2><table tabindex="0"><thead><tr><th style="text-align:center;">服务 UUID</th><th style="text-align:center;">特性 UUID</th><th style="text-align:center;">属性</th><th style="text-align:center;">名称</th><th style="text-align:center;">大小(BYTE)</th><th style="text-align:left;">说明</th></tr></thead><tbody><tr><td style="text-align:center;">0x180C</td><td style="text-align:center;">0x150A</td><td style="text-align:center;">写</td><td style="text-align:center;">WRITE</td><td style="text-align:center;">最长 20 字节</td><td style="text-align:left;">所有指令输入</td></tr><tr><td style="text-align:center;">0x180C</td><td style="text-align:center;">0x150B</td><td style="text-align:center;">通知</td><td style="text-align:center;">NOTIFY</td><td style="text-align:center;">最长 20 字节</td><td style="text-align:left;">所有回应消息</td></tr><tr><td style="text-align:center;">0x180A</td><td style="text-align:center;">0x1500</td><td style="text-align:center;">读/通知</td><td style="text-align:center;">READ/NOTIFY</td><td style="text-align:center;">1 字节</td><td style="text-align:left;">电量信息</td></tr></tbody></table><p>基础 UUID：<code>0000xxxx-0000-1000-8000-00805f9b34fb</code>（将 xxxx 替换为服务/特性 UUID）</p><h2 id="蓝牙名称" tabindex="-1">蓝牙名称 <a class="header-anchor" href="#蓝牙名称" aria-label="Permalink to “蓝牙名称”">​</a></h2><ul><li>脉冲主机 3.0 : 47L121000</li><li>无线传感器 : 47L120100</li></ul><h2 id="基本原理" tabindex="-1">基本原理 <a class="header-anchor" href="#基本原理" aria-label="Permalink to “基本原理”">​</a></h2><p>郊狼内置了两组独立的脉冲生成模块，分别对应 A，B 两个通道。每组脉冲生成模块由通道强度和通道波形数据两部分构成。通过通道强度，通道强度软上限，波形频率，波形强度，频率平衡参数 1，频率平衡参数 2 六个变量来控制脉冲生成模块。</p><h2 id="蓝牙指令" tabindex="-1">蓝牙指令 <a class="header-anchor" href="#蓝牙指令" aria-label="Permalink to “蓝牙指令”">​</a></h2><p>与 V2 协议不同的是，数据无需进行大小端转换。</p><h3 id="b0-指令-强度-波形-20-字节-每-100ms-写入" tabindex="-1">B0 指令（强度 + 波形，20 字节，每 100ms 写入） <a class="header-anchor" href="#b0-指令-强度-波形-20-字节-每-100ms-写入" aria-label="Permalink to “B0 指令（强度 + 波形，20 字节，每 100ms 写入）”">​</a></h3><p><code>0xB0(1byte指令HEAD)+序列号(4bits)+强度值解读方式(4bits)+A通道强度设定值(1byte)+B通道强度设定值(1byte)+A通道波形频率4条(4bytes)+A通道波形强度4条(4bytes)+B通道波形频率4条(4bytes)+B通道波形强度4条(4bytes)</code></p><h4 id="序列号" tabindex="-1">序列号 <a class="header-anchor" href="#序列号" aria-label="Permalink to “序列号”">​</a></h4><p>序列号范围(0b0000 ~ 0b1111)。如果输入的数据中修改了脉冲主机的通道强度，设置序列号 &gt;0，脉冲主机会通过 B1 回应消息以相同的序列号将修改后的通道强度从特性 0x150B 返回，如果不需要脉冲主机反馈通道强度，则序列号设置 0b0000 即可。为避免问题，当通过 B0 指令修改通道强度且序列号不为 0 时，建议等待 150B 返回 B1 且为相同序列号的信息后，再对通道强度进行修改。</p><h4 id="强度值解读方式-4bit-高两位控制-a-低两位控制-b" tabindex="-1">强度值解读方式（4bit，高两位控制 A，低两位控制 B） <a class="header-anchor" href="#强度值解读方式-4bit-高两位控制-a-低两位控制-b" aria-label="Permalink to “强度值解读方式（4bit，高两位控制 A，低两位控制 B）”">​</a></h4><ul><li>0b00 -&gt; 对应通道强度不做改变（设定值无效）</li><li>0b01 -&gt; 相对增加</li><li>0b10 -&gt; 相对减少</li><li>0b11 -&gt; 绝对变化</li></ul><blockquote><p>e.g<br> 假设当前脉冲主机的 A 通道强度为 10，B 通道强度为 10。</p><ol><li>强度值解读方式=0b0000，A 通道强度设定值=5，B 通道强度设置定=8，B0 指令输入后，A=10，B=10</li><li>强度值解读方式=0b0100，A 设定值=5，B 设定值=8，输入后 A=15，B=10</li><li>强度值解读方式=0b0010，A 设定值=5，B 设定值=8，输入后 A=10，B=2</li><li>强度值解读方式=0b0011，A 设定值=5，B 设定值=8，输入后 A=10，B=8</li><li>强度值解读方式=0b0110，A 设定值=5，B 设定值=8，输入后 A=15，B=2</li><li>强度值解读方式=0b1101，A 设定值=5，B 设定值=8，输入后 A=5，B=18</li></ol></blockquote><h4 id="通道强度设定值" tabindex="-1">通道强度设定值 <a class="header-anchor" href="#通道强度设定值" aria-label="Permalink to “通道强度设定值”">​</a></h4><p>长度 1 字节，值有效范围(0~200)，输入范围外的值均以 0 处理。每通道绝对范围也是(0~200)。</p><blockquote><p>e.g<br> 假设当前 A 通道强度为 10</p><ol><li>强度值解读方式=0b0100，设定值=195 -&gt; A=200</li><li>强度值解读方式=0b1000，设定值=20 -&gt; A=0</li><li>强度值解读方式=0b0100，设定值=201 -&gt; A=10</li><li>强度值解读方式=0b1100，设定值=201 -&gt; A=0</li></ol></blockquote><h4 id="通道波形频率-通道波形强度" tabindex="-1">通道波形频率 / 通道波形强度 <a class="header-anchor" href="#通道波形频率-通道波形强度" aria-label="Permalink to “通道波形频率 / 通道波形强度”">​</a></h4><ul><li>波形频率长度 1 byte，值范围(10~240)。</li><li>波形强度 1 byte，值范围(0~100)。</li><li>每 100ms 发送两通道各 4 组频率与强度，1 组代表 25ms。若某通道输入值不在有效范围，则放弃该通道全部 4 组数据。</li></ul><p>算法参考（将 10~1000 映射为 10~240）：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>输入值范围(10 ~ 1000)</span></span>
<span class="line"><span>波形频率 = when(输入值){</span></span>
<span class="line"><span>    in 10..100 -&gt; {</span></span>
<span class="line"><span>        输入值</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    in 101..600 -&gt; {</span></span>
<span class="line"><span>        (输入值 - 100)/5 + 100</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    in 601..1000 -&gt; {</span></span>
<span class="line"><span>        (输入值 - 600)/10 + 200</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    else -&gt; {</span></span>
<span class="line"><span>        10</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><blockquote><p>e.g</p><ol><li>波形频率 4 条={10,10,20,30}，波形强度={0,5,10,50} -&gt; 正常输出</li><li>波形频率 4 条={10,10,20,30}，波形强度={0,5,10,101} -&gt; 放弃全部 4 组数据，不输出</li></ol></blockquote><ul><li>Tips 如果当前只想向单个通道输出波形，则将另一个通道的数据中输入至少一个非有效数据(一条大于 100 的波形强度值)。</li></ul><h3 id="bf-指令-软上限-平衡参数-7-字节" tabindex="-1">BF 指令（软上限 + 平衡参数，7 字节） <a class="header-anchor" href="#bf-指令-软上限-平衡参数-7-字节" aria-label="Permalink to “BF 指令（软上限 + 平衡参数，7 字节）”">​</a></h3><blockquote><p>🚨 BF 指令写入之后会直接生效，没有返回值，所以每次重连设备之后都必须重新写入 BF 指令设置软上限，防止出现意外的软上限值。🚨</p></blockquote><p><code>0xBF(1byte指令HEAD)+AB两通道强度软上限(2bytes)+AB两通道波形频率平衡参数(2bytes)+AB两通道波形强度平衡参数(2bytes)</code></p><h4 id="通道强度软上限" tabindex="-1">通道强度软上限 <a class="header-anchor" href="#通道强度软上限" aria-label="Permalink to “通道强度软上限”">​</a></h4><p>限制通道强度最大值，断电保存，值范围(0~200)，输入范围外的值则不会修改。<br> 例：设置 AB 通道软上限为 150/30，则无论拨轮或 B0 如何修改，A 范围 0~150、B 范围 0~30，强度不会超过软上限。</p><h4 id="频率平衡参数-1" tabindex="-1">频率平衡参数 1 <a class="header-anchor" href="#频率平衡参数-1" aria-label="Permalink to “频率平衡参数 1”">​</a></h4><p>调整波形高低频体感，断电保存，值范围(0~255)。值越大，低频波形冲击感越强。</p><h4 id="频率平衡参数-2" tabindex="-1">频率平衡参数 2 <a class="header-anchor" href="#频率平衡参数-2" aria-label="Permalink to “频率平衡参数 2”">​</a></h4><p>调整波形脉冲宽度，断电保存，值范围(0~255)。值越大，低频波形刺激越强。</p><h2 id="蓝牙回应消息" tabindex="-1">蓝牙回应消息 <a class="header-anchor" href="#蓝牙回应消息" aria-label="Permalink to “蓝牙回应消息”">​</a></h2><p>所有回调通过 0x180C-&gt;0x150B 的 Notify 返回，连接后需订阅该特性。</p><h3 id="b1-消息" tabindex="-1">B1 消息 <a class="header-anchor" href="#b1-消息" aria-label="Permalink to “B1 消息”">​</a></h3><p>当强度变化时立即返回当前强度值。若由 B0 导致，序列号与指令一致，否则为 0。</p><p><code>0xB1(1byte指令HEAD)+序列号(1byte)+A通道当前实际强度(1byte)+B通道当前实际强度(1byte)</code></p><h3 id="be-消息-已弃用" tabindex="-1">BE 消息（已弃用） <a class="header-anchor" href="#be-消息-已弃用" aria-label="Permalink to “BE 消息（已弃用）”">​</a></h3><h2 id="更多例子" tabindex="-1">更多例子 <a class="header-anchor" href="#更多例子" aria-label="Permalink to “更多例子”">​</a></h2><p>数据组成：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>指令HEAD + 序列号 + 强度值解读方式 +</span></span>
<span class="line"><span>A通道强度设定值 + B通道强度设定值 +</span></span>
<span class="line"><span>A通道波形频率{x,x,x,x} + A通道波形强度{x,x,x,x} +</span></span>
<span class="line"><span>B通道波形频率{x,x,x,x} + B通道波形强度{x,x,x,x}</span></span></code></pre></div><p>No.1 不修改通道强度，A 通道连续输出波形:<br> 1-&gt; 0xB0+0b0000+0b0000+0+0+{10,10,10,10}+{0,10,20,30}+{0,0,0,0}+{0,0,0,101}<br> (HEX:0xB00000000A0A0A0A000A141E0000000000000065)<br> 2-&gt; 0xB0+0b0000+0b0000+0+0+{15,15,15,15}+{40,50,60,70}+{0,0,0,0}+{0,0,0,101}<br> (HEX:0xB00000000F0F0F0F28323C460000000000000065)<br> 3-&gt; 0xB0+0b0000+0b0000+0+0+{30,30,30,30}+{80,90,100,100}+{0,0,0,0}+{0,0,0,101}<br> (HEX:0xB00000001E1E1E1E505A64640000000000000065)<br> 4-&gt; 0xB0+0b0000+0b0000+0+0+{40,60,80,100}+{100,90,90,90}+{0,0,0,0}+{0,0,0,101}<br> (HEX:0xB0000000283C5064645A5A5A0000000000000065)<br> ...</p><p>No.2 脉冲主机当前 A 通道强度=10，A 通道连续输出波形:<br> 1-&gt; 0xB0+0b0000+0b0100+5+0+{10,10,10,10}+{0,10,20,30}+{0,0,0,0}+{0,0,0,101}<br> (HEX:0xB00405000A0A0A0A000A141E0000000000000065)<br> 2-&gt; 0xB0+0b0000+0b0000+0+0+{15,15,15,15}+{40,50,60,70}+{0,0,0,0}+{0,0,0,101}<br> (HEX:0xB00000000F0F0F0F28323C460000000000000065)<br> 3-&gt; 0xB0+0b0000+0b0000+0+0+{30,30,30,30}+{80,90,100,100}+{0,0,0,0}+{0,0,0,101}<br> (HEX:0xB00000001E1E1E1E505A64640000000000000065)<br> 4-&gt; 0xB0+0b0001+0b0100+10+0+{40,60,80,100}+{100,90,90,90}+{0,0,0,0}+{0,0,0,101}<br> (HEX:0xB0140A00283C5064645A5A5A0000000000000065)<br> ...<br> 1 中设置 A 通道强度+5，设置后 A=15，但不会返回修改后的强度（序列号=0）。<br> 4 中设置 A 通道强度+10，设置后 A=25，并通过 150B 返回 A=25，序列号=1。</p><p>No.3 脉冲主机当前 A 通道强度=10，A 通道连续输出波形:<br> 1-&gt; 0xB0+0b0000+0b0000+0+0+{10,10,10,10}+{0,10,20,30}+{0,0,0,0}+{0,0,0,101}<br> (HEX:0xB00000000A0A0A0A000A141E0000000000000065)<br> 2-&gt; 0xB0+0b0000+0b0000+0+0+{15,15,15,15}+{40,50,60,70}+{0,0,0,0}+{0,0,0,101}<br> (HEX:0xB00000000F0F0F0F28323C460000000000000065)<br> 3-&gt; 向上拨动一次 A 通道拨轮后放开<br> 4-&gt; 0xB0+0b0000+0b0000+0+0+{30,30,30,30}+{80,90,100,100}+{0,0,0,0}+{0,0,0,101}<br> (HEX:0xB00000001E1E1E1E505A64640000000000000065)<br> 5-&gt; 0xB0+0b0000+0b0000+0+0+{40,60,80,100}+{100,90,90,90}+{0,0,0,0}+{0,0,0,101}<br> (HEX:0xB0000000283C5064645A5A5A0000000000000065)<br> ...<br> 3 中拨轮后 A 强度+1，并返回 A=11，序列号=0。</p><p>No.4 不修改通道强度，AB 两通道均连续输出波形:<br> 1-&gt; 0xB0+0b0000+0b0000+0+0+{10,10,10,10}+{0,10,20,30}+{10,10,10,10}+{0,0,0,0}<br> (HEX:0xB00000000A0A0A0A000A141E0A0A0A0A00000000)<br> 2-&gt; 0xB0+0b0000+0b0000+0+0+{15,15,15,15}+{40,50,60,70}+{10,10,10,10}+{10,10,10,10}<br> (HEX:0xB00000000F0F0F0F28323C460A0A0A0A0A0A0A0A)<br> 3-&gt; 0xB0+0b0000+0b0000+0+0+{30,30,30,30}+{80,90,100,100}+{10,10,10,10}+{0,0,0,10}<br> (HEX:0xB00000001E1E1E1E505A64640A0A0A0A0000000A)<br> 4-&gt; 0xB0+0b0000+0b0000+0+0+{40,60,80,100}+{0,90,90,90}+{10,10,10,10}+{0,0,0,10}<br> (HEX:0xB0000000283C5064005A5A5A0A0A0A0A0000000A)<br> ...</p><h3 id="序列号与强度输入示例代码-原文" tabindex="-1">序列号与强度输入示例代码（原文） <a class="header-anchor" href="#序列号与强度输入示例代码-原文" aria-label="Permalink to “序列号与强度输入示例代码（原文）”">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>isInputAllowed = true(当前是否允许输入强度)</span></span>
<span class="line"><span>accumulatedStrengthValueA = 0(A通道未写入的累计强度变化值)</span></span>
<span class="line"><span>deviceStrengthValueA = 0(脉冲主机当前A通道强度值)</span></span>
<span class="line"><span>orderNo = 0(序列号)</span></span>
<span class="line"><span>inputOrderNo = 0(B0写入的序列号)</span></span>
<span class="line"><span>strengthParsingMethod = 0b0000(强度值解读方式)</span></span>
<span class="line"><span>strengthSettingValueA = 0(A通道强度设定值)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>A通道强度相关数据处理函数</span></span>
<span class="line"><span>fun strengthDataProcessingA():Unit{</span></span>
<span class="line"><span>    if(isInputAllowed == true) {</span></span>
<span class="line"><span>         strengthParsingMethod = if(accumulatedStrengthValueA &gt; 0){</span></span>
<span class="line"><span>             0b0100</span></span>
<span class="line"><span>         }else if(accumulatedStrengthValueA &lt; 0){</span></span>
<span class="line"><span>             0b1000</span></span>
<span class="line"><span>         }else{</span></span>
<span class="line"><span>             0b0000</span></span>
<span class="line"><span>         }</span></span>
<span class="line"><span>         orderNo += 1</span></span>
<span class="line"><span>         inputOrderNo = orderNo</span></span>
<span class="line"><span>         isInputAllowed = false</span></span>
<span class="line"><span>         strengthSettingValueA = abs(accumulatedStrengthValueA)(取绝对值)</span></span>
<span class="line"><span>         accumulatedStrengthValueA = 0</span></span>
<span class="line"><span>     }else{</span></span>
<span class="line"><span>         orderNo = 0</span></span>
<span class="line"><span>         strengthParsingMethod = 0b0000</span></span>
<span class="line"><span>         strengthSettingValueA = 0</span></span>
<span class="line"><span>     }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>A通道强度回应消息处理函数</span></span>
<span class="line"><span>fun strengthDataCallback(returnOrderNo : Int,returnStrengthValueA : Int):Unit{</span></span>
<span class="line"><span>    //returnOrderNo 返回输入的序列号</span></span>
<span class="line"><span>    //returnStrengthValueA 返回脉冲主机当前A通道强度</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    deviceStrengthValueA = returnStrengthValueA</span></span>
<span class="line"><span>    if(returnOrderNo == inputNo){</span></span>
<span class="line"><span>         isInputAllowed = true</span></span>
<span class="line"><span>         strengthParsingMethod = 0b0000</span></span>
<span class="line"><span>         strengthSettingValueA = 0</span></span>
<span class="line"><span>         inputOrderNo = 0</span></span>
<span class="line"><span>     }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>A通道强度设置0</span></span>
<span class="line"><span>fun strengthZero():Unit{</span></span>
<span class="line"><span>    strengthParsingMethod = 0b1100</span></span>
<span class="line"><span>    strengthSettingValueA = 0</span></span>
<span class="line"><span>    orderNo = 1</span></span>
<span class="line"><span>    inputOrderNo = orderNo</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>时间顺序示例（序号不代表具体时刻）：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>1 -&gt; 按下A通道强度‘+’按钮</span></span>
<span class="line"><span>     accumulatedStrengthValueA += 1(值 = 1)</span></span>
<span class="line"><span>2 -&gt; (100ms周期)B0准备写入</span></span>
<span class="line"><span>     strengthDataProcessingA()</span></span>
<span class="line"><span>     BLE WRITE 150A(0xB0 + orderNo(0b0001) + strengthParsingMethod(0b0100) + strengthSettingValueA(1) + ......)</span></span>
<span class="line"><span>3 -&gt; (100ms周期)B0准备写入</span></span>
<span class="line"><span>     strengthDataProcessingA()</span></span>
<span class="line"><span>     BLE WRITE 150A(0xB0 + orderNo(0b0000) + strengthParsingMethod(0b0000) + strengthSettingValueA(1) + ......)</span></span>
<span class="line"><span>3 -&gt; 150B返回A通道强度值</span></span>
<span class="line"><span>     BLE NOTIFY 150B(0xB1 + returnOrderNo(1) + returnStrengthValueA(1) + ......)</span></span>
<span class="line"><span>     返回的序列号 = 1，返回的A通道强度 = 1</span></span>
<span class="line"><span>     strengthDataCallback(1,1)</span></span>
<span class="line"><span>4 -&gt; 按下A通道强度‘+’按钮</span></span>
<span class="line"><span>     accumulatedStrengthValueA += 1(值 = 1)</span></span>
<span class="line"><span>5 -&gt; 按下A通道强度‘+’按钮</span></span>
<span class="line"><span>     accumulatedStrengthValueA += 1(值 = 2)</span></span>
<span class="line"><span>6 -&gt; 按下A通道强度‘+’按钮</span></span>
<span class="line"><span>     accumulatedStrengthValueA += 1(值 = 3)</span></span>
<span class="line"><span>7 -&gt; (100ms周期)B0准备写入</span></span>
<span class="line"><span>     strengthDataProcessingA()</span></span>
<span class="line"><span>     BLE WRITE 150A(0xB0 + orderNo(0b0001) + strengthParsingMethod(0b0100) + strengthSettingValueA(3) + ......)</span></span>
<span class="line"><span>8 -&gt; 按下A通道强度‘+’按钮</span></span>
<span class="line"><span>     accumulatedStrengthValueA += 1(值 = 1)</span></span>
<span class="line"><span>9 -&gt; (100ms周期)B0准备写入</span></span>
<span class="line"><span>     strengthDataProcessingA()</span></span>
<span class="line"><span>     BLE WRITE 150A(0xB0 + orderNo(0b0000) + strengthParsingMethod(0b0000) + strengthSettingValueA(0) + ......)</span></span>
<span class="line"><span>10-&gt; 150B返回A通道强度值</span></span>
<span class="line"><span>     BLE NOTIFY 150B(0xB1 + returnOrderNo(1) + returnStrengthValueA(4) + ......)</span></span>
<span class="line"><span>     返回的序列号 = 1，返回的A通道强度 = 4</span></span>
<span class="line"><span>     strengthDataCallback(1,4)</span></span>
<span class="line"><span>11-&gt; 按下A通道强度‘+’按钮</span></span>
<span class="line"><span>     accumulatedStrengthValueA += 1(值 = 2)</span></span>
<span class="line"><span>12-&gt; (100ms周期)B0准备写入</span></span>
<span class="line"><span>     strengthDataProcessingA()</span></span>
<span class="line"><span>     BLE WRITE 150A(0xB0 + orderNo(0b0001) + strengthParsingMethod(0b0100) + strengthSettingValueA(2) + ......)</span></span>
<span class="line"><span>13-&gt; 按下A通道强度‘-’按钮</span></span>
<span class="line"><span>     accumulatedStrengthValueA -= 1(值 = -1)</span></span>
<span class="line"><span>14-&gt; 150B返回A通道强度值</span></span>
<span class="line"><span>     BLE NOTIFY 150B(0xB1 + returnOrderNo(1) + returnStrengthValueA(6) + ......)</span></span>
<span class="line"><span>     返回的序列号 = 1，返回的A通道强度 = 6</span></span>
<span class="line"><span>     strengthDataCallback(1,6)</span></span>
<span class="line"><span>15-&gt; (100ms周期)B0准备写入</span></span>
<span class="line"><span>     strengthDataProcessingA()</span></span>
<span class="line"><span>     BLE WRITE 150A(0xB0 + orderNo(0b0010) + strengthParsingMethod(0b1000) + strengthSettingValueA(1) + ......)</span></span>
<span class="line"><span>16-&gt; 150B返回A通道强度值</span></span>
<span class="line"><span>     BLE NOTIFY 150B(0xB1 + returnOrderNo(2) + returnStrengthValueA(5) + ......)</span></span>
<span class="line"><span>     返回的序列号 = 2，返回的A通道强度 = 5</span></span>
<span class="line"><span>     strengthDataCallback(1,5)</span></span>
<span class="line"><span>17-&gt; (100ms周期)B0准备写入</span></span>
<span class="line"><span>     strengthZero()</span></span>
<span class="line"><span>     BLE WRITE 150A(0xB0 + orderNo(0b0001) + strengthParsingMethod(0b1100) + strengthSettingValueA(0) + ......)</span></span>
<span class="line"><span>18-&gt; 150B返回A通道强度值</span></span>
<span class="line"><span>     BLE NOTIFY 150B(0xB1 + returnOrderNo(1) + returnStrengthValueA(0) + ......)</span></span>
<span class="line"><span>     返回的序列号 = 1，返回的A通道强度 = 0</span></span>
<span class="line"><span>     strengthDataCallback(1,0)</span></span>
<span class="line"><span>......</span></span></code></pre></div>`,54)])])}const o=n(p,[["render",l]]);export{g as __pageData,o as default};
