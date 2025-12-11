import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const contentDir = path.join(process.cwd(), 'src', 'content');

// 🛡️ 安全核心：文件名消毒函数
// 作用：防止目录遍历攻击 (如 ../../etc/passwd) 和非法字符
const sanitizeFilename = (name: string) => {
  // 1. 移除非法字符，只保留 字母、数字、下划线、短横线、点
  // 2. 将连续的点 .. 替换为单点 . (防止退回上一级目录)
  return name.replace(/[^a-zA-Z0-9-_\.]/g, '').replace(/\.{2,}/g, '.');
};

// GET: 获取列表 或 单个文件
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('file');

  try {
    if (!fs.existsSync(contentDir)) {
      fs.mkdirSync(contentDir, { recursive: true });
    }

    if (filename) {
        // 🛡️ 安全处理：读取前先消毒
        const safeFilename = sanitizeFilename(filename);
        const filePath = path.join(contentDir, safeFilename);
        
        // 再次确认文件确实在 content 目录下 (双重保险)
        if (!filePath.startsWith(contentDir)) {
             return NextResponse.json({ error: 'Access Denied' }, { status: 403 });
        }

        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            return NextResponse.json({ content });
        } else {
            return NextResponse.json({ error: 'File not found' }, { status: 404 });
        }
    }

    const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.mdx') || file.endsWith('.md'));
    return NextResponse.json({ files });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'System Error' }, { status: 500 });
  }
}

// POST: 保存 (重点防护区域)
export async function POST(request: Request) {
  try {
    const { filename, content } = await request.json();
    
    // 1. 基础消毒
    let safeName = sanitizeFilename(filename);

    // 2. 强制后缀检查 (白名单机制)
    // 如果没有合法的后缀，强制追加 .mdx，防止上传 .tsx / .js / .sh 等可执行文件
    if (!safeName.endsWith('.md') && !safeName.endsWith('.mdx')) {
        safeName += '.mdx';
    }

    // 3. 再次确保后缀是安全的 (防止绕过，例如 file.tsx.mdx 是安全的，但 file.mdx.js 是危险的)
    if (!safeName.endsWith('.md') && !safeName.endsWith('.mdx')) {
         return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }
      
    const filePath = path.join(contentDir, safeName);

    // 4. 写入文件
    fs.writeFileSync(filePath, content, 'utf8');
    
    return NextResponse.json({ success: true, filename: safeName });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}

// DELETE: 删除
export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('file');

    if (!filename) return NextResponse.json({ error: 'Filename required' }, { status: 400 });

    try {
        // 🛡️ 安全处理：删除前先消毒
        const safeFilename = sanitizeFilename(filename);
        const filePath = path.join(contentDir, safeFilename);
        
        // 双重保险：防止删除系统文件
        if (!filePath.startsWith(contentDir)) {
            return NextResponse.json({ error: 'Access Denied' }, { status: 403 });
        }

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            return NextResponse.json({ success: true });
        }
        return NextResponse.json({ error: 'File not found' }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }
}