import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { Calendar, Tag, FileWarning } from "lucide-react";
import { compileMDX } from 'next-mdx-remote/rsc';
import CodeBlock from '@/components/cyber/CodeBlock';
import ImageZoom from '@/components/blog/ImageZoom';
import BackButton from '@/components/ui/BackButton'; 
import TableOfContents from '@/components/blog/TableOfContents';

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

const generateId = (text: string) => text.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-');

const components = {
  h1: ({ key, ...p }: any) => <h1 key={key} id={generateId(p.children?.toString() || '')} {...p} className="text-3xl md:text-4xl font-black mb-6 mt-10 glitch-text border-b-4 border-black pb-4 scroll-mt-24" data-text={p.children} />,
  h2: ({ key, ...p }: any) => (
    <h2 key={key} id={generateId(p.children?.toString() || '')} {...p} className="text-xl md:text-2xl font-bold mb-4 mt-8 flex items-center gap-2 px-1 relative inline-block scroll-mt-24">
      <span className="absolute inset-0 bg-acid-green/20 -skew-x-12" />
      <span className="relative z-10 before:content-['#'] before:text-hot-pink before:mr-2">{p.children}</span>
    </h2>
  ),
  h3: ({ key, ...p }: any) => <h3 key={key} id={generateId(p.children?.toString() || '')} {...p} className="text-lg md:text-xl font-bold mb-3 mt-6 text-gray-800 scroll-mt-24" />,
  p: ({ key, ...p }: any) => <p key={key} {...p} className="mb-4 leading-7 text-base md:text-lg text-gray-800 font-medium" />,
  ul: ({ key, ...p }: any) => <ul key={key} {...p} className="list-disc list-inside mb-4 space-y-1 ml-4 marker:text-hot-pink" />,
  blockquote: ({ key, ...p }: any) => (
    <blockquote key={key} {...p} className="border-l-4 border-acid-green bg-gray-50 p-6 my-6 font-mono text-sm shadow-hard-sm relative">
       <div className="absolute top-0 right-0 p-1 bg-acid-green text-[10px] font-bold text-black">SYS_MSG</div>
       {p.children}
    </blockquote>
  ),
  pre: CodeBlock,
  img: (props: any) => <ImageZoom {...props} />,
};

function SafeMarkdownRenderer({ content }: { content: string }) {
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];
  let codeBlockLang = 'txt';

  return (
    <div className="prose prose-lg max-w-none">
      <div className="bg-warning-yellow/20 border-l-4 border-warning-yellow p-4 mb-8 font-mono text-sm flex items-center gap-2">
         <FileWarning className="text-warning-yellow" />
         <span><strong>RENDER_MODE: SAFE</strong> (Raw Content Display)</span>
      </div>

      {content.split('\n').map((line, i) => {
        if (line.trim().startsWith('```')) {
            if (inCodeBlock) {
                inCodeBlock = false;
                const code = codeBlockContent.join('\n');
                codeBlockContent = [];
                return <CodeBlock key={i} className={`language-${codeBlockLang}`}>{code}</CodeBlock>;
            } else {
                inCodeBlock = true;
                codeBlockLang = line.trim().slice(3) || 'txt';
                return null;
            }
        }

        if (inCodeBlock) {
            codeBlockContent.push(line);
            return null;
        }

        if (line.startsWith('# ')) return components.h1({ children: line.slice(2), key: i });
        if (line.startsWith('## ')) return components.h2({ children: line.slice(3), key: i });
        if (line.startsWith('### ')) return components.h3({ children: line.slice(4), key: i });
        if (line.startsWith('> ')) return components.blockquote({ children: line.slice(2), key: i });
        
        if (line.trim().startsWith('- ')) {
             return (
                <div key={i} className="flex gap-3 my-2 pl-4 items-start">
                    <span className="text-hot-pink mt-1.5 text-[10px]">●</span>
                    <span className="text-gray-800 font-medium">{line.trim().slice(2)}</span>
                </div>
             );
        }

        const imgMatch = line.match(/!\[(.*?)\]\((.*?)\)/);
        if (imgMatch) {
            return <ImageZoom key={i} src={imgMatch[2]} alt={imgMatch[1]} />;
        }
        
        if (line.trim() === '---' || line.trim() === '***') {
            return <div key={i} className="my-8 h-1 w-full bg-black/10 flex justify-center items-center gap-4"><div className="w-1 h-1 bg-black rounded-full"></div><div className="w-1 h-1 bg-black rounded-full"></div><div className="w-1 h-1 bg-black rounded-full"></div></div>;
        }

        if (line.trim() === '') return <div key={i} className="h-4"></div>;

        return components.p({ children: line, key: i });
      })}
    </div>
  );
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const contentDir = path.join(process.cwd(), 'src', 'content');
  
  let filePath = path.join(contentDir, `${decodeURIComponent(slug)}.mdx`);
  if (!existsSync(filePath)) {
      filePath = path.join(contentDir, `${decodeURIComponent(slug)}.md`);
  }
  
  if (!existsSync(filePath)) {
    return (
      <div className="min-h-screen flex items-center justify-center font-mono bg-black text-white">
        <h1 className="text-4xl glitch-text" data-text="404">404: FILE_NOT_FOUND</h1>
      </div>
    );
  }

  const { meta, content: rawContent } = parsePost(readFileSync(filePath, 'utf8'));
  
  // FIX: 移除 HTML 注释 <!-- --> 以防止 MDX 解析错误
  const cleanContent = rawContent.replace(/<!--[\s\S]*?-->/g, '');

  let content;
  let useSafeMode = false;

  try {
    const res = await compileMDX({ 
        source: cleanContent, 
        options: { parseFrontmatter: false }, 
        components 
    });
    content = res.content;
  } catch (err) {
    console.error("MDX Compilation Error:", err);
    useSafeMode = true;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
      <BackButton />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 左侧：文章主体 */}
        <div className="lg:col-span-9">
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

            <article className={`min-h-[50vh] border-4 border-black p-6 md:p-12 shadow-hard relative overflow-hidden bg-white`}>
                <div className="absolute -top-10 -right-10 text-[8rem] font-black opacity-5 pointer-events-none select-none font-display">MDX</div>
                <div className="relative z-10 prose prose-lg prose-headings:font-black prose-p:font-medium max-w-none prose-pre:p-0 prose-pre:bg-transparent prose-pre:border-none prose-pre:m-0 prose-code:!bg-transparent prose-code:!text-inherit prose-code:!p-0 prose-code:!font-normal prose-code:before:!content-none prose-code:after:!content-none">
                {useSafeMode ? <SafeMarkdownRenderer content={cleanContent} /> : content}
                </div>
            </article>
        </div>

        {/* 右侧：客户端渲染的大纲 */}
        <div className="hidden lg:block lg:col-span-3">
            {/* 传入清理后的内容给客户端组件解析大纲，防止大纲也解析到注释 */}
            <TableOfContents content={cleanContent} />
        </div>
      </div>

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