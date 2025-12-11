export const META_KEYS = ['title', 'date', 'description', 'tags', 'featured'];

export const parseFile = (raw: string) => {
  const meta: any = {
    title: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    tags: [],
    featured: false,
  };
  
  let body = raw;
  let frontMatterBlock = '';

  // 1. 尝试匹配标准的 --- 包裹区域
  const standardMatch = /^\s*---\s*([\s\S]*?)\s*---/.exec(raw);
  
  if (standardMatch) {
    frontMatterBlock = standardMatch[1];
    body = raw.replace(standardMatch[0], '').trim();
  } 
  // 2. 容错模式：如果没写 ---，但开头看起来像元数据 (例如 title: ...)
  else if (raw.trim().startsWith('title:')) {
    // 尝试找到第一个双换行或 # 标题作为正文分界
    const splitIndex = raw.search(/\n\s*\n|#\s/);
    if (splitIndex !== -1) {
        frontMatterBlock = raw.slice(0, splitIndex);
        body = raw.slice(splitIndex).trim();
    } else {
        // 全是元数据
        frontMatterBlock = raw;
        body = ''; 
    }
  }

  // 3. 统一解析提取出来的元数据块
  if (frontMatterBlock) {
    META_KEYS.forEach(key => {
      // 强大的正则：匹配 key: value，直到遇到下一个 key 或 字符串结束
      const regex = new RegExp(`${key}:\\s*(.*?)(?=\\s*(?:${META_KEYS.join('|')}):|$)`, 'i');
      const valueMatch = regex.exec(frontMatterBlock);

      if (valueMatch) {
        let val = valueMatch[1].trim();
        // 清理首尾引号和可能的逗号
        val = val.replace(/^['"]|['"]$/g, '').replace(/,$/, '');
        
        if (key === 'tags') {
           // 处理数组格式 ['a', 'b']
           if (val.startsWith('[') && val.endsWith(']')) {
             meta[key] = val.slice(1, -1).split(',').map((s: string) => s.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean);
           }
        } 
        else if (key === 'featured') {
            meta[key] = val === 'true';
        } 
        else {
            meta[key] = val;
        }
      }
    });
  }

  return { meta, body };
};

export const stringifyFile = (meta: any, body: string) => {
  const tagsString = `['${meta.tags.join("', '")}']`;
  // 强制使用标准格式保存，方便下次读取
  return `---
title: ${meta.title}
date: '${meta.date}'
description: ${meta.description}
tags: ${tagsString}
featured: ${meta.featured}
---

${body}`;
};