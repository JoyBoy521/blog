'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ZoomIn } from 'lucide-react';

export default function ImageZoom({ src, alt }: { src: string; alt?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 当灯箱打开时，禁止背景滚动
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // 灯箱内容 (Portal 内容)
  const lightboxContent = isOpen ? (
    <div 
      className="fixed inset-0 z-[99999] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-200 cursor-zoom-out"
      onClick={() => setIsOpen(false)}
    >
      {/* 关闭按钮 */}
      <button 
        className="absolute top-6 right-6 text-white/50 hover:text-hot-pink transition-colors z-50 p-2"
        onClick={(e) => {
            e.stopPropagation();
            setIsOpen(false);
        }}
      >
        <X size={40} />
      </button>
      
      {/* 图片容器 */}
      <div 
        className="relative max-w-full max-h-full flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()} // 防止点击图片区域关闭
      >
        <img 
          src={src} 
          alt={alt} 
          className="max-w-full max-h-[90vh] w-auto h-auto object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-sm animate-in zoom-in-95 duration-300"
        />
        
        {alt && (
          <div className="mt-4 px-4 py-2 bg-white/10 backdrop-blur-sm border-l-4 border-acid-green text-white font-mono text-sm max-w-xl text-center">
              {alt}
          </div>
        )}
      </div>
    </div>
  ) : null;

  return (
    <>
      {/* 缩略图模式：原样展示 */}
      <div 
        className="my-8 relative group cursor-zoom-in inline-block w-full text-center"
        onClick={() => setIsOpen(true)}
      >
        {/* 增加 inline-block 和 max-w 限制，防止图片撑破布局 */}
        <img 
          src={src} 
          alt={alt} 
          className="inline-block max-w-full h-auto rounded-sm shadow-sm transition-transform duration-300 group-hover:brightness-110"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        {/* 悬停提示 */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-black/50 text-white p-2 rounded-full backdrop-blur-sm">
                <ZoomIn size={24} />
            </div>
        </div>
        {alt && <p className="text-center text-xs text-gray-500 mt-2 font-mono block w-full">{alt}</p>}
      </div>

      {/* 使用 Portal 将灯箱渲染到 body 节点，彻底脱离父级 stacking context */}
      {mounted && createPortal(lightboxContent, document.body)}
    </>
  );
}