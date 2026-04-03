import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, X, Send, Minus, Paperclip, Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import api from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";
import { Link } from 'react-router-dom';

const ChatWidget = () => {
    const { user, isAuthenticated } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const [adminUser, setAdminUser] = useState(null);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Fetch Admin or Support User to chat with (Simplified: find first admin)
    const fetchAdmin = async () => {
        try {
            const res = await api.get('/admin/users');
            const admin = res.data.find(u => u.role === 'admin');
            setAdminUser(admin);
        } catch (err) {
            console.error("Failed to find admin", err);
        }
    };

    const fetchMessages = async () => {
        if (!adminUser || !isAuthenticated) return;
        try {
            const res = await api.get(`/chat/${adminUser._id}`);
            setMessages(res.data);
        } catch (err) {
            console.error("Failed to fetch messages", err);
        }
    };

    useEffect(() => {
        if (isOpen && isAuthenticated) {
            fetchAdmin();
        }
    }, [isOpen, isAuthenticated]);

    useEffect(() => {
        if (adminUser) {
            fetchMessages();
            const interval = setInterval(fetchMessages, 4000);
            return () => clearInterval(interval);
        }
    }, [adminUser]);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputValue.trim() || !adminUser || loading) return;

        setLoading(true);
        try {
            await api.post('/chat', {
                receiverId: adminUser._id,
                content: inputValue
            });
            setInputValue("");
            fetchMessages();
        } catch (err) {
            console.error("Send failed", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 font-sans flex flex-col items-end gap-4">

            {/* Chat Window */}
            {isOpen && (
                <Card className="w-[350px] h-[550px] flex flex-col shadow-2xl border-slate-200 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300 rounded-3xl">

                    {/* Header */}
                    <div className="p-5 bg-emerald-600 text-white flex justify-between items-center shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                        <div className="flex items-center gap-4 relative z-10">
                            <div className="relative">
                                <Avatar className="h-11 w-11 border-2 border-white/30 shadow-sm">
                                    <AvatarImage src={adminUser?.avatar} />
                                    <AvatarFallback className="bg-white/20 text-white font-bold uppercase">{adminUser?.firstname?.charAt(0) || 'AD'}</AvatarFallback>
                                </Avatar>
                                <span className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-emerald-600"></span>
                            </div>
                            <div className="flex flex-col">
                                <h3 className="font-black text-[15px] tracking-tight">Support Helper</h3>
                                <p className="text-[10px] text-emerald-100/80 font-bold uppercase tracking-widest">{adminUser ? 'เจ้าหน้าที่ออนไลน์' : 'กำลังหาเจ้าหน้าที่...'}</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10 rounded-full relative z-10">
                            <Minus size={20} />
                        </Button>
                    </div>

                    {/* Chat Area */}
                    <ScrollArea className="flex-1 bg-slate-50/50 p-5">
                        {!isAuthenticated ? (
                            <div className="h-full flex flex-col items-center justify-center text-center p-6 gap-4">
                                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                                    <MessageCircle size={32} />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-800 text-sm mb-1">กรุณาเข้าสู่ระบบ</p>
                                    <p className="text-xs text-slate-400 font-medium">เพื่อเริ่มต้นการพูดคุยกับเจ้าหน้าที่</p>
                                </div>
                                <Link to="/login" className="w-full">
                                    <Button onClick={() => setIsOpen(false)} className="w-full bg-emerald-600 font-bold rounded-xl h-10">เข้าสู่ระบบเลย</Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {messages.length === 0 && (
                                    <div className="text-center py-10 opacity-50">
                                        <Bot size={40} className="mx-auto text-emerald-600 mb-2" />
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">ยินดีต้อนรับครับ ทักทายเราได้เลย!</p>
                                    </div>
                                )}
                                {messages.map((msg) => (
                                    <div key={msg._id} className={`flex ${msg.sender._id === user?._id ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`flex flex-col max-w-[85%] ${msg.sender._id === user?._id ? 'items-end' : 'items-start'}`}>
                                            <div className={`px-4 py-2.5 rounded-2xl text-[13px] shadow-sm leading-relaxed font-medium ${msg.sender._id === user?._id
                                                ? 'bg-emerald-600 text-white rounded-tr-none'
                                                : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                                                }`}>
                                                {msg.content}
                                            </div>
                                            <span className="text-[9px] text-slate-400 mt-1 px-1 font-bold uppercase">
                                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                        )}
                    </ScrollArea>

                    {/* Input Area */}
                    {isAuthenticated && (
                        <div className="p-4 bg-white border-t border-slate-100 shrink-0">
                            <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                                <div className="relative flex-1">
                                    <Input
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder="พิมพ์ข้อความที่นี่..."
                                        disabled={loading}
                                        className="h-12 border-0 bg-slate-100 focus-visible:ring-1 focus-visible:ring-emerald-500/10 focus-visible:bg-white transition-all px-4 rounded-2xl font-medium text-sm pr-12"
                                    />
                                    <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1 text-slate-400 h-10 w-10 hover:bg-transparent">
                                        <Smile size={18} />
                                    </Button>
                                </div>
                                <Button
                                    type="submit"
                                    size="icon"
                                    disabled={!inputValue.trim() || loading}
                                    className="h-12 w-12 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200 transition-all active:scale-90 shrink-0"
                                >
                                    {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={20} className="ml-1" />}
                                </Button>
                            </form>
                        </div>
                    )}
                </Card>
            )}

            {/* Floating Button */}
            <Button
                onClick={toggleChat}
                className={`h-16 w-16 rounded-full shadow-2xl transition-all duration-500 active:scale-95 ${isOpen
                    ? 'bg-slate-800 text-white rotate-90 transform'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:scale-110 shadow-emerald-200'
                    }`}
            >
                {isOpen ? <X size={28} /> : (
                    <div className="relative flex items-center justify-center translate-y-0.5">
                        <MessageCircle size={32} />
                        <span className="absolute -top-1.5 -right-1.5 h-4 w-4 bg-rose-500 rounded-full border-2 border-emerald-600 animate-bounce"></span>
                    </div>
                )}
            </Button>
        </div>
    );
};

const Smile = ({ size, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>
);

const Bot = ({ size, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="10" x="3" y="11" rx="2" /><circle cx="12" cy="5" r="2" /><path d="M12 7v4" /><line x1="8" y1="16" x2="8" y2="16" /><line x1="16" y1="16" x2="16" y2="16" /></svg>
);

export default ChatWidget;
