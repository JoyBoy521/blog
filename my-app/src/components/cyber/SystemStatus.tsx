'use client';

import { useEffect, useState } from 'react';

export default function SystemStatus() {
  const [stats, setStats] = useState({
    uptime: 'LOADING...',
    memory: 0,
    cpu: 0,
    status: 'CONNECTING'
  });

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
    // 每 3 秒刷新一次
    const interval = setInterval(fetchStats, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full border-4 border-black bg-white p-4 flex flex-col gap-2 font-mono text-xs">
      <h3 className="font-bold border-b-2 border-black pb-1 flex justify-between">
        <span>SERVER STATS</span>
        <span className={stats.status === 'ONLINE' ? 'text-acid-green bg-black px-1' : 'text-red-500 bg-black px-1'}>
          {stats.status}
        </span>
      </h3>
      
      <div className="space-y-3 mt-1">
        <div>
          <div className="flex justify-between mb-1">
            <span>UPTIME:</span>
            <span>{stats.uptime}</span>
          </div>
          <div className="w-full bg-gray-200 h-2 border border-black">
            <div className="h-full bg-acid-green transition-all duration-500" style={{ width: '100%' }}></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span>MEMORY:</span>
            <span>{stats.memory}%</span>
          </div>
          <div className="w-full bg-gray-200 h-2 border border-black">
            <div 
              className={`h-full transition-all duration-500 ${stats.memory > 80 ? 'bg-red-500' : 'bg-hot-pink'}`} 
              style={{ width: `${stats.memory}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span>CPU LOAD:</span>
            <span>{stats.cpu}%</span>
          </div>
          <div className="w-full bg-gray-200 h-2 border border-black">
             {/* 模拟 CPU 波动条 */}
            <div 
              className="h-full bg-black transition-all duration-300" 
              style={{ width: `${stats.cpu}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}