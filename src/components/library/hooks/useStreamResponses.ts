import { useState, useRef, useCallback } from 'react';

interface UseStreamResponsesOptions {
  endpoint: string; // e.g., 'https://api.openai.com/v1/chat/completions'
  apiKey: string;
  body: Record<string, unknown>;
}

interface UseStreamResponsesResult {
  streamedText: string;
  isLoading: boolean;
  error: string | null;
  startStreaming: () => Promise<void>;
  reset: () => void;
}

export function useStreamResponses({ endpoint, apiKey, body }: UseStreamResponsesOptions): UseStreamResponsesResult {
  const [streamedText, setStreamedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const startStreaming = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setStreamedText('');
    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ ...body, stream: true }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.body) throw new Error('No response body');
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'OpenAI API error');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          // OpenAI streams data as lines starting with 'data: '
          chunk.split('\n').forEach(line => {
            if (line.startsWith('data: ')) {
              const data = line.replace('data: ', '').trim();
              if (data === '[DONE]') return;
              try {
                const parsed = JSON.parse(data);
                // For chat/completions, the content is in choices[0].delta.content
                const content = parsed.choices?.[0]?.delta?.content || parsed.choices?.[0]?.text || '';
                setStreamedText(prev => prev + content);
              } catch {
                // Ignore JSON parse errors for incomplete chunks
              }
            }
          });
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setError(err.message || 'Unknown error');
      }
    } finally {
      setIsLoading(false);
    }
  }, [endpoint, apiKey, body]);

  const reset = useCallback(() => {
    setStreamedText('');
    setError(null);
    setIsLoading(false);
    abortControllerRef.current?.abort();
  }, []);

  return { streamedText, isLoading, error, startStreaming, reset };
}
