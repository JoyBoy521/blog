import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'src', 'data');
const profilePath = path.join(dataDir, 'profile.json');

// 定义档案结构 (保持不变)
export type SocialLink = {
  platform: string; 
  url: string;
  icon?: string; 
}

export type Profile = {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  socials: SocialLink[]; 
  theme: 'cyber' | 'stewie'; 
};

// 默认数据 (保持不变)
const defaultProfile: Profile = {
  name: "STEWIE.G",
  role: "WORLD DOMINATOR",
  avatar: "https://upload.wikimedia.org/wikipedia/en/0/02/Stewie_Griffin.png",
  bio: "// Victory is mine! 沉迷于时间机器与射线枪的邪恶天才。",
  socials: [
    { platform: 'github', url: 'https://github.com' },
    { platform: 'twitter', url: 'https://twitter.com' },
    { platform: 'mail', url: 'mailto:stewie@familyguy.com' }
  ],
  theme: 'stewie'
};

export function getProfile(): Profile {
  if (!fs.existsSync(profilePath)) {
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    fs.writeFileSync(profilePath, JSON.stringify(defaultProfile, null, 2));
    return defaultProfile;
  }
  
  // 🔥 核心修复：
  // 1. 禁用 Node.js 模块缓存：确保我们总是从磁盘读取最新的 JSON 文件。
  // 2. 使用 fs.readFileSync 确保读取的是最新文件。
  
  // 强制清除 Node.js 缓存 (这是 Node.js 进程级的，确保读取的文件是最新的)
  // 生产环境通常不需要 this，但如果 Next.js 模块缓存干扰，这是最可靠的方法
  if (require.cache[profilePath]) {
      delete require.cache[profilePath];
  }
  
  // 每次都从磁盘同步读取最新文件
  const rawData = fs.readFileSync(profilePath, 'utf8');
  const data = JSON.parse(rawData);
  
  // 兼容旧数据（略）
  if (!data.socials) {
      data.socials = [];
      if (data.github) data.socials.push({ platform: 'github', url: data.github });
      if (data.twitter) data.socials.push({ platform: 'twitter', url: data.twitter });
      if (data.email) data.socials.push({ platform: 'mail', url: data.email });
  }
  return data;
}

export function saveProfile(data: Profile) {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(profilePath, JSON.stringify(data, null, 2));
  return data;
}