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
    ShieldCheck,
    ShieldAlert,
    Shield,
    Search,
    UserPlus,
    Mail,
    KeyRound
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

const AdminStaff = () => {
    // Mock Data for Staff
    const staffMembers = [
        { id: 'ST-001', name: 'Admin Administrator', email: 'admin@lostfound.com', role: 'Super Admin', status: 'Active', lastActive: 'Now', avatar: 'https://github.com/shadcn.png' },
        { id: 'ST-002', name: 'Support Team A', email: 'support.a@lostfound.com', role: 'Support', status: 'Active', lastActive: '5m ago', avatar: null },
        { id: 'ST-003', name: 'Moderator One', email: 'mod.one@lostfound.com', role: 'Moderator', status: 'Offline', lastActive: '2h ago', avatar: null },
    ];

    const getRoleBadge = (role) => {
        switch (role) {
            case 'Super Admin': return <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-200"><ShieldAlert size={12} className="mr-1" /> Super Admin</Badge>;
            case 'Moderator': return <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-indigo-200"><ShieldCheck size={12} className="mr-1" /> Moderator</Badge>;
            case 'Support': return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200"><Shield size={12} className="mr-1" /> Support</Badge>;
            default: return <Badge variant="outline">Staff</Badge>;
        }
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto font-sans">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <ShieldCheck className="text-purple-600 h-6 w-6" />
                        </div>
                        จัดการผู้ดูแล (Staff)
                    </h2>
                    <p className="text-slate-500 mt-1 ml-14">จัดการสิทธิ์และบัญชีผู้ดูแลระบบ</p>
                </div>
                <Button className="gap-2 bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-200 font-bold">
                    <UserPlus size={18} /> เพิ่มผู้ดูแลใหม่
                </Button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-lg shadow-slate-200/40 overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b border-slate-200 bg-purple-50/30 flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full sm:w-96 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
                        <Input
                            placeholder="ค้นหาชื่อ, อีเมล..."
                            className="pl-10 bg-white border-slate-200 focus-visible:ring-purple-500/20 shadow-sm"
                        />
                    </div>
                </div>

                <div className="relative w-full overflow-auto">
                    <Table>
                        <TableHeader className="bg-slate-50/80 sticky top-0 z-10 backdrop-blur-sm">
                            <TableRow className="hover:bg-transparent border-slate-200">
                                <TableHead className="font-bold text-slate-700 w-[100px]">ID</TableHead>
                                <TableHead className="font-bold text-slate-700">ผู้ดูแล</TableHead>
                                <TableHead className="font-bold text-slate-700">ตำแหน่ง</TableHead>
                                <TableHead className="font-bold text-slate-700">สถานะ</TableHead>
                                <TableHead className="font-bold text-slate-700">ใช้งานล่าสุด</TableHead>
                                <TableHead className="text-right font-bold text-slate-700">จัดการ</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {staffMembers.map((staff) => (
                                <TableRow key={staff.id} className="hover:bg-slate-50 transition-all border-b border-slate-100 last:border-0">
                                    <TableCell className="font-mono text-xs font-semibold text-slate-500">{staff.id}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9 border border-slate-200">
                                                <AvatarImage src={staff.avatar} />
                                                <AvatarFallback className="bg-purple-100 text-purple-700 font-bold">{staff.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-800 text-sm">{staff.name}</span>
                                                <span className="text-xs text-slate-500">{staff.email}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{getRoleBadge(staff.role)}</TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${staff.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${staff.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'
                                                }`}></span>
                                            {staff.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-sm text-slate-600 font-mono">{staff.lastActive}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-slate-800 rounded-full">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Account Action</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="cursor-pointer">
                                                    <KeyRound className="mr-2 h-4 w-4 text-slate-500" /> เปลี่ยนรหัสผ่าน
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="cursor-pointer">
                                                    <Mail className="mr-2 h-4 w-4 text-slate-500" /> ส่งข้อความ
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="cursor-pointer text-rose-600 focus:text-rose-700 focus:bg-rose-50">
                                                    ระงับสิทธิ์การใช้งาน
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

export default AdminStaff;
