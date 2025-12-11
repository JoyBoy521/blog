import { Github, Twitter, Mail, Music, ArrowUpRight, Ghost, FileText, Terminal, Calendar, Linkedin, Instagram, Youtube, Globe, Zap, Radio, Disc, Cpu, Activity, Fingerprint, Crosshair, BarChart3, Volume2, Mic2, Waves, Aperture, Power } from "lucide-react";
import Link from "next/link";
import TiltCard from "@/components/cyber/TiltCard";
import SystemStatus from "@/components/cyber/SystemStatus";
import { getAllPosts } from "@/lib/posts"; 
import { getProfile } from "@/lib/profile";
import { Metadata } from "next";

// 🔥 核心修复：强制动态渲染
// 这会让页面每次被访问时都去读取最新的 profile.json 数据
export const dynamic = 'force-dynamic';

// 页面标题配置
export const metadata: Metadata = {
  title: "CYBER_SPACE | 核心控制台",
  description: "Welcome to the digital void.",
};

// 映射图标
const IconMap: any = {
    github: Github,
    twitter: Twitter,
    mail: Mail,
    linkedin: Linkedin,
    instagram: Instagram,
    youtube: Youtube,
    website: Globe,
    default: Globe
};

export default async function Home() {
  // 每次访问都会重新获取最新数据
  const posts = getAllPosts();
  const profile = getProfile();
  
  const latestPost = posts[0]; 
  const archivePosts = posts.slice(1); 

  return (
    <div className="max-w-7xl mx-auto mt-16 p-4 md:p-8 mb-24">
      
      {/* --- 第一部分：Bento Grid 仪表盘 --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)] md:auto-rows-[280px] mb-6">
        
        {/* 1. 个人 ID 卡片 (The Operator Style) - 全息战术风格 */}
        <TiltCard className="md:col-span-1 md:row-span-1 relative group overflow-hidden bg-[#050505] text-white">
          <div className="h-full border-4 border-black bg-black flex flex-col relative z-10 overflow-hidden">
            
            {/* 1. 背景层：深邃数字虚空 */}
            <div className="absolute inset-0 z-0 bg-[#080808]">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [transform-origin:center] group-hover:scale-150 group-hover:opacity-20 transition-all duration-700 ease-in-out"></div>
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-indigo-900/20 to-transparent"></div>
            </div>

            {/* 2. 人物层：全彩悬浮 */}
            <div className="absolute inset-0 z-10 flex items-center justify-center translate-y-4 group-hover:translate-y-2 transition-transform duration-500">
                 {/* 背后光晕 */}
                 <div className="absolute w-32 h-32 bg-white/5 rounded-full blur-[50px] group-hover:bg-indigo-500/20 transition-colors duration-500"></div>
                 
                 <img 
                    src={profile.avatar || "https://upload.wikimedia.org/wikipedia/en/0/02/Stewie_Griffin.png"} 
                    alt="Avatar" 
                    className="w-48 h-48 object-cover drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] scale-100 group-hover:scale-105 transition-transform duration-500 ease-out z-20" 
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)' }} 
                 />
            </div>

            {/* 3. 前景 HUD 层 */}
            <div className="relative z-20 h-full flex flex-col justify-between p-4 pointer-events-none">
                {/* 顶部标签 */}
                <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-0.5">
                        <span className="text-[9px] font-mono text-gray-500 tracking-widest">TARGET_ID</span>
                        <span className="text-xl font-black italic leading-none text-white mix-blend-difference">
                             {profile.name ? (
                                <>
                                  {profile.name.substring(0, 3)}
                                  <span className="text-gray-600">{profile.name.substring(3)}</span>
                                </>
                             ) : 'UNK'}
                        </span>
                    </div>
                    <div className="w-2 h-2 bg-acid-green shadow-[0_0_10px_#ccff00] animate-pulse"></div>
                </div>

                {/* 底部信息 */}
                <div className="pointer-events-auto">
                    <div className="flex items-end justify-between">
                         <div className="bg-black/80 backdrop-blur-md border-l-2 border-acid-green pl-2 pr-4 py-1">
                             <p className="font-mono text-[9px] text-gray-400 mb-0.5">CURRENT_ROLE</p>
                             <p className="font-bold text-xs text-acid-green tracking-wider">{profile.role || "NET_RUNNER"}</p>
                         </div>
                         
                         {/* 社交链接 */}
                         <div className="flex gap-1">
                            {profile.socials.slice(0, 3).map((social: any, idx: number) => {
                                const Icon = IconMap[social.platform.toLowerCase()] || IconMap.default;
                                return (
                                    <a 
                                        key={idx} 
                                        href={social.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="w-8 h-8 bg-black border border-gray-700 hover:border-white text-gray-400 hover:text-white flex items-center justify-center transition-all hover:-translate-y-1"
                                    >
                                        <Icon size={14} />
                                    </a>
                                )
                            })}
                         </div>
                    </div>
                </div>
            </div>

            {/* 装饰角标 */}
            <div className="absolute top-2 left-2 w-4 h-1 bg-white/20"></div>
            <div className="absolute top-2 left-2 w-1 h-4 bg-white/20"></div>
            <div className="absolute bottom-2 right-2 w-4 h-1 bg-white/20"></div>
            <div className="absolute bottom-2 right-2 w-1 h-4 bg-white/20"></div>
          </div>
        </TiltCard>

        {/* 2. 文章列表 (Matrix Style) */}
        <TiltCard className="md:col-span-2 relative overflow-hidden group bg-black font-mono">
          <div className="h-full w-full border-4 border-black bg-[#050505] p-0 relative flex flex-col">
              <div className="bg-[#111] border-b border-[#333] p-1.5 flex justify-between items-center shrink-0">
                  <div className="flex items-center gap-2 px-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                      <span className="text-xs text-acid-green font-bold tracking-wider">ROOT@CYBER_SPACE:~# tail -f posts.log</span>
                  </div>
              </div>

              <div className="flex-1 overflow-y-auto p-0 min-h-0 custom-scrollbar relative">
                  <div className="absolute top-0 right-0 p-4 opacity-10 text-[10px] text-green-800 pointer-events-none select-none text-right hidden sm:block">
                      {Array.from({length: 10}).map((_, i) => <div key={i}>{Math.random().toString(2).slice(2)}</div>)}
                  </div>

                  {posts.map((post, idx) => (
                      <Link 
                          key={post.slug} 
                          href={`/blog/${post.slug}`}
                          className="flex items-stretch border-b border-[#222] hover:bg-[#111] transition-colors group/item cursor-pointer text-sm"
                      >
                          <div className="w-8 bg-[#0a0a0a] text-gray-700 border-r border-[#222] flex items-center justify-center text-[10px] select-none group-hover/item:text-acid-green">
                              {String(idx + 1).padStart(2, '0')}
                          </div>
                          
                          <div className="flex-1 p-2 min-w-0 flex items-center gap-3">
                              <span className="text-green-600 group-hover/item:text-acid-green opacity-50 group-hover/item:opacity-100 font-bold">&gt;</span>
                              <div className="flex-1 truncate">
                                  <span className="text-gray-300 group-hover/item:text-white font-medium transition-colors">{post.title || post.slug}</span>
                                  {idx === 0 && <span className="ml-2 text-[9px] bg-acid-green text-black px-1 font-bold animate-pulse">NEW</span>}
                              </div>
                              <span className="text-[10px] text-gray-600 group-hover/item:text-acid-green hidden sm:block whitespace-nowrap">
                                  [{post.date}]
                              </span>
                          </div>
                          <div className="w-1 bg-transparent group-hover/item:bg-acid-green transition-colors"></div>
                      </Link>
                  ))}
              </div>
              
              <div className="p-2 bg-black border-t border-[#333] text-xs text-gray-500 flex items-center gap-1">
                  <span className="text-acid-green">➜</span>
                  <span className="animate-pulse">_</span>
              </div>
          </div>
        </TiltCard>

        {/* 3. 音乐播放器 (The Surge Style) - 能量核心风格 */}
        <TiltCard className="relative overflow-hidden group bg-black">
          <div className="h-full border-4 border-black flex flex-col relative z-10 bg-[#000]">
              {/* 核心视觉 */}
              <div className="absolute inset-0 flex items-end justify-center gap-1.5 px-6 pb-0 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  {[...Array(5)].map((_, i) => (
                      <div 
                        key={i}
                        className="flex-1 bg-gradient-to-t from-purple-900 via-indigo-500 to-white shadow-[0_0_15px_rgba(79,70,229,0.5)]"
                        style={{
                            height: '40%', 
                            animation: `surge 0.6s ease-in-out infinite alternate`, 
                            animationDelay: `${i * 0.1}s`
                        }}
                      ></div>
                  ))}
              </div>

              <div className="absolute inset-0 bg-[linear-gradient(transparent_2px,#000_2px)] bg-[size:100%_4px] opacity-50 z-10 pointer-events-none"></div>
              
              <div className="relative z-20 h-full flex flex-col justify-between p-4">
                  <div className="flex justify-between items-center">
                       <div className="flex items-center gap-2 bg-black/50 backdrop-blur px-2 py-0.5 border border-white/20">
                          <Waves size={12} className="text-acid-green" />
                          <span className="text-[9px] font-bold text-acid-green tracking-widest">HZ_DETECTED</span>
                       </div>
                       <Volume2 size={16} className="text-white opacity-50" />
                  </div>

                  <div className="mix-blend-difference">
                      <h2 className="text-4xl font-black text-white leading-none tracking-tighter uppercase glitch-text" data-text="SURGE">
                          SURGE
                      </h2>
                      <div className="flex items-center gap-2 mt-1">
                          <div className="w-1.5 h-1.5 bg-hot-pink rounded-full animate-ping"></div>
                          <span className="text-[10px] font-mono text-gray-300">BASS_BOOST_ENGAGED</span>
                      </div>
                  </div>
              </div>
          </div>
          
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes surge {
                0% { height: 20%; opacity: 0.5; }
                100% { height: 90%; opacity: 1; filter: drop-shadow(0 0 10px white); }
            }
          `}} />
        </TiltCard>

        {/* --- 第二行布局 --- */}
        
        {/* 4. 状态面板 */}
        <TiltCard>
            <SystemStatus />
        </TiltCard>

        {/* 5. 置顶文章 */}
        <TiltCard className="md:col-span-2 relative group cursor-pointer hover:-translate-y-1 transition-transform duration-200">
          {latestPost ? (
            <Link href={`/blog/${latestPost.slug}`} className="block h-full border-4 border-black bg-[#111] flex flex-col overflow-hidden text-left relative">
                <div className="absolute right-0 top-0 text-[8rem] font-black text-[#1a1a1a] leading-none pointer-events-none -mr-4 -mt-4 opacity-50">TOP</div>

                <div className="bg-[#1a1a1a] p-2 flex items-center gap-2 border-b-2 border-[#333] shrink-0 z-10">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="text-gray-500 font-mono text-xs ml-2">featured_article.md</div>
                </div>
                
                <div className="flex-1 p-6 font-mono text-sm text-gray-300 overflow-hidden relative z-10">
                    <div className="opacity-80 line-clamp-4 whitespace-pre-wrap leading-relaxed break-words font-medium">
                      <span className="text-acid-green mr-2">&gt;</span>
                      {latestPost.body.slice(0, 150).replace(/[#*`]/g, '')}...
                    </div>
                    <div className="mt-4 flex gap-2">
                        {latestPost.tags?.slice(0, 3).map(tag => (
                            <span key={tag} className="text-[10px] bg-[#222] text-gray-400 px-2 py-0.5 border border-[#333]">{tag}</span>
                        ))}
                    </div>
                </div>
                <div className="bg-white border-t-4 border-black p-4 shrink-0 transition-colors duration-300 group-hover:bg-acid-green relative z-20">
                    <div className="flex justify-between items-center">
                      <div className="flex-1 pr-4">
                          <div className="flex items-center gap-2 mb-1">
                             <Zap size={12} className="text-black fill-black" />
                             <span className="text-xs font-bold tracking-wider">FEATURED</span>
                          </div>
                          <h3 className="text-xl font-black text-black line-clamp-1 uppercase">
                            {latestPost.title || latestPost.slug}
                          </h3>
                      </div>
                      <div className="bg-black text-white p-2">
                          <ArrowUpRight size={20} />
                      </div>
                    </div>
                </div>
            </Link>
          ) : (
            <div className="h-full border-4 border-black bg-[#1a1a1a] flex flex-col items-center justify-center text-gray-500 font-mono p-4">
                <FileText size={48} className="mb-4 opacity-50" />
                <p>NO_DATA_FOUND</p>
            </div>
          )}
        </TiltCard>

        {/* 6. 画廊入口 */}
        <TiltCard className="relative group cursor-pointer hover:-translate-y-1 transition-transform">
            <Link href="/gallery" className="block h-full">
              <div className="h-full border-4 border-black bg-hot-pink p-0 overflow-hidden relative">
                  <div className="absolute inset-0 flex flex-col">
                      <div className="flex-1 bg-black border-b border-white/20 group-hover:bg-[#111] transition-colors"></div>
                      <div className="flex-1 bg-black border-b border-white/20 group-hover:bg-[#111] transition-colors"></div>
                      <div className="flex-1 bg-black border-b border-white/20 group-hover:bg-[#111] transition-colors"></div>
                      <div className="flex-1 bg-black group-hover:bg-[#111] transition-colors"></div>
                  </div>
                  <div className="relative z-10 h-full flex items-center justify-center p-6 mix-blend-difference text-white">
                      <div className="text-center group-hover:scale-110 transition-transform">
                          <Ghost className="w-12 h-12 mx-auto mb-2 animate-bounce" />
                          <h3 className="text-xl font-black tracking-tighter">ENTER THE VOID</h3>
                      </div>
                  </div>
              </div>
            </Link>
        </TiltCard>
      </div>

      {/* --- 第二部分：归档文章 --- */}
      {archivePosts.length > 0 && (
        <>
          <div className="flex items-center gap-4 mb-6 mt-12">
             <div className="h-1 flex-1 bg-black"></div>
             <h2 className="font-black text-2xl bg-black text-white px-4 py-1 skew-x-[-10deg]">ARCHIVES</h2>
             <div className="h-1 flex-1 bg-black"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px]">
            {archivePosts.map((post) => (
              <TiltCard key={post.slug} className="relative group cursor-pointer hover:-translate-y-1 transition-transform duration-200">
                <Link href={`/blog/${post.slug}`} className="block h-full border-4 border-black bg-white flex flex-col hover:bg-gray-50 transition-colors">
                   <div className="border-b-4 border-black p-2 flex justify-between items-center bg-gray-100 shrink-0">
                      <div className="flex gap-1">
                         <div className="w-2 h-2 border border-black bg-white"></div>
                         <div className="w-2 h-2 border border-black bg-black"></div>
                      </div>
                      <span className="font-mono text-[10px] font-bold text-gray-500">FILE_ID: {post.slug.substring(0, 6).toUpperCase()}</span>
                   </div>
                   
                   <div className="p-6 flex-1 flex flex-col min-h-0">
                      <div className="flex items-center gap-2 mb-3">
                         <span className="bg-warning-yellow border-2 border-black px-2 py-0.5 text-[10px] font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            LOG
                         </span>
                         <span className="font-mono text-xs text-gray-500 flex items-center gap-1">
                            <Calendar size={12} />
                            {post.date || '----.--.--'}
                         </span>
                      </div>
                      
                      <h3 className="text-xl font-black mb-2 leading-tight group-hover:text-hot-pink transition-colors line-clamp-2">
                         {post.title || post.slug}
                      </h3>
                      
                      <p className="text-xs text-gray-600 line-clamp-3 font-mono mb-4 flex-1">
                         {post.description || post.body.slice(0, 100).replace(/[#*`]/g, '') + '...'}
                      </p>

                      <div className="flex justify-between items-end border-t-2 border-gray-100 pt-3 mt-auto shrink-0">
                         <div className="flex gap-1">
                            {post.tags?.slice(0, 2).map(tag => (
                               <span key={tag} className="text-[10px] font-mono border border-gray-300 px-1 text-gray-500 bg-gray-50">#{tag}</span>
                            ))}
                         </div>
                         <ArrowUpRight size={18} className="text-black group-hover:rotate-45 transition-transform" />
                      </div>
                   </div>
                </Link>
              </TiltCard>
            ))}
          </div>
        </>
      )}

    </div>
  );
}