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
    Eye,
    CheckCircle,
    Search,
    Filter,
    Calendar,
    MapPin,
    ShieldCheck
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const AdminFoundItems = () => {
    // Mock Data for Found Items
    const items = [
        { id: 'F-002', title: 'iPhone 15 Pro Max', user: 'บุญมี ใจดี', avatar: null, date: '14/01/2024', status: 'Matched', location: 'เซ็นทรัลเวิลด์', category: 'Electronics' },
        { id: 'F-004', title: 'MacBook Air M2', user: 'Visitor', avatar: null, date: '12/01/2024', status: 'Returned', location: 'Starbucks สยาม', category: 'Laptop' },
    ];

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Matched': return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200">จับคู่สำเร็จ</Badge>;
            case 'Returned': return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200">ส่งคืนแล้ว</Badge>;
            default: return <Badge variant="outline">Unknow</Badge>;
        }
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto font-sans">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 rounded-lg">
                            <ShieldCheck className="text-emerald-600 h-6 w-6" />
                        </div>
                        จัดการของที่พบ (Found Items)
                    </h2>
                    <p className="text-slate-500 mt-1 ml-14">รายการสิ่งของที่ถูกพบและรอส่งคืนเจ้าของ</p>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-lg shadow-slate-200/40 overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b border-slate-200 bg-emerald-50/30 flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full sm:w-96 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                        <Input
                            placeholder="ค้นหารายการที่พบ..."
                            className="pl-10 bg-white border-slate-200 focus-visible:ring-emerald-500/20 shadow-sm"
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Button variant="outline" size="sm" className="gap-2 bg-white text-slate-600 hover:text-emerald-600 hover:border-emerald-200">
                            <Filter size={14} /> กรองสถานะ
                        </Button>
                    </div>
                </div>

                <div className="relative w-full overflow-auto">
                    <Table>
                        <TableHeader className="bg-slate-50/80 sticky top-0 z-10 backdrop-blur-sm">
                            <TableRow className="hover:bg-transparent border-slate-200">
                                <TableHead className="font-bold text-slate-700 w-[100px]">รหัส</TableHead>
                                <TableHead className="font-bold text-slate-700">รายการ</TableHead>
                                <TableHead className="font-bold text-slate-700">หมวดหมู่</TableHead>
                                <TableHead className="font-bold text-slate-700">ผู้พบ</TableHead>
                                <TableHead className="font-bold text-slate-700">สถานที่พบ</TableHead>
                                <TableHead className="font-bold text-slate-700">สถานะ</TableHead>
                                <TableHead className="text-right font-bold text-slate-700">จัดการ</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.map((item) => (
                                <TableRow key={item.id} className="hover:bg-slate-50 transition-all border-b border-slate-100 last:border-0">
                                    <TableCell className="font-mono text-xs font-semibold text-slate-500">{item.id}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col py-1">
                                            <span className="font-bold text-slate-800 text-sm">{item.title}</span>
                                            <span className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                                                <Calendar size={10} /> {item.date}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell><Badge variant="outline" className="text-slate-600">{item.category}</Badge></TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-6 w-6">
                                                <AvatarFallback className="text-[10px] bg-emerald-50 text-emerald-600">{item.user.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm font-medium text-slate-700">{item.user}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-slate-600 text-sm">{item.location}</TableCell>
                                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-slate-800 rounded-full">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem className="cursor-pointer">
                                                    <Eye className="mr-2 h-4 w-4" /> ดูรายละเอียด
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="cursor-pointer text-blue-600">
                                                    <CheckCircle className="mr-2 h-4 w-4" /> บันทึกการส่งคืน
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

export default AdminFoundItems;
