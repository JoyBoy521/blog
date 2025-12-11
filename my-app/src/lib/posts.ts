import fs from 'fs';
import path from 'path';

export type PostMeta = {
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  [key: string]: any;
};

export type Post = {
  slug: string;
  content: string;
  body: string;
} & PostMeta;

const contentDir = path.join(process.cwd(), 'src', 'content');

export const parsePostContent = (raw: string) => {
  const match = /^\s*---\s*([\s\S]*?)\s*---/.exec(raw);
  const meta: any = {};
  let body = raw;

  if (match) {
    const frontMatterBlock = match[1];
    body = raw.replace(match[0], '').trim();
    
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
  }

  return { meta: meta as PostMeta, body };
};

export function getAllPosts(): Post[] {
  if (!fs.existsSync(contentDir)) return [];
  
  // 核心修改：同时读取 .md 和 .mdx
  const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.mdx') || file.endsWith('.md'));
  
  const posts = files.map(file => {
    // 移除后缀作为 slug
    const slug = file.replace(/\.mdx?$/, '');
    const raw = fs.readFileSync(path.join(contentDir, file), 'utf-8');
    const { meta, body } = parsePostContent(raw);
    
    return {
      slug,
      content: raw,
      body,
      ...meta,
    };
  });

  return posts.sort((a, b) => {
    const dateA = new Date(a.date || 0).getTime();
    const dateB = new Date(b.date || 0).getTime();
    return dateB - dateA;
  });
}

export function getPostBySlug(slug: string): Post | null {
  // 核心修改：先找 .mdx，找不到再找 .md
  let filePath = path.join(contentDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(contentDir, `${slug}.md`);
  }
  
  if (!fs.existsSync(filePath)) return null;
  
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { meta, body } = parsePostContent(raw);
  
  return {
    slug,
    content: raw,
    body,
    ...meta,
  };
}