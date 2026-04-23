import React from "react";
import Head from "next/head";
import { 
  Link as LinkIcon, 
  Zap, 
  Download, 
  CheckCircle 
} from "lucide-react";

export default function Guide() {
  return (
    <>
      <Head>
        <title>Guide | How to Use TikSaver</title>
      </Head>

      <div className="animate-in slide-in-from-bottom-10 duration-700 max-w-4xl mx-auto">
        <h2 className="subheading-sm text-center mb-16 uppercase tracking-tighter" style={{ color: 'var(--text)' }}>
          Simple Download Guide.
        </h2>

        <div className="space-y-16">
          {/* STEP 1 */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center animate-fade-up">
            <div className="w-full lg:flex-1 group">
              <div className="relative overflow-hidden cut-card p-1 transition-all duration-400 h-[200px] md:h-[300px] border-2 flex items-center justify-center" style={{ backgroundColor: 'var(--primary-light)', borderColor: 'var(--primary)' }}>
                <div className="w-16 h-16 md:w-24 md:h-24 shadow-xl flex items-center justify-center transition-transform duration-500" style={{ backgroundColor: 'var(--card)', color: 'var(--primary)', clipPath: "polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)" }}>
                  <LinkIcon className="w-8 h-8 md:w-12 md:h-12" />
                </div>
              </div>
            </div>
            <div className="lg:flex-1 text-left">
              <div className="w-12 h-12 text-white flex items-center justify-center font-bold text-xl mb-6 shadow-xl shadow-blue-500/20" style={{ backgroundColor: 'var(--primary)', clipPath: "polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)" }}>
                1
              </div>
              <h3 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-3" style={{ color: 'var(--text)' }}>
                <LinkIcon className="w-5 h-5 md:w-6 md:h-6" style={{ color: 'var(--primary)' }} />
                Copy Video Link
              </h3>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--text-dim)' }}>
                First, open the TikTok app or website. Browse through your feed until you find the video you want to save. Tap on the <span className="font-bold" style={{ color: 'var(--primary)' }}>Share</span> button and then select the <span className="font-bold" style={{ color: 'var(--primary)' }}>Copy Link</span> option. This saves the direct video URL to your device's clipboard.
              </p>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-16 items-center animate-fade-up">
            <div className="lg:flex-1 text-left">
              <div className="w-12 h-12 bg-pink-500 text-white flex items-center justify-center font-bold text-xl mb-6 shadow-xl shadow-pink-500/20" style={{ clipPath: "polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)" }}>
                2
              </div>
              <h3 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-3" style={{ color: 'var(--text)' }}>
                <Download className="w-5 h-5 md:w-6 md:h-6 text-pink-500" />
                Paste into TikSaver
              </h3>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--text-dim)' }}>
                Navigate back to <span className="text-pink-500 font-bold">TikSaver</span> and locate the elegant download box at the top of the page. Simply paste the link you just copied into the input field. Once pasted, click the <span className="text-pink-500 font-bold">Get Video</span> button to let our high-speed servers process the request.
              </p>
            </div>
            <div className="w-full lg:flex-1 group">
              <div className="relative overflow-hidden cut-card p-1 transition-all duration-400 h-[200px] md:h-[300px] border-2 flex items-center justify-center" style={{ backgroundColor: '#fdf2f8', borderColor: '#ec4899' }}>
                <div className="w-16 h-16 md:w-24 md:h-24 shadow-xl flex items-center justify-center text-pink-500 transition-transform duration-500" style={{ backgroundColor: 'var(--card)', clipPath: "polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)" }}>
                  <Zap className="w-8 h-8 md:w-12 md:h-12" />
                </div>
              </div>
            </div>
          </div>

          {/* STEP 3 */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center animate-fade-up">
            <div className="w-full lg:flex-1 group">
              <div className="relative overflow-hidden cut-card p-1 transition-all duration-400 h-[200px] md:h-[300px] border-2 flex items-center justify-center" style={{ backgroundColor: '#ecfdf5', borderColor: '#10b981' }}>
                <div className="w-16 h-16 md:w-24 md:h-24 shadow-xl flex items-center justify-center text-emerald-500 transition-transform duration-500" style={{ backgroundColor: 'var(--card)', clipPath: "polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)" }}>
                  <CheckCircle className="w-8 h-8 md:w-12 md:h-12" />
                </div>
              </div>
            </div>
            <div className="lg:flex-1 text-left">
              <div className="w-12 h-12 bg-emerald-500 text-white flex items-center justify-center font-bold text-xl mb-6 shadow-xl shadow-emerald-500/20" style={{ clipPath: "polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)" }}>
                3
              </div>
              <h3 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-3" style={{ color: 'var(--text)' }}>
                <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-emerald-500" />
                Download & Enjoy
              </h3>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--text-dim)' }}>
                After a few moments, the video details will appear. You can choose to download the <span className="font-bold" style={{ color: 'var(--primary)' }}>HD version</span> without any watermark, keep the labels, or even save just the <span className="font-bold" style={{ color: 'var(--primary)' }}>MP3 Audio</span>. Your file will be saved directly to your device for offline viewing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
