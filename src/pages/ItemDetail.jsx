import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Share2, Flag, MessageCircle } from 'lucide-react';

const ItemDetail = () => {
    const { id } = useParams();

    // Mock Data
    const item = {
        id,
        title: 'iPhone 15 Pro Max',
        description: 'สี Natural Titanium ความจุ 256GB เคสใส MagSafe หายบริเวณศูนย์อาหารชั้น 7',
        location: 'Central World',
        date: '16 ม.ค. 2024',
        time: '12:30 น.',
        type: 'lost',
        image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=800&auto=format&fit=crop&q=80',
        user: 'สมชาย ใจดี',
        category: 'Electronics'
    };

    return (
        <div className="max-w-5xl mx-auto py-12 px-6 font-sans">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                {/* Image Section */}
                <div className="space-y-4">
                    <div className="aspect-square rounded-3xl overflow-hidden bg-slate-100 shadow-lg border border-slate-100">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                </div>

                {/* Details Section */}
                <div className="space-y-8">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Badge className={`px-3 py-1 text-sm ${item.type === 'lost' ? 'bg-rose-100 text-rose-700 hover:bg-rose-200' : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'}`}>
                                {item.type === 'lost' ? 'ประกาศหาย' : 'ประกาศเจอของ'}
                            </Badge>
                            <Badge variant="outline" className="text-slate-500">{item.category}</Badge>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{item.title}</h1>
                        <p className="text-slate-500 text-lg leading-relaxed">{item.description}</p>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-6 space-y-4 border border-slate-100">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-sm border border-slate-100">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">สถานที่</p>
                                <p className="font-semibold text-slate-800">{item.location}</p>
                            </div>
                        </div>
                        <div className="w-full h-px bg-slate-200"></div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-sm border border-slate-100">
                                <Calendar size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">วันและเวลา</p>
                                <p className="font-semibold text-slate-800">{item.date} • {item.time}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Button size="lg" className="w-full h-14 text-lg font-bold bg-slate-900 hover:bg-slate-800 shadow-xl">
                            <MessageCircle className="mr-2 h-5 w-5" /> ติดต่อผู้ประกาศ
                        </Button>
                        <div className="flex gap-3">
                            <Button variant="outline" size="lg" className="flex-1 font-semibold border-slate-300">
                                <Share2 className="mr-2 h-5 w-5" /> แชร์
                            </Button>
                            <Button variant="outline" size="lg" className="flex-1 font-semibold border-slate-300 text-rose-600 hover:text-rose-700 hover:bg-rose-50">
                                <Flag className="mr-2 h-5 w-5" /> แจ้งปัญหา
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">
                            {item.user.charAt(0)}
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">ประกาศโดย</p>
                            <p className="font-bold text-slate-800">{item.user}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetail;
