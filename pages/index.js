import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { 
  Download, 
  Link as LinkIcon, 
  Video, 
  Music, 
  Loader2, 
  CheckCircle, 
  AlertCircle,
  Share2,
  Heart,
  MessageCircle,
  PlayCircle,
  Image as ImageIcon,
  Twitter,
  Instagram,
  Mail,
  ChevronDown,
  Globe
} from 'lucide-react';
export default function App() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  // Page Navigation State ('home' or 'how-to-use')
  const [currentPage, setCurrentPage] = useState('home');
  const [openFaq, setOpenFaq] = useState(null);

  // Fazii Khanzada Original Details for Example
  const exampleUrl = "https://www.tiktok.com/@fazii_khanzada/video/7597900807828213012";

  const [exampleData, setExampleData] = useState({
    name: "فیضان_اعجاز_خانزاده",
    username: "@fazii_khanzada",
    avatar: "https://ui-avatars.com/api/?name=Fazii&background=0D8ABC&color=fff",
    thumbnail: "https://images.unsplash.com/photo-1590086782792-42dd2350140d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    desc: "Naseebo lines #trending #khan #viral #viraltiktok @Saad ❤️",
    likes: "128",
    comments: "40",
    shares: "6",
    views: "532"
  });

  // FAQs Data
  const faqs = [
    {
      q: "Is it really free to download videos?",
      a: "Yes, absolutely! TikSaver is completely free to use. There are no paywalls, hidden subscriptions, or download limits. Save as much content as you desire."
    },
    {
      q: "Where are my videos saved after downloading?",
      a: "If you are using a smartphone (Android or iPhone), your videos will typically be saved directly to your device's Gallery or the default 'Downloads' folder. On desktop computers, they go straight to your main 'Downloads' directory."
    },
    {
      q: "Can I download just the audio (MP3)?",
      a: "Yes! Once our tool processes your video link, you will see a dedicated 'MP3 Audio' download button. Clicking it will save the pristine audio track to your device."
    }
  ];

  // Fetch Example Data on Load
  useEffect(() => {
    const fetchExampleData = async () => {
      try {
        const response = await fetch(`https://www.tikwm.com/api/?url=${exampleUrl}`);
        const json = await response.json();
        if (json.code === 0 && json.data) {
          setExampleData({
            name: json.data?.author?.nickname || "User",
            username: json.data?.author?.unique_id ? "@" + json.data.author.unique_id : "@user",
            avatar: json.data?.author?.avatar || "",
            thumbnail: json.data?.cover || "",
            desc: json.data?.title || "",
            likes: formatNumber(json.data?.digg_count || 0),
            comments: formatNumber(json.data?.comment_count || 0),
            shares: formatNumber(json.data?.share_count || 0),
            views: formatNumber(json.data?.play_count || 0)
          });
        }
      } catch (error) {
        console.error("Failed to load example data");
      }
    };
    fetchExampleData();
  }, []);

  const formatNumber = (num) => {
    if (!num) return "0";
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const renderDescription = (text) => {
    if (!text) return "";
    return text.split(/(#[^\s]+|@[^\s]+)/g).map((part, i) => {
      if (part.startsWith('#') || part.startsWith('@')) {
        return <span key={i} className="text-blue-500 font-medium hover:underline cursor-pointer">{part}</span>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  const isValidTikTokUrl = (link) => {
    return link && (link.includes('tiktok.com') || link.includes('vt.tiktok.com'));
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      setError('');
    } catch (err) {
      setError('Unable to paste. Please type manually.');
    }
  };

  const handleTryExample = () => {
    setUrl(exampleUrl);
    setError('');
  };

  const handleFetch = async (e) => {
    if (e) e.preventDefault();
    if (!url.trim()) { setError('Please enter a TikTok video link first.'); return; }
    if (!isValidTikTokUrl(url)) { setError('This does not look like a valid TikTok link.'); return; }

    setError('');
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch(`https://www.tikwm.com/api/?url=${url}`);
      const json = await response.json();

      if (json.code === 0 && json.data) {
        const isPhotoPost = json.data.images && json.data.images.length > 0;
        setResult({
          author: {
            name: json.data?.author?.nickname || "User",
            username: "@" + (json.data?.author?.unique_id || "user"),
            avatar: json.data?.author?.avatar || ""
          },
          video: {
            desc: json.data?.title || "",
            thumbnail: json.data?.cover || "",
            views: formatNumber(json.data?.play_count || 0),
            likes: formatNumber(json.data?.digg_count || 0),
            comments: formatNumber(json.data?.comment_count || 0),
            shares: formatNumber(json.data?.share_count || 0),
            noWmUrl: json.data?.play || "",
            wmUrl: json.data?.wmplay || "",
            musicUrl: json.data?.music || "",
            isPhoto: isPhotoPost,
            images: isPhotoPost ? json.data.images : []
          }
        });

        setTimeout(() => {
          document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      } else {
        setError('Video not found. Please check the link.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (fileUrl, fileName, isPhoto = false) => {
    if (!fileUrl) return;
    setIsDownloading(true);
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      let ext = fileName.includes('Audio') ? 'mp3' : 'mp4';
      if (isPhoto) ext = 'jpg';

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `TikSaver_${fileName}_${Date.now()}.${ext}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      window.open(fileUrl, '_blank');
    }
    setIsDownloading(false);
  };

  // Sync currentPage with URL query
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('page')) {
      setCurrentPage(params.get('page'));
    }
    // Restore input value from localStorage
    const savedUrl = localStorage.getItem('tiksaver-url');
    if (savedUrl) setUrl(savedUrl);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('page', currentPage);
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem('tiksaver-url', url);
  }, [url]);

  return (
    <>
      <Head>
        <title>TikSaver - Download TikTok Videos Without Watermark</title>
        <meta name="description" content="TikSaver is the best free online tool to download TikTok videos without watermarks in HD quality. Save videos as MP4 or MP3 instantly." />
        <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/3046/3046121.png" />
      </Head>
      <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800 selection:bg-pink-500 selection:text-white">

        {/* HEADER */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 h-[72px] flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <div className="bg-gradient-to-r from-cyan-400 to-pink-500 p-2.5 rounded-xl">
                <Download className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-slate-900">
                Tik<span className="text-pink-500">Saver</span>
              </span>
            </div>

            <nav className="flex items-center gap-6">
              <button onClick={() => setCurrentPage('home')} className={`text-sm font-bold transition-colors ${currentPage === 'home' ? 'text-pink-500' : 'text-slate-600 hover:text-pink-500'}`}>Home</button>
              <button onClick={() => setCurrentPage('how-to-use')} className={`text-sm font-bold transition-colors ${currentPage === 'how-to-use' ? 'text-pink-500' : 'text-slate-600 hover:text-pink-500'}`}>How to Use</button>
            </nav>
          </div>
        </header>

        <main className="max-w-4xl mx-auto w-full px-4 py-8 flex-grow">

          {currentPage === 'home' ? (
            <div className="animate-in fade-in duration-500">
              {/* INPUT SECTION */}
              <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-6 md:p-12 mb-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"></div>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 text-pink-600 font-bold text-sm mb-6 border border-pink-100">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
                  </span>
                  Fast & Free Downloader
                </div>

                <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">TikTok Video Downloader</h1>
                <p className="text-slate-500 mb-10 text-lg md:text-xl max-w-2xl mx-auto">Download TikTok videos and MP3 audio instantly in HD quality without watermarks.</p>

                <form onSubmit={handleFetch} className="max-w-2xl mx-auto relative">
                  <div className="relative flex flex-col md:flex-row gap-3">
                    <div className="relative flex-1 group">
                      <LinkIcon className="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-pink-500 transition-colors" />
                      <input
                        type="text" value={url} onChange={(e) => setUrl(e.target.value)}
                        placeholder="Paste TikTok video link here..."
                        className="w-full pl-14 pr-24 py-4 md:py-5 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 transition-all text-lg shadow-inner"
                      />
                      <button type="button" onClick={handlePaste} className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-100 transition-all">Paste</button>
                    </div>
                    <button type="submit" disabled={isLoading} className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-pink-500/30 hover:-translate-y-0.5 transition-all flex items-center justify-center min-w-[160px]">
                      {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Download"}
                    </button>
                  </div>
                  {error && <p className="text-red-500 text-sm font-bold mt-4 flex items-center justify-center gap-1 bg-red-50 p-3 rounded-lg"><AlertCircle className="w-4 h-4" /> {error}</p>}

                  <div className="mt-6 text-sm text-slate-500">
                    Example: <button type="button" onClick={handleTryExample} className="text-pink-500 font-bold hover:underline transition-all">Fazii Khanzada Viral Video</button>
                  </div>
                </form>
              </div>

              {/* RESULT SECTION */}
              {result && (
                <div id="result-section" className="w-full bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-800 p-6 md:p-10 mb-12 animate-in slide-in-from-bottom-8 duration-700">
                  <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
                    <div className="w-full md:w-1/3 relative rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800">
                      <img src={result.video.thumbnail} className="w-full h-auto aspect-[9/16] object-cover" alt="Cover" />
                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-2">
                        <PlayCircle className="w-4 h-4 text-pink-500" /> {result.video.views} Views
                      </div>
                    </div>

                    <div className="w-full md:w-2/3 flex flex-col">
                      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-800">
                        <img src={result.author.avatar} className="w-14 h-14 rounded-full border-2 border-pink-500" alt="User" />
                        <div>
                          <h3 className="font-bold text-white text-lg flex items-center gap-2">{result.author.name} <CheckCircle className="w-5 h-5 text-blue-400" /></h3>
                          <p className="text-sm text-slate-400 font-medium">{result.author.username}</p>
                        </div>
                      </div>

                      <div className="mb-8 bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                        <p className="text-slate-300 leading-relaxed text-sm">{renderDescription(result.video.desc)}</p>
                      </div>

                      <div className="flex flex-wrap gap-4 mb-8">
                        <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-xl text-white text-sm"><Heart className="w-4 h-4 text-pink-500 fill-pink-500" /> {result.video.likes}</div>
                        <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-xl text-white text-sm"><MessageCircle className="w-4 h-4 text-blue-400" /> {result.video.comments}</div>
                        <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-xl text-white text-sm"><Share2 className="w-4 h-4 text-green-400" /> {result.video.shares}</div>
                      </div>

                      <div className="space-y-4">
                        <button onClick={() => handleDownload(result.video.noWmUrl, 'No_Watermark')} className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-2xl font-black shadow-xl hover:opacity-90 transition-opacity">Download (No Watermark)</button>
                        <div className="flex flex-col sm:flex-row gap-4">
                          <button onClick={() => handleDownload(result.video.wmUrl, 'Watermark')} className="flex-1 bg-slate-800 text-white py-4 rounded-2xl font-bold border border-slate-700 hover:bg-slate-700 transition-colors">With Watermark</button>
                          <button onClick={() => handleDownload(result.video.musicUrl, 'Audio')} className="flex-1 bg-slate-800 text-white py-4 rounded-2xl font-bold border border-slate-700 hover:bg-slate-700 transition-colors"><Music className="w-5 h-5 text-cyan-400 inline mr-2" /> MP3 Audio</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* FEATURES & SEO CONTENT */}
              <div className="mt-20">
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                  <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 text-center hover:shadow-xl transition-all">
                    <div className="w-16 h-16 bg-pink-50 text-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Download className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-xl mb-3">No Watermark</h3>
                    <p className="text-slate-500 text-sm">Save TikTok videos in stunning HD quality, free from any distracting logos.</p>
                  </div>
                  <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 text-center hover:shadow-xl transition-all">
                    <div className="w-16 h-16 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Music className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-xl mb-3">MP3 Converter</h3>
                    <p className="text-slate-500 text-sm">Extract background music and save it as a high-quality MP3 file instantly.</p>
                  </div>
                  <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 text-center hover:shadow-xl transition-all">
                    <div className="w-16 h-16 bg-cyan-50 text-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-xl mb-3">100% Free</h3>
                    <p className="text-slate-500 text-sm">No registrations, no hidden fees, and absolutely no download limits.</p>
                  </div>
                </div>

                {/* Description Section */}
                <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-14 shadow-2xl mb-20 text-white text-center">
                  <h2 className="text-3xl md:text-4xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-pink-300">Your Ultimate TikTok Tool</h2>
                  <div className="space-y-6 text-slate-300 max-w-3xl mx-auto">
                    <p>Welcome to <strong>TikSaver</strong>! We provide the fastest way to save TikTok content without ruining it with watermarks. Simply paste the link and get your HD file in seconds.</p>
                  </div>
                </div>

                {/* Interactive FAQs */}
                <div className="max-w-3xl mx-auto mb-12">
                  <h2 className="text-3xl font-black text-slate-900 mb-10 text-center">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                      <div key={idx} className="bg-white rounded-[1.5rem] border border-slate-200 shadow-sm overflow-hidden">
                        <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full text-left p-6 md:p-8 flex items-center justify-between">
                          <h3 className="font-bold text-lg text-slate-900 flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-600 text-xs font-black">Q</span> {faq.q}
                          </h3>
                          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                        </button>
                        <div className={`transition-all duration-300 overflow-hidden ${openFaq === idx ? 'max-h-96 opacity-100 p-8 pt-0' : 'max-h-0 opacity-0'}`}>
                          <p className="text-slate-600 text-sm md:text-base ml-11 border-t border-slate-100 pt-4">{faq.a}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* HOW TO USE PAGE */
            <div className="animate-in slide-in-from-right-8 duration-500">
              <div className="rounded-3xl shadow-sm border border-slate-100 p-6 md:p-10 mb-12">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-black text-slate-900 mb-2">How to Use TikSaver?</h2>
                  <p className="text-slate-500">A quick guide to downloading your favorite TikTok content.</p>
                </div>

                {/* Fazii Khanzada Example Result */}
                <div className="mb-16">
                  <div className="w-full bg-[#111827] rounded-[2rem] shadow-2xl border border-slate-800 p-6 md:p-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-pink-500 text-white text-xs font-bold px-4 py-2 rounded-bl-2xl z-10">Example Result</div>
                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                      <div className="w-full md:w-[280px] relative rounded-3xl overflow-hidden border-4 border-[#1f2937] shrink-0">
                        <img src={exampleData.thumbnail} className="w-full h-[450px] object-cover" alt="Thumb" />
                        <div className="absolute top-4 right-4 bg-black/60 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                          <PlayCircle className="w-3.5 h-3.5 text-pink-500" /> {exampleData.views} Views
                        </div>
                      </div>
                      <div className="w-full flex flex-col">
                        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-800">
                          <img src={exampleData.avatar} className="w-14 h-14 rounded-full border-2 border-pink-500" alt="Fazii" />
                          <div>
                            <h3 className="font-bold text-white text-lg flex items-center gap-2">{exampleData.name} <CheckCircle className="w-4 h-4 text-blue-500" /></h3>
                            <p className="text-sm text-slate-400 font-medium">{exampleData.username}</p>
                          </div>
                        </div>
                        <div className="mb-8 bg-[#1f2937] p-5 rounded-2xl border border-slate-700/50">
                          <p className="text-slate-300 text-[15px] leading-relaxed">{renderDescription(exampleData.desc)}</p>
                        </div>
                        <div className="flex flex-wrap gap-4 mb-8">
                          <div className="flex items-center gap-2 bg-[#1f2937] px-5 py-2.5 rounded-2xl text-white text-sm font-bold"><Heart className="w-4 h-4 text-pink-500 fill-pink-500" /> {exampleData.likes}</div>
                          <div className="flex items-center gap-2 bg-[#1f2937] px-5 py-2.5 rounded-2xl text-white text-sm font-bold"><MessageCircle className="w-4 h-4 text-blue-400" /> {exampleData.comments}</div>
                          <div className="flex items-center gap-2 bg-[#1f2937] px-5 py-2.5 rounded-2xl text-white text-sm font-bold"><Share2 className="w-4 h-4 text-green-400" /> {exampleData.shares}</div>
                        </div>
                        <div className="space-y-4">
                          <div className="w-full bg-[#a855f7] text-white py-4 rounded-xl font-bold text-center cursor-default">Download (No Watermark)</div>
                          <div className="flex gap-4">
                            <div className="flex-1 bg-[#1f2937] text-white py-4 rounded-xl font-bold text-center cursor-default">Watermark</div>
                            <div className="flex-1 bg-[#1f2937] text-white py-4 rounded-xl font-bold text-center cursor-default">MP3 Audio</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Zigzag Steps */}
                <div className="relative max-w-4xl mx-auto mt-16 pb-4">
                  <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-slate-100 md:-translate-x-1/2 rounded-full"></div>
                  <div className="relative flex flex-col md:flex-row items-center md:justify-between mb-16">
                    <div className="md:hidden absolute left-6 -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-pink-500 text-white font-bold z-10">1</div>
                    <div className="ml-16 md:ml-0 md:w-1/2 md:pr-12 w-full">
                      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-left md:text-right">
                        <h3 className="font-black text-xl mb-2 text-slate-900">Copy Link</h3>
                        <p className="text-slate-600 text-sm">Copy the link of the TikTok video you want to save.</p>
                      </div>
                    </div>
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center w-14 h-14 rounded-full bg-pink-500 text-white font-black shadow-lg z-10 text-xl">1</div>
                    <div className="hidden md:w-1/2 md:block"></div>
                  </div>
                  <div className="relative flex flex-col md:flex-row items-center md:justify-between mb-16">
                    <div className="md:hidden absolute left-6 -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-purple-500 text-white font-bold z-10">2</div>
                    <div className="hidden md:w-1/2 md:block"></div>
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center w-14 h-14 rounded-full bg-purple-500 text-white font-black shadow-lg z-10 text-xl">2</div>
                    <div className="ml-16 md:ml-0 md:w-1/2 md:pl-12 w-full">
                      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-left">
                        <h3 className="font-black text-xl mb-2 text-slate-900">Paste & Fetch</h3>
                        <p className="text-slate-600 text-sm">Paste the link into the TikSaver input box and hit Download.</p>
                      </div>
                    </div>
                  </div>
                  <div className="relative flex flex-col md:flex-row items-center md:justify-between">
                    <div className="md:hidden absolute left-6 -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-cyan-500 text-white font-bold z-10">3</div>
                    <div className="ml-16 md:ml-0 md:w-1/2 md:pr-12 w-full">
                      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-left md:text-right">
                        <h3 className="font-black text-xl mb-2 text-slate-900">Save Video</h3>
                        <p className="text-slate-600 text-sm">Choose your format and save the video directly to your gallery.</p>
                      </div>
                    </div>
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center w-14 h-14 rounded-full bg-cyan-500 text-white font-black shadow-lg z-10 text-xl">3</div>
                    <div className="hidden md:w-1/2 md:block"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* FOOTER */}
        <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 mt-auto border-t border-slate-800">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="bg-gradient-to-r from-cyan-400 to-pink-500 p-2 rounded-xl"><Download className="w-5 h-5 text-white" /></div>
                  <span className="text-2xl font-black text-white tracking-tight">Tik<span className="text-pink-500">Saver</span></span>
                </div>
                <p className="text-sm mb-6 text-slate-400">The most reliable TikTok downloader. Save videos without watermarks for free.</p>
                <div className="flex gap-4">
                  <a href="https://www.linkedin.com/in/muhammad-zeeshan-abid-205185385/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all"><LinkIcon className="w-4 h-4" /></a>
                  <a href="https://mail.google.com/mail/u/0/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all"><Mail className="w-4 h-4" /></a>
                </div>
              </div>
              <div className="md:ml-auto">
                <h3 className="text-white font-bold mb-6 text-lg">Quick Links</h3>
                <ul className="space-y-3 text-sm">
                  <li><button onClick={() => setCurrentPage('home')} className="hover:text-pink-500">Home Downloader</button></li>
                  <li><button onClick={() => setCurrentPage('how-to-use')} className="hover:text-pink-500">How to Use</button></li>
                  <li><a href="#" className="hover:text-pink-500">Privacy Policy</a></li>
                </ul>
              </div>
              <div className="md:ml-auto">
                <h3 className="text-white font-bold mb-6 text-lg">Legal</h3>
                <ul className="space-y-3 text-sm">
                  <li><a href="#" className="hover:text-pink-500">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-pink-500">Copyright Policy</a></li>
                  <li><a href="#" className="hover:text-pink-500">Contact Support</a></li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} TikSaver. All rights reserved.</p>
              <div className="bg-slate-800/50 px-6 py-2.5 rounded-full border border-slate-700/50">
                <p className="text-sm font-medium text-slate-300">Developed by <span className="text-white font-black ml-1">Zeeshan Abid</span></p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
