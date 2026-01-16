import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Camera } from 'lucide-react';

const ReportItem = () => {
    const { type } = useParams(); // 'lost' or 'found'
    const isLost = type === 'lost';

    return (
        <div className="max-w-3xl mx-auto py-12 px-6 font-sans">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
                    {isLost ? 'แจ้งของหาย' : 'แจ้งเจอของ'}
                </h1>
                <p className="text-slate-500">
                    กรอกรายละเอียดข้อมูลให้ครบถ้วน เพื่อให้ระบบ AI ช่วยค้นหาและจับคู่ให้แม่นยำที่สุด
                </p>
            </div>

            <Card className="shadow-xl border-slate-200">
                <CardHeader className={`border-b ${isLost ? 'bg-rose-50 border-rose-100' : 'bg-emerald-50 border-emerald-100'} rounded-t-xl`}>
                    <CardTitle className={isLost ? 'text-rose-700' : 'text-emerald-700'}>แบบฟอร์ม{isLost ? 'ตามหาของ' : 'ส่งคืนของ'}</CardTitle>
                    <CardDescription>ข้อมูลที่มีเครื่องหมาย * จำเป็นต้องกรอก</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-8">
                    {/* Image Upload */}
                    <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
                        <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4 group-hover:bg-white transition-colors">
                            <Camera className="text-slate-400 group-hover:text-emerald-600" size={32} />
                        </div>
                        <p className="font-bold text-slate-700">อัปโหลดรูปภาพสิ่งของ</p>
                        <p className="text-sm text-slate-500">ลากและวาง หรือคลิกเพื่อเลือกไฟล์</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>หัวข้อประกาศ *</Label>
                            <Input placeholder={`เช่น ${isLost ? 'ทำกระเป๋าสตางค์หาย' : 'เจอกระเป๋าสตางค์'}`} />
                        </div>
                        <div className="space-y-2">
                            <Label>หมวดหมู่ *</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="เลือกหมวดหมู่" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="electronics">อุปกรณ์อิเล็กทรอนิกส์</SelectItem>
                                    <SelectItem value="wallet">กระเป๋าสตางค์/บัตร</SelectItem>
                                    <SelectItem value="clothing">เสื้อผ้า/เครื่องแต่งกาย</SelectItem>
                                    <SelectItem value="documents">เอกสารสำคัญ</SelectItem>
                                    <SelectItem value="others">อื่นๆ</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>รายละเอียดเพิ่มเติม</Label>
                        <Textarea placeholder="ระบุลักษณะพิเศษ, ตำหนิ, สี, ยี่ห้อ หรือข้อมูลอื่นๆ ที่เป็นประโยชน์..." className="h-32" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>{isLost ? 'สถานที่หาย *' : 'สถานที่พบ *'}</Label>
                            <Input placeholder="เช่น ห้างสรรพสินค้า..., รถไฟฟ้า..." />
                        </div>
                        <div className="space-y-2">
                            <Label>{isLost ? 'วันที่หาย *' : 'วันที่พบ *'}</Label>
                            <Input type="date" />
                        </div>
                    </div>

                    <Button size="lg" className={`w-full h-12 text-lg font-bold shadow-lg ${isLost ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-200' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200'}`}>
                        ยืนยันการแจ้งข้อมูล
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default ReportItem;
