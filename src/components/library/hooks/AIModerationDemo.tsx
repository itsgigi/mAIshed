/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useAIModeration } from './useAIModeration';

const FAKE_ENDPOINT = '/api/fake-moderation';

// Mock fetch interceptor for demo
if (typeof window !== 'undefined' && !(window as any).__FAKE_MODERATION_PATCHED) {
  (window as any).__FAKE_MODERATION_PATCHED = true;
  const originalFetch = window.fetch;
  window.fetch = async (input, init) => {
    if (typeof input === 'string' && input.endsWith(FAKE_ENDPOINT)) {
      let text = '';
      if (init?.body) {
        if (typeof init.body === 'string') {
          try {
            text = JSON.parse(init.body).text || '';
          } catch {
            text = '';
          }
        } else if (init.body instanceof Blob) {
          const bodyText = await init.body.text();
          try {
            text = JSON.parse(bodyText).text || '';
          } catch {
            text = '';
          }
        } else {
          text = '';
        }
      }
      // Fake moderation: flag if text contains 'badword'
      const flagged = /badword/i.test(text);
      const reasons = flagged ? ['Inappropriate language detected'] : [];
      return new Response(JSON.stringify({ flagged, reasons }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }
    return originalFetch(input, init);
  };
}

const AIModerationDemo: React.FC = () => {
  const [input, setInput] = useState('');
  const { result, isLoading, error, moderate, reset } = useAIModeration({
    endpoint: FAKE_ENDPOINT,
    apiKey: 'fake-key',
  });

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: 24, border: '1px solid #eee', borderRadius: 12, background: '#fafbfc' }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>AI Moderation Demo</h2>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type something to moderate..."
        style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', marginBottom: 12, minHeight: 60 }}
      />
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button
          onClick={() => moderate(input)}
          disabled={isLoading || !input.trim()}
          style={{ padding: '8px 20px', borderRadius: 6, background: '#19c37d', color: '#fff', border: 'none', fontWeight: 600, cursor: isLoading ? 'not-allowed' : 'pointer' }}
        >
          {isLoading ? 'Checking...' : 'Check Moderation'}
        </button>
        <button
          onClick={reset}
          disabled={isLoading}
          style={{ padding: '8px 20px', borderRadius: 6, background: '#eee', color: '#333', border: 'none', fontWeight: 600, cursor: isLoading ? 'not-allowed' : 'pointer' }}
        >
          Reset
        </button>
      </div>
      {error && <div style={{ color: 'red', marginBottom: 8 }}>Error: {error}</div>}
      {result && (
        <div style={{ marginTop: 8 }}>
          <div style={{ color: result.flagged ? 'red' : '#19c37d', fontWeight: 700 }}>
            {result.flagged ? 'Flagged 🚩' : 'Not Flagged ✅'}
          </div>
          {result.reasons && result.reasons.length > 0 && (
            <ul style={{ marginTop: 4 }}>
              {result.reasons.map((r, i) => (
                <li key={i} style={{ color: 'red', fontSize: 14 }}>{r}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default AIModerationDemo; 