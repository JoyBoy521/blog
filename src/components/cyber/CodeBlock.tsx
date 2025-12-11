'use client';

import { useState, useRef } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

export default function CodeBlock({ children, className, ...props }: any) {
  const [isCopied, setIsCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  // 提取语言类型
  const language = className?.replace(/language-/, '') || 'text';

  const handleCopy = async () => {
    if (preRef.current) {
      const text = preRef.current.innerText;
      try {
        // 优先使用新版 API
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        // 降级处理
        try {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (e) {
            console.error('Copy failed', e);
        }
      }
    }
  };

  return (
    <div className="my-6 border-2 border-gray-800 bg-[#0d0d0d] rounded-md overflow-hidden shadow-sm group">
      {/* 终端头部 */}
      <div className="bg-[#1a1a1a] px-3 py-1.5 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
          </div>
          <div className="flex items-center gap-1.5 ml-2 text-gray-500 font-mono text-[10px] uppercase">
            <Terminal size={10} />
            <span>{language}</span>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono font-bold text-gray-400 hover:text-white transition-colors"
          title="Copy Code"
        >
          {isCopied ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
          <span>{isCopied ? 'COPIED' : 'COPY'}</span>
        </button>
      </div>

      {/* 代码区域：限制最大高度 + 垂直滚动 */}
      <div className="relative">
        <pre
          ref={preRef}
          {...props}
          // max-h-[500px] 限制高度，overflow-auto 允许滚动
          className={`p-4 overflow-auto max-h-[500px] font-mono text-sm leading-relaxed text-[#a6accd] selection:bg-hot-pink selection:text-white custom-scrollbar ${className}`}
        >
          {children}
        </pre>
      </div>
    </div>
  );
}