import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
    Settings,
    Bell,
    Globe,
    Shield,
    Save,
    Database,
    Zap,
    Mail,
    MonitorDot,
    Loader2
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AdminSettings = () => {
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        }, 1500);
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto font-sans pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">ตั้งค่าระบบ (System Settings)</h2>
                    <p className="text-slate-500 mt-2 text-base">ปรับแต่งการทำงานเบื้องหลังและนโยบายของระบบ Lost&Found AI</p>
                </div>
                {saved && (
                    <Alert className="bg-emerald-50 border-emerald-200 text-emerald-700 h-10 py-0 flex items-center animate-in fade-in slide-in-from-top-4">
                        <AlertDescription className="font-bold flex items-center gap-2">
                            บันทึกการตั้งค่าเรียบร้อยแล้ว
                        </AlertDescription>
                    </Alert>
                )}
            </div>

            <Tabs defaultValue="general" className="w-full">
                <TabsList className="bg-slate-100 p-1 mb-8 h-12 rounded-xl">
                    <TabsTrigger value="general" className="rounded-lg px-6 font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">หลัก</TabsTrigger>
                    <TabsTrigger value="notifications" className="rounded-lg px-6 font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">แจ้งเตือน</TabsTrigger>
                    <TabsTrigger value="security" className="rounded-lg px-6 font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">ความปลอดภัย</TabsTrigger>
                    <TabsTrigger value="ai" className="rounded-lg px-6 font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">AI Engine</TabsTrigger>
                </TabsList>

                {/* General Settings */}
                <TabsContent value="general" className="space-y-6">
                    <Card className="border-slate-200 shadow-xl shadow-slate-200/40">
                        <CardHeader className="pb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                    <Globe size={20} />
                                </div>
                                <CardTitle className="text-lg">ข้อมูลพื้นฐานเว็บไซต์</CardTitle>
                            </div>
                            <CardDescription>จัดการข้อมูลทั่วไปที่ปรากฏบนหน้าบ้าน</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-2">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="siteName">ชื่อเว็บไซต์</Label>
                                    <Input id="siteName" defaultValue="Lost&Found AI" className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="supportEmail">อีเมลแอดมิน (Contact Support)</Label>
                                    <Input id="supportEmail" defaultValue="support@lostfound.com" className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-all" />
                                </div>
                            </div>
                            <Separator className="bg-slate-100" />
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">โหมดปิดปรับปรุง (Maintenance Mode)</Label>
                                    <p className="text-sm text-slate-500">ปิดการใช้งานโปรแกรมชั่วคราวเพื่อให้เฉพาะแอดมินเข้าถึงได้</p>
                                </div>
                                <Switch />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-slate-200 shadow-xl shadow-slate-200/40">
                        <CardHeader className="pb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                    <Database size={20} />
                                </div>
                                <CardTitle className="text-lg">การจัดการฐานข้อมูล</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-2">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base text-rose-600 font-bold">ล้างประวัติที่เก่าเกิน 1 ปี</Label>
                                    <p className="text-sm text-slate-500">ประวัติการแจ้งของหายที่สำเร็จแล้วจะถูกลบออกจากระบบเพื่อลดภาระเครื่อง</p>
                                </div>
                                <Button variant="outline" className="border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700">ล้างทันที</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Notifications Settings */}
                <TabsContent value="notifications" className="space-y-6">
                    <Card className="border-slate-200 shadow-xl shadow-slate-200/40">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                                    <Bell size={20} />
                                </div>
                                <CardTitle className="text-lg">การแจ้งเตือน (Notifications)</CardTitle>
                            </div>
                            <CardDescription>เลือกช่องทางการแจ้งเตือนหลักของระบบ</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">แจ้งเตือนผ่านอีเมล</Label>
                                    <p className="text-sm text-slate-500">แจ้งผลเมื่อ AI เจอของที่ใกล้เคียงกัน</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <Separator className="bg-slate-100" />
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">LINE Notify</Label>
                                    <p className="text-sm text-slate-500">แจ้งเตือนผ่านมือถือทันทีเมื่อมีรายการใหม่</p>
                                </div>
                                <Switch />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Security Settings */}
                <TabsContent value="security" className="space-y-6">
                    <Card className="border-slate-200 shadow-xl shadow-slate-200/40">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
                                    <Shield size={20} />
                                </div>
                                <CardTitle className="text-lg">ความปลอดภัย (Security)</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">ระบบอนุมัติโพสต์ (Manual Approval)</Label>
                                    <p className="text-sm text-slate-500">โพสต์จะยังไม่แสดงผลหน้าบ้านจนกว่าแอดมินจะกดยืนยัน</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <Separator className="bg-slate-100" />
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">จำกัดการอัปโหลดไฟล์ (File Limit)</Label>
                                    <p className="text-sm text-slate-500">จำกัดขนาดไฟล์รูปภาพไม่เกิน 5MB ต่อรูป</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* AI Settings */}
                <TabsContent value="ai" className="space-y-6">
                    <Card className="border-slate-200 shadow-xl shadow-slate-200/40">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                                    <Zap size={20} />
                                </div>
                                <CardTitle className="text-lg">AI Matching System</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6 text-sm">
                            <div className="space-y-2">
                                <Label className="text-base">Matching Sensitivity (%)</Label>
                                <p className="text-slate-500 mb-4">เปอร์เซ็นต์ความแม่นยำขั้นต่ำที่จะถือว่า "เจอสิ่งที่น่าจะใช่"</p>
                                <div className="flex items-center gap-4">
                                    <Input type="number" defaultValue="75" className="w-32 h-11 bg-slate-50" />
                                    <span className="font-bold text-slate-600">% ความแม่นยำ</span>
                                </div>
                            </div>
                            <Separator className="bg-slate-100" />
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Automatic Image Tagging</Label>
                                    <p className="text-sm text-slate-500">ใช้ AI ช่วยวิเคราะห์และใส่ Tag ให้รูปภาพอัตโนมัติ</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <div className="pt-6 border-t border-slate-200 flex justify-end gap-4">
                <Button variant="ghost" className="font-bold text-slate-500">ยกเลิก</Button>
                <Button
                    onClick={handleSave}
                    disabled={loading}
                    className="h-12 px-8 bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg shadow-emerald-200/50 min-w-[200px]"
                >
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    บันทึกการเปลี่ยนแปลงทั้งหมด
                </Button>
            </div>
        </div>
    );
};

export default AdminSettings;
