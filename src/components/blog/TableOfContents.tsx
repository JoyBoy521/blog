'use client';

import { List } from 'lucide-react';
import { useEffect, useState } from 'react';

// 生成 ID 的函数，需与服务端逻辑保持一致
const generateId = (text: string) => text.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-');

type TOCItem = {
  level: number;
  text: string;
  id: string;
};

export default function TableOfContents({ content }: { content: string }) {
  const [toc, setToc] = useState<TOCItem[]>([]);

  useEffect(() => {
    // 客户端解析 TOC
    const lines = content.split('\n');
    const items: TOCItem[] = [];
    let inCodeBlock = false;

    for (const line of lines) {
      if (line.trim().startsWith('```')) inCodeBlock = !inCodeBlock;
      if (inCodeBlock) continue;

      const match = line.match(/^(#{1,3})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2].trim();
        const id = generateId(text);
        items.push({ level, text, id });
      }
    }
    setToc(items);
  }, [content]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
        // 关键点：使用 replaceState 修改 URL，不增加历史记录
        // 或者直接滚动，不改 URL (如果你不介意 URL 没有 hash)
        window.history.replaceState(null, '', `#${id}`);
        element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-24">
        <div className="border-4 border-black bg-white p-4 shadow-hard-sm">
            <div className="flex items-center gap-2 font-black border-b-2 border-black pb-2 mb-4">
                <List size={20} />
                <span>TABLE_OF_CONTENTS</span>
            </div>
            {toc.length > 0 ? (
                <nav className="flex flex-col gap-2 font-mono text-sm">
                    {toc.map((item, idx) => (
                        <a 
                            key={idx} 
                            href={`#${item.id}`}
                            onClick={(e) => handleLinkClick(e, item.id)}
                            className={`block hover:text-hot-pink transition-colors truncate cursor-pointer ${
                                item.level === 1 ? 'font-bold' : 
                                item.level === 2 ? 'pl-2 border-l-2 border-gray-200' : 
                                'pl-4 border-l border-gray-100 text-xs text-gray-500'
                            }`}
                            title={item.text}
                        >
                            {item.text}
                        </a>
                    ))}
                </nav>
            ) : (
                <p className="text-gray-400 text-xs font-mono">NO_HEADERS_FOUND</p>
            )}
        </div>
    </div>
  );
}