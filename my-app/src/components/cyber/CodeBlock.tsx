'use client';

import { useState, useRef } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

export default function CodeBlock({ children, ...props }: any) {
  const [isCopied, setIsCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    if (preRef.current) {
      const text = preRef.current.innerText;
      try {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <div className="my-8 border-4 border-black bg-[#0d0d0d] relative group shadow-hard-sm">
      {/* 终端头部：增加了复制按钮 */}
      <div className="bg-[#1a1a1a] p-2 flex items-center justify-between border-b-2 border-gray-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>
          <div className="flex items-center gap-2 ml-3 text-gray-500 font-mono text-xs">
            <Terminal size={12} />
            <span>bash</span>
          </div>
        </div>

        {/* 复制按钮 */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-0.5 text-xs font-mono font-bold text-gray-400 hover:text-acid-green hover:bg-white/10 transition-colors border border-transparent hover:border-acid-green rounded-sm"
          title="Copy Code"
        >
          {isCopied ? (
            <>
              <Check size={14} className="text-acid-green" />
              <span className="text-acid-green">COPIED</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>COPY</span>
            </>
          )}
        </button>
      </div>

      {/* 代码区域：增加了更好的字体设置和行高，提高可读性 */}
      <div className="relative overflow-hidden">
        <pre
          ref={preRef}
          {...props}
          className="p-5 overflow-x-auto font-mono text-sm md:text-base leading-relaxed text-[#a6accd] selection:bg-hot-pink selection:text-white"
        >
          {children}
        </pre>
      </div>
      
      {/* 装饰性光标闪烁效果 */}
      <div className="absolute bottom-4 right-4 w-2 h-4 bg-acid-green animate-pulse pointer-events-none opacity-50" />
    </div>
  );
}