'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  // 使用 Ref 直接引用 DOM 元素，而不是用 State 触发重渲染
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  // 用于追踪是否应该显示光标（避免初始位置在 0,0 闪烁）
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        // 直接修改 style，性能极高，不会触发组件重渲染
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
        
        if (!isVisible) setIsVisible(true);
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // 检查交互元素
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' ||
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-pointer');
      
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, [isVisible]);

  // 移动端不渲染
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center transition-[width,height,background-color] duration-150 ease-out ${!isVisible ? 'opacity-0' : 'opacity-100'}`}
      style={{
        width: isHovering ? '64px' : '32px',
        height: isHovering ? '64px' : '32px',
        border: '2px solid white',
        backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
        // 初始位置设为 -100, -100 防止闪烁，实际位置由 JS 控制
        transform: 'translate(-100px, -100px)' 
      }}
    >
      <div className="w-1 h-1 bg-hot-pink absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}