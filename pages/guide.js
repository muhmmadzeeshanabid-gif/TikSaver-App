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
        <h2 className="subheading-sm text-center text-slate-900 mb-16 uppercase tracking-tighter">
          Simple Download Guide.
        </h2>

        <div className="space-y-16">
          {/* STEP 1 */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center animate-fade-up">
            <div className="w-full lg:flex-1 group">
              <div className="relative overflow-hidden cut-card p-1 bg-blue-50 flex items-center justify-center h-[200px] md:h-[300px] border-2 border-blue-100">
                <div className="w-16 h-16 md:w-24 md:h-24 bg-white shadow-xl flex items-center justify-center text-blue-600 transition-transform duration-500 group-hover:scale-110" style={{ clipPath: "polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)" }}>
                  <LinkIcon className="w-8 h-8 md:w-12 md:h-12" />
                </div>
              </div>
            </div>
            <div className="lg:flex-1 text-left">
              <div className="w-12 h-12 bg-blue-600 text-white flex items-center justify-center font-bold text-xl mb-6 shadow-xl shadow-blue-200" style={{ clipPath: "polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)" }}>
                1
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <LinkIcon className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                Copy Video Link
              </h3>
              <p className="text-slate-500 text-base md:text-lg leading-relaxed">
                First, open the TikTok app or website. Browse through your feed until you find the video you want to save. Tap on the <span className="text-blue-600 font-bold">Share</span> button and then select the <span className="text-blue-600 font-bold">Copy Link</span> option. This saves the direct video URL to your device's clipboard.
              </p>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-16 items-center animate-fade-up">
            <div className="lg:flex-1 text-left">
              <div className="w-12 h-12 bg-pink-500 text-white flex items-center justify-center font-bold text-xl mb-6 shadow-xl shadow-pink-200" style={{ clipPath: "polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)" }}>
                2
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <Download className="w-5 h-5 md:w-6 md:h-6 text-pink-500" />
                Paste into TikSaver
              </h3>
              <p className="text-slate-500 text-base md:text-lg leading-relaxed">
                Navigate back to <span className="text-pink-500 font-bold">TikSaver</span> and locate the elegant download box at the top of the page. Simply paste the link you just copied into the input field. Once pasted, click the <span className="text-pink-500 font-bold">Get Video</span> button to let our high-speed servers process the request.
              </p>
            </div>
            <div className="w-full lg:flex-1 group">
              <div className="relative overflow-hidden cut-card p-1 bg-pink-50 flex items-center justify-center h-[200px] md:h-[300px] border-2 border-pink-100">
                <div className="w-16 h-16 md:w-24 md:h-24 bg-white shadow-xl flex items-center justify-center text-pink-500 transition-transform duration-500 group-hover:scale-110" style={{ clipPath: "polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)" }}>
                  <Zap className="w-8 h-8 md:w-12 md:h-12" />
                </div>
              </div>
            </div>
          </div>

          {/* STEP 3 */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center animate-fade-up">
            <div className="w-full lg:flex-1 group">
              <div className="relative overflow-hidden cut-card p-1 bg-emerald-50 flex items-center justify-center h-[200px] md:h-[300px] border-2 border-emerald-100">
                <div className="w-16 h-16 md:w-24 md:h-24 bg-white shadow-xl flex items-center justify-center text-emerald-500 transition-transform duration-500 group-hover:scale-110" style={{ clipPath: "polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)" }}>
                  <CheckCircle className="w-8 h-8 md:w-12 md:h-12" />
                </div>
              </div>
            </div>
            <div className="lg:flex-1 text-left">
              <div className="w-12 h-12 bg-emerald-500 text-white flex items-center justify-center font-bold text-xl mb-6 shadow-xl shadow-emerald-200" style={{ clipPath: "polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)" }}>
                3
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-emerald-500" />
                Download & Enjoy
              </h3>
              <p className="text-slate-500 text-base md:text-lg leading-relaxed">
                After a few moments, the video details will appear. You can choose to download the <span className="text-indigo-500 font-bold">HD version</span> without any watermark, keep the labels, or even save just the <span className="text-indigo-500 font-bold">MP3 Audio</span>. Your file will be saved directly to your device for offline viewing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
