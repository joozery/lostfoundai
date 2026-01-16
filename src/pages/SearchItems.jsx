import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, MapPin, Calendar, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const SearchItems = () => {
    // Mock data for display
    const items = [
        { id: 1, title: 'iPhone 15 Pro', location: 'Central World', date: 'วันนี้', type: 'found', image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=500&auto=format&fit=crop&q=60' },
        { id: 2, title: 'กระเป๋า Gucci', location: 'BTS Siam', date: 'เมื่อวาน', type: 'lost', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&auto=format&fit=crop&q=60' },
        { id: 3, title: 'กุญแจรถ Honda', location: 'สวนลุมพินี', date: '2 วันที่แล้ว', type: 'found', image: 'https://images.unsplash.com/photo-1622666503767-17b5945cb97d?w=500&auto=format&fit=crop&q=60' },
        { id: 4, title: 'แมวสีส้ม', location: 'หมู่บ้านเสรี', date: '3 วันที่แล้ว', type: 'lost', image: 'https://images.unsplash.com/photo-1529778873920-4da4926a7071?w=500&auto=format&fit=crop&q=60' },
    ];

    return (
        <div className="max-w-7xl mx-auto py-12 px-6 font-sans">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-slate-900 mb-2">ค้นหารายการ</h1>
                <div className="flex flex-col md:flex-row gap-4 mt-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <Input placeholder="ค้นหาสิ่งของ, สถานที่..." className="pl-10 h-12 text-lg bg-white shadow-sm border-slate-200" />
                    </div>
                    <div className="w-full md:w-48">
                        <Select>
                            <SelectTrigger className="h-12 bg-white shadow-sm border-slate-200">
                                <SelectValue placeholder="ประเภท" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">ทั้งหมด</SelectItem>
                                <SelectItem value="lost">ของหาย (Lost)</SelectItem>
                                <SelectItem value="found">เจอของ (Found)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button className="h-12 px-8 bg-emerald-600 hover:bg-emerald-700 font-bold shadow-lg shadow-emerald-200">
                        <Filter className="mr-2 h-4 w-4" /> กรองข้อมูล
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.map((item) => (
                    <Link key={item.id} to={`/item/${item.id}`} className="group">
                        <Card className="overflow-hidden border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="aspect-[4/3] relative overflow-hidden bg-slate-100">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md ${item.type === 'lost' ? 'bg-rose-500' : 'bg-emerald-500'}`}>
                                    {item.type === 'lost' ? 'หาย' : 'เจอ'}
                                </div>
                            </div>
                            <CardContent className="p-4">
                                <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-emerald-600 transition-colors truncate">{item.title}</h3>
                                <div className="space-y-1 text-sm text-slate-500">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={14} className="text-emerald-500" />
                                        <span className="truncate">{item.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} className="text-emerald-500" />
                                        <span>{item.date}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SearchItems;
