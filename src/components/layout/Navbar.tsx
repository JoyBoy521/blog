export default function Navbar() {
  // 重复文本以确保滚动无缝衔接
  const content = (
    <>
      <span>SYSTEM ONLINE</span> <span className="mx-4">///</span>
      <span>NO SIGNAL DETECTED</span> <span className="mx-4">///</span>
      <span>KEEP IT REAL</span> <span className="mx-4">///</span>
      <span>CYBER_SPACE V2.0 LOADED</span> <span className="mx-4">///</span>
      <span>DON'T PANIC</span> <span className="mx-4">///</span>
    </>
  );

  return (
    <nav className="fixed top-0 left-0 w-full bg-void-black text-acid-green border-b-4 border-acid-green z-50 py-1 overflow-hidden select-none">
      <div className="whitespace-nowrap overflow-hidden flex">
        {/* 第一组 */}
        <div className="animate-marquee inline-block font-mono text-xl font-bold uppercase tracking-wider px-4">
          {content}
        </div>
        {/* 第二组 (紧随其后，实现无缝) */}
        <div className="animate-marquee inline-block font-mono text-xl font-bold uppercase tracking-wider px-4" aria-hidden="true">
          {content}
        </div>
      </div>
    </nav>
  );
}