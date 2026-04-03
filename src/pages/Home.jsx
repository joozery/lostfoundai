import { Button } from "@/components/ui/button";
import { ArrowRight, Search, AlertCircle, CheckCircle2, Sparkles, MapPin, Globe, Shield, Activity } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import RecentItems from "@/components/RecentItems";
import { Input } from "@/components/ui/input";
import { useState } from 'react';
import heroBg from '../assets/hero-bg.png';

const Home = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <div className="min-h-screen bg-[#060b18] font-sans text-slate-100 antialiased selection:bg-emerald-500/30 italic-text-none">
            {/* Ultra-Compact High-Tech Dark Hero */}
            <section className="relative pt-12 pb-8 lg:pt-16 lg:pb-12 border-b border-white/5 overflow-hidden">
                {/* Visual Background Image Layer */}
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-luminosity pointer-events-none" 
                    style={{ backgroundImage: `url(${heroBg})` }}
                ></div>
                {/* Subtle Grid Pattern Layer */}
                <div 
                    className="absolute inset-0 opacity-10 pointer-events-none" 
                    style={{ 
                        backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)', 
                        backgroundSize: '24px 24px' 
                    }}
                ></div>
                {/* Crisp Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#060b18]/80 via-[#060b18]/10 to-[#060b18] pointer-events-none"></div>

                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col items-center text-center space-y-5">
                        
                        {/* Status Label (Compact) */}
                        <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[8px] font-black uppercase tracking-[0.2em] animate-in fade-in duration-500">
                             <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse"></div>
                             Network Status: Global & Active
                        </div>

                        {/* Impact Heading (Condensed) */}
                        <div className="space-y-1 max-w-4xl">
                            <h1 className="text-2xl md:text-3xl lg:text-5xl font-black text-white tracking-tighter leading-tight drop-shadow-xl">
                                ตามหาสิ่งของที่หายไป <br/>
                                <span className="text-emerald-500 uppercase">Search Intelligent</span>
                            </h1>
                        </div>

                        {/* Compact Integrated Search Bar */}
                        <div className="w-full max-w-lg animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
                            <form onSubmit={handleSearch} className="relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/30 to-blue-500/30 rounded-xl blur-md opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
                                <div className="relative flex items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-1 focus-within:border-emerald-500/30 transition-all shadow-xl">
                                    <Search className="ml-3 text-emerald-500/60" size={16} />
                                    <Input 
                                        type="text" 
                                        placeholder="พิมพ์ชื่อสิ่งของหรือสถานที่เพื่อเริ่มการค้นหา..." 
                                        className="border-none focus-visible:ring-0 text-slate-100 text-xs md:text-sm font-medium h-9 bg-transparent placeholder:text-slate-500"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <Button type="submit" className="h-8 px-5 bg-emerald-500 hover:bg-emerald-600 text-[#060b18] font-black text-[10px] rounded-lg shadow-lg shadow-emerald-500/10 transition-all active:scale-95">
                                        SEARCH
                                    </Button>
                                </div>
                            </form>
                        </div>

                        {/* Refined Quick Actions (Small) */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-1 animate-in fade-in duration-700 delay-100">
                            <Link to="/report/lost" className="w-full sm:w-auto">
                                <Button className="w-full h-9 px-6 rounded-lg font-black bg-rose-500/5 text-rose-500 border border-rose-500/10 hover:bg-rose-500/10 text-[10px] uppercase tracking-widest transition-all">
                                    <AlertCircle size={14} className="mr-2" /> Report Lost
                                </Button>
                            </Link>
                            <Link to="/report/found" className="w-full sm:w-auto">
                                <Button className="w-full h-9 px-6 rounded-lg font-black bg-emerald-500/5 text-emerald-500 border border-emerald-500/10 hover:bg-emerald-500/10 text-[10px] uppercase tracking-widest transition-all">
                                    <CheckCircle2 size={14} className="mr-2" /> Report Found
                                </Button>
                            </Link>
                        </div>

                        {/* Subtle High-Density Stats (Compact) */}
                        <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/5 animate-in fade-in duration-1000 delay-300">
                            {[
                                { icon: <Globe size={14} />, label: "Coverage", value: "National" },
                                { icon: <Activity size={14} />, label: "Accuracy", value: "94.2% AI" },
                                { icon: <Shield size={14} />, label: "Security", value: "Encrypted" },
                                { icon: <Sparkles size={14} />, label: "Engine", value: "v2.0 Active" }
                            ].map((stat, i) => (
                                <div key={i} className="flex flex-col items-center md:items-start group">
                                    <div className="flex items-center gap-1.5 text-slate-500 mb-0.5">
                                        <div className="text-emerald-500/50 group-hover:text-emerald-400 mt-[-1px] transition-colors">{stat.icon}</div>
                                        <span className="text-[8px] font-black uppercase tracking-[0.2em]">{stat.label}</span>
                                    </div>
                                    <span className="text-[11px] font-bold text-slate-300 tracking-tight">{stat.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* List Section */}
            <div className="bg-[#060b18] py-4">
                <RecentItems />
            </div>

            {/* Minimalist Footer */}
            <footer className="py-10 border-t border-white/5 px-6 bg-[#060b18]">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                         <div className="font-black text-lg tracking-tighter text-white">LOSTFOUND <span className="text-emerald-500 italic">SYSTEM</span></div>
                         <p className="text-[8px] font-black text-slate-600 uppercase tracking-[0.4em] mt-0.5">Professional Intelligent Service</p>
                    </div>
                    <div className="flex items-center gap-6 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">
                        <Link to="/about" className="hover:text-white transition-colors">About</Link>
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link to="/contact" className="hover:text-white transition-colors">Support</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
