import React, { useState } from 'react';
import { useStreamResponses } from './useStreamResponses';
import BlinkinDot from '../ui/BlinkinDot';

// Fake streaming endpoint for demo
const FAKE_ENDPOINT = '/api/fake-stream';

// This is a mock fetch interceptor for demo purposes only
// In a real app, you would remove this and use a real endpoint
if (typeof window !== 'undefined' && !(window as unknown as { __FAKE_STREAM_PATCHED?: boolean }).__FAKE_STREAM_PATCHED) {
  (window as unknown as { __FAKE_STREAM_PATCHED?: boolean }).__FAKE_STREAM_PATCHED = true;
  const originalFetch = window.fetch;
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    if (typeof input === 'string' && input.endsWith(FAKE_ENDPOINT)) {
      // Simulate a streaming response using ReadableStream
      const encoder = new TextEncoder();
      let i = 0;
      const chunks = [
        'data: {"choices":[{"delta":{"content":"Hello"}}]}\n',
        'data: {"choices":[{"delta":{"content":" there"}}]}\n',
        'data: {"choices":[{"delta":{"content":"! This is"}}]}\n',
        'data: {"choices":[{"delta":{"content":" a fake stream."}}]}\n',
        'data: {"choices":[{"delta":{"content":"  Hope"}}]}\n',
        'data: {"choices":[{"delta":{"content":" you like"}}]}\n',
        'data: {"choices":[{"delta":{"content":" this"}}]}\n',
        'data: {"choices":[{"delta":{"content":" website."}}]}\n',
        'data: [DONE]\n',
      ];
      const stream = new ReadableStream({
        pull(controller) {
          if (i < chunks.length) {
            setTimeout(() => {
              controller.enqueue(encoder.encode(chunks[i++]));
              if (i === chunks.length) controller.close();
            }, 400);
          }
        },
      });
      return new Response(stream, { status: 200, headers: { 'Content-Type': 'text/event-stream' } });
    }
    return originalFetch(input, init);
  };
}

const fadeInStyle: React.CSSProperties = {
  animation: 'fadeIn 0.3s',
  transition: 'color 0.2s',
  display: 'inline',
};

const SteamingResponses: React.FC = () => {
  const [apiKey] = useState('fake-key'); // Not used in fake demo
  const { streamedText, isLoading, error, startStreaming, reset } = useStreamResponses({
    endpoint: FAKE_ENDPOINT,
    apiKey,
    body: { messages: [{ role: 'user', content: 'Say hello!' }] },
  });

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', padding: 24, border: '1px solid #eee', borderRadius: 12, background: '#fafbfc' }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Stream Responses Demo</h2>
      <div style={{ minHeight: 60, fontSize: 18, background: '#fff', borderRadius: 8, padding: 16, marginBottom: 16, border: '1px solid #ddd', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={fadeInStyle}>
          {streamedText}
        </span>
        {isLoading && <BlinkinDot color="#19c37d" />}
      </div>
      {error && <div style={{ color: 'red', marginBottom: 8 }}>Error: {error}</div>}
      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={startStreaming} disabled={isLoading} style={{ padding: '8px 20px', borderRadius: 6, background: '#19c37d', color: '#fff', border: 'none', fontWeight: 600, cursor: isLoading ? 'not-allowed' : 'pointer' }}>
          {isLoading ? 'Streaming...' : 'Start Streaming'}
        </button>
        <button onClick={reset} disabled={isLoading} style={{ padding: '8px 20px', borderRadius: 6, background: '#eee', color: '#333', border: 'none', fontWeight: 600, cursor: isLoading ? 'not-allowed' : 'pointer' }}>
          Reset
        </button>
      </div>
      {/* Fade-in keyframes */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default SteamingResponses;