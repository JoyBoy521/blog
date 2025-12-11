import React from 'react';

// 高对比度、赛博风格的实时渲染器
export default function LivePreview({ content }: { content: string }) {
  // 简单的状态追踪，用于渲染代码块
  let inCodeBlock = false;

  return (
    <div className="font-mono text-sm leading-relaxed text-gray-200">
      {content.split('\n').map((line, i) => {
        // --- 1. 处理代码块包裹 ---
        if (line.trim().startsWith('```')) {
            inCodeBlock = !inCodeBlock;
            return (
                <div key={i} className="my-4 border-y border-gray-700 bg-gray-800/50 py-1 text-center text-[10px] text-gray-500 uppercase tracking-widest select-none">
                    {inCodeBlock ? '/// CODE_BLOCK_START ///' : '/// CODE_BLOCK_END ///'}
                </div>
            );
        }

        if (inCodeBlock) {
            return (
                <div key={i} className="bg-[#050505] px-4 py-0.5 border-l-2 border-gray-800 text-acid-green whitespace-pre-wrap font-bold overflow-x-auto">
                    {line || ' '}
                </div>
            );
        }

        // --- 2. 处理普通 Markdown 语法 ---
        
        // H1 标题
        if (line.startsWith('# ')) {
            return <h1 key={i} className="text-3xl font-black text-white mb-6 mt-10 border-b-4 border-white/20 pb-2 uppercase tracking-tight">{line.slice(2)}</h1>;
        }
        // H2 标题
        if (line.startsWith('## ')) {
            return <h2 key={i} className="text-xl font-bold text-hot-pink mb-4 mt-8 flex items-center before:content-['#'] before:mr-2 before:opacity-50">{line.slice(3)}</h2>;
        }
        // H3 标题
        if (line.startsWith('### ')) {
            return <h3 key={i} className="text-lg font-bold text-acid-green mb-3 mt-6 pl-2 border-l-2 border-acid-green">{line.slice(4)}</h3>;
        }
        
        // 引用块
        if (line.startsWith('> ')) {
            return (
                <div key={i} className="border-l-4 border-warning-yellow bg-warning-yellow/10 p-4 my-4 text-warning-yellow italic relative">
                    <span className="absolute -top-2 -left-2 text-2xl opacity-50">"</span>
                    {line.slice(2)}
                </div>
            );
        }

        // 无序列表
        if (line.trim().startsWith('- ')) {
            return (
                <div key={i} className="flex gap-3 my-2 pl-2">
                    <span className="text-acid-green mt-1">●</span>
                    <span className="text-gray-300">{line.trim().slice(2)}</span>
                </div>
            );
        }

        // 图片
        const imgMatch = line.match(/!\[(.*?)\]\((.*?)\)/);
        if (imgMatch) {
            return (
                <div key={i} className="my-6 border-2 border-gray-600 bg-black p-2 group">
                    <div className="overflow-hidden">
                        <img src={imgMatch[2]} alt={imgMatch[1]} className="w-full h-auto opacity-90 group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="text-center text-xs text-gray-500 mt-2 font-bold uppercase tracking-widest border-t border-gray-800 pt-2">{imgMatch[1]}</div>
                </div>
            );
        }
        
        // 分割线
        if (line.trim() === '---' || line.trim() === '***') {
            return <div key={i} className="my-8 h-1 w-full bg-gray-800 flex justify-center items-center gap-4"><div className="w-2 h-2 bg-gray-500 rounded-full"></div><div className="w-2 h-2 bg-gray-500 rounded-full"></div><div className="w-2 h-2 bg-gray-500 rounded-full"></div></div>;
        }

        // 空行
        if (line.trim() === '') return <div key={i} className="h-4"></div>;

        // 普通段落 (支持 **加粗** 和 `行内代码`)
        const parts = line.split(/(\*\*.*?\*\*|`.*?`)/g);
        return (
          <p key={i} className="mb-2 text-gray-300 leading-7">
            {parts.map((part, j) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <span key={j} className="text-white font-bold bg-white/10 px-1 mx-0.5 rounded">{part.slice(2, -2)}</span>;
              }
              if (part.startsWith('`') && part.endsWith('`')) {
                return <span key={j} className="text-hot-pink bg-black border border-gray-800 px-1.5 mx-1 font-bold font-mono text-xs rounded">{part.slice(1, -1)}</span>;
              }
              return part;
            })}
          </p>
        );
      })}
    </div>
  );
}