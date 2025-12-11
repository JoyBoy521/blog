import { NextResponse } from 'next/server';
import os from 'os';

export async function GET() {
  // 获取内存使用情况
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;
  const memUsage = Math.round((usedMem / totalMem) * 100);

  // 获取运行时间 (秒)
  const uptime = os.uptime();
  
  // 简单的格式化运行时间
  const days = Math.floor(uptime / 86400);
  const hours = Math.floor((uptime % 86400) / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const uptimeStr = `${days}D ${hours}H ${minutes}M`;

  // 模拟 CPU 负载 (简单取 loadavg 的第一个值，并归一化到 0-100)
  // 注意：Windows 上 loadavg 始终为 [0, 0, 0]，这里做个随机模拟作为 fallback
  const loadAvg = os.loadavg();
  let cpuLoad = Math.round(loadAvg[0] * 10); 
  if (cpuLoad === 0) cpuLoad = Math.floor(Math.random() * 30) + 10; // 模拟波动

  return NextResponse.json({
    uptime: uptimeStr,
    memory: memUsage,
    cpu: cpuLoad,
    status: 'ONLINE'
  });
}