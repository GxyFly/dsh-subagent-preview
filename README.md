# DSH 子 Agent 预览

适配 DeepSeek Harness Desktop 0.2.2-rc.3。当前会话有子智能体时，右上方显示浮动摘要。拖动摘要左侧的点阵手柄可以移动卡片，位置会保存在当前设备。点击摘要，在 DSH 原生右侧栏打开「子智能体」标签。点开任务可预览实时文字、当前工具和最终输出，也可以打开完整子会话。关闭或切离标签后，摘要重新出现。

面板显示当前会话直接派发的任务。原生子 Agent 的预览使用 DSH 已授权的子会话记录，并排除继承的主会话历史。外部 Codex CLI 等运行器只在向 DSH 提供结果或状态时显示相应信息。只返回给调用工具且未进入 DSH 子 Agent 名录的任务不出现在面板。

在 Windows 上用 Desktop 自带 CLI 安装，将示例路径替换为实际位置：

```powershell
& 'C:\path\to\dsh\resources\runtime\cli\bin\dsh.cmd' plugin --profile desktop add 'C:\path\to\downloads\dsh-subagent-preview-0.1.6.tgz'
```

如界面未立即出现入口，重启 DSH。源码构建使用 `node build.mjs`，然后执行 `npm pack` 生成安装包。
