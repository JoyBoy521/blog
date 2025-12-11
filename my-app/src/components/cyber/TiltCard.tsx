'use client';

import { useRef, MouseEvent } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function TiltCard({ children, className = '' }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // 计算旋转角度 (限制最大旋转角度，避免太夸张)
    const rotateX = ((y - centerY) / centerY) * -10; 
    const rotateY = ((x - centerX) / centerX) * 10;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    // 鼠标离开时复位
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-100 ease-out preserve-3d ${className}`}
      style={{ transformStyle: 'preserve-3d' }} // 关键：开启 3D 空间
    >
      {/* 这里加一个 translateZ，让内容稍微浮起来一点，增加立体感。
        同时设置 height: 100% 确保内容能撑满 Grid 单元格 
      */}
      <div style={{ transform: 'translateZ(20px)', height: '100%' }}>
        {children}
      </div>
    </div>
  );
}