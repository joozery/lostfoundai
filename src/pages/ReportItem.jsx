import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
    Upload, Camera, Loader2, X, MapPin, Calendar, Type, 
    FileText, ImagePlus, AlertCircle, CheckCircle2, 
    Smartphone, Shirt, Wallet, Briefcase, Key, FileBadge, 
    PawPrint, Gem, Glasses, BookText, HeartPulse, Trophy, 
    Music, Wrench, ToyBrick, Boxes, LayoutGrid, Sparkles
} from 'lucide-react';
import api from '../lib/axios';
import { useAuth } from '../context/AuthContext';
import { Alert, AlertDescription } from "@/components/ui/alert";

const ReportItem = () => {
    const { type } = useParams(); // 'lost' or 'found'
    const isLost = type === 'lost';
    const navigate = useNavigate();
    const { user } = useAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        location: '',
        date: ''
    });

    const categoryOptions = [
        { value: "electronics", label: "อุปกรณ์อิเล็กทรอนิกส์", icon: Smartphone },
        { value: "wallet", label: "กระเป๋าสตางค์/บัตร/กุญแจ", icon: Wallet },
        { value: "clothing", label: "เสื้อผ้า/เครื่องแต่งกาย", icon: Shirt },
        { value: "bag", label: "กระเป๋า/เป้", icon: Briefcase },
        { value: "jewelry", label: "เครื่องประดับ/นาฬิกา", icon: Gem },
        { value: "glasses", label: "แว่นตา", icon: Glasses },
        { value: "documents", label: "เอกสารสำคัญ/พาสปอร์ต", icon: FileBadge },
        { value: "stationery", label: "เครื่องเขียน/หนังสือ", icon: BookText },
        { value: "health", label: "อุปกรณ์สุขภาพ/ยา", icon: HeartPulse },
        { value: "pets", label: "สัตว์เลี้ยง/สิ่งมีชีวิต", icon: PawPrint },
        { value: "sports", label: "อุปกรณ์กีฬา/สันทนาการ", icon: Trophy },
        { value: "music", label: "เครื่องดนตรี/ลำโพง/หูฟัง", icon: Music },
        { value: "tools", label: "เครื่องมือ/อุปกรณ์ช่าง", icon: Wrench },
        { value: "toy", label: "ของเล่น/ของสะสม", icon: ToyBrick },
        { value: "others", label: "อื่นๆ", icon: Boxes },
    ];

    const theme = isLost ? {
        primary: 'rose',
        button: 'bg-rose-600 hover:bg-rose-700',
        text: 'text-rose-600',
        bg: 'bg-rose-50',
        icon: AlertCircle,
        title: 'แบบฟอร์มแจ้งของหาย',
        subtitle: 'ระบุข้อมูลสิ่งของที่คุณทำหายเพื่อให้ระบบช่วยทำการค้นหา'
    } : {
        primary: 'emerald',
        button: 'bg-emerald-600 hover:bg-emerald-700',
        text: 'text-emerald-600',
        bg: 'bg-emerald-50',
        icon: CheckCircle2,
        title: 'แบบฟอร์มแจ้งพบสิ่งของ',
        subtitle: 'ระบุรายละเอียดสิ่งของที่คุณพบเพื่อส่งคืนเจ้าของ'
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleCategoryChange = (value) => {
        setFormData({ ...formData, category: value });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + images.length > 5) {
            setError('สามารถอัปโหลดรูปภาพได้สูงสุด 5 รูป');
            return;
        }

        const newImages = [...images, ...files];
        setImages(newImages);

        const newPreviews = files.map(file => URL.createObjectURL(file));
        setImagePreviews([...imagePreviews, ...newPreviews]);
        setError(null);
    };

    const removeImage = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        const newPreviews = imagePreviews.filter((_, i) => i !== index);
        setImages(newImages);
        setImagePreviews(newPreviews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!user) {
            setError('กรุณาเข้าสู่ระบบก่อนดำเนินการต่อ');
            setLoading(false);
            return;
        }

        if (images.length === 0) {
            setError('กรุณาอัปโหลดรูปภาพสิ่งของอย่างน้อย 1 รูป');
            setLoading(false);
            return;
        }

        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('category', formData.category);
            data.append('description', formData.description);
            data.append('location', formData.location);
            data.append('date', formData.date);
            data.append('type', type);

            images.forEach(image => {
                data.append('images', image);
            });

            await api.post('/items', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            navigate('/');
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่อีกครั้ง');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 font-sans antialiased text-slate-900">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 mb-2">
                            <div className={`p-1.5 rounded-lg ${theme.bg} ${theme.text}`}>
                                <theme.icon size={20} />
                            </div>
                            <span className={`text-sm font-bold uppercase tracking-wider ${theme.text}`}>
                                {isLost ? 'Lost Report' : 'Found Report'}
                            </span>
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{theme.title}</h1>
                        <p className="text-slate-500 font-medium">{theme.subtitle}</p>
                    </div>
                </div>

                <Card className="border shadow-md border-slate-200 overflow-hidden rounded-2xl bg-white">
                    <CardContent className="p-0">
                        {error && (
                            <div className="p-6 pb-0">
                                <Alert variant="destructive" className="border-rose-100 bg-rose-50 text-rose-700 rounded-xl">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription className="font-semibold">{error}</AlertDescription>
                                </Alert>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="divide-y divide-slate-100">
                            {/* Photos Section */}
                            <div className="p-8 space-y-6">
                                <div className="flex items-center justify-between">
                                    <Label className="text-base font-bold text-slate-800 flex items-center gap-2">
                                        รูปภาพสิ่งของ <span className="text-slate-400 font-normal">(จำเป็น) (สูงสุด 5 รูป)</span>
                                    </Label>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                                    {imagePreviews.map((preview, index) => (
                                        <div key={index} className="group relative aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                                            <img src={preview} alt="item" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-600"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                    
                                    {imagePreviews.length < 5 && (
                                        <label className="flex flex-col items-center justify-center aspect-square rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300 transition-all cursor-pointer group">
                                            <Camera className="w-8 h-8 text-slate-400 group-hover:text-slate-600 mb-2" />
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-600">เพิ่มรูปภาพ</span>
                                            <input type="file" className="hidden" accept="image/*" multiple onChange={handleImageChange} />
                                        </label>
                                    )}
                                </div>
                            </div>

                            {/* Core Details Section */}
                            <div className="p-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="title" className="text-sm font-bold text-slate-700">หัวข้อประกาศ <span className="text-rose-500">*</span></Label>
                                            <Input
                                                id="title"
                                                placeholder={`เช่น ${isLost ? 'ทำกระเป๋าสตางค์ยี่ห้อ Coach หาย' : 'เจอกุญแจกุญแจรถยนต์'}`}
                                                value={formData.title}
                                                onChange={handleChange}
                                                required
                                                className="h-11 border-slate-200 rounded-lg focus:ring-1 focus:ring-slate-300 transition-all font-medium"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="category" className="text-sm font-bold text-slate-700">หมวดหมู่ <span className="text-rose-500">*</span></Label>
                                            <Select onValueChange={handleCategoryChange} value={formData.category} required>
                                                <SelectTrigger className="h-11 border-slate-200 rounded-lg font-medium text-slate-700">
                                                    <SelectValue placeholder="เลือกหมวดหมู่สิ่งของ" />
                                                </SelectTrigger>
                                                <SelectContent className="max-h-[300px]">
                                                    {categoryOptions.map((opt) => (
                                                        <SelectItem key={opt.value} value={opt.value} className="py-2.5">
                                                            <div className="flex items-center gap-3">
                                                                <opt.icon size={16} className="text-slate-400" />
                                                                <span className="font-medium text-slate-700">{opt.label}</span>
                                                            </div>
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="location" className="text-sm font-bold text-slate-700">{isLost ? 'สถานที่หาย' : 'สถานที่พบ'} <span className="text-rose-500">*</span></Label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                                <Input
                                                    id="location"
                                                    placeholder="เช่น หน้าหอสมุดกลาง, ห้างสรรพสินค้าชั้น 3"
                                                    value={formData.location}
                                                    onChange={handleChange}
                                                    required
                                                    className="pl-10 h-11 border-slate-200 rounded-lg font-medium"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="date" className="text-sm font-bold text-slate-700">{isLost ? 'วันที่คาดว่าหาย' : 'วันที่พบ'} <span className="text-rose-500">*</span></Label>
                                            <div className="relative">
                                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                                <Input
                                                    id="date"
                                                    type="date"
                                                    value={formData.date}
                                                    onChange={handleChange}
                                                    required
                                                    className="pl-10 h-11 border-slate-200 rounded-lg font-medium"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description" className="text-sm font-bold text-slate-700">รายละเอียดเพิ่มเติม <span className="text-rose-500">*</span></Label>
                                        <Textarea
                                            id="description"
                                            placeholder="ระบุลักษณะโดยละเอียด เช่น สี, ขนาด, ยี่ห้อ, จุดสังเกตเฉพาะ หรือตำหนิ เพื่อให้เจ้าของหรือผู้พบเห็นสามารถยืนยันได้ถูกต้อง"
                                            className="h-[calc(100%-28px)] min-h-[220px] border-slate-200 rounded-lg focus:ring-1 focus:ring-slate-300 transition-all font-medium leading-relaxed resize-none p-4"
                                            value={formData.description}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Submission Area */}
                            <div className="p-8 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <p className="text-sm text-slate-500 font-medium italic">
                                    * โปรดตรวจสอบข้อมูลให้ถูกต้องก่อนกดบันทึก
                                </p>
                                <div className="flex items-center gap-3 w-full sm:w-auto">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="flex-1 sm:flex-none h-11 rounded-lg font-bold border-slate-200"
                                        onClick={() => navigate(-1)}
                                    >
                                        ยกเลิก
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className={`flex-1 sm:flex-none h-11 px-8 rounded-lg font-bold text-white shadow-sm transition-all active:scale-95 ${theme.button}`}
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                กำลังบันทึก...
                                            </>
                                        ) : (
                                            'ยืนยันและโพสต์ประกาศ'
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Info Footer */}
                <div className="grid md:grid-cols-2 gap-6 px-2">
                    <div className="flex gap-3 p-4 rounded-xl bg-slate-100/50 border border-slate-100">
                        <Sparkles className="text-amber-500 shrink-0 mt-1" size={18} />
                        <p className="text-sm text-slate-600 font-medium">
                            <span className="font-bold text-slate-900">AI Matching:</span> ระบบจะนำข้อมูลรายละเอียดที่คุณกรอก ไปเปรียบเทียบกับรายการอื่นๆ ในระบบทันที เพื่อหาความน่าจะเป็นที่ตรงกัน
                        </p>
                    </div>
                    <div className="flex gap-3 p-4 rounded-xl bg-slate-100/50 border border-slate-100">
                        <AlertCircle className="text-slate-400 shrink-0 mt-1" size={18} />
                        <p className="text-sm text-slate-600 font-medium">
                            <span className="font-bold text-slate-900">ความปลอดภัย:</span> ข้อมูลติดต่อของคุณจะไม่ได้รับการเปิดเผยต่อสาธารณะจนกว่าคุณจะเป็นผู้เริ่มสนทนาผ่านระบบแชท
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportItem;
