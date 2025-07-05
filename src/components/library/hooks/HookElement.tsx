/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from 'framer-motion';
import React, { useRef, useState } from 'react';
import { FaCode } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";

const HookElement = ({
  title,
  code,
  component,
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
  const elRef = useRef(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-[750px] flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center relative top-0 left-0 w-full flex justify-between items-center gap-10"
        >
          <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
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
          className="relative my-8 h-[400px] flex items-center justify-center shadow-2xl rounded-lg bg-white w-full"
          style={{
            padding: '2rem',
            minWidth: '320px',
            minHeight: '200px',
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

          <div className="relative z-20 w-full min-w-[500px] flex flex-col items-center justify-center">
            {!showCode ? (
              <div ref={elRef}>
                {React.createElement(component)}
              </div>
            ) : (
              <pre className="max-w-[700px] max-h-[300px] overflow-scroll text-sm" style={{ background: '#222', color: '#fff', padding: '1rem', borderRadius: '4px', marginTop: '1rem', overflowX: 'auto' }}>
                {code}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HookElement;
