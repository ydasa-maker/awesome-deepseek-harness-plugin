# Game of Thrones "Iron & Gold" — DeepSeek Harness 主题

把 [DeepSeek Harness](https://www.deepseek.com/harness/) 界面换成《权力的游戏》铁金风格的一个**纯客户端动态 Cordis 插件**。

## ✨ 效果

- **铁金配色**：铁灰近黑基底、古老金强调色、暖白羊皮纸文字（深浅色模式均适配）
- **右侧竖排标题** `GAME OF THRONES`（金色衬线，雕刻光感）
- **右下角坦格利安三头龙徽章**（圆形金环徽章，图源 Wikimedia Commons）
- 四角铁艺纹饰、顶部菱形纹章、底部 **"WINTER IS COMING"** 铭文、电影感暗角
- 全屏装饰层**点击穿透**，不影响任何操作

## 🚀 使用方式

`got-theme.js` 是插件的 **client** 半区代码（`code.client` 的函数体）。在 Harness 的对话里这样应用：

### 方式 A：动态插件（临时，进程内有效）

1. 打开文件 `got-theme.js`，把整段内容作为 `code.client` 传给 `cordis_define`（`plugin.kind: "new"`，`idPrefix` 随意，如 `got`）。
2. 对返回的 `pluginId` / `packageId` 调用 `cordis_run`（`mode: "run"`）。
3. 浏览器端批准后立即生效。

> 动态插件**不跨进程重启持久**，重启后需要重新定义并运行。

### 方式 B：固化为正式插件（重启后自动生效）

把同一份代码包成一个客户端插件包，或写入你的 agent preset 组合。具体做法见 DeepSeek Harness 的 Cordis 组合文档（`editing-cordis-compositions` 技能）。

## 🎨 自定义

- 改配色：编辑 `theme.overrideTokens(...)` 里的 13 个 `--dsw-alias-*` 令牌（每个都要提供 `{ light, dark }`）。
- 改徽章：替换 `.dsh-got-sigil` 里的 `background-image` 为任意图片 URL。
- 改铭文：搜索 `WINTER IS COMING` 替换成你想要的家训。
- 去掉竖排标题：删除 `dsh-got-title` 对应的 React 节点与样式段。

## 📁 文件

| 文件 | 说明 |
|---|---|
| `got-theme.js` | 主题插件（client 半区）完整代码 |
| `README.md` | 本文档 |

## 📜 许可

- 代码：MIT License（可自行补充 LICENSE 文件）。
- 坦格利安徽章图源来自 [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:House_Targaryen.png)，版权归原作者，此处仅通过远程直链引用，未随仓库分发。
