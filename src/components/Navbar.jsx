import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search, MapPin, Menu, User, LogOut, Settings, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

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
                    <Link to="/ai-search" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors flex items-center gap-1.5">
                        <Sparkles size={16} /> AI ค้นหาอัจฉริยะ
                    </Link>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <Link to="/search">
                    <Button variant="ghost" size="icon" className="text-slate-500 hover:bg-slate-100 rounded-full">
                        <Search size={20} />
                    </Button>
                </Link>
                <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

                {user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                <Avatar className="h-10 w-10 border-2 border-emerald-100">
                                    <AvatarImage src={user.avatar} alt={user.firstname} />
                                    <AvatarFallback className="bg-emerald-50 text-emerald-600">{user.firstname?.charAt(0)}</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">{user.firstname} {user.lastname}</p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        {user.email}
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => navigate('/profile')}>
                                <User className="mr-2 h-4 w-4" />
                                <span>โปรไฟล์ของฉัน</span>
                            </DropdownMenuItem>
                            {user.role === 'admin' && (
                                <DropdownMenuItem onClick={() => navigate('/admin')}>
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>ระบบจัดการ (Admin)</span>
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600 focus:bg-red-50">
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>ออกจากระบบ</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
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
                )}

                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu size={24} />
                </Button>
            </div>
        </nav>
    );
};

export default Navbar;
