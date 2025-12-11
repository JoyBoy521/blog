import Link from "next/link";
import { ArrowLeft, Aperture, Maximize2 } from "lucide-react";
import TiltCard from "@/components/cyber/TiltCard";

// 模拟一些赛博风格的图片数据
// size 属性决定了图片在网格中占据的大小
const IMAGES = [
  { id: 1, src: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80", title: "NEON_DREAMS", size: "large", date: "2077.01" },
  { id: 2, src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80", title: "CYBER_CITY", size: "small", date: "2077.02" },
  { id: 3, src: "https://images.unsplash.com/photo-1515630278258-407f66498911?auto=format&fit=crop&w=800&q=80", title: "RETRO_CONSOLE", size: "small", date: "1998.12" },
  { id: 4, src: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80", title: "GLITCH_ART", size: "wide", date: "2023.11" },
  { id: 5, src: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=800&q=80", title: "MATRIX_CODE", size: "tall", date: "UNDEFINED" },
  { id: 6, src: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?auto=format&fit=crop&w=800&q=80", title: "READING_TERMINAL", size: "small", date: "2024.05" },
];

export default function Gallery() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
      {/* 1. 顶部导航与标题 */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b-4 border-black pb-6 gap-4">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 font-mono font-bold hover:text-hot-pink transition-colors mb-4 bg-white border-2 border-black px-3 py-1 shadow-hard-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
            <ArrowLeft size={16} /> BACK_TO_BASE
          </Link>
          <h1 className="text-5xl md:text-7xl font-black uppercase glitch-text leading-none" data-text="VISUAL_LOGS">
            VISUAL_LOGS
          </h1>
        </div>
        <div className="font-mono text-xs md:text-sm text-gray-600 bg-gray-200 p-2 border border-black hidden md:block">
          <p>// LOADED_ASSETS: {IMAGES.length}</p>
          <p>// MEMORY_USAGE: 24MB</p>
          <p>// RENDER_MODE: HIGH_FIDELITY</p>
        </div>
      </div>

      {/* 2. 赛博风格画廊网格 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px]">
        {IMAGES.map((img) => (
          <TiltCard 
            key={img.id}
            className={`relative group border-4 border-black bg-black ${
              // 根据 size 属性动态调整网格跨度
              img.size === 'large' ? 'md:col-span-2 md:row-span-2' :
              img.size === 'wide' ? 'md:col-span-2' :
              img.size === 'tall' ? 'md:row-span-2' : ''
            }`}
          >
            {/* 图片容器 */}
            <div className="w-full h-full relative overflow-hidden">
              {/* 图片本体：默认灰度，悬停变全彩 */}
              <img 
                src={img.src} 
                alt={img.title}
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-500 grayscale group-hover:grayscale-0 scale-100 group-hover:scale-110"
              />
              
              {/* 扫描线遮罩 (增加质感) */}
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>

              {/* 悬停时的 UI 覆盖层 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                
                {/* 装饰性UI元素 */}
                <div className="absolute top-4 right-4 text-acid-green animate-spin-slow">
                    <Aperture size={24} />
                </div>

                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex justify-between items-end border-b border-white/50 pb-2 mb-2">
                     <span className="font-mono text-acid-green text-xs">ID: {String(img.id).padStart(3, '0')}</span>
                     <span className="font-mono text-white text-xs bg-hot-pink px-1">{img.date}</span>
                  </div>
                  <h3 className="text-white font-black text-2xl uppercase tracking-widest glitch-text" data-text={img.title}>{img.title}</h3>
                </div>
              </div>

              {/* 四角装饰 (HUD 风格) */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-white/50 group-hover:border-acid-green transition-colors"></div>
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-white/50 group-hover:border-acid-green transition-colors"></div>
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-white/50 group-hover:border-acid-green transition-colors"></div>
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-white/50 group-hover:border-acid-green transition-colors"></div>
              
              {/* 中心准星 (仅悬停显示) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                 <Maximize2 className="text-white/50 w-12 h-12 stroke-1" />
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
      
      {/* 底部加载更多 */}
      <div className="mt-12 text-center">
          <button className="font-mono text-sm bg-black text-white px-6 py-3 hover:bg-hot-pink hover:text-black transition-colors border-2 border-transparent hover:border-black">
              LOAD_MORE_DATA [ + ]
          </button>
      </div>
    </div>
  )
}