import { Github, Twitter, Mail, Music, ArrowUpRight, Ghost, FileText, Terminal, Hash, Calendar } from "lucide-react";
import Link from "next/link";
import TiltCard from "@/components/cyber/TiltCard";
import SystemStatus from "@/components/cyber/SystemStatus";
import { getAllPosts } from "@/lib/posts"; 

export default async function Home() {
  const posts = getAllPosts();
  // 1. 第一篇作为“超级置顶”
  const latestPost = posts[0]; 
  // 2. 剩下的所有文章，我们将把它们渲染成独立的卡片
  const archivePosts = posts.slice(1); 

  return (
    <div className="max-w-7xl mx-auto mt-16 p-4 md:p-8 mb-24">
      
      {/* --- 第一部分：Bento Grid 仪表盘 (固定布局) --- */}
      {/* 限制 md 及以上断点的行高为至少 180px，最大按 1fr 分配，避免单列被内容无限拉长 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)] md:auto-rows-[minmax(180px,1fr)] mb-6">
        
        {/* 1. 个人 ID 卡片 */}
        {/* 取消跨两行，避免侧边卡片过高（可按需恢复为 row-span-2） */}
        <TiltCard className="md:col-span-1 md:row-span-1 relative group">
          <div className="relative h-full bg-white border-4 border-black p-6 flex flex-col items-center overflow-hidden hover:bg-paper transition-colors">
            <div className="w-32 h-32 relative mb-4">
              <div className="absolute inset-0 bg-acid-green rounded-full animate-pulse opacity-50 blur-xl"></div>
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                alt="Avatar" 
                className="w-full h-full object-cover rounded-full border-4 border-black relative z-10 bg-white" 
              />
              <div className="absolute bottom-0 right-0 bg-hot-pink w-8 h-8 rounded-full border-2 border-black flex items-center justify-center z-20 text-white font-bold text-xs">LV.9</div>
            </div>
            
            <h1 className="text-4xl font-black uppercase mb-1 glitch-text" data-text="Alex.Dev">Alex.Dev</h1>
            <div className="flex flex-wrap gap-2 justify-center mb-6">
                <span className="px-2 py-1 bg-black text-white text-xs font-mono">FULLSTACK</span>
            </div>

            <div className="grid grid-cols-3 gap-2 w-full mt-auto">
              <button className="h-10 border-2 border-black bg-electric-blue hover:bg-black hover:text-white flex items-center justify-center transition-all cursor-pointer">
                <Github size={18} />
              </button>
              <button className="h-10 border-2 border-black bg-warning-yellow hover:bg-black hover:text-white flex items-center justify-center transition-all cursor-pointer">
                <Twitter size={18} />
              </button>
              <button className="h-10 border-2 border-black bg-hot-pink hover:bg-black hover:text-white flex items-center justify-center transition-all cursor-pointer">
                <Mail size={18} />
              </button>
            </div>
          </div>
        </TiltCard>

        {/* 2. 快速索引列表 (Recent Logs) */}
        <TiltCard className="md:col-span-2 bg-black text-white relative overflow-hidden group min-h-[240px]">
          <div className="h-full w-full border-4 border-black bg-[#1a1a1a] p-4 relative flex flex-col">
              <div className="flex justify-between items-center border-b border-gray-700 pb-2 mb-2">
                  <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs font-mono text-gray-500">system_logs.txt</div>
              </div>
              <div className="flex-1 overflow-y-auto font-mono space-y-2">
                  {posts.map((post, idx) => (
                      <Link 
                          key={post.slug} 
                          href={`/blog/${post.slug}`}
                          className="block p-1 hover:bg-white/10 border-l-2 border-transparent hover:border-acid-green transition-all group/item"
                      >
                          <div className="flex justify-between items-center text-sm">
                              <span className={`group-hover/item:translate-x-1 transition-transform ${idx === 0 ? 'text-hot-pink font-bold' : 'text-gray-400'}`}>
                                  {idx === 0 ? '*' : '-'} {post.title || post.slug}
                              </span>
                              <span className="text-gray-600 text-xs hidden sm:inline">{post.date}</span>
                          </div>
                      </Link>
                  ))}
                  {posts.length === 0 && <p className="text-gray-500 text-sm"></p>}
              </div>
          </div>
        </TiltCard>

        {/* 3. 音乐播放器 */}
        <TiltCard className="relative overflow-hidden group min-h-[180px]">
          <div className="h-full bg-electric-blue border-4 border-black p-4 flex flex-col justify-between relative">
              <div className="flex justify-between items-start z-10">
                  <span className="font-bold border-2 border-black px-1 bg-white text-xs">NOW PLAYING</span>
                  <Music className="animate-bounce" />
              </div>
              <div className="z-10 mt-auto">
                  <div className="font-mono text-sm font-bold">Lo-Fi Radio</div>
                  <div className="font-black text-2xl leading-none mt-1">Chill Study Beats</div>
              </div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 border-4 border-black rounded-full bg-white opacity-50"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 border-4 border-black rounded-full bg-transparent animate-ping"></div>
          </div>
        </TiltCard>

        {/* 4. 置顶文章 (FEATURED) */}
        {/* 置顶文章也改为单行跨度，和上方 auto-rows 配合保证高度更均衡 */}
        <TiltCard className="md:col-span-2 md:row-span-1 relative group cursor-pointer hover:-translate-y-1 transition-transform duration-200">
          {latestPost ? (
            <Link href={`/blog/${latestPost.slug}`} className="block h-full border-4 border-black bg-[#1a1a1a] flex flex-col overflow-hidden text-left">
                <div className="bg-gray-800 p-2 flex items-center gap-2 border-b-2 border-gray-700">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="text-gray-400 font-mono text-xs ml-2">featured-post</div>
                </div>
                <div className="flex-1 p-6 font-mono text-sm text-green-400 overflow-hidden relative">
                    <div className="opacity-80 line-clamp-6 whitespace-pre-wrap leading-relaxed">
                      {latestPost.body.slice(0, 200).replace(/[#*`]/g, '')}...
                    </div>
                    <span className="animate-pulse inline-block w-2 h-4 bg-green-400 align-middle ml-1 mt-2"></span>
                </div>
                <div className="absolute bottom-0 left-0 w-full bg-white border-t-4 border-black p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 pr-4">
                          <span className="bg-hot-pink text-white px-2 py-0.5 text-xs font-bold border border-black mb-2 inline-block">LATEST_DROP</span>
                          <h3 className="text-2xl font-bold text-black group-hover:text-hot-pink transition-colors line-clamp-2 leading-tight">
                            {latestPost.title || latestPost.slug}
                          </h3>
                      </div>
                      <div className="w-10 h-10 border-2 border-black bg-warning-yellow flex items-center justify-center shrink-0">
                          <ArrowUpRight className="text-black" />
                      </div>
                    </div>
                </div>
            </Link>
          ) : (
            <div className="h-full border-4 border-black bg-[#1a1a1a] flex flex-col items-center justify-center text-gray-500 font-mono p-4">
                <FileText size={48} className="mb-4 opacity-50" />
                <p>NO_DATA_FOUND</p>
                <Link href="/admin" className="text-xs mt-2 hover:text-acid-green border-b border-transparent hover:border-acid-green">

                </Link>
            </div>
          )}
        </TiltCard>

        {/* 5. 状态面板 */}
        <TiltCard>
            <SystemStatus />
        </TiltCard>

        {/* 6. 画廊入口 */}
        <TiltCard className="relative group cursor-pointer hover:-translate-y-1 transition-transform">
            <Link href="/gallery" className="block h-full">
              <div className="h-full border-4 border-black bg-hot-pink p-0 overflow-hidden relative">
                  <div className="absolute inset-0 flex flex-col">
                      <div className="flex-1 bg-black border-b border-white/20"></div>
                      <div className="flex-1 bg-black border-b border-white/20"></div>
                      <div className="flex-1 bg-black border-b border-white/20"></div>
                      <div className="flex-1 bg-black"></div>
                  </div>
                  <div className="relative z-10 h-full flex items-center justify-center p-6 mix-blend-difference text-white">
                      <div className="text-center group-hover:scale-110 transition-transform">
                          <Ghost className="w-12 h-12 mx-auto mb-2" />
                          <h3 className="text-xl font-black">ENTER THE VOID</h3>
                      </div>
                  </div>
              </div>
            </Link>
        </TiltCard>
      </div>

      {/* --- 第二部分：更多文章 (动态增加的卡片区) --- */}
      {archivePosts.length > 0 && (
        <>
          <div className="flex items-center gap-4 mb-6 mt-12">
             <div className="h-1 flex-1 bg-black"></div>
             <h2 className="font-black text-2xl bg-black text-white px-4 py-1 skew-x-[-10deg]">ARCHIVES</h2>
             <div className="h-1 flex-1 bg-black"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {archivePosts.map((post) => (
              <TiltCard key={post.slug} className="relative group cursor-pointer hover:-translate-y-1 transition-transform duration-200">
                <Link href={`/blog/${post.slug}`} className="block h-full border-4 border-black bg-white flex flex-col">
                   {/* 装饰性标题栏 */}
                   <div className="border-b-4 border-black p-2 flex justify-between items-center bg-gray-100">
                      <div className="flex gap-2">
                         <div className="w-3 h-3 border-2 border-black bg-white"></div>
                         <div className="w-3 h-3 border-2 border-black bg-black"></div>
                      </div>
                      <span className="font-mono text-xs font-bold text-gray-500">FILE_ID: {post.slug.substring(0, 6).toUpperCase()}</span>
                   </div>
                   
                   <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-4">
                         <span className="bg-warning-yellow border-2 border-black px-2 py-0.5 text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            POST
                         </span>
                         <span className="font-mono text-xs text-gray-500 flex items-center gap-1">
                            <Calendar size={12} />
                            {post.date || '----.--.--'}
                         </span>
                      </div>
                      
                      <h3 className="text-2xl font-black mb-3 leading-tight group-hover:text-hot-pink transition-colors line-clamp-2">
                         {post.title || post.slug}
                      </h3>
                      
                      <p className="text-sm text-gray-600 line-clamp-3 font-medium mb-4 flex-1">
                         {post.description || post.body.slice(0, 100).replace(/[#*`]/g, '') + '...'}
                      </p>

                      <div className="flex justify-between items-end border-t-2 border-gray-100 pt-4 mt-auto">
                         <div className="flex gap-1">
                            {post.tags?.slice(0, 2).map(tag => (
                               <span key={tag} className="text-[10px] font-mono border border-gray-300 px-1 text-gray-500">#{tag}</span>
                            ))}
                         </div>
                         <ArrowUpRight size={20} className="text-black group-hover:rotate-45 transition-transform" />
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