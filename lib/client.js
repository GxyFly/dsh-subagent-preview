window.__ModuleLoader__.load({id:'dsh-subagent-preview',factory:require=>{
const css=".sap-float,\n.sap-panel,\n.sap-entry {\n  --sap-text: var(--dsw-alias-label-primary, CanvasText);\n  --sap-secondary: var(--dsw-alias-label-secondary, color-mix(in srgb, CanvasText 65%, Canvas));\n  --sap-surface: var(--dsw-alias-bg-base, Canvas);\n  --sap-line: color-mix(in srgb, var(--sap-text) 11%, transparent);\n  --sap-hover: color-mix(in srgb, var(--sap-text) 5%, transparent);\n  --sap-focus: var(--dsw-alias-label-brand, #5387dc);\n  color: var(--sap-text);\n  font-family: \"Segoe UI\", \"Microsoft YaHei UI\", system-ui, sans-serif;\n  font-size: 13px;\n  line-height: 1.5;\n}\n\n.sap-float {\n  position: fixed;\n  z-index: 600;\n  inset: 104px 18px auto auto;\n  display: flex;\n  align-items: stretch;\n  max-width: calc(100vw - 16px);\n  padding: 3px;\n  background: var(--sap-surface);\n  border: 1px solid var(--sap-line);\n  border-radius: 12px;\n  box-shadow: 0 5px 18px #19233212, 0 1px 2px #1923320d;\n}\n\nbody:has([data-sap-sidebar-visible=true]) .sap-float { display: none; }\n\n.sap-float .sap-summary,\n.sap-panel :is(.sap-card, .sap-icon, .sap-link),\n.sap-entry {\n  cursor: pointer;\n  border: 0;\n  background: transparent;\n}\n\n.sap-float .sap-summary,\n.sap-panel :is(.sap-card, .sap-icon, .sap-link) {\n  font: inherit;\n  color: inherit;\n}\n\n.sap-grip {\n  display: grid;\n  flex: 0 0 24px;\n  place-items: center;\n  border-radius: 8px;\n  color: var(--sap-secondary);\n  cursor: grab;\n  touch-action: none;\n  user-select: none;\n}\n\n.sap-grip::before {\n  width: 8px;\n  height: 12px;\n  background: radial-gradient(circle, currentColor 0.9px, transparent 1.1px) 0 0 / 4px 4px;\n  content: \"\";\n}\n\n.sap-grip:active { cursor: grabbing; }\n.sap-grip:hover { background: var(--sap-hover); }\n\n.sap-entry {\n  padding: 4px 8px;\n  border-radius: 6px;\n  white-space: nowrap;\n}\n\n.sap-float .sap-summary {\n  display: flex;\n  align-items: center;\n  gap: 13px;\n  min-width: 0;\n  padding: 4px 10px 4px 5px;\n  border-radius: 8px;\n  text-align: start;\n}\n\n.sap-summary-body { display: grid; min-width: 0; gap: 3px; }\n.sap-summary-title { font-weight: 500; }\n\n.sap-summary-meta,\n.sap-summary-markers {\n  display: flex;\n  min-width: 0;\n  align-items: center;\n}\n\n.sap-summary-meta { gap: 8px; }\n.sap-summary-markers { flex: none; gap: 3px; }\n.sap-summary-count {\n  overflow: hidden;\n  color: var(--sap-secondary);\n  font-size: 12px;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.sap-chevron {\n  flex: none;\n  width: 5px;\n  height: 5px;\n  border: solid var(--sap-secondary);\n  border-width: 1px 1px 0 0;\n  transform: rotate(45deg);\n}\n\n.sap-panel {\n  box-sizing: border-box;\n  height: 100%;\n  min-height: 0;\n  overflow: auto;\n  overscroll-behavior: contain;\n}\n\n.sap-panel .sap-panel-content {\n  position: relative;\n  box-sizing: border-box;\n  width: min(100%, 748px);\n  margin-inline: auto;\n  padding: 22px clamp(14px, 4vw, 24px) 30px;\n}\n\n.sap-panel .sap-visually-hidden {\n  position: absolute;\n  inset: 0 auto auto 0;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  overflow: hidden;\n  clip-path: inset(50%);\n  white-space: nowrap;\n}\n\n.sap-panel .sap-panel-header {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  min-height: 32px;\n  margin-bottom: 16px;\n  padding-bottom: 12px;\n  border-bottom: 1px solid var(--sap-line);\n}\n\n.sap-panel .sap-panel-header h2 {\n  margin: 0;\n  font-size: 14px;\n  font-weight: 600;\n  overflow-wrap: anywhere;\n}\n\n.sap-panel h2:focus { outline: none; }\n\n.sap-panel .sap-icon {\n  flex: none;\n  width: 28px;\n  height: 28px;\n  border-radius: 7px;\n  color: var(--sap-secondary);\n  font-size: 16px;\n}\n\n.sap-panel .sap-group + .sap-group { margin-top: 24px; }\n\n.sap-panel .sap-group h3 {\n  display: flex;\n  align-items: baseline;\n  gap: 8px;\n  margin: 0 0 6px;\n  padding-inline: 8px;\n  color: var(--sap-secondary);\n  font-size: 12px;\n  font-weight: 500;\n}\n\n.sap-group-count {\n  color: color-mix(in srgb, var(--sap-secondary) 90%, var(--sap-surface));\n  font-variant-numeric: tabular-nums;\n}\n\n.sap-panel .sap-card {\n  box-sizing: border-box;\n  display: flex;\n  align-items: center;\n  gap: 11px;\n  width: 100%;\n  min-height: 40px;\n  padding: 7px 8px;\n  border-radius: 8px;\n  text-align: start;\n}\n\n.sap-float .sap-summary:hover,\n.sap-panel :is(.sap-card, .sap-icon, .sap-link):hover,\n.sap-entry:hover { background: var(--sap-hover); }\n\n.sap-marker {\n  --sap-agent-color: hsl(var(--sap-hue) 56% 49%);\n  display: inline-grid;\n  flex: none;\n  place-items: center;\n  width: 22px;\n  height: 22px;\n  border-radius: 7px;\n  background: color-mix(in srgb, var(--sap-agent-color) 17%, var(--sap-surface));\n  color: color-mix(in srgb, var(--sap-agent-color) 78%, var(--sap-text));\n  font-size: 22px;\n}\n\n.sap-marker::before {\n  box-sizing: border-box;\n  width: .42em;\n  height: .42em;\n  border: .085em solid currentColor;\n  content: \"\";\n}\n\n.sap-marker[data-shape=ring]::before { border-radius: 50%; }\n.sap-marker[data-shape=dash]::before {\n  height: .21em;\n  border-radius: 999px;\n  background: currentColor;\n  transform: rotate(-32deg);\n}\n\n.sap-marker[data-shape=pair]::before {\n  margin-inline-end: .23em;\n  width: .16em;\n  height: .16em;\n  border: 0;\n  border-radius: 50%;\n  background: currentColor;\n  box-shadow: .23em 0 currentColor;\n}\n\n.sap-marker[data-shape=tile]::before { border-radius: .09em; }\n\n.sap-marker[data-active=true] {\n  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--sap-agent-color) 60%, transparent);\n}\n\n.sap-summary-markers .sap-marker {\n  width: 16px;\n  height: 16px;\n  border-radius: 5px;\n  font-size: 16px;\n}\n\n.sap-card-name {\n  flex: 1;\n  min-width: 0;\n  overflow-wrap: anywhere;\n}\n\n.sap-time,\n.sap-badge {\n  flex: none;\n  color: var(--sap-secondary);\n  font-size: 12px;\n  white-space: nowrap;\n}\n\n.sap-time { font-variant-numeric: tabular-nums; }\n\n.sap-badge {\n  display: inline-block;\n  padding: 2px 7px;\n  border-radius: 6px;\n  background: var(--sap-hover);\n}\n\n.sap-badge[data-status=running] { background: color-mix(in srgb, #27a37b 13%, var(--sap-surface)); }\n.sap-badge[data-status=waiting] { background: color-mix(in srgb, #c58a28 15%, var(--sap-surface)); }\n.sap-badge[data-status=failed] { background: color-mix(in srgb, #ce555b 13%, var(--sap-surface)); }\n\n.sap-panel .sap-link {\n  padding: 5px 8px;\n  border-radius: 6px;\n  color: var(--sap-secondary);\n  font-size: 12px;\n}\n\n.sap-panel .sap-group .sap-link { margin-inline-start: 33px; }\n\n.sap-panel .sap-muted {\n  margin: 0;\n  color: var(--sap-secondary);\n  font-size: 13px;\n}\n\n.sap-panel .sap-group .sap-muted { padding: 2px 8px; }\n.sap-detail > .sap-muted { margin-block: 12px; }\n\n.sap-tool,\n.sap-output {\n  margin: 14px 0;\n  padding-inline-start: 12px;\n  border-inline-start: 2px solid var(--sap-line);\n  overflow-wrap: anywhere;\n}\n\n.sap-output :is(pre, table) { max-width: 100%; overflow: auto; }\n.sap-output small { display: block; margin-bottom: 6px; color: var(--sap-secondary); }\n\n.sap-panel button:focus-visible,\n.sap-float button:focus-visible,\n.sap-entry:focus-visible {\n  outline: 2px solid var(--sap-focus);\n  outline-offset: -2px;\n}\n\n@media (max-height: 460px) {\n  .sap-float { top: 62px; }\n}\n";
const textOf = blocks => (blocks ?? []).filter(block => block.type === 'text').map(block => block.text).join('\n');

function settlementByChild(entries) {
  const notices = new Map();
  for (const { event } of entries) {
    const messages = event.type === 'user/message' ? [event.data]
      : event.type === 'agent/inbox/spliced' ? event.data.inserted ?? [] : [];
    for (const message of messages) {
      const source = message.source;
      if (source?.kind === 'subagent-settled') {
        notices.set(source.senderSessionId, { reason: source.stopReason, text: textOf(message.content), time: event.time });
      }
    }
  }
  return notices;
}

function statusOf(running, pending, timing, notice) {
  if (pending) return 'waiting';
  if (running === true || (running === undefined && timing?.active)) return 'running';
  if (notice?.reason === 'completed' || timing?.lastTurnCompleted === true) return 'completed';
  if (notice?.reason === 'error' || notice?.reason === 'failed') return 'failed';
  if (notice?.reason || timing?.lastTurnCompleted === false) return 'ended';
  if (running === false) return 'idle';
  return 'unknown';
}

/** A child's descriptor separates its own work from inherited parent history. */
function previewOf(entries, descriptorSeq) {
  const descriptor = entries.findLast(({event}) => event.type === 'subagent/descriptor')?.event.seq ?? descriptorSeq;
  if (descriptor === undefined) return { rows: [], runningTool: undefined };
  const rows = [];
  const live = new Map();
  const calls = new Map();
  for (const {event} of entries) {
    if (event.seq <= descriptor) continue;
    const {type, data} = event;
    if (type === 'assistant/live-chunk' && data.chunk.type === 'text-delta') {
      const key = `${data.turn}:${data.step}`;
      live.set(key, (live.get(key) ?? '') + data.chunk.text);
    } else if (type === 'assistant/message' || type === 'assistant/attempt') {
      live.delete(`${data.turn}:${data.step}`);
      const text = textOf(data.message?.content);
      if (text.trim()) rows.push({ key: event.seq, text });
    } else if (type === 'tool/call') {
      calls.set(data.callId, data.name);
    } else if (type === 'tool/result') {
      calls.delete(data.message.toolCallId);
    } else if (type === 'turn/end') {
      calls.clear();
      live.clear();
    }
  }
  for (const [key, text] of live) if (text.trim()) rows.push({ key: `live:${key}`, text, live: true });
  return { rows: rows.slice(-30), runningTool: [...calls.values()].at(-1) };
}


const name = 'subagent-preview-client';
const inject = ['slots', 'sessions', 'uiWorkspace', 'sidebarRight', 'sidebarRightTabs'];

const pluginId = 'dsh-subagent-preview';
const empty = Object.freeze({ entries: [] });
const emptySource = { subscribe: () => () => {}, getSnapshot: () => empty };
const activeStates = new Set(['running', 'waiting']);
const markdownLabels = {code:{copyLabel:'复制', copiedLabel:'已复制'}, footnotes:'脚注'};
const labels = {
  running: '运行中', waiting: '等待操作', completed: '完成', failed: '失败',
  ended: '已结束', idle: '空闲', unknown: '状态未同步',
};

function apply(ctx) {
  const {
    createElement: h, useState, useEffect, useMemo, useCallback,
    useSyncExternalStore, useRef,
  } = require('react');
  const {createPortal} = require('react-dom');
  const {MarkdownText} = require('@deepseek-ai/dsh-client-ui-primitives');
  const useSource = source => useSyncExternalStore(
    useCallback(listener => source.subscribe(listener), [source]),
    useCallback(() => source.getSnapshot(), [source]),
  );

  function useChildren(sessionId, useSessionStatus) {
    const list = useSource(ctx.sessions.list);
    const statuses = useSessionStatus(value => value);
    const parent = ctx.sessions.binding(sessionId);
    const { entries } = useSource(parent?.eventSource ?? emptySource);
    const catalog = list.projectionsBySession[sessionId]?.values.subagentCatalog;
    const notices = useMemo(() => settlementByChild(entries), [entries]);
    useEffect(() => {
      void ctx.sessions.refreshProjections(sessionId).catch(() => {});
    }, [sessionId]);
    return (catalog ?? []).map(child => {
      const ui = statuses.get(child.id);
      const timing = list.projectionsBySession[child.id]?.values.subagentTiming;
      const notice = notices.get(child.id);
      return {
        ...child,
        label: child.label || child.name || '子智能体',
        status: statusOf(ui?.running ?? list.byId[child.id]?.running, ui?.pendingInteraction, timing, notice),
        descriptor: list.projectionsBySession[child.id]?.values.subagent?.seq,
        notice,
      };
    }).sort((a, b) => b.createdAt - a.createdAt);
  }

  function Entry({ sessionId, useSessionStatus }) {
    const agents = useChildren(sessionId, useSessionStatus);
    const open = () => ctx.sidebarRight.openTab(pluginId);
    if (!agents.length) {
      return h('button', {type:'button', className:'sap-entry', onClick:open}, '子智能体');
    }
    return createPortal(h(Summary, {agents, open}), document.body);
  }

  function Summary({agents, open}) {
    const [position, setPosition] = useState(loadPosition);
    const card = useRef(null);
    const drag = useRef(null);
    useEffect(() => {
      function keepVisible() {
        setPosition(point => point && clampPosition(point, card.current));
      }
      keepVisible();
      window.addEventListener('resize', keepVisible);
      return () => window.removeEventListener('resize', keepVisible);
    }, []);

    function startDrag(event) {
      if (event.button !== 0 || !event.isPrimary) return;
      const rect = card.current.getBoundingClientRect();
      drag.current = {id:event.pointerId, offsetX:event.clientX - rect.left, offsetY:event.clientY - rect.top};
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    function moveDrag(event) {
      const pointer = drag.current;
      if (pointer?.id !== event.pointerId) return;
      const point = clampPosition({x:event.clientX - pointer.offsetX, y:event.clientY - pointer.offsetY}, card.current);
      setPosition(point);
    }

    function finishDrag(event) {
      const pointer = drag.current;
      if (pointer?.id !== event.pointerId) return;
      drag.current = null;
      if (event.type === 'pointerup') {
        const point = clampPosition({x:event.clientX - pointer.offsetX, y:event.clientY - pointer.offsetY}, card.current);
        setPosition(point);
        savePosition(point);
      } else if (position) savePosition(position);
    }

    const active = agents.filter(agent => activeStates.has(agent.status));
    const completed = agents.filter(agent => agent.status === 'completed');
    const subtitle = [active.length && `${active.length} 已开启`, completed.length && `${completed.length} 完成`]
      .filter(Boolean).join(' · ') || `${agents.length} 个子智能体`;
    const shown = [...active, ...completed].slice(0, 4);
    const preview = shown.length ? shown : agents.slice(0, 4);
    return h('aside', {
      ref:card, className:'sap-float', 'aria-label':'子智能体摘要',
      style:position ? {inset:'auto', left:position.x, top:position.y} : undefined,
    },
    h('span', {className:'sap-grip', title:'拖动摘要卡', 'aria-hidden':true,
      onPointerDown:startDrag, onPointerMove:moveDrag, onPointerUp:finishDrag,
      onPointerCancel:finishDrag, onLostPointerCapture:finishDrag}),
    h('button', {type:'button', className:'sap-summary', onClick:open, 'aria-label':`打开子智能体，${subtitle}`},
      h('span', {className:'sap-summary-body'},
        h('span', {className:'sap-summary-title'}, '子智能体'),
        h('span', {className:'sap-summary-meta'},
          h('span', {className:'sap-summary-markers'}, ...preview.map(agent => marker(h, agent))),
          h('span', {className:'sap-summary-count'}, subtitle))),
      h('span', {'aria-hidden':true, className:'sap-chevron'})));
  }

  function Sidebar(props) {
    return h(SessionPanel, {...props, key:props.sessionId});
  }

  function SessionPanel({sessionId, useSessionStatus, useTabInfo}) {
    const agents = useChildren(sessionId, useSessionStatus);
    const {tab} = useTabInfo();
    const [selected, setSelected] = useState(null);
    const [historyLimit, setHistoryLimit] = useState(10);
    const heading = useRef(null);
    const panel = useRef(null);
    const agent = agents.find(item => item.id === selected);
    const active = agents.filter(item => activeStates.has(item.status));
    const completed = agents.filter(item => item.status === 'completed');
    const other = agents.filter(item => !activeStates.has(item.status) && item.status !== 'completed');

    useEffect(() => {
      if (panel.current) panel.current.scrollTop = 0;
    }, [selected]);

    function select(id) {
      setSelected(id);
      requestAnimationFrame(() => heading.current?.focus());
    }

    function group(title, items, options = {}) {
      const { emptyLabel, limit = items.length } = options;
      return h('section', {className:'sap-group'},
        h('h3', null, title, h('span', {className:'sap-group-count'}, items.length)),
        !items.length && emptyLabel && h('p', {className:'sap-muted'}, emptyLabel),
        ...items.slice(0, limit).map(item =>
          h('button', {type:'button', className:'sap-card', key:item.id, onClick:() => select(item.id)},
            marker(h, item), h('span', {className:'sap-card-name'}, item.label),
            item.status === 'completed' ? taskTime(h, item.notice?.time ?? item.createdAt) : badge(h, item.status))),
        limit < items.length && h('button', {type:'button', className:'sap-link',
          onClick:() => setHistoryLimit(value => value + 10)}, `再显示 ${items.length - limit} 个`));
    }

    return h('div', {className:'sap-panel', ref:panel, 'data-sap-sidebar-visible':tab.visible ? 'true' : undefined},
      h('div', {className:'sap-panel-content'},
        h('header', {className:agent ? 'sap-panel-header' : 'sap-visually-hidden'},
          agent && h('button', {type:'button', className:'sap-icon', 'aria-label':'返回子智能体列表', onClick:() => select(null)}, '←'),
          agent && marker(h, agent),
          h('h2', {ref:heading, tabIndex:-1}, agent?.label ?? '子智能体')),
        agent ? h(TaskDetail, {key:agent.id, agent, parentSessionId:sessionId}) : h('div', null,
          group('已开启', active, {emptyLabel:'没有已开启的子代理'}),
          group('完成', completed, {limit:historyLimit}),
          other.length > 0 && group('其他任务', other))));
  }

  function TaskDetail({ agent, parentSessionId }) {
    const [binding, setBinding] = useState(null);
    const [error, setError] = useState('');
    const address = { parentSessionId, childSessionId: agent.id, mode: agent.mode };
    useEffect(() => {
      if (agent.mode === 'external') return;
      let disposed = false;
      let ref;
      try {
        ref = ctx.sessions.retain(address, { source: pluginId });
        setBinding(ref.binding);
        void ref.ready.catch(cause => { if (!disposed) setError(String(cause.message ?? cause)); });
      } catch (cause) {
        setError(String(cause.message ?? cause));
      }
      return () => {
        disposed = true;
        ref?.release();
      };
    }, [agent.id, agent.mode, parentSessionId]);
    const { entries, hasMore } = useSource(binding?.eventSource ?? emptySource);
    const session = useSource(binding?.session ?? emptySource);
    const { rows, runningTool } = useMemo(() => previewOf(entries, agent.descriptor), [entries, agent.descriptor]);
    const failure = error || session.openError?.message;
    return h('section', {className: 'sap-detail'},
      badge(h, agent.status),
      runningTool && activeStates.has(agent.status) && h('p', {className:'sap-tool'}, `当前工具：${runningTool}`),
      agent.mode === 'external' && h('p', {className:'sap-muted'}, '外部 Agent 的实时输出由其运行器管理。此处显示 DSH 收到的结果。'),
      failure && h('p', {role:'alert', className:'sap-muted'}, `读取失败：${failure}`),
      binding && hasMore && h('button', {
        type:'button', className:'sap-link', onClick: () => void binding.session.loadOlder().catch(cause => setError(String(cause.message ?? cause))),
        disabled: session.loadingOlder,
      }, session.loadingOlder ? '正在读取…' : '加载更早的记录'),
      ...rows.map(row => h('div', {key: row.key, className:'sap-output'},
        row.live && h('small', null, '实时输出'),
        h(MarkdownText, {text:row.text, streaming:!!row.live, labels:markdownLabels}))),
      agent.notice?.text && (agent.mode === 'external' || rows.length === 0)
        ? h('div', {className:'sap-output'}, h('small', null, '任务结果'),
            h(MarkdownText, {text:agent.notice.text, labels:markdownLabels})) : null,
      !failure && rows.length === 0 && !agent.notice?.text && h('p', {className:'sap-muted'},
        session.openState === 'loading' ? '正在读取任务记录…' : '暂无可预览的文字输出。'),
      agent.mode !== 'external' && h('button', {
        type:'button', className:'sap-link', onClick: () => ctx.uiWorkspace.openSession(address),
      }, '打开完整子会话'));
  }

  ctx.effect(() => {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.append(style);
    return () => style.remove();
  });
  ctx.effect(() => ctx.sidebarRightTabs.register({id:pluginId, kind:pluginId, title:() => '子智能体'}));
  ctx.slots.inject('sidebar.right.pane.tab', () => ctx.slots.register({
    name:'sidebar.right.pane.tab', key:pluginId,
  }, Sidebar));
  ctx.slots.inject('conversation.session.header.utilities', () => ctx.slots.register({
    name:'conversation.session.header.utilities', id:pluginId,
  }, Entry));
}

const positionKey = 'dsh-subagent-preview.summary-position';

function loadPosition() {
  try {
    const point = JSON.parse(localStorage.getItem(positionKey));
    if (Number.isFinite(point?.x) && Number.isFinite(point?.y)) return point;
  } catch { /* browser storage is optional */ }
  return null;
}

function savePosition(point) {
  try { localStorage.setItem(positionKey, JSON.stringify(point)); } catch { /* keep in-memory position */ }
}

function clampPosition(point, card) {
  const margin = 8;
  const width = card?.offsetWidth || 230;
  const height = card?.offsetHeight || 38;
  return {
    x: Math.max(margin, Math.min(point.x, window.innerWidth - width - margin)),
    y: Math.max(margin + 32, Math.min(point.y, window.innerHeight - height - margin)),
  };
}

function badge(h, status) {
  return h('span', {className:'sap-badge', 'data-status':status}, labels[status]);
}

function taskTime(h, timestamp) {
  if (!Number.isFinite(timestamp)) return null;
  const date = new Date(timestamp);
  const minutes = Math.max(0, Math.floor((Date.now() - timestamp) / 60_000));
  const relative = new Intl.RelativeTimeFormat('zh-Hans', {numeric:'always'});
  const units = [['week', 10_080], ['day', 1440], ['hour', 60], ['minute', 1]];
  const unit = units.find(([, length]) => minutes >= length);
  const label = unit ? relative.format(-Math.floor(minutes / unit[1]), unit[0]) : '刚刚';
  return h('time', {dateTime:date.toISOString(), title:date.toLocaleString(), className:'sap-time'}, label);
}

const markerShapes = ['ring', 'dash', 'pair', 'tile'];

function marker(h, agent) {
  const hue = [...agent.id].reduce((sum, char) => (sum * 31 + char.codePointAt(0)) % 360, 0);
  return h('span', {
    key:agent.id, className:'sap-marker', 'aria-hidden':true,
    'data-active':activeStates.has(agent.status),
    'data-shape':markerShapes[Math.floor(hue / 90)],
    style:{'--sap-hue':hue},
  });
}

return {name,inject,apply};
}});
