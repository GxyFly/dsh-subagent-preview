# DSH 子智能体预览

DeepSeek Harness 桌面插件。在聊天右上角显示可拖动的子智能体摘要，点开后在 **DSH 原生右侧栏** 查看当前会话的子智能体状态和输出。

## 安装

**支持 DSH Desktop 0.2.2-rc.3 和 0.2.2-rc.5。** 从 [GitHub Releases](https://github.com/GxyFly/dsh-subagent-preview/releases) 下载 `.tgz`，用 Desktop 自带 CLI 安装，再重启 DSH。Windows 示例，请按实际位置替换路径：

```powershell
& 'C:\path\to\dsh\resources\runtime\cli\bin\dsh.cmd' plugin --profile desktop add 'C:\path\to\dsh-subagent-preview-0.1.8.tgz'
```

卸载：用同一 CLI 执行 `plugin --profile desktop remove dsh-subagent-preview`。

## 使用

1. 当前会话有子智能体时，聊天右上方会出现摘要。拖动左侧点阵手柄可移动位置，位置保存在当前设备。
2. 点击摘要打开「子智能体」标签。可查看已开启与已完成的任务。
3. 点击任务，预览可用的实时文字、工具状态或最终输出。需要完整记录时，可打开对应的子会话。切出或关闭该标签后，浮动摘要重新出现。

面板只列出当前会话直接派发、且进入 DSH 子智能体名录的任务。原生子智能体预览不会重复展示继承的主会话历史。外部运行器（如 Codex CLI）只显示它向 DSH 提供的信息。

## 构建

使用 Node.js 24.9 或更高版本，运行 `node build.mjs`，再运行 `npm pack` 生成安装包。适配新版本时需核对侧栏标签和子会话事件，并用已有会话验证摘要、列表及详情。

[MIT 许可证](LICENSE)。本项目是独立第三方插件。
