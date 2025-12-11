import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'src', 'data');
const profilePath = path.join(dataDir, 'profile.json');

// 定义档案结构
export type Profile = {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  github: string;
  twitter: string;
  email: string;
  theme: 'cyber' | 'stewie'; // 预留主题切换
};

// 默认的 Stewie Griffin 风格数据
const defaultProfile: Profile = {
  name: "STEWIE.G",
  role: "WORLD DOMINATOR",
  avatar: "https://upload.wikimedia.org/wikipedia/en/0/02/Stewie_Griffin.png", // 这里的图片链接仅作示例，建议稍后换成你喜欢的
  bio: "// Victory is mine! 沉迷于时间机器与射线枪的邪恶天才。",
  github: "https://github.com",
  twitter: "https://twitter.com",
  email: "stewie@familyguy.com",
  theme: 'stewie'
};

export function getProfile(): Profile {
  if (!fs.existsSync(profilePath)) {
    // 如果文件不存在，创建默认的
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    fs.writeFileSync(profilePath, JSON.stringify(defaultProfile, null, 2));
    return defaultProfile;
  }
  return JSON.parse(fs.readFileSync(profilePath, 'utf8'));
}

export function saveProfile(data: Profile) {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(profilePath, JSON.stringify(data, null, 2));
  return data;
}