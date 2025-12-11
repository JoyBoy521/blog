'use client';

import { useEffect, useState, useRef } from 'react';
import { Activity, Cpu, HardDrive, Wifi } from 'lucide-react';

export default function SystemStatus() {
  const [stats, setStats] = useState({
    uptime: 'LOADING...',
    memory: 0,
    cpu: 0,
    status: 'INIT'
  });
  
  // 模拟十六进制数据流
  const [hexStream, setHexStream] = useState<string[]>([]);
  
  // 模拟波形数据
  const [waveData, setWaveData] = useState<number[]>(new Array(20).fill(50));

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/system');
        const data = await res.json();
        setStats(data);
      } catch (e) {
        setStats(prev => ({ ...prev, status: 'OFFLINE' }));
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 3000);
    
    // 快速生成 HEX 数据流
    const hexInterval = setInterval(() => {
        const newHex = Math.random().toString(16).substring(2, 10).toUpperCase();
        setHexStream(prev => [newHex, ...prev.slice(0, 5)]);
    }, 100);

    // 模拟波形动画
    const waveInterval = setInterval(() => {
        setWaveData(prev => {
            const next = [...prev.slice(1), Math.floor(Math.random() * 100)];
            return next;
        });
    }, 200);

    return () => {
        clearInterval(interval);
        clearInterval(hexInterval);
        clearInterval(waveInterval);
    };
  }, []);

  return (
    <div className="h-full border-4 border-black bg-black text-acid-green p-4 flex flex-col font-mono relative overflow-hidden group">
      {/* 背景网格装饰 */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(20,255,0,0.03)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none"></div>
      
      {/* 顶部状态栏 */}
      <div className="flex justify-between items-center border-b border-acid-green/30 pb-2 mb-3 relative z-10">
        <div className="flex items-center gap-2">
            <Activity size={14} className="animate-pulse" />
            <span className="font-bold tracking-widest text-xs">SYS_MONITOR_V9</span>
        </div>
        <div className={`px-2 py-0.5 text-[10px] font-bold ${stats.status === 'ONLINE' ? 'bg-acid-green text-black' : 'bg-red-500 text-black'} animate-pulse`}>
          {stats.status}
        </div>
      </div>
      
      <div className="flex-1 flex gap-4 relative z-10 min-h-0">
        {/* 左侧：核心指标 */}
        <div className="flex-1 flex flex-col justify-between space-y-2">
            {/* CPU */}
            <div className="group/cpu">
                <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                    <span className="flex items-center gap-1"><Cpu size={10}/> CPU_CORE</span>
                    <span className="text-acid-green">{stats.cpu}%</span>
                </div>
                <div className="w-full bg-gray-900 h-1.5 border border-gray-700">
                    <div className="h-full bg-acid-green shadow-[0_0_5px_#ccff00]" style={{ width: `${stats.cpu}%`, transition: 'width 0.5s' }}></div>
                </div>
            </div>

            {/* MEMORY */}
            <div>
                <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                    <span className="flex items-center gap-1"><HardDrive size={10}/> MEM_ALLOC</span>
                    <span className="text-hot-pink">{stats.memory}%</span>
                </div>
                <div className="w-full bg-gray-900 h-1.5 border border-gray-700">
                    <div className="h-full bg-hot-pink shadow-[0_0_5px_#ff00ff]" style={{ width: `${stats.memory}%`, transition: 'width 0.5s' }}></div>
                </div>
            </div>

            {/* UPTIME & NETWORK WAVE */}
            <div className="mt-auto pt-2 border-t border-gray-800">
                 <div className="flex justify-between text-[10px] mb-1 text-gray-500">
                    <span>UPTIME</span>
                    <span className="text-white">{stats.uptime}</span>
                 </div>
                 {/* 模拟波形图 */}
                 <div className="h-8 flex items-end gap-0.5 opacity-80">
                    {waveData.map((h, i) => (
                        <div key={i} className="flex-1 bg-acid-green/50 hover:bg-acid-green transition-colors" style={{ height: `${h}%` }}></div>
                    ))}
                 </div>
            </div>
        </div>

        {/* 右侧：十六进制数据流 (装饰) */}
        <div className="w-16 border-l border-gray-800 pl-2 hidden sm:flex flex-col text-[10px] text-gray-600 overflow-hidden font-mono leading-tight select-none">
            <div className="text-acid-green/50 border-b border-gray-800 mb-1 pb-1 flex items-center gap-1">
                <Wifi size={8} /> DATA
            </div>
            {hexStream.map((hex, i) => (
                <div key={i} className="opacity-70">{hex}</div>
            ))}
        </div>
      </div>

      {/* 装饰角标 */}
      <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-acid-green"></div>
      <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-acid-green"></div>
    </div>
  );
}