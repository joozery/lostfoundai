import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Tag } from "lucide-react";
import { Link } from "react-router-dom";

const RecentItems = () => {
    // Mock Data
    const items = [
        { id: 1, type: 'lost', title: 'แมวสีส้ม หาย', location: 'ลาดพร้าว 50', date: 'วันนี้', img: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=600&auto=format&fit=crop', category: 'สัตว์เลี้ยง' },
        { id: 2, type: 'found', title: 'เจอกุญแจรถ Benz', location: 'เซ็นทรัลลาดพร้าว', date: '5 นาทีที่แล้ว', img: 'https://images.unsplash.com/photo-1622630732303-8e94514a1746?q=80&w=600&auto=format&fit=crop', category: 'กุญแจ' },
        { id: 3, type: 'lost', title: 'iPhone 15 สีฟ้า', location: 'BTS สยาม', date: '1 ชม. ที่แล้ว', img: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=600&auto=format&fit=crop', category: 'อิเล็กทรอนิกส์' },
        { id: 4, type: 'found', title: 'กระเป๋าตังค์สีดำ', location: 'MRT สุขุมวิท', date: 'เมื่อวาน', img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=600&auto=format&fit=crop', category: 'กระเป๋า' },
        { id: 5, type: 'lost', title: 'กล้อง Sony A7IV', location: 'สวนรถไฟ', date: '2 วันที่แล้ว', img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop', category: 'อิเล็กทรอนิกส์' },
        { id: 6, type: 'found', title: 'บัตรประชาชน', location: 'สนามบินดอนเมือง', date: 'วันนี้', img: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop', category: 'เอกสาร' },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">รายการล่าสุด</h2>
                        <p className="text-slate-500">รวมรายการของหายและเจอของที่เพิ่งอัปเดตเข้ามาใหม่</p>
                    </div>
                </div>

                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-4 pb-4">
                        {items.map((item) => (
                            <CarouselItem key={item.id} className="pl-4 md:basis-1/2 lg:basis-1/4">
                                <Link to={`/item/${item.id}`}>
                                    <Card className="overflow-hidden border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full group">
                                        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                                            {/* Badge */}
                                            <div className="absolute top-3 left-3 z-10">
                                                {item.type === 'lost' ? (
                                                    <Badge className="bg-rose-500 hover:bg-rose-600 text-white border-0 shadow-lg shadow-rose-900/20">หาย</Badge>
                                                ) : (
                                                    <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-0 shadow-lg shadow-emerald-900/20">เจอ</Badge>
                                                )}
                                            </div>

                                            {/* Image */}
                                            <img
                                                src={item.img}
                                                alt={item.title}
                                                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                            />

                                            {/* Overlay Gradient */}
                                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                                        </div>

                                        <CardContent className="p-4 pt-5">
                                            <div className="flex items-center gap-2 mb-2 text-xs font-medium text-slate-500">
                                                <span className="flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-full text-slate-600 border border-slate-100">
                                                    <Tag size={12} /> {item.category}
                                                </span>
                                            </div>
                                            <h3 className="font-bold text-slate-900 text-lg mb-2 line-clamp-1">{item.title}</h3>
                                            <div className="flex items-center gap-1 text-slate-500 text-sm mb-1">
                                                <MapPin size={14} className="shrink-0 text-slate-400" />
                                                <span className="truncate">{item.location}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-slate-400 text-xs">
                                                <Calendar size={12} className="shrink-0" />
                                                <span>{item.date}</span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="flex justify-end gap-2 mt-4 px-4 sm:px-0">
                        <CarouselPrevious className="relative static translate-y-0 h-10 w-10 border-slate-200 hover:bg-slate-100" />
                        <CarouselNext className="relative static translate-y-0 h-10 w-10 border-slate-200 hover:bg-slate-100" />
                    </div>
                </Carousel>
            </div>
        </section>
    );
};

export default RecentItems;
