export const useStreamResponsesCode = `import { useState, useRef, useCallback } from 'react';

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
          'Authorization': \`Bearer \${apiKey}\`,
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
          chunk.split('\\n').forEach(line => {
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
}`;

export const useAIAutoCompleteCode = `/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';

interface UseAIAutoCompleteOptions {
  endpoint: string; // e.g., '/api/ai-autocomplete'
  apiKey: string;
  prompt: string;
  minLength?: number;
  debounceMs?: number;
}

interface UseAIAutoCompleteResult {
  suggestion: string;
  isLoading: boolean;
  error: string | null;
}

export function useAIAutoComplete({ endpoint, apiKey, prompt, minLength = 2, debounceMs = 300 }: UseAIAutoCompleteOptions): UseAIAutoCompleteResult {
  const [suggestion, setSuggestion] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<any>(null);

  useEffect(() => {
    if (prompt.length < minLength) {
      setSuggestion('');
      setIsLoading(false);
      setError(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': \`Bearer \${apiKey}\`,
          },
          body: JSON.stringify({ prompt }),
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || 'Autocomplete API error');
        }
        const data = await response.json();
        setSuggestion(data.suggestion || '');
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }, debounceMs);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [prompt, endpoint, apiKey, debounceMs, minLength]);

  return { suggestion, isLoading, error };
}`;

export const useAIModerationCode = `import { useState, useCallback } from 'react';

interface UseAIModerationOptions {
  endpoint: string; // e.g., '/api/ai-moderation'
  apiKey: string;
}

interface ModerationResult {
  flagged: boolean;
  reasons?: string[];
}

interface UseAIModerationResult {
  result: ModerationResult | null;
  isLoading: boolean;
  error: string | null;
  moderate: (text: string) => Promise<void>;
  reset: () => void;
}

export function useAIModeration({ endpoint, apiKey }: UseAIModerationOptions): UseAIModerationResult {
  const [result, setResult] = useState<ModerationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const moderate = useCallback(async (text: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': \`Bearer \${apiKey}\`,
        },
        body: JSON.stringify({ text }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Moderation API error');
      }
      const data = await response.json();
      setResult({ flagged: data.flagged, reasons: data.reasons });
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [endpoint, apiKey]);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return { result, isLoading, error, moderate, reset };
}`; 