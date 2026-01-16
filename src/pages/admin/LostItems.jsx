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
    AlertCircle
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

const AdminLostItems = () => {
    // Mock Data for Lost Items
    const items = [
        { id: 'L-001', title: 'กระเป๋าสตางค์ Chanel Classic', user: 'สมหญิง มีทรัพย์', avatar: null, date: '15/01/2024', status: 'Pending', location: 'สยามพารากอน', category: 'Wallet' },
        { id: 'L-003', title: 'กุญแจรถยนต์ Honda Civic', user: 'Admin User', avatar: null, date: '16/01/2024', status: 'Active', location: 'MRT จตุจักร', category: 'Keys' },
        { id: 'L-005', title: 'หูฟัง Sony WH-1000XM5', user: 'David K.', avatar: null, date: '11/01/2024', status: 'Active', location: 'เอ็มควอเทียร์', category: 'Electronics' },
    ];

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Pending': return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200">รอตรวจสอบ</Badge>;
            case 'Active': return <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-200 border-rose-200">กำลังประกาศหา</Badge>;
            default: return <Badge variant="outline">Unknow</Badge>;
        }
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto font-sans">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
                        <div className="p-2 bg-rose-100 rounded-lg">
                            <AlertCircle className="text-rose-600 h-6 w-6" />
                        </div>
                        จัดการของหาย (Lost Items)
                    </h2>
                    <p className="text-slate-500 mt-1 ml-14">รายการแจ้งของหายทั้งหมดที่ต้องการความช่วยเหลือ</p>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-lg shadow-slate-200/40 overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b border-slate-200 bg-rose-50/30 flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full sm:w-96 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-rose-500 transition-colors" />
                        <Input
                            placeholder="ค้นหารายการของหาย..."
                            className="pl-10 bg-white border-slate-200 focus-visible:ring-rose-500/20 shadow-sm"
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Button variant="outline" size="sm" className="gap-2 bg-white text-slate-600 hover:text-rose-600 hover:border-rose-200">
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
                                <TableHead className="font-bold text-slate-700">ผู้แจ้ง</TableHead>
                                <TableHead className="font-bold text-slate-700">สถานที่หาย</TableHead>
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
                                                <AvatarFallback className="text-[10px] bg-rose-50 text-rose-600">{item.user.charAt(0)}</AvatarFallback>
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
                                                <DropdownMenuItem className="cursor-pointer text-emerald-600">
                                                    <CheckCircle className="mr-2 h-4 w-4" /> ยืนยันข้อมูลถูกต้อง
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

export default AdminLostItems;
