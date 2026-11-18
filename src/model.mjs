const textOf = blocks => (blocks ?? []).filter(block => block.type === 'text').map(block => block.text).join('\n');

export function settlementByChild(entries) {
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

export function statusOf(running, pending, timing, notice) {
  if (pending) return 'waiting';
  if (running === true || (running === undefined && timing?.active)) return 'running';
  if (notice?.reason === 'completed' || timing?.lastTurnCompleted === true) return 'completed';
  if (notice?.reason === 'error' || notice?.reason === 'failed') return 'failed';
  if (notice?.reason || timing?.lastTurnCompleted === false) return 'ended';
  if (running === false) return 'idle';
  return 'unknown';
}

/** A child's descriptor separates its own work from inherited parent history. */
export function previewOf(entries, descriptorSeq) {
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
