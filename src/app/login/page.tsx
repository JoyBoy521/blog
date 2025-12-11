'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ShieldAlert, Cpu, Terminal } from 'lucide-react';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 1. 初始化一个静态的默认值，确保服务端和客户端初次渲染一致
  const [ipLog, setIpLog] = useState('... // TRACE_PENDING');

  // 2. 使用 useEffect 在客户端加载后生成随机 IP，避免 Hydration Mismatch
  useEffect(() => {
    setIpLog(`${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.*.* // TRACE_ACTIVE`);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'ACCESS DENIED');
      }
    } catch (err) {
      setError('CONNECTION_LOST');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 font-mono relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-acid-green shadow-[0_0_20px_#ccff00]"></div>

      <div className="w-full max-w-md border-4 border-black bg-black relative z-10 shadow-hard">
        {/* 顶部标题栏 */}
        <div className="bg-[#1a1a1a] border-b-2 border-[#333] p-3 flex justify-between items-center text-gray-400">
           <div className="flex items-center gap-2 text-xs font-bold tracking-widest">
              <Lock size={14} className="text-acid-green" />
              SECURE_GATEWAY
           </div>
           <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
           </div>
        </div>

        <div className="p-8">
           <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#111] rounded-full border-2 border-acid-green mb-4 shadow-[0_0_15px_rgba(204,255,0,0.3)]">
                 <ShieldAlert size={32} className="text-white" />
              </div>
              <h1 className="text-3xl font-black text-white tracking-tighter mb-1">RESTRICTED</h1>
              <p className="text-xs text-gray-500 uppercase tracking-widest">Admin Access Only</p>
           </div>

           <form onSubmit={handleLogin} className="space-y-6">
              <div className="relative group">
                 <div className="absolute -inset-0.5 bg-gradient-to-r from-acid-green to-hot-pink rounded-sm blur opacity-20 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                 <div className="relative flex items-center bg-black border-2 border-[#333] focus-within:border-acid-green transition-colors">
                    <span className="pl-3 text-gray-500"><Terminal size={16}/></span>
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="ENTER PASSWORD..."
                      className="w-full bg-transparent text-white p-3 outline-none placeholder:text-gray-700 text-sm font-bold tracking-widest"
                      autoFocus
                    />
                 </div>
              </div>

              {error && (
                 <div className="bg-red-900/20 border-l-4 border-red-500 p-2 text-red-500 text-xs font-bold flex items-center gap-2">
                    <ShieldAlert size={12} /> {error}
                 </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-acid-green text-black font-black py-3 border-2 border-transparent hover:border-white hover:bg-black hover:text-white transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                 {loading ? <Cpu size={16} className="animate-spin" /> : 'LOGIN'}
              </button>
           </form>
        </div>

        <div className="bg-[#111] p-2 text-center border-t-2 border-[#333]">
           <p className="text-[10px] text-gray-600 font-mono">
              IP_LOGGED: {ipLog}
           </p>
        </div>
      </div>
    </div>
  );
}