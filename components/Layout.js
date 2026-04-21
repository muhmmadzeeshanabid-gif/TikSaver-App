import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Download } from "lucide-react";

const Header = () => {
  const router = useRouter();
  const currentPage = router.pathname === "/" ? "home" : "guide";

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-50">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 cursor-pointer group">
          <div className="w-8 h-8 bg-blue-600 flex items-center justify-center text-white" style={{ clipPath: "polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)" }}>
            <Download className="w-4 h-4" />
          </div>
          <span className="text-lg font-black tracking-tight text-slate-900">
            Tik<span className="text-blue-600">Saver</span>
          </span>
        </Link>

        <nav className="flex gap-2">
          <Link
            href="/"
            className={`px-4 py-2 text-xs font-bold transition-all flex items-center ${currentPage === "home" ? "bg-blue-50 text-blue-600" : "text-slate-500 hover:text-slate-900"}`}
            style={{ clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" }}
          >
            Home
          </Link>
          <Link
            href="/guide"
            className={`px-4 py-2 text-xs font-bold transition-all flex items-center ${currentPage === "guide" ? "bg-blue-50 text-blue-600" : "text-slate-500 hover:text-slate-900"}`}
            style={{ clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" }}
          >
            Guide
          </Link>
        </nav>
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer 
      className="mt-20 bg-slate-900 text-white/70 py-6 px-6 md:px-12 relative overflow-hidden group border-t border-white/5 shadow-2xl w-full"
      style={{ clipPath: "polygon(15px 0, 100% 0, 100% 100%, 0 100%, 0 15px)" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer transition-transform pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-bold uppercase tracking-[0.3em]">
        <span className="text-white/40">&copy; {new Date().getFullYear()} TikSaver Studio • All Rights Reserved</span>
        <span className="text-white whitespace-nowrap">
          <span className="text-white/30 mr-2">BUILT BY</span> 
          <span className="text-blue-500">ZEESHAN ABID</span>
        </span>
      </div>
    </footer>
  );
};

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col selection:bg-cyan-500 selection:text-black">
      <Header />
      <main className="max-w-5xl mx-auto w-full px-6 py-12 md:py-16 flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
