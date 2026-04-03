import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    MoreHorizontal,
    Shield,
    Search,
    Filter,
    Download,
    UserCog,
    Ban,
    Mail
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import api from "@/lib/axios";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await api.get('/admin/users', {
                    params: { search }
                });
                setUsers(res.data);
            } catch (err) {
                console.error('Failed to fetch users:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [search]);

    const getStatusBadge = (isSuspended) => {
        if (isSuspended) {
            return <Badge variant="destructive" className="bg-rose-100 text-rose-700 border-rose-200">ระงับการใช้งาน</Badge>;
        }
        return <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">ใช้งานปกติ</Badge>;
    };

    const getRoleBadge = (role) => {
        switch (role) {
            case 'admin': return <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 border-indigo-200"><Shield size={12} className="mr-1" /> ผู้ดูแลระบบ</Badge>;
            case 'staff': return <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">เจ้าหน้าที่</Badge>;
            default: return <Badge variant="outline" className="text-slate-600">ผู้ใช้งานทั่วไป</Badge>;
        }
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto font-sans">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">จัดการผู้ใช้งาน (Users)</h2>
                    <p className="text-slate-500 mt-1">รายชื่อผู้ใช้งานทั้งหมดและสิทธิ์การเข้าถึง</p>
                </div>
                <Button variant="outline" className="gap-2 bg-white hover:bg-slate-50 border-slate-300 shadow-sm text-slate-700 font-medium">
                    <Download size={16} /> Export Users
                </Button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-lg shadow-slate-200/40 overflow-hidden">
                <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full sm:w-96 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                        <Input
                            placeholder="ค้นหาชื่อ, อีเมล, หรือ ID..."
                            className="pl-10 bg-white border-slate-200 focus-visible:ring-indigo-500/20 shadow-sm"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Button variant="outline" size="sm" className="gap-2 bg-white border-dashed border-slate-300 text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-400 font-medium">
                            <Filter size={14} /> สถานะ
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2 bg-white border-dashed border-slate-300 text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-400 font-medium">
                            <UserCog size={14} /> บทบาท
                        </Button>
                    </div>
                </div>

                <div className="relative w-full overflow-auto">
                    <Table>
                        <TableHeader className="bg-slate-50/80 sticky top-0 z-10 backdrop-blur-sm">
                            <TableRow className="hover:bg-transparent border-slate-200">
                                <TableHead className="font-bold text-slate-700 w-[80px]">ID</TableHead>
                                <TableHead className="font-bold text-slate-700">ผู้ใช้งาน</TableHead>
                                <TableHead className="font-bold text-slate-700">บทบาท</TableHead>
                                <TableHead className="font-bold text-slate-700">วันที่สมัคร</TableHead>
                                <TableHead className="font-bold text-slate-700">สถานะ</TableHead>
                                <TableHead className="text-right font-bold text-slate-700">จัดการ</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user._id} className="hover:bg-slate-50 transition-all border-b border-slate-100 last:border-0">
                                    <TableCell className="font-mono text-[10px] font-semibold text-slate-500">{user._id.substring(0, 8)}...</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9 border border-slate-200">
                                                <AvatarImage src={user.avatar} />
                                                <AvatarFallback className="bg-slate-100 text-slate-600 font-bold">{user.firstname.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-800 text-sm">{user.firstname} {user.lastname}</span>
                                                <span className="text-xs text-slate-500">{user.email}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                                    <TableCell className="text-sm text-slate-600">{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>{getStatusBadge(user.isSuspended)}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-full">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48 shadow-xl border-slate-200">
                                                <DropdownMenuItem className="cursor-pointer font-medium py-2">
                                                    <UserCog className="mr-2 h-4 w-4 text-slate-500" /> แก้ไขข้อมูล
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="cursor-pointer font-medium py-2">
                                                    <Mail className="mr-2 h-4 w-4 text-slate-500" /> ส่งข้อความ
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="cursor-pointer font-medium py-2 text-rose-600 focus:text-rose-700 focus:bg-rose-50">
                                                    <Ban className="mr-2 h-4 w-4" /> ระงับการใช้งาน
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default AdminUsers;
