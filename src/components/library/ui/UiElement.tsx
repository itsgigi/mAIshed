/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from 'framer-motion';
import React, { useRef, useState } from 'react';
import ComponentProps from '../../layout/ComponentProps';
import { FaCode } from "react-icons/fa";
import { FaRegEye, FaRegCopy, FaCheck } from "react-icons/fa6";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import copy from 'copy-to-clipboard';

const UiElement = ({
  title,
  code,
  component,
  defaultProps = {},
  fields = []
}: {
  title: string;
  subtitle?: string;
  code: string;
  component: React.ElementType;
  defaultProps?: Record<string, any> | undefined;
  fields?: {
    name: string;
    type: 'string' | 'number' | 'boolean' | 'color';
  }[];
}) => {
  const [showCode, setShowCode] = useState(false);
  const [props, setProps] = useState(defaultProps);
  const elRef = useRef(null);
  const [copied, setCopied] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-2 sm:px-4">
      <div className="w-full max-w-2xl flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center relative top-0 left-0 w-full flex justify-between items-center gap-4 sm:gap-10"
        >
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 break-words text-left">{title}</h1>
          <button
            onClick={() => setShowCode(v => !v)}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              border: '1px solid #ccc',
              background: '#f9f9f9',
              cursor: 'pointer',
            }}
          >
            {showCode ? <FaRegEye /> : <FaCode />}
          </button>
        </motion.div>

        <div
          className="relative my-8 flex items-center justify-center shadow-2xl rounded-lg bg-white w-full min-h-[200px] min-w-0"
          style={{
            padding: '1rem',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
          }}
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 z-10">
            <div className="absolute top-0 bottom-0 left-1/4 w-px bg-gray-300/40" />
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gray-300/60" />
            <div className="absolute top-0 bottom-0 left-3/4 w-px bg-gray-300/60" />
            <div className="absolute left-0 right-0 top-1/4 h-px bg-gray-300/60" />
            <div className="absolute left-0 right-0 top-1/2 h-px bg-gray-300/60" />
            <div className="absolute left-0 right-0 top-3/4 h-px bg-gray-300/60" />
          </div>

          <div className="relative z-20 w-full flex flex-col items-center justify-center min-w-0">
            {!showCode ? (
              <div ref={elRef} className="w-full flex justify-center items-center min-w-0">
                {React.createElement(component, props)}
              </div>
            ) : (
              <div className="relative w-full">
                <button
                  onClick={() => {
                    copy(code);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                  }}
                  className="absolute top-5 right-2 z-30 bg-gray-800 text-black p-1 rounded hover:bg-gray-700 transition"
                  aria-label="Copy code"
                >
                  {copied ? <FaCheck /> : <FaRegCopy />}
                </button>
                <SyntaxHighlighter
                  language="tsx"
                  style={vscDarkPlus}
                  customStyle={{
                    borderRadius: '6px',
                    fontSize: '1em',
                    marginTop: '1rem',
                    maxHeight: '18rem',
                    overflow: 'auto',
                    background: '#1e1e1e',
                  }}
                  showLineNumbers
                >
                  {code}
                </SyntaxHighlighter>
              </div>
            )}
          </div>
        </div>
      </div>
      
      { defaultProps && Object.keys(defaultProps).length > 0 && <ComponentProps props={props} setProps={setProps} fields={fields} />}
    </div>
  );
};

export default UiElement;
