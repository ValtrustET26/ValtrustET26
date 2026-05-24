"use client";

import React, { useState, useRef, useEffect } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const baseUrl = "http://localhost:3000";

const SYSTEM_PROMPT = `You are Valtrust IA, an expert real estate agent and property valuation specialist in El Salvador.

STRICT RULES:
1. ONLY answer questions related to real estate: valuation, buying, selling, renting, market trends, neighborhoods, property types, mortgages, and legal documentation for properties in El Salvador.
2. If someone asks anything outside real estate (politics, sports, recipes, etc.), politely explain you can only help with real estate topics.
3. When valuing a property, ALWAYS ask for: location, square meters, number of bedrooms/bathrooms, property condition, and year of construction.
4. Give estimates in USD since El Salvador uses the dollar.
5. Be professional, concise, and helpful. Maximum 3-4 sentences per response.
6. If you don't have enough data to value a property, ask for the missing information.
7. Always mention that values are estimates and recommend a physical inspection for an official appraisal.`;

type Message = { role: "user" | "assistant"; content: string };
type Chat = { id: string; title: string; messages: Message[] };

const CHIPS = [
    { icon: "/AIPage/house-icon.png", label: "What's my property worth?" },
    { icon: "/AIPage/stadistics-icon.png", label: "Analyze market trends" },
    { icon: "/AIPage/justice-icon.png", label: "Compare properties" },
];

const fetchResponse = async (history: Message[], userMessage: string): Promise<string> => {
    try {
        const response = await fetch(`${baseUrl}/api/gemini-model`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ system: SYSTEM_PROMPT, history, text: userMessage }),
        });
        const data = await response.json();
        return typeof data?.summary === "string" ? data.summary : "Sorry, something went wrong. Please try again.";
    } catch {
        return "Connection error. Please try again.";
    }
};

const genId = () => Math.random().toString(36).slice(2, 10);

export default function ValtrustIA() {
    const [chats, setChats] = useState<Chat[]>([]);
    const [activeChatId, setActiveChatId] = useState<string | null>(null);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const activeChat = chats.find((c) => c.id === activeChatId) ?? null;

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [activeChat?.messages, loading]);

    const startNewConversation = () => {
        setActiveChatId(null);
        setInput("");
    };

    const sendMessage = async (text?: string) => {
        const userText = (text ?? input).trim();
        if (!userText || loading) return;
        setInput("");
        setLoading(true);

        let chatId = activeChatId;
        let updatedChats = chats;

        if (!chatId) {
            const newChat: Chat = {
                id: genId(),
                title: userText.length > 40 ? userText.slice(0, 40) + "…" : userText,
                messages: [],
            };
            updatedChats = [newChat, ...chats];
            setChats(updatedChats);
            chatId = newChat.id;
            setActiveChatId(chatId);
        }

        const currentMessages = updatedChats.find((c) => c.id === chatId)!.messages;
        const userMsg: Message = { role: "user", content: userText };
        const withUser = [...currentMessages, userMsg];

        setChats((prev) => prev.map((c) => (c.id === chatId ? { ...c, messages: withUser } : c)));

        const reply = await fetchResponse(currentMessages, userText);

        setChats((prev) =>
            prev.map((c) =>
                c.id === chatId ? { ...c, messages: [...withUser, { role: "assistant", content: reply }] } : c
            )
        );
        setLoading(false);
    };

    const deleteChat = (id: string) => {
        setChats((prev) => prev.filter((c) => c.id !== id));
        if (activeChatId === id) setActiveChatId(null);
        setDeleteConfirm(null);
    };

    const clearAll = () => {
        setChats([]);
        setActiveChatId(null);
        setDeleteConfirm(null);
    };

    const filtered = chats.filter((c) =>
        c.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex h-screen font-sans bg-[#f4f4f0]">

            {/* Sidebar */}
            <aside className="w-[220px] bg-white border-r border-gray-200 flex flex-col shrink-0">

                {/* New conversation */}
                <div className="px-2.5 pt-3 pb-2">
                    <button
                        onClick={startNewConversation}
                        className="w-full flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-lg text-[13px] text-gray-600 bg-white hover:bg-gray-50 transition-colors cursor-pointer text-left"
                    >
                        <span className="text-base leading-none">+</span> New conversation
                    </button>
                </div>

                {/* Search */}
                <div className="px-2.5 pb-2">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search conversations..."
                        className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-[12px] text-gray-500 bg-gray-50 outline-none"
                    />
                </div>

                {/* Chat list */}
                <div className="flex-1 overflow-y-auto px-2.5">
                    {filtered.length > 0 && (
                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mx-0.5 mt-1.5 mb-1">Today</p>
                    )}
                    {filtered.map((chat) => (
                        <div
                            key={chat.id}
                            onClick={() => { setActiveChatId(chat.id); setDeleteConfirm(null); }}
                            className={`group flex items-center gap-1.5 px-2 py-1.5 rounded-lg cursor-pointer mb-0.5 border transition-colors ${activeChatId === chat.id
                                    ? "bg-blue-50 border-blue-200"
                                    : "border-transparent hover:bg-gray-50"
                                }`}
                        >
                            <span className="text-[11px] text-gray-600 flex-1 truncate">{chat.title}</span>
                            {deleteConfirm === chat.id ? (
                                <span
                                    onClick={(e) => { e.stopPropagation(); deleteChat(chat.id); }}
                                    className="text-[10px] text-red-500 font-semibold shrink-0 cursor-pointer"
                                >
                                    Delete
                                </span>
                            ) : (
                                <span
                                    onClick={(e) => { e.stopPropagation(); setDeleteConfirm(chat.id); }}
                                    className="text-[15px] text-gray-300 shrink-0 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    ×
                                </span>
                            )}
                        </div>
                    ))}
                    {chats.length === 0 && (
                        <p className="text-[12px] text-gray-300 text-center mt-5">No conversations yet</p>
                    )}
                </div>

                {/* Clear all */}
                {chats.length > 0 && (
                    <div className="px-2.5 py-2.5 border-t border-gray-200">
                        <button
                            onClick={() => setDeleteConfirm("__all__")}
                            className="w-full text-[11px] text-gray-400 bg-transparent border-none cursor-pointer text-center hover:text-gray-600 transition-colors"
                        >
                            🗑 Clear conversations
                        </button>
                        {deleteConfirm === "__all__" && (
                            <div className="flex gap-1.5 mt-1.5 justify-center">
                                <button onClick={clearAll} className="px-2.5 py-1 bg-red-500 text-white border-none rounded-md text-[11px] cursor-pointer">
                                    Confirm
                                </button>
                                <button onClick={() => setDeleteConfirm(null)} className="px-2.5 py-1 bg-gray-100 border-none rounded-md text-[11px] cursor-pointer">
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </aside>

            {/* Main */}
            <main className="flex-1 flex flex-col overflow-hidden bg-[#0B1E4A]"  >

                {!activeChat ? (
                    /* Welcome screen */
                    <div className="flex-1 flex flex-col items-center justify-center px-6 gap-0">

                        {/* Logo */}
                        <div className="flex items-center gap-2.5 mb-5">
                            <span className="text-[28px] font-bold text-white tracking-tight">
                                Valtrust <span className="font-normal">IA</span>
                            </span>
                        </div>

                        <h1 className="text-[26px] font-bold text-white mb-2.5 text-center">Glad to have you here!</h1>
                        <p className="text-[14px] text-white/60 text-center max-w-[400px] leading-relaxed mb-8">
                            Your intelligent assistant for property valuation<br />
                            Get reliable insights, market trends, and smarter decisions.
                        </p>

                        {/* Icon circle */}
                        <div className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center text-2xl mb-8">
                            🏛
                        </div>

                        {/* Input */}
                        <div className="relative w-full max-w-[540px] mb-4">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 text-base">✦</span>
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                placeholder="Ask anything about property valuation..."
                                className="w-full py-3.5 pl-11 pr-12 rounded-full bg-white/10 border border-white/25 text-white text-[14px] outline-none placeholder:text-white/45"
                            />
                            <button
                                onClick={() => sendMessage()}
                                disabled={!input.trim() || loading}
                                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border-none cursor-pointer flex items-center justify-center text-lg text-[#1a3a5c] disabled:opacity-40"
                            >
                                ›
                            </button>
                        </div>

                        {/* Chips */}
                        <div className="flex gap-2.5 flex-wrap justify-center">
                            {CHIPS.map((chip) => (
                                <button
                                    key={chip.label}
                                    onClick={() => sendMessage(chip.label)}
                                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/85 text-[13px] cursor-pointer hover:bg-white/15 transition-colors"
                                >
                                    <img src={chip.icon} className="w-4 h-3.5"></img> {chip.label}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    /* Chat screen */
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-3.5">
                            {activeChat.messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`flex items-end gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    {msg.role === "assistant" && (
                                        <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-[13px] shrink-0">
                                            🏛
                                        </div>
                                    )}
                                    <div
                                        className={`max-w-[68%] px-4 py-2.5 text-[14px] leading-relaxed text-white border border-white/15 ${msg.role === "user"
                                                ? "bg-white/[0.18] rounded-[18px_18px_4px_18px]"
                                                : "bg-white/10 rounded-[18px_18px_18px_4px]"
                                            }`}
                                    >
                                        <Markdown remarkPlugins={[remarkGfm]}>{msg.content}</Markdown>
                                    </div>
                                </div>
                            ))}

                            {/* Typing indicator */}
                            {loading && (
                                <div className="flex items-end gap-2.5">
                                    <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-[13px] shrink-0">🏛</div>
                                    <div className="px-4 py-3 rounded-[18px_18px_18px_4px] bg-white/10 border border-white/15 flex gap-1 items-center">
                                        {[0, 150, 300].map((d) => (
                                            <span
                                                key={d}
                                                className="w-1.5 h-1.5 rounded-full bg-white/50 inline-block animate-bounce"
                                                style={{ animationDelay: `${d}ms` }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="px-8 pb-5 pt-3 border-t border-white/10">
                            <div className="flex items-center gap-2.5 bg-white/10 border border-white/20 rounded-full px-4 py-1.5">
                                <span className="text-white/40 text-base">✦</span>
                                <input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                    placeholder="Ask anything about property valuation..."
                                    className="flex-1 bg-transparent border-none text-white text-[14px] outline-none placeholder:text-white/45"
                                />
                                <button
                                    onClick={() => sendMessage()}
                                    disabled={!input.trim() || loading}
                                    className={`w-8 h-8 rounded-full border-none cursor-pointer flex items-center justify-center text-lg transition-colors disabled:opacity-40 ${!input.trim() || loading ? "bg-white/20 text-white" : "bg-white text-[#1a3a5c]"
                                        }`}
                                >
                                    ›
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}