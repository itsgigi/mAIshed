import { useState, useCallback } from 'react';

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
          'Authorization': `Bearer ${apiKey}`,
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
} 