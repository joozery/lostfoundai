import { useState, useEffect } from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Tag, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import api from '../lib/axios';

const RecentItems = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await api.get('/items');
                setItems(res.data);
            } catch (err) {
                console.error("Failed to fetch items", err);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    if (loading) {
        return (
            <div className="py-20 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            </div>
        );
    }

    if (items.length === 0) {
        return null;
    }

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
                            <CarouselItem key={item._id} className="pl-4 md:basis-1/2 lg:basis-1/4">
                                <Link to={`/item/${item._id}`}>
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
                                                src={item.images?.[0] || 'https://via.placeholder.com/400x300?text=No+Image'}
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
                                                <span>{new Date(item.date).toLocaleDateString('th-TH')}</span>
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
