import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Send, MoreVertical, Phone, Video } from "lucide-react";

const AdminChat = () => {
    const [selectedChat, setSelectedChat] = useState(1);
    const [messageInput, setMessageInput] = useState("");

    const conversations = [
        { id: 1, name: 'สมชาย ใจดี', lastMessage: 'ขอบคุณมากครับ เดี๋ยวผมเข้าไปรับ', time: '10:30', unread: 2, status: 'online', avatar: null },
        { id: 2, name: 'วิภาดา รักดี', lastMessage: 'รบกวนตรวจสอบรายการนี้หน่อยค่ะ', time: 'เมื่อวาน', unread: 0, status: 'offline', avatar: 'https://github.com/shadcn.png' },
        { id: 3, name: 'Guest User 093', lastMessage: 'สอบถามเรื่องการรับของคืนครับ', time: 'เมื่อวาน', unread: 0, status: 'online', avatar: null },
    ];

    const messages = [
        { id: 1, sender: 'user', text: 'สวัสดีครับ ผมทำกระเป๋าสตางค์หายที่เซ็นทรัลครับ', time: '10:00' },
        { id: 2, sender: 'admin', text: 'สวัสดีครับ รบกวนขอทราบรายละเอียดเพิ่มเติมหน่อยครับ', time: '10:05' },
        { id: 3, sender: 'user', text: 'เป็นกระเป๋าหนังสีดำ ยี่ห้อ Coach ครับ ด้านในมีบัตรประชาชนชื่อ สมชาย ใจดี', time: '10:10' },
        { id: 4, sender: 'admin', text: 'ตรวจสอบสักครู่นะครับ... พบรายการที่ตรงกันครับ! มีคนแจ้งพบเมื่อเช้านี้', time: '10:15' },
        { id: 5, sender: 'user', text: 'ขอบคุณมากครับ เดี๋ยวผมเข้าไปรับ', time: '10:30' },
    ];

    return (
        <div className="h-[calc(100vh-120px)] max-w-7xl mx-auto font-sans flex gap-6">

            {/* Conversations List */}
            <Card className="w-80 flex flex-col border-slate-200 shadow-lg shadow-slate-200/40">
                <div className="p-4 border-b border-slate-100">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">แชทช่วยเหลือ</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input placeholder="ค้นหาบทสนทนา..." className="pl-9 bg-slate-50 border-slate-200" />
                    </div>
                </div>
                <ScrollArea className="flex-1">
                    <div className="flex flex-col p-2 gap-1">
                        {conversations.map((chat) => (
                            <button
                                key={chat.id}
                                onClick={() => setSelectedChat(chat.id)}
                                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${selectedChat === chat.id
                                        ? 'bg-emerald-50 text-emerald-900 shadow-sm ring-1 ring-emerald-100'
                                        : 'hover:bg-slate-50 text-slate-700'
                                    }`}
                            >
                                <div className="relative">
                                    <Avatar className="h-10 w-10 border border-slate-200">
                                        <AvatarImage src={chat.avatar} />
                                        <AvatarFallback className="bg-slate-100 text-slate-500 font-bold">{chat.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    {chat.status === 'online' && (
                                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white"></span>
                                    )}
                                </div>
                                <div className="flex-1 text-left overflow-hidden">
                                    <div className="flex justify-between items-baseline">
                                        <span className="font-bold text-sm truncate">{chat.name}</span>
                                        <span className="text-[10px] text-slate-400 shrink-0">{chat.time}</span>
                                    </div>
                                    <p className={`text-xs truncate ${selectedChat === chat.id ? 'text-emerald-600/80' : 'text-slate-500'}`}>
                                        {chat.lastMessage}
                                    </p>
                                </div>
                                {chat.unread > 0 && (
                                    <span className="h-5 w-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                                        {chat.unread}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </ScrollArea>
            </Card>

            {/* Chat Window */}
            <Card className="flex-1 flex flex-col border-slate-200 shadow-lg shadow-slate-200/40 overflow-hidden">
                {/* Chat Header */}
                <div className="h-16 border-b border-slate-100 flex items-center justify-between px-6 bg-white shrink-0">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border border-slate-200">
                            <AvatarFallback className="bg-emerald-100 text-emerald-700 font-bold">ส</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="font-bold text-slate-800 text-sm">สมชาย ใจดี</h3>
                            <div className="flex items-center gap-1.5">
                                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                                <span className="text-xs text-slate-500">Online</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-700"><Phone size={18} /></Button>
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-700"><Video size={18} /></Button>
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-700"><MoreVertical size={18} /></Button>
                    </div>
                </div>

                {/* Messages Area */}
                <ScrollArea className="flex-1 bg-slate-50 p-6">
                    <div className="space-y-6">
                        <div className="flex justify-center">
                            <span className="text-xs font-medium text-slate-400 bg-slate-100 px-3 py-1 rounded-full">วันนี้</span>
                        </div>
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`flex flex-col max-w-[70%] ${msg.sender === 'admin' ? 'items-end' : 'items-start'}`}>
                                    <div className={`px-5 py-3 rounded-2xl text-sm shadow-sm ${msg.sender === 'admin'
                                            ? 'bg-emerald-600 text-white rounded-tr-none'
                                            : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                                        }`}>
                                        {msg.text}
                                    </div>
                                    <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-slate-100 shrink-0">
                    <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                        <Input
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            placeholder="พิมพ์ข้อความ..."
                            className="bg-slate-50 border-slate-200 focus-visible:ring-emerald-500/20"
                        />
                        <Button type="submit" size="icon" className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-200">
                            <Send size={18} className="ml-0.5" />
                        </Button>
                    </form>
                </div>
            </Card>
        </div>
    );
};

export default AdminChat;
