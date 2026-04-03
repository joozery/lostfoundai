import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, ChevronLeft, Loader2, Phone, Video, MoreVertical } from "lucide-react";
import api from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";

const MessagePage = () => {
    const { userId } = useParams();
    const { user: currentUser, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [targetUser, setTargetUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        const fetchTargetUser = async () => {
            try {
                const res = await api.get(`/admin/users`); // Simplified: finding user in list
                const found = res.data.find(u => u._id === userId);
                setTargetUser(found);
            } catch (err) {
                console.error("Failed to fetch user", err);
            }
        };

        fetchTargetUser();
    }, [userId, isAuthenticated, navigate]);

    const fetchMessages = async () => {
        if (!userId || !isAuthenticated) return;
        try {
            const res = await api.get(`/chat/${userId}`);
            setMessages(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch messages", err);
        }
    };

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 3000);
        return () => clearInterval(interval);
    }, [userId]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || !userId) return;

        try {
            await api.post('/chat', {
                receiverId: userId,
                content: input
            });
            setInput("");
            fetchMessages();
        } catch (err) {
            console.error("Send failed", err);
        }
    };

    if (loading && !targetUser) {
        return (
            <div className="h-[60vh] flex items-center justify-center">
                <Loader2 className="animate-spin text-emerald-600" size={32} />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 font-sans">
            <Card className="h-[700px] flex flex-col shadow-2xl border-slate-200 overflow-hidden rounded-3xl">
                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full shadow-sm border border-slate-100">
                            <ChevronLeft size={20} />
                        </Button>
                        <Avatar className="h-12 w-12 border-2 border-emerald-50 shadow-sm">
                            <AvatarImage src={targetUser?.avatar} />
                            <AvatarFallback className="bg-emerald-100 text-emerald-700 font-bold uppercase">{targetUser?.firstname?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-lg font-black text-slate-900 leading-tight uppercase tracking-tight">
                                {targetUser?.firstname} {targetUser?.lastname}
                            </h2>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Online</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-emerald-600 h-10 w-10"><Phone size={18} /></Button>
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-emerald-600 h-10 w-10"><Video size={18} /></Button>
                        <Button variant="ghost" size="icon" className="text-slate-400 h-10 w-10"><MoreVertical size={18} /></Button>
                    </div>
                </div>

                {/* Messages Area */}
                <ScrollArea className="flex-1 bg-slate-50/50 p-6">
                    <div className="space-y-6">
                        {messages.map((msg) => (
                            <div key={msg._id} className={`flex ${msg.sender._id === currentUser?._id ? 'justify-end' : 'justify-start'}`}>
                                <div className={`flex flex-col max-w-[75%] ${msg.sender._id === currentUser?._id ? 'items-end' : 'items-start'}`}>
                                    <div className={`px-5 py-3 rounded-2xl text-[15px] shadow-sm leading-relaxed font-medium transition-all ${msg.sender._id === currentUser?._id
                                            ? 'bg-slate-900 text-white rounded-tr-none'
                                            : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                                        }`}>
                                        {msg.content}
                                    </div>
                                    <span className="text-[10px] text-slate-400 mt-2 px-1 font-bold uppercase">
                                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        ))}
                        <div ref={scrollRef} />
                    </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="p-6 bg-white border-t border-slate-100 shrink-0">
                    <form onSubmit={handleSend} className="flex gap-4">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="พิมพ์ข้อความของคุณที่นี่..."
                            className="flex-1 h-14 px-6 bg-slate-50 border-slate-200 rounded-2xl focus-visible:ring-emerald-500/20 text-md font-medium shadow-inner"
                        />
                        <Button
                            type="submit"
                            disabled={!input.trim()}
                            className="h-14 w-14 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-200 transition-all active:scale-95 shrink-0"
                        >
                            <Send size={24} className="ml-1" />
                        </Button>
                    </form>
                </div>
            </Card>
        </div>
    );
};

export default MessagePage;
