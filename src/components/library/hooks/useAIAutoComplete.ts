/* eslint-disable @typescript-eslint/no-explicit-any */
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
            'Authorization': `Bearer ${apiKey}`,
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
} 