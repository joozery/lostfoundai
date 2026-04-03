import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Send, MoreVertical, Phone, Video } from "lucide-react";
import api from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";

const AdminChat = () => {
    const { user: currentUser } = useAuth();
    const [selectedUser, setSelectedUser] = useState(null);
    const [messageInput, setMessageInput] = useState("");
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);

    // Fetch conversations
    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const res = await api.get('/chat/conversations');
                setConversations(res.data);
                if (res.data.length > 0 && !selectedUser) {
                    setSelectedUser(res.data[0].user);
                }
            } catch (err) {
                console.error('Failed to fetch conversations:', err);
            }
        };
        fetchConversations();
    }, []);

    // Fetch messages for selected user
    useEffect(() => {
        if (selectedUser) {
            const fetchMessages = async () => {
                try {
                    const res = await api.get(`/chat/${selectedUser._id}`);
                    setMessages(res.data);
                } catch (err) {
                    console.error('Failed to fetch messages:', err);
                }
            };
            fetchMessages();
            // Optional: poll for new messages
            const interval = setInterval(fetchMessages, 3000);
            return () => clearInterval(interval);
        }
    }, [selectedUser]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!messageInput.trim() || !selectedUser) return;

        try {
            await api.post('/chat', {
                receiverId: selectedUser._id,
                content: messageInput
            });
            setMessageInput("");
            // Refresh messages
            const res = await api.get(`/chat/${selectedUser._id}`);
            setMessages(res.data);
        } catch (err) {
            console.error('Failed to send message:', err);
        }
    };

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
                                key={chat.user._id}
                                onClick={() => setSelectedUser(chat.user)}
                                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${selectedUser?._id === chat.user._id
                                    ? 'bg-emerald-50 text-emerald-900 shadow-sm ring-1 ring-emerald-100'
                                    : 'hover:bg-slate-50 text-slate-700'
                                    }`}
                            >
                                <div className="relative">
                                    <Avatar className="h-10 w-10 border border-slate-200">
                                        <AvatarImage src={chat.user.avatar} />
                                        <AvatarFallback className="bg-slate-100 text-slate-500 font-bold">{chat.user.firstname.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                </div>
                                <div className="flex-1 text-left overflow-hidden">
                                    <div className="flex justify-between items-baseline">
                                        <span className="font-bold text-sm truncate">{chat.user.firstname} {chat.user.lastname}</span>
                                        <span className="text-[10px] text-slate-400 shrink-0">{new Date(chat.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                    <p className={`text-xs truncate ${selectedUser?._id === chat.user._id ? 'text-emerald-600/80' : 'text-slate-500'}`}>
                                        {chat.lastMessage}
                                    </p>
                                </div>
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
                            <AvatarImage src={selectedUser?.avatar} />
                            <AvatarFallback className="bg-emerald-100 text-emerald-700 font-bold">{selectedUser?.firstname?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="font-bold text-slate-800 text-sm">{selectedUser?.firstname} {selectedUser?.lastname}</h3>
                            <div className="flex items-center gap-1.5">
                                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                                <span className="text-xs text-slate-500">Active</span>
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
                            <div key={msg._id} className={`flex ${msg.sender._id === currentUser?._id ? 'justify-end' : 'justify-start'}`}>
                                <div className={`flex flex-col max-w-[70%] ${msg.sender._id === currentUser?._id ? 'items-end' : 'items-start'}`}>
                                    <div className={`px-5 py-3 rounded-2xl text-sm shadow-sm ${msg.sender._id === currentUser?._id
                                        ? 'bg-emerald-600 text-white rounded-tr-none'
                                        : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                                        }`}>
                                        {msg.content}
                                    </div>
                                    <span className="text-[10px] text-slate-400 mt-1 px-1">
                                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-slate-100 shrink-0">
                    <form className="flex gap-2" onSubmit={handleSendMessage}>
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
