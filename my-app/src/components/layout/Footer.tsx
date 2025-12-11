export default function Footer() {
  return (
    <footer className="max-w-7xl mx-auto mt-0 border-4 border-black bg-white p-4 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10 mb-8 shadow-hard">
      <div className="font-mono font-bold text-lg flex items-center gap-2">
        <div className="w-4 h-4 bg-acid-green border-2 border-black animate-pulse"></div>
        SYSTEM_STATUS: ONLINE
      </div>
      
      <div className="font-mono text-xs text-center md:text-right text-gray-500">
        © {new Date().getFullYear()} CYBER_SPACE. DESIGNED BY YOU. <br />
        NO COOKIES. NO TRACKERS. JUST VIBES.
      </div>

      <div className="flex gap-2">
        {/* 装饰性小块 */}
        <div className="w-8 h-2 bg-black"></div>
        <div className="w-4 h-2 bg-black opacity-50"></div>
        <div className="w-2 h-2 bg-black opacity-25"></div>
      </div>
    </footer>
  );
}