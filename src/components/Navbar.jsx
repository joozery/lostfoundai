import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search, MapPin, Menu } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50 flex items-center justify-between px-6 lg:px-12">
            <div className="flex items-center gap-12">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200 group-hover:shadow-emerald-300 transition-all">
                        <MapPin size={24} fill="currentColor" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-extrabold text-slate-800 tracking-tight leading-none">Lost&Found</span>
                        <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">AI System</span>
                    </div>
                </Link>

                <div className="hidden md:flex gap-8">
                    <Link to="/" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">หน้าแรก</Link>
                    <Link to="/search" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">ค้นหาของหาย</Link>
                    <Link to="/report/lost" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">แจ้งของหาย</Link>
                    <Link to="/report/found" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">แจ้งเจอของ</Link>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <Link to="/search">
                    <Button variant="ghost" size="icon" className="text-slate-500 hover:bg-slate-100 rounded-full">
                        <Search size={20} />
                    </Button>
                </Link>
                <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
                <div className="hidden sm:flex items-center gap-3">
                    <Link to="/login">
                        <Button variant="ghost" className="font-semibold text-slate-600 hover:text-slate-900">เข้าสู่ระบบ</Button>
                    </Link>
                    <Link to="/register">
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200 font-bold rounded-full px-6">
                            สมัครสมาชิก
                        </Button>
                    </Link>
                </div>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu size={24} />
                </Button>
            </div>
        </nav>
    );
};

export default Navbar;
