import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const contentDir = path.join(process.cwd(), 'src', 'content');

// GET: 获取列表 或 单个文件
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('file');

  try {
    if (!fs.existsSync(contentDir)) {
      fs.mkdirSync(contentDir, { recursive: true });
    }

    if (filename) {
        // 读取单个文件：直接使用传入的完整文件名 (包含后缀)
        const filePath = path.join(contentDir, filename);
        
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            return NextResponse.json({ content });
        } else {
            return NextResponse.json({ error: 'File not found' }, { status: 404 });
        }
    }

    // 核心修改：过滤 .md 和 .mdx
    const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.mdx') || file.endsWith('.md'));
    return NextResponse.json({ files });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'System Error' }, { status: 500 });
  }
}

// POST: 保存
export async function POST(request: Request) {
  try {
    const { filename, content } = await request.json();
    
    // 如果文件名没有后缀，默认加 .mdx (你可以改为 .md)
    let safeFilename = filename;
    if (!filename.endsWith('.md') && !filename.endsWith('.mdx')) {
        safeFilename += '.mdx';
    }
      
    const filePath = path.join(contentDir, safeFilename);
    fs.writeFileSync(filePath, content, 'utf8');
    
    return NextResponse.json({ success: true, filename: safeFilename });
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
        const filePath = path.join(contentDir, filename);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            return NextResponse.json({ success: true });
        }
        return NextResponse.json({ error: 'File not found' }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }
}