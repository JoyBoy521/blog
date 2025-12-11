import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const contentDir = path.join(process.cwd(), 'src', 'content');

// GET: 获取所有文章列表 或 单个文章内容
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('file');

  try {
    // 确保目录存在
    if (!fs.existsSync(contentDir)) {
      fs.mkdirSync(contentDir, { recursive: true });
    }

    // 模式1：如果 URL 里带了 ?file=xxx，则读取单个文件内容
    if (filename) {
        const safeFilename = filename.replace(/[^a-zA-Z0-9-_\.]/g, '');
        const filePath = path.join(contentDir, safeFilename);
        
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            return NextResponse.json({ content });
        } else {
            return NextResponse.json({ error: 'File not found' }, { status: 404 });
        }
    }

    // 模式2：没带参数，返回所有文件的列表
    const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.mdx'));
    return NextResponse.json({ files });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'System Error' }, { status: 500 });
  }
}

// POST: 保存或新建文章
export async function POST(request: Request) {
  try {
    const { filename, content } = await request.json();
    
    // 自动补全 .mdx 后缀 (如果没写的话)
    const safeFilename = filename.endsWith('.mdx') 
      ? filename.replace(/[^a-zA-Z0-9-_\.]/g, '') 
      : filename.replace(/[^a-zA-Z0-9-_]/g, '') + '.mdx';
      
    const filePath = path.join(contentDir, safeFilename);

    fs.writeFileSync(filePath, content, 'utf8');
    
    return NextResponse.json({ success: true, filename: safeFilename });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}

// DELETE: 删除文章 (新增功能)
export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('file');

    if (!filename) return NextResponse.json({ error: 'Filename required' }, { status: 400 });

    try {
        const safeFilename = filename.replace(/[^a-zA-Z0-9-_\.]/g, '');
        const filePath = path.join(contentDir, safeFilename);
        
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            return NextResponse.json({ success: true });
        }
        return NextResponse.json({ error: 'File not found' }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }
}