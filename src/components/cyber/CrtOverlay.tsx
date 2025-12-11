export default function CrtOverlay() {
  return (
    <>
      {/* 扫描线纹理 */}
      <div className="scanlines fixed inset-0 pointer-events-none z-[9000] opacity-60" />
      
      {/* 屏幕暗角 (Vignette) - 让四个角稍微暗一点，增加立体感 */}
      <div 
        className="fixed inset-0 pointer-events-none z-[9000]"
        style={{
          background: 'radial-gradient(circle at center, transparent 60%, rgba(0, 0, 0, 0.4) 100%)'
        }}
      />
    </>
  );
}