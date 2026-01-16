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
    Trash2,
    Search,
    Filter,
    Download,
    Shield,
    Calendar,
    MapPin
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

const AdminItems = () => {
    const items = [
        { id: 'L-001', title: 'กระเป๋าสตางค์ Chanel Classic', user: 'สมหญิง มีทรัพย์', avatar: null, date: '15/01/2024', status: 'Pending', type: 'Lost', location: 'สยามพารากอน' },
        { id: 'F-002', title: 'iPhone 15 Pro Max', user: 'บุญมี ใจดี', avatar: 'https://github.com/shadcn.png', date: '14/01/2024', status: 'Matched', type: 'Found', location: 'เซ็นทรัลเวิลด์' },
        { id: 'L-003', title: 'กุญแจรถยนต์ Honda Civic', user: 'Admin User', avatar: null, date: '16/01/2024', status: 'Active', type: 'Lost', location: 'MRT จตุจักร' },
        { id: 'F-004', title: 'MacBook Air M2', user: 'Visitor', avatar: null, date: '12/01/2024', status: 'Returned', type: 'Found', location: 'Starbucks สยาม' },
        { id: 'L-005', title: 'หูฟัง Sony WH-1000XM5', user: 'David K.', avatar: null, date: '11/01/2024', status: 'Active', type: 'Lost', location: 'เอ็มควอเทียร์' },
    ];

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Matched': return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200 shadow-sm font-medium">จับคู่สำเร็จ</Badge>;
            case 'Returned': return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200 shadow-sm font-medium">ส่งคืนแล้ว</Badge>;
            case 'Pending': return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200 shadow-sm font-medium">รอตรวจสอบ</Badge>;
            default: return <Badge variant="outline" className="text-slate-600 border-slate-300 font-medium">กำลังดำเนินการ</Badge>;
        }
    };

    const getTypeBadge = (type) => {
        return type === 'Lost'
            ? <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200 font-bold">แจ้งหาย</Badge>
            : <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 font-bold">เจอของ</Badge>;
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto font-sans">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">จัดการรายการทั้งหมด (Items)</h2>
                    <p className="text-slate-500 mt-1">บริหารจัดการรายการแจ้งหายและเจอของทั้งหมดในระบบ</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="gap-2 bg-white hover:bg-slate-50 border-slate-300 shadow-sm text-slate-700 font-medium"><Download size={16} /> Export CSV</Button>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-lg shadow-slate-200/40 overflow-hidden">

                {/* Toolbar */}
                <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full sm:w-96 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                        <Input
                            placeholder="ค้นหารายการ, ผู้ใช้งาน, สถานที่..."
                            className="pl-10 bg-white border-slate-200 focus-visible:ring-emerald-500/20 shadow-sm"
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Button variant="outline" size="sm" className="gap-2 bg-white border-dashed border-slate-300 text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-400 font-medium">
                            <Filter size={14} /> สถานะ
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2 bg-white border-dashed border-slate-300 text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-400 font-medium">
                            <Shield size={14} /> ประเภท
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2 bg-white border-dashed border-slate-300 text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-400 font-medium hidden sm:flex">
                            <Calendar size={14} /> วันที่
                        </Button>
                    </div>
                </div>

                {/* Table */}
                <div className="relative w-full overflow-auto">
                    <Table>
                        <TableHeader className="bg-slate-50/80 sticky top-0 z-10 backdrop-blur-sm">
                            <TableRow className="hover:bg-transparent border-slate-200">
                                <TableHead className="w-[100px] font-bold text-slate-700">รหัสอ้างอิง</TableHead>
                                <TableHead className="font-bold text-slate-700 min-w-[200px]">รายละเอียดสิ่งของ</TableHead>
                                <TableHead className="font-bold text-slate-700">ประเภท</TableHead>
                                <TableHead className="font-bold text-slate-700">ผู้รายงาน</TableHead>
                                <TableHead className="font-bold text-slate-700">สถานที่</TableHead>
                                <TableHead className="font-bold text-slate-700">สถานะ</TableHead>
                                <TableHead className="text-right font-bold text-slate-700">จัดการ</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.map((item) => (
                                <TableRow key={item.id} className="hover:bg-slate-50 transition-all border-b border-slate-100 last:border-0 group cursor-pointer">
                                    <TableCell className="font-mono text-xs font-semibold text-slate-500 group-hover:text-emerald-600 transition-colors">{item.id}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col py-1">
                                            <span className="font-bold text-slate-800 text-sm">{item.title}</span>
                                            <span className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                                                <Calendar size={10} /> {item.date}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {getTypeBadge(item.type)}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-7 w-7 border border-slate-200">
                                                <AvatarImage src={item.avatar} />
                                                <AvatarFallback className="text-[10px] bg-indigo-50 text-indigo-600 font-bold">{item.user.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm font-medium text-slate-700">{item.user}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1 text-slate-600 text-sm max-w-[150px] truncate">
                                            <MapPin size={12} className="text-slate-400 shrink-0" />
                                            <span title={item.location} className="truncate">{item.location}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {getStatusBadge(item.status)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-full">
                                                    <span className="sr-only">เปิดเมนู</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48 shadow-xl border-slate-200">
                                                <DropdownMenuLabel className="text-xs font-bold text-slate-500 uppercase tracking-wider">ตัวเลือกจัดการ</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="cursor-pointer font-medium py-2">
                                                    <Eye className="mr-2 h-4 w-4 text-slate-500" /> ดูรายละเอียด
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="cursor-pointer font-medium py-2">
                                                    <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" /> ตรวจสอบแล้ว
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="cursor-pointer font-medium py-2 text-rose-600 focus:text-rose-700 focus:bg-rose-50">
                                                    <Trash2 className="mr-2 h-4 w-4" /> ลบรายการ
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination Wrapper */}
                <div className="flex items-center justify-between px-4 py-4 border-t border-slate-200 bg-slate-50/50">
                    <div className="text-xs text-slate-500 font-medium">
                        แสดง <span className="font-bold text-slate-800">1-5</span> จาก <span className="font-bold text-slate-800">1,248</span> รายการ
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled>
                            <span className="sr-only">ก่อนหน้า</span>
                            &lt;
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700 hover:text-white font-bold shadow-md shadow-emerald-200">
                            1
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            2
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            3
                        </Button>
                        <span className="text-slate-400">...</span>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            Next &gt;
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminItems;
