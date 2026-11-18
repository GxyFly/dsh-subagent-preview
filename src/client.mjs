import { settlementByChild, statusOf, previewOf } from './model.mjs';

export const name = 'subagent-preview-client';
export const inject = ['slots', 'sessions', 'uiWorkspace', 'sidebarRight', 'sidebarRightTabs'];

const pluginId = 'dsh-subagent-preview';
const empty = Object.freeze({ entries: [] });
const emptySource = { subscribe: () => () => {}, getSnapshot: () => empty };
const activeStates = new Set(['running', 'waiting']);
const markdownLabels = {code:{copyLabel:'复制', copiedLabel:'已复制'}, footnotes:'脚注'};
const labels = {
  running: '运行中', waiting: '等待操作', completed: '完成', failed: '失败',
  ended: '已结束', idle: '空闲', unknown: '状态未同步',
};

export function apply(ctx) {
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
