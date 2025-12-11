import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';

// 定义文章存放路径
const rootDirectory = path.join(process.cwd(), 'src', 'content');

// 定义文章元数据结构
export type Meta = {
  title: string;
  date: string;
  description?: string;
  tags?: string[];
}

export const getPostBySlug = async (slug: string) => {
  const realSlug = slug.replace(/\.mdx$/, '');
  const filePath = path.join(rootDirectory, `${realSlug}.mdx`);

  const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });

  const { frontmatter, content } = await compileMDX<Meta>({
    source: fileContent,
    options: { parseFrontmatter: true }
  });

  return { meta: { ...frontmatter, slug: realSlug }, content };
};

export const getAllPosts = async () => {
  const files = fs.readdirSync(rootDirectory);

  const posts = [];

  for (const file of files) {
    const { meta } = await getPostBySlug(file);
    posts.push(meta);
  }

  // 按日期倒序排列
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};