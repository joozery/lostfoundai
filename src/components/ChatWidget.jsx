import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, X, Send, Minus, Paperclip, Smile } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, type: 'admin', text: 'สวัสดีครับ! มีอะไรให้ทางเราช่วยเหลือไหมครับ?', time: 'ตอนนี้' }
    ]);
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef(null);

    const toggleChat = () => setIsOpen(!isOpen);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        // Add user message
        const newUserMsg = {
            id: Date.now(),
            type: 'user',
            text: inputValue,
            time: 'ตอนนี้'
        };

        setMessages(prev => [...prev, newUserMsg]);
        setInputValue("");

        // Simulate admin reply
        setTimeout(() => {
            const adminReply = {
                id: Date.now() + 1,
                type: 'admin',
                text: 'ขอบคุณที่ติดต่อเข้ามาครับ เจ้าหน้าที่จะรีบตอบกลับโดยเร็วที่สุดครับ (ระบบจำลอง)',
                time: 'ตอนนี้'
            };
            setMessages(prev => [...prev, adminReply]);
        }, 1500);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 font-sans flex flex-col items-end gap-4">

            {/* Chat Window */}
            {isOpen && (
                <Card className="w-[350px] h-[500px] flex flex-col shadow-2xl border-slate-200 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">

                    {/* Header */}
                    <div className="p-4 bg-emerald-600 text-white flex justify-between items-center shadow-md">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Avatar className="h-10 w-10 border-2 border-white/20">
                                    <AvatarImage src="/placeholder-admin.jpg" />
                                    <AvatarFallback className="bg-white/10 text-white font-bold">AD</AvatarFallback>
                                </Avatar>
                                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 ring-2 ring-emerald-600"></span>
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">Lost&Found Support</h3>
                                <p className="text-[10px] text-emerald-100/80">ตอบกลับภายในไม่กี่นาที</p>
                            </div>
                        </div>
                        <div className="flex gap-1">
                            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-7 w-7 text-white/70 hover:text-white hover:bg-white/10 rounded-full">
                                <Minus size={18} />
                            </Button>
                        </div>
                    </div>

                    {/* Chat Area */}
                    <ScrollArea className="flex-1 bg-slate-50 p-4">
                        <div className="space-y-4">
                            <div className="text-center text-[10px] text-slate-400 my-2">วันนี้</div>

                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`flex flex-col max-w-[80%] ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
                                        <div className={`px-4 py-2.5 rounded-2xl text-sm shadow-sm ${msg.type === 'user'
                                                ? 'bg-emerald-600 text-white rounded-tr-none'
                                                : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none'
                                            }`}>
                                            {msg.text}
                                        </div>
                                        <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                    </ScrollArea>

                    {/* Input Area */}
                    <div className="p-3 bg-white border-t border-slate-100">
                        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                            <Button type="button" variant="ghost" size="icon" className="text-slate-400 shrink-0 h-9 w-9">
                                <Paperclip size={18} />
                            </Button>
                            <Input
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="พิมพ์ข้อความ..."
                                className="flex-1 border-0 bg-slate-100 focus-visible:ring-0 focus-visible:bg-slate-50 transition-colors h-10 px-4 rounded-full"
                            />
                            <Button
                                type="submit"
                                size="icon"
                                disabled={!inputValue.trim()}
                                className="h-10 w-10 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-md disabled:opacity-50 shrink-0"
                            >
                                <Send size={18} className="ml-0.5" />
                            </Button>
                        </form>
                    </div>
                </Card>
            )}

            {/* Floating Button */}
            <Button
                onClick={toggleChat}
                className={`h-14 w-14 rounded-full shadow-xl transition-all duration-300 ${isOpen
                        ? 'bg-slate-200 text-slate-600 hover:bg-slate-300 rotate-90'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:scale-105'
                    }`}
            >
                {isOpen ? <X size={24} /> : (
                    <div className="relative">
                        <MessageCircle size={28} />
                        <span className="absolute -top-1 -right-1 h-3 w-3 bg-rose-500 rounded-full border-2 border-emerald-600"></span>
                    </div>
                )}
            </Button>
        </div>
    );
};

export default ChatWidget;
