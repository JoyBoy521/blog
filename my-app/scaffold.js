const fs = require('fs');
const path = require('path');

// 定义要创建的目录结构
const directories = [
  'public/fonts',
  'public/images',
  'src/app/blog/[slug]',
  'src/app/gallery',
  'src/components/ui',
  'src/components/cyber',
  'src/components/layout',
  'src/lib',
  'src/content',
];

// 定义要创建的文件及其初始内容（占位符）
const files = {
  // UI 组件
  'src/components/ui/NeoButton.tsx': `export function NeoButton({ children }: { children: React.ReactNode }) {
  return <button className="border-2 border-black bg-acid-green px-4 py-2 hover:translate-x-1 hover:translate-y-1 transition-transform">{children}</button>;
}`,
  'src/components/ui/NeoCard.tsx': `export function NeoCard({ children }: { children: React.ReactNode }) {
  return <div className="border-4 border-black bg-white p-4 shadow-hard">{children}</div>;
}`,
  'src/components/ui/Badge.tsx': `export function Badge({ text }: { text: string }) {
  return <span className="bg-hot-pink text-white px-2 py-0.5 text-xs font-bold border border-black">{text}</span>;
}`,

  // 赛博特效组件 (占位)
  'src/components/cyber/TiltCard.tsx': `// TODO: 实现 3D 倾斜逻辑\nexport default function TiltCard({ children }: { children: React.ReactNode }) { return <div>{children}</div>; }`,
  'src/components/cyber/GlitchText.tsx': `// TODO: 实现故障文字效果\nexport default function GlitchText({ text }: { text: string }) { return <span>{text}</span>; }`,
  'src/components/cyber/CrtOverlay.tsx': `// CRT 扫描线组件\nexport default function CrtOverlay() { return <div className="scanlines fixed inset-0 pointer-events-none z-50"></div>; }`,
  'src/components/cyber/CustomCursor.tsx': `// TODO: 实现自定义鼠标\nexport default function CustomCursor() { return null; }`,
  'src/components/cyber/Terminal.tsx': `// TODO: 实现打字机效果\nexport default function Terminal() { return <div>Typewriter...</div>; }`,

  // 布局组件
  'src/components/layout/Navbar.tsx': `export default function Navbar() { return <nav>Navbar</nav>; }`,
  'src/components/layout/Footer.tsx': `export default function Footer() { return <footer>Footer</footer>; }`,

  // 工具函数
  'src/lib/utils.ts': `import { type ClassValue, clsx } from "clsx";\nimport { twMerge } from "tailwind-merge";\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}`,
  'src/lib/constants.ts': `export const SITE_CONFIG = {\n  title: "CYBER_SPACE",\n  description: "My Digital Garden",\n};`,

  // 内容文件
  'src/content/hello-world.mdx': `# Hello World\n\nWelcome to my cyber space.`,
  'src/content/react-renderer.mdx': `# React Renderer\n\nHow to build a custom renderer.`,
  
  // 页面文件占位
  'src/app/blog/[slug]/page.tsx': `export default function BlogPost() { return <div>Blog Post Content</div>; }`,
  'src/app/gallery/page.tsx': `export default function Gallery() { return <div>Gallery Page</div>; }`,
};

// 1. 创建目录
console.log('🚀 开始生成目录结构...');
directories.forEach((dir) => {
  const fullPath = path.join(__dirname, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✅ 创建目录: ${dir}`);
  } else {
    console.log(`👌 目录已存在: ${dir}`);
  }
});

// 2. 创建文件
console.log('\n📄 开始生成文件占位符...');
Object.entries(files).forEach(([filePath, content]) => {
  const fullPath = path.join(__dirname, filePath);
  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, content);
    console.log(`✅ 创建文件: ${filePath}`);
  } else {
    console.log(`⚠️ 文件已存在 (跳过): ${filePath}`);
  }
});

console.log('\n✨ 搞定！项目结构已生成。');
console.log('👉 提示: 请记得安装 clsx 和 tailwind-merge 以支持 utils.ts:');
console.log('   npm install clsx tailwind-merge');