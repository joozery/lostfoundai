import { Button } from "@/components/ui/button";
import { ArrowRight, Search, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import RecentItems from "@/components/RecentItems";

const Home = () => {
    return (
        <div className="font-sans">
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-40 overflow-hidden flex items-center justify-center min-h-[80vh]">
                {/* Background - Clean White/Subtle */}
                <div className="absolute inset-0 bg-white -z-10"></div>
                <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-emerald-50/50 rounded-full blur-3xl -z-10 opacity-60 pointer-events-none"></div>
                <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-blue-50/50 rounded-full blur-3xl -z-10 opacity-60 pointer-events-none"></div>

                <div className="max-w-5xl mx-auto px-6 text-center z-10">

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#d1fae5] text-[#059669] text-sm font-bold mb-10 shadow-sm border border-emerald-100/50 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        ระบบติดตามของหายด้วย AI อัจฉริยะ
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0f172a] tracking-tight mb-8 leading-[1.1] max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
                        ตามหาของหาย <br />
                        <span className="text-[#10b981]">ง่ายและแม่นยำกว่าเดิม</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-[#64748b] mb-12 max-w-2xl mx-auto leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-10 duration-1000">
                        ไม่ว่าคุณจะทำของหาย หรือเจอของใคร เราช่วยเชื่อมโยงให้คุณหากันเจอ ด้วยเทคโนโลยี Image Recognition และ Matching Algorithm ที่ทันสมัยที่สุด
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-in fade-in slide-in-from-bottom-12 duration-1000">
                        <Link to="/report/lost">
                            <Button size="lg" className="h-16 px-10 bg-[#f43f5e] hover:bg-[#e11d48] text-white shadow-xl shadow-rose-200/80 text-lg font-bold rounded-full transition-all hover:scale-105 active:scale-95 border-none">
                                แจ้งของหาย
                            </Button>
                        </Link>
                        <Link to="/report/found">
                            <Button size="lg" className="h-16 px-10 bg-[#10b981] hover:bg-[#059669] text-white shadow-xl shadow-emerald-200/80 text-lg font-bold rounded-full transition-all hover:scale-105 active:scale-95 border-none">
                                แจ้งเจอของ
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Recent Items Section */}
            <RecentItems />

            {/* Features Section */}
            <section className="py-24 bg-slate-50/50 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            { icon: <Search size={32} />, color: "bg-blue-100 text-blue-600", title: "ค้นหาด้วย AI", desc: "ระบบช่วยคัดกรองและเปรียบเทียบรูปภาพของหายแบบอัตโนมัติ แม่นยำกว่าการค้นหาด้วยชื่อถึง 80%" },
                            { icon: <ShieldCheck size={32} />, color: "bg-emerald-100 text-emerald-600", title: "ยืนยันตัวตนปลอดภัย", desc: "มั่นใจได้ว่าของจะถึงมือเจ้าของตัวจริง ด้วยระบบยืนยันตัวตนและการตรวจสอบหลักฐานที่รัดกุม" },
                            { icon: <Zap size={32} />, color: "bg-amber-100 text-amber-600", title: "รวดเร็วทันใจ", desc: "แจ้งเตือนทันทีเมื่อพบรายการที่ตรงกัน ผ่านระบบ Notification แบบ Real-time ไม่ต้องรอนาน" }
                        ].map((feature, i) => (
                            <div key={i} className="group p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                <p className="text-slate-500 leading-relaxed text-base">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
