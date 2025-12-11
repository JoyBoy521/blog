import type { Metadata } from "next";
import { Space_Grotesk, VT323 } from "next/font/google";
import "./globals.css";
import CrtOverlay from "@/components/cyber/CrtOverlay";
import CustomCursor from "@/components/cyber/CustomCursor";
// 新增引入
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "500", "700"],
});

const vt323 = VT323({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "饺子🥟",
  description: "Code, Art, and Chaos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${spaceGrotesk.variable} ${vt323.variable} font-display antialiased`}>
        <CustomCursor />
        <CrtOverlay />
        
        {/* 1. 顶部导航 */}
        <Navbar />
        
        {/* 2. 主体内容 (加个 pt-12 防止被 fixed 的 navbar 遮挡) */}
        <main className="min-h-screen relative z-10 pt-12 flex flex-col">
          {children}
          
          {/* 3. 底部页脚 (放在 main 里面或者外面都可以，这里放里面作为流式结尾) */}
          <div className="mt-auto">
             <Footer />
          </div>
        </main>
      </body>
    </html>
  );
}