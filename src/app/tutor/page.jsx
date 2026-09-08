"use client";
import { useState } from "react";

export default function TutorPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });
      const data = await res.json();
      const aiMessage = { role: "ai", text: data.reply || "عذراً، حدث خطأ ما." };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "ai", text: "فشل الاتصال بالخادم." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col p-4 pt-8">
      <div className="text-center mb-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-2">🤖</div>
        <h1 className="text-xl font-bold text-gray-800">المعلم الذكي</h1>
        <p className="text-sm text-gray-500">اسأل أي سؤال في الرياضيات</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 p-2 mb-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-20">
            <p>مرحباً! أنا معلمك الخصوصي.</p>
            <p className="text-sm mt-2">اكتب سؤالك في الأسفل لتبدأ.</p>
          </div>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${
              msg.role === "user" ? "bg-blue-600 text-white rounded-br-none" : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-none text-sm text-gray-500 shadow-sm">
              يكتب الآن...
            </div>
          </div>
        )}
      </div>

      <div className="sticky bottom-16 bg-white pt-2">
        <div className="flex gap-2 p-2 border border-gray-200 rounded-2xl shadow-sm">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="اكتب سؤالك هنا..."
            className="flex-1 px-4 py-2 focus:outline-none text-sm"
          />
          <button 
            onClick={sendMessage} 
            className="w-10 h-10 bg-blue-600 text-white rounded-xl hover:bg-blue-700 flex items-center justify-center text-lg"
          >
            ➤
          </button>
        </div>
      </div>
    </main>
  );
}