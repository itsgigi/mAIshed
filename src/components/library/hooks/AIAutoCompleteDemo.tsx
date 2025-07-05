/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useLayoutEffect } from 'react';
import { useAIAutoComplete } from './useAIAutoComplete';

const FAKE_ENDPOINT = '/api/fake-autocomplete';

// Mock fetch interceptor for demo
if (typeof window !== 'undefined' && !(window as any).__FAKE_AUTOCOMPLETE_PATCHED) {
  (window as any).__FAKE_AUTOCOMPLETE_PATCHED = true;
  const originalFetch = window.fetch;
  window.fetch = async (input, init) => {
    if (typeof input === 'string' && input.endsWith(FAKE_ENDPOINT)) {
      let prompt = '';
      try {
        // Ensure body is string before parsing
        const body = typeof init?.body === 'string' ? init.body : '';
        prompt = JSON.parse(body || '{}').prompt || '';
      } catch {
        prompt = '';
      }
      // Static dictionary for demo completions
      const DICTIONARY = [
        'Yesterday', 'Yellow', 'Yes', 'Yesteryear', 'Yield', 'Yelp', 'Yen', 'Yeti', 'Yawn', 'Yard',
        'Apple', 'Banana', 'Cat', 'Dog', 'Elephant', 'Fish', 'Giraffe', 'House', 'Ice', 'Jungle',
        'Hello', 'name', 'feeling', 'Good', 'morning', 'evening'
      ];
      let suggestion = '';
      if (prompt && prompt.length > 0) {
        const match = DICTIONARY.find(word => word.toLowerCase().startsWith(prompt.toLowerCase()) && word.length > prompt.length);
        if (match) {
          suggestion = match;
        }
      }
      return new Response(JSON.stringify({ suggestion }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }
    return originalFetch(input, init);
  };
}

const AIAutoCompleteDemo: React.FC = () => {
  const [input, setInput] = useState('');
  const match = input.match(/(\S+)$/);
  const lastWord = match ? match[1] : '';
  const { suggestion, /* isLoading, */ error } = useAIAutoComplete({
    endpoint: FAKE_ENDPOINT,
    apiKey: 'fake-key',
    prompt: lastWord,
  });

  const ghostText =
    suggestion && lastWord && suggestion.toLowerCase().startsWith(lastWord.toLowerCase()) && suggestion.length > lastWord.length
      ? suggestion.slice(lastWord.length)
      : '';

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const sizerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(40);
  useLayoutEffect(() => {
    if (sizerRef.current) {
      setHeight(sizerRef.current.offsetHeight + 2);
    }
  }, [input, ghostText]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab' && ghostText) {
      e.preventDefault();
      setInput(prev => prev.replace(/(\S+)$/, suggestion));
    }
  };

  return (
    <div className="max-w-[400px] mx-auto my-8 p-6 border border-[#eee] rounded-2xl bg-[#fafbfc] drop-shadow-md">
      <h2 className="text-xl font-bold mb-4">AI Autocomplete Demo</h2>
      <div className="relative w-full min-h-10">
        {/* Overlay */}
        <div
          aria-hidden
          className="absolute bg-white inset-0 w-full min-h-10 pointer-events-none font-inherit text-base p-2.5 whitespace-pre-wrap break-words z-10 rounded-lg box-border text-black"
          style={{ height }}
        >
          {input}
          <span className="text-gray-300">{ghostText}</span>
        </div>
        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type something..."
          className="w-full min-w-[200px] max-w-full min-h-10 resize-none p-2.5 rounded-lg border border-gray-300 mb-3 relative  z-20 font-inherit text-base text-transparent caret-[#222] whitespace-pre-wrap outline-none box-border overflow-hidden"
          style={{ height }}
        />
        {/* Sizer */}
        <div
          ref={sizerRef}
          className="absolute invisible h-auto overflow-auto whitespace-pre-wrap break-words font-inherit text-base p-2.5 box-border w-full min-w-[200px]"
        >
          {input}{ghostText || ' '}
        </div>
      </div>
      {/* {isLoading && <div className="text-[#19c37d]">Loading...</div>} */}
      {error && <div className="text-red-600">Error: {error}</div>}
    </div>
  );
};

export default AIAutoCompleteDemo; 