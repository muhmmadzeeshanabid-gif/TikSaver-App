import React, { useState, useEffect } from "react";
import Head from "next/head";
import {
  Download,
  Link as LinkIcon,
  Video,
  Music,
  Loader2,
  CheckCircle,
  AlertCircle,
  Heart,
  PlayCircle,
  Mail,
  Layers,
  Zap,
  ShieldCheck,
  Send,
  Camera,
  Code,
  X,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

export default function App() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [currentPage, setCurrentPage] = useState("home");
  const [openFaq, setOpenFaq] = useState(null);
  const [showExampleNotice, setShowExampleNotice] = useState(false);

  // Default example data
  const exampleData = {
    author: {
      name: "فیضان _اعجاز_خانزاده ☠️🪄🩹❤️",
      username: "@fazii_khanzada",
      avatar: "/thumbnail.png"
    },
    video: {
      desc: "Naseebo lines #trending #khan #viral #viraltiktok #creatorsearchinsights2025 @Saad❤️🩹 @خانزادہ 🩹❤️ @ℳℛ.ᶜᴿᵃᶻʸ★ @abrarali75186 @Rehan khan zada @Rehankhanzada",
      views: "1.7M",
      likes: "360K",
      thumbnail: "/avatar.png",
      noWmUrl: "#",
      wmUrl: "#",
      musicUrl: "#"
    },
    isExample: true
  };

  // Load from LocalStorage on Mount
  useEffect(() => {
    const savedUrl = localStorage.getItem("tiksaver_last_url");
    const savedResult = localStorage.getItem("tiksaver_last_result");
    const savedPage = localStorage.getItem("tiksaver_current_page");
    
    if (savedUrl) setUrl(savedUrl);
    if (savedPage) setCurrentPage(savedPage);
    
    if (savedResult) {
      setResult(JSON.parse(savedResult));
    } else {
      setResult(exampleData);
    }
  }, []);

  // Save to LocalStorage on Change
  useEffect(() => {
    if (url) localStorage.setItem("tiksaver_last_url", url);
    localStorage.setItem("tiksaver_current_page", currentPage);
    
    if (result && !result.isExample) {
      localStorage.setItem("tiksaver_last_result", JSON.stringify(result));
    }
  }, [url, result, currentPage]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {
      console.error("Failed to read clipboard", err);
    }
  };

  const handleClear = () => {
    setUrl("");
    setResult(exampleData);
    localStorage.removeItem("tiksaver_last_url");
    localStorage.removeItem("tiksaver_last_result");
  };

  const handleFetch = async (e) => {
    if (e) e.preventDefault();
    if (!url) {
      setError("ERROR: PLEASE PASTE A LINK");
      return;
    }

    setError("");
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch(
        `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`,
      );
      const data = await response.json();

      if (data.code === 0) {
        const getUrl = (path) => {
          if (!path) return "";
          // If it's already a full TikTok CDN or other absolute URL, use it directly
          if (path.startsWith("http")) return path;
          // If it's a relative proxy path from TikWM, ensure it has the correct prefix
          return `https://www.tikwm.com${path}`;
        };

        const getProxyUrl = (path) => {
          const url = getUrl(path);
          if (!url) return "";
          return `https://images.weserv.nl/?url=${encodeURIComponent(url)}&default=https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=100`;
        };

        const v = data.data;
        setResult({
          video: {
            noWmUrl: getUrl(v.play),
            wmUrl: getUrl(v.wmplay),
            musicUrl: getUrl(v.music),
            thumbnail: getProxyUrl(v.origin_cover || v.cover),
            views: formatNumber(v.play_count),
            likes: formatNumber(v.digg_count),
            comments: formatNumber(v.comment_count),
            shares: formatNumber(v.share_count),
            desc: v.title || "No Description",
          },
          author: {
            name: v.author.nickname,
            username: `@${v.author.unique_id}`,
            avatar: getProxyUrl(v.author.avatar),
          },
        });
        setTimeout(() => {
          document
            .getElementById("result-section")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      } else {
        setError(`ERROR: ${data.msg || "INVALID LINK"}`);
      }
    } catch (err) {
      setError("NETWORK ERROR: PLEASE TRY AGAIN");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (fileUrl, fileName) => {
    if (result?.isExample) {
      setShowExampleNotice(true);
      return;
    }
    setIsDownloading(true);
    setDownloadProgress(0);
    
    // Slower Simulated Progress: 1, 5, 30, 70, 90, 99, 100
    const progressSteps = [1, 5, 30, 70, 90, 99, 100];
    for (let step of progressSteps) {
      setDownloadProgress(step);
      await new Promise(r => setTimeout(r, step === 100 ? 800 : 400));
    }

    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `${fileName}_TikSaver.mp4`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      
      // Show Success Modal
      setTimeout(() => {
        setShowSuccessModal(true);
      }, 500);
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setIsDownloading(false);
      setDownloadProgress(0);
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 10000) return (num / 1000).toFixed(0) + "K";
    return num.toString();
  };

  const renderDescription = (text) => {
    return text.split(/(#[^\s]+|@[^\s]+)/g).map((part, i) => {
      if (part.startsWith("#") || part.startsWith("@")) {
        return (
          <span key={i} className="text-blue-600 font-bold">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <>
      <Head>
        <title>TikSaver | TikTok Downloader</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen flex flex-col selection:bg-cyan-500 selection:text-black">
        {/* SURGICAL NAVBAR */}
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-50">
          <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => setCurrentPage("home")}
            >
              <div className="w-8 h-8 bg-blue-600 flex items-center justify-center text-white" style={{ clipPath: "polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)" }}>
                <Download className="w-4 h-4" />
              </div>
              <span className="text-lg font-black tracking-tight text-slate-900">
                Tik<span className="text-blue-600">Saver</span>
              </span>
            </div>

            <nav className="flex gap-2">
              <button
                onClick={() => setCurrentPage("home")}
                className={`px-4 py-2 text-xs font-bold transition-all ${currentPage === "home" ? "bg-blue-50 text-blue-600" : "text-slate-500 hover:text-slate-900"}`}
                style={{ clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" }}
              >
                Home
              </button>
              <button
                onClick={() => setCurrentPage("how-to-use")}
                className={`px-4 py-2 text-xs font-bold transition-all ${currentPage === "how-to-use" ? "bg-blue-50 text-blue-600" : "text-slate-500 hover:text-slate-900"}`}
                style={{ clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" }}
              >
                Guide
              </button>
            </nav>
          </div>
        </header>

        <main className="max-w-5xl mx-auto w-full px-6 py-12 md:py-16 flex-grow">
          {currentPage === "home" ? (
            <div className="animate-in fade-in duration-700">
              {/* COMPACT HERO */}
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                  Ready to Load
                </div>
                <h1 className="heading-sm text-slate-900 mx-auto max-w-2xl px-4">
                  The Best TikTok <span className="text-blue-600 italic">Video Downloader</span>
                </h1>

                <form
                  onSubmit={handleFetch}
                  className="max-w-3xl mx-auto mt-12"
                >
                  <div className="cut-card p-2 md:p-3 flex flex-col md:flex-row gap-2 max-w-2xl mx-auto mt-8">
                    <div className="flex-1 w-full relative">
                      <LinkIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                      <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Paste link here..."
                        className="input-cut !pl-14"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn-cut min-w-[160px] h-full"
                    >
                      {isLoading ? (
                        <Loader2 className="animate-spin w-5 h-5" />
                      ) : (
                        <>
                          <Download className="w-5 h-5" />
                          <span>Get Video</span>
                        </>
                      )}
                    </button>
                  </div>
                  {error && (
                    <p className="mt-6 text-sm text-red-500 flex items-center gap-2 justify-center font-bold bg-red-50 py-3 px-6 rounded-2xl border border-red-100">
                      <AlertCircle className="w-5 h-5" /> {error}
                    </p>
                  )}
                </form>
              </div>

              {/* SURGICAL RESULTS */}
              {result && (
                <div
                  id="result-section"
                  className="cut-card p-8 md:p-10 mb-16 animate-fade-up max-w-4xl mx-auto relative"
                >
                  {result.isExample && (
                    <div className="absolute top-0 right-0 bg-blue-600 text-white text-[9px] font-black uppercase tracking-[0.2em] py-2 px-5 z-20" style={{ clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0 100%)" }}>
                      Demo Example
                    </div>
                  )}
                  <div className="flex flex-col md:flex-row gap-10">
                    <div className="w-full md:w-[260px] shrink-0 cut-card p-1">
                      <img
                        src={result.video.thumbnail}
                        referrerPolicy="no-referrer"
                        className="w-full aspect-[9/16] object-cover"
                        style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)" }}
                        alt="Preview"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-50">
                        <img
                          src={result.author.avatar}
                          referrerPolicy="no-referrer"
                          className="w-16 h-16 border-2 border-blue-50 bg-slate-200"
                          style={{ clipPath: "polygon(0 0, 100% 0, 100% 80%, 80% 100%, 0 100%)" }}
                          alt="Author"
                        />
                        <div>
                          <h3 className="text-xl font-bold text-slate-800">
                            {result.author.name}
                          </h3>
                          <p className="text-blue-500 font-medium text-sm">
                            {result.author.username}
                          </p>
                        </div>
                      </div>

                      <div className="bg-slate-50 p-6 text-slate-600 text-sm leading-relaxed mb-6" style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)" }}>
                        {renderDescription(result.video.desc)}
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-white border p-4 text-center" style={{ clipPath: "polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)" }}>
                          <span className="block text-xl font-bold text-slate-900">
                            {result.video.views}
                          </span>
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                            Views
                          </span>
                        </div>
                        <div className="bg-white border p-4 text-center" style={{ clipPath: "polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)" }}>
                          <span className="block text-xl font-bold text-slate-900">
                            {result.video.likes}
                          </span>
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                            Likes
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3">
                        <button
                          onClick={() =>
                            handleDownload(result.video.noWmUrl, "HD")
                          }
                          disabled={isDownloading}
                          className="btn-cut relative overflow-hidden group bg-blue-600 hover:bg-blue-700 py-4 w-full disabled:cursor-not-allowed"
                        >
                          {/* Internal Progress Fill */}
                          {isDownloading && (
                            <div 
                              className="absolute inset-0 bg-blue-500 transition-all duration-300 ease-out z-0" 
                              style={{ width: `${downloadProgress}%` }}
                            ></div>
                          )}
                          
                          <div className="relative z-10 flex items-center justify-center gap-3">
                            {isDownloading ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span className="text-xs font-black tracking-widest uppercase">
                                  Processing {downloadProgress}%
                                </span>
                              </>
                            ) : (
                              <>
                                <Download className="w-4 h-4 shrink-0" />
                                <span className="text-[10px] md:text-xs font-black tracking-widest uppercase truncate">
                                  DOWNLOAD HD (WITHOUT WATERMARK)
                                </span>
                              </>
                            )}
                          </div>
                        </button>

                        <div className="grid grid-cols-2 gap-3 mt-3">
                          <button
                            onClick={() =>
                              handleDownload(result.video.wmUrl, "WM")
                            }
                            className="btn-cut btn-cut-secondary !py-3 !text-sm relative overflow-hidden disabled:opacity-50"
                            disabled={isDownloading}
                          >
                            <div className="relative z-10 flex items-center gap-2">
                              <Video className="w-4 h-4 shrink-0" />
                              <span className="truncate">With Label</span>
                            </div>
                          </button>
                          <button
                            onClick={() =>
                              handleDownload(result.video.musicUrl, "AUDIO")
                            }
                            className="btn-cut btn-cut-secondary !py-3 !text-xs md:!text-sm !text-blue-600 relative overflow-hidden disabled:opacity-50"
                            disabled={isDownloading}
                          >
                            <div className="relative z-10 flex items-center gap-2">
                              <Music className="w-4 h-4 shrink-0" />
                              <span className="truncate">Save Music</span>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* GRID */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                <div className="bento-cut card-blue">
                  <div className="w-14 h-14 bg-blue-50 flex items-center justify-center mb-6 mx-auto" style={{ clipPath: "polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)" }}>
                    <Layers className="text-blue-500 w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">
                    HD Quality
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Download videos in the highest resolution available. We preserve the original source quality without any compression or loss, ensuring your saves look crystal clear on any screen.
                  </p>
                </div>
                <div className="bento-cut card-pink">
                  <div className="w-14 h-14 bg-pink-50 flex items-center justify-center mb-6 mx-auto" style={{ clipPath: "polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)" }}>
                    <Zap className="text-pink-500 w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">
                    Fast Speed
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Powered by high-performance multi-threaded servers, TikSaver ensures lightning-fast link analysis and instant download generation so you can save more in less time.
                  </p>
                </div>
                <div className="bento-cut card-indigo">
                  <div className="w-14 h-14 bg-indigo-50 flex items-center justify-center mb-6 mx-auto" style={{ clipPath: "polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)" }}>
                    <ShieldCheck className="text-indigo-500 w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">
                    Anonymous
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    We respect your privacy. No registration required, and we don't track or store your download history. Your activity is 100% private and protected by SSL encryption.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="animate-in slide-in-from-bottom-10 duration-700 max-w-4xl mx-auto">
              <h2 className="subheading-sm text-center text-slate-900 mb-16">
                Simple Download Guide.
              </h2>

              <div className="space-y-16">
                {/* STEP 1 */}
                {/* STEP 1: Image Left, Text Right */}
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

                {/* STEP 2: Text Left, Image Right */}
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

                {/* STEP 3: Image Left, Text Right */}
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
          )}
        </main>

        {/* DOWNLOAD SUCCESS MODAL */}
        {showSuccessModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-fade-in">
            <div 
              className="bg-white p-10 md:p-12 w-full max-w-lg relative animate-scale-up text-center space-y-8"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)" }}
            >
              <div className="w-24 h-24 bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-xl shadow-emerald-50" style={{ clipPath: "polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)" }}>
                <CheckCircle className="w-12 h-12" />
              </div>

              <div className="space-y-3">
                <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Success!</h3>
                <p className="text-slate-500 font-medium leading-relaxed">
                  Your video has been saved to your device. Ready for the next one?
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    handleClear();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="btn-cut bg-blue-600 hover:bg-blue-700 w-full py-5 text-xs font-black tracking-widest shadow-2xl shadow-blue-200"
                >
                  <RefreshCw className="w-4 h-4" />
                  DOWNLOAD ANOTHER VIDEO
                </button>
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
                >
                  Wait, show me current result again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* REFINED SINGLE-LINE FOOTER */}
        <footer 
          className="mt-20 bg-slate-900 text-white/70 py-6 px-6 md:px-12 relative overflow-hidden group border-t border-white/5 shadow-2xl w-full"
          style={{ clipPath: "polygon(15px 0, 100% 0, 100% 100%, 0 100%, 0 15px)" }}
        >
          {/* Animated Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer transition-transform pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-bold uppercase tracking-[0.3em]">
            <span className="text-white/40">&copy; {new Date().getFullYear()} TikSaver Studio • All Rights Reserved</span>
            <span className="text-white whitespace-nowrap">
              <span className="text-white/30 mr-2">BUILT BY</span> 
              <span className="text-blue-500">ZEESHAN ABID</span>
            </span>
          </div>
        </footer>

        {/* MODAL NOTICE */}
        {showExampleNotice && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="w-full max-w-sm bg-white p-8 relative animate-in zoom-in-95 duration-300 shadow-2xl" style={{ clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 10px)" }}>
              <button 
                onClick={() => setShowExampleNotice(false)}
                className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-slate-300 hover:text-slate-900 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 animate-bounce" style={{ clipPath: "polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)" }}>
                  <Zap className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-black text-slate-900 mb-2 tracking-tighter uppercase">It's a Demo! 🚀</h4>
                <p className="text-slate-400 text-xs leading-relaxed mb-6 px-2">
                  This is a preview to show you the design. 
                  To download <span className="text-blue-600 font-bold italic">REAL</span> videos, paste your TikTok link at the top!
                </p>
                <button 
                  onClick={() => {
                    setShowExampleNotice(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="btn-cut w-full py-4 text-[10px] font-black tracking-widest"
                >
                  GOT IT, LETS GO!
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
