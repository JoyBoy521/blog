import { readFileSync, existsSync } from 'fs';
import path from 'path';
import Link from "next/link";
import { ArrowLeft, AlertTriangle, Calendar, Tag } from "lucide-react";
import { compileMDX } from 'next-mdx-remote/rsc';
import CodeBlock from '@/components/cyber/CodeBlock';

// ... (Meta 类型定义和工具函数保持不变) ...
// 必须保留 Meta 类型和 parsePost 函数
type Meta = {
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  [key: string]: any;
}

const parsePost = (raw: string) => {
  const match = /^\s*---\s*([\s\S]*?)\s*---/.exec(raw);
  if (!match) return { meta: {} as Meta, content: raw };

  const frontMatterBlock = match[1];
  const meta: any = {};
  const keys = ['title', 'date', 'description', 'tags'];
  
  keys.forEach(key => {
    const regex = new RegExp(`${key}:\\s*(.*?)(?=\\s*(?:${keys.join('|')}):|$)`, 'i');
    const valueMatch = regex.exec(frontMatterBlock);
    if (valueMatch) {
      let val = valueMatch[1].trim().replace(/^['"]|['"]$/g, '');
      if (key === 'tags' && val.startsWith('[') && val.endsWith(']')) {
        meta[key] = val.slice(1, -1).split(',').map((s: string) => s.trim().replace(/^['"]|['"]$/g, ''));
      } else {
        meta[key] = val;
      }
    }
  });

  return { meta: meta as Meta, content: raw.replace(match[0], '').trim() };
};

const components = {
  h1: (p: any) => <h1 {...p} className="text-3xl md:text-4xl font-black mb-6 mt-10 glitch-text border-b-4 border-black pb-4" data-text={p.children} />,
  h2: (p: any) => (
    <h2 {...p} className="text-xl md:text-2xl font-bold mb-4 mt-8 flex items-center gap-2 px-1 relative inline-block">
      <span className="absolute inset-0 bg-acid-green/20 -skew-x-12" />
      <span className="relative z-10 before:content-['#'] before:text-hot-pink before:mr-2">{p.children}</span>
    </h2>
  ),
  h3: (p: any) => <h3 {...p} className="text-lg md:text-xl font-bold mb-3 mt-6 text-gray-800" />,
  p: (p: any) => <p {...p} className="mb-4 leading-7 text-base md:text-lg text-gray-800 font-medium" />,
  ul: (p: any) => <ul {...p} className="list-disc list-inside mb-4 space-y-1 ml-4 marker:text-hot-pink" />,
  blockquote: (p: any) => (
    <blockquote {...p} className="border-l-4 border-acid-green bg-gray-50 p-6 my-6 font-mono text-sm shadow-hard-sm relative">
       <div className="absolute top-0 right-0 p-1 bg-acid-green text-[10px] font-bold text-black">SYS_MSG</div>
       {p.children}
    </blockquote>
  ),
  pre: CodeBlock,
};

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const contentDir = path.join(process.cwd(), 'src', 'content');
  
  // 核心修改：智能判断文件后缀
  // 先尝试 .mdx
  let filePath = path.join(contentDir, `${decodeURIComponent(slug)}.mdx`);
  // 如果不存在，尝试 .md
  if (!existsSync(filePath)) {
      filePath = path.join(contentDir, `${decodeURIComponent(slug)}.md`);
  }
  
  if (!existsSync(filePath)) {
    return (
      <div className="min-h-screen flex items-center justify-center font-mono bg-black text-white">
        <h1 className="text-4xl glitch-text" data-text="404">404: FILE_NOT_FOUND</h1>
        <p className="text-xs text-gray-500 mt-2">Looking for: {slug}</p>
      </div>
    );
  }

  const { meta, content: rawContent } = parsePost(readFileSync(filePath, 'utf8'));
  let content;
  let hasError = false;

  try {
    const res = await compileMDX({ source: rawContent, options: { parseFrontmatter: false }, components });
    content = res.content;
  } catch (err) {
    hasError = true;
    content = (
      <div className="border-4 border-red-500 bg-black p-4 text-red-500 font-mono text-xs overflow-auto">
        <div className="flex items-center gap-2 border-b-2 border-red-500 pb-2 mb-2 font-bold">
          <AlertTriangle size={16} /> SYSTEM_ERROR
        </div>
        <pre>{rawContent}</pre>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      <Link href="/" className="inline-flex items-center gap-2 font-mono font-bold hover:text-hot-pink transition-colors mb-8 bg-white border-2 border-black px-4 py-2 shadow-hard-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-x-1 active:translate-y-1">
        <ArrowLeft size={16} /> BACK_TO_BASE
      </Link>

      <header className="mb-12 border-l-8 border-black pl-6 md:pl-10 py-2">
        <div className="flex flex-wrap gap-4 mb-6 font-mono text-xs md:text-sm">
          <div className="flex items-center gap-2 bg-acid-green border-2 border-black px-3 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold text-black">
            <Calendar size={14} /> <span>{meta.date || 'UNKNOWN'}</span>
          </div>
          {meta.tags?.map((tag: string) => (
            <div key={tag} className="flex items-center gap-2 bg-white border-2 border-black px-3 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-gray-600">
              <Tag size={14} /> <span>{tag}</span>
            </div>
          ))}
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black mb-6 uppercase leading-tight tracking-tight break-words" style={{ textShadow: '3px 3px 0px #ccff00' }}>
          {meta.title || decodeURIComponent(slug)}
        </h1>
        
        {meta.description && (
          <p className="text-lg md:text-xl font-mono text-gray-600 pl-6 py-2 italic bg-gray-50 border-r-2 border-gray-200 relative">
             <span className="absolute top-0 left-0 w-1 h-full bg-hot-pink" /> // {meta.description}
          </p>
        )}
      </header>

      <article className={`min-h-[50vh] border-4 border-black p-6 md:p-12 shadow-hard relative overflow-hidden ${hasError ? 'bg-gray-100' : 'bg-white'}`}>
        <div className="absolute -top-10 -right-10 text-[8rem] font-black opacity-5 pointer-events-none select-none font-display">MDX</div>
        <div className="relative z-10 prose prose-lg prose-headings:font-black prose-p:font-medium max-w-none prose-pre:p-0 prose-pre:bg-transparent prose-pre:border-none prose-pre:m-0 prose-code:!bg-transparent prose-code:!text-inherit prose-code:!p-0 prose-code:!font-normal prose-code:before:!content-none prose-code:after:!content-none">
           {content}
        </div>
      </article>

      <div className="mt-16 p-8 border-4 border-black bg-warning-yellow text-center shadow-hard relative overflow-hidden group">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px)', backgroundSize: '100% 4px' }}></div>
        <p className="font-mono font-bold text-xl mb-6 relative z-10">Did you find the bug in the Matrix?</p>
        <button className="border-4 border-black bg-white px-10 py-4 font-black text-lg hover:bg-black hover:text-white transition-all hover:scale-105 shadow-hard hover:shadow-neon-pink relative z-10">
          INITIATE_SHARE_PROTOCOL
        </button>
      </div>
    </div>
  );
}