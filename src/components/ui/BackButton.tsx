'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    // 尝试后退，保留滚动位置
    // 如果是从首页点击进来的，这会带你回到之前的滚动位置
    // 如果是直接打开链接（没有历史记录），浏览器通常什么都不做，
    // 此时用户可以点击左上角的 Logo 回到首页顶部
    if (window.history.length > 1) {
        router.back();
    } else {
        router.push('/');
    }
  };

  return (
    <button 
      onClick={handleBack}
      className="inline-flex items-center gap-2 font-mono font-bold hover:text-hot-pink transition-colors mb-8 bg-white border-2 border-black px-4 py-2 shadow-hard-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-x-1 active:translate-y-1 cursor-pointer"
    >
      <ArrowLeft size={16} /> BACK_TO_BASE
    </button>
  );
}