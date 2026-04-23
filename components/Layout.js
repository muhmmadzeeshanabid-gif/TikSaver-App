import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Download, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

const Header = () => {
  const router = useRouter();
  const currentPage = router.pathname === "/" ? "home" : "guide";
  const [theme, setTheme] = useState("blue");
  const [mode, setMode] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("tiksaver_theme") || "blue";
    const savedMode = localStorage.getItem("tiksaver_mode") || "light";
    setTheme(savedTheme);
    setMode(savedMode);
    document.documentElement.setAttribute("data-theme", savedTheme);
    document.documentElement.setAttribute("data-mode", savedMode);
  }, []);

  const toggleTheme = () => {
    const nextMode = mode === "light" ? "dark" : "light";
    const nextTheme = nextMode === "light" ? "blue" : "pink"; // Light is Blue, Dark is Pink
    
    setMode(nextMode);
    setTheme(nextTheme);
    
    document.documentElement.setAttribute("data-mode", nextMode);
    document.documentElement.setAttribute("data-theme", nextTheme);
    
    localStorage.setItem("tiksaver_mode", nextMode);
    localStorage.setItem("tiksaver_theme", nextTheme);
  };

  return (
    <header className="sticky top-0 z-50 border-b transition-colors duration-400" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 md:gap-3 group">
          <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center transition-transform duration-500 group-hover:rotate-12" style={{ backgroundColor: 'var(--primary)', color: 'white', clipPath: "polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)" }}>
            <div className="flex items-center justify-center"><Download className="w-4 h-4 md:w-5 md:h-5" /></div>
          </div>
          <span className="text-lg md:text-xl font-black tracking-tighter" style={{ color: 'var(--text)' }}>
            Tik<span style={{ color: 'var(--primary)' }}>Saver</span>
          </span>
        </Link>

        <nav className="flex items-center gap-2 md:gap-6">
          <Link href="/" className={`text-[9px] md:text-xs font-black uppercase tracking-widest px-3 md:px-5 py-2 transition-all duration-300 ${router.pathname === '/' ? 'opacity-100 shadow-md' : 'opacity-60 hover:opacity-100'}`} style={{ 
            backgroundColor: router.pathname === '/' ? 'var(--primary-light)' : 'transparent',
            color: router.pathname === '/' ? 'var(--primary)' : 'var(--text)',
            clipPath: router.pathname === '/' ? "polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px)" : "none"
          }}>
            Home
          </Link>
          <Link href="/guide" className={`text-[9px] md:text-xs font-black uppercase tracking-widest px-3 md:px-5 py-2 transition-all duration-300 ${router.pathname === '/guide' ? 'opacity-100 shadow-md' : 'opacity-60 hover:opacity-100'}`} style={{ 
            backgroundColor: router.pathname === '/guide' ? 'var(--primary-light)' : 'transparent',
            color: router.pathname === '/guide' ? 'var(--primary)' : 'var(--text)',
            clipPath: router.pathname === '/guide' ? "polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px)" : "none"
          }}>
            Guide
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleTheme}
              className="relative w-14 h-7 rounded-full transition-all duration-500 cursor-pointer border p-1 group overflow-hidden"
              style={{ 
                backgroundColor: 'var(--card)', 
                borderColor: 'var(--primary)',
              }}
            >
              <div 
                className="absolute top-1 bottom-1 w-5 rounded-full transition-all duration-500 flex items-center justify-center shadow-lg"
                style={{ 
                  left: mode === 'light' ? '4px' : 'calc(100% - 24px)',
                  backgroundColor: 'var(--primary)',
                  color: 'white'
                }}
              >
                {mode === "light" ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer 
      className="mt-20 py-12 px-6 relative overflow-hidden transition-colors duration-400 border-t"
      style={{ 
        backgroundColor: 'var(--card)', 
        borderColor: 'var(--border)',
        clipPath: "polygon(15px 0, 100% 0, 100% 100%, 0 100%, 0 15px)" 
      }}
    >
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center justify-center text-center space-y-5">
        <div className="text-[11px] md:text-xs font-bold tracking-[0.1em]" style={{ color: 'var(--text)' }}>
          &copy; {new Date().getFullYear()} <span style={{ color: 'var(--primary)' }}>TikSaver.</span> All Rights Reserved.
        </div>
        <div className="flex items-center justify-center gap-2 text-[9px] md:text-[10px] font-medium uppercase tracking-[0.4em] whitespace-nowrap">
          <span style={{ color: 'var(--text-dim)' }}>BUILT BY</span>
          <span style={{ color: 'var(--text)' }}>ZEESHAN <span style={{ color: 'var(--primary)' }}>ABID</span></span>
        </div>
      </div>
    </footer>
  );
};

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-400" style={{ backgroundColor: 'var(--bg)' }}>
      <style jsx global>{`
        ::selection {
          background-color: var(--primary);
          color: white;
        }
      `}</style>
      <Header />
      <main className="max-w-5xl mx-auto w-full px-6 py-12 md:py-16 flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
