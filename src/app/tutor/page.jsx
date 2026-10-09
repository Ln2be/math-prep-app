"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { sessions } from "@/data/curriculum";

export default function TutorPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { isPremium, user } = useAuth();
  const [messagesToday, setMessagesToday] = useState(0);
  const [selectedLessonId, setSelectedLessonId] = useState("");
  const [profile, setProfile] = useState(null);
  const [activeMode, setActiveMode] = useState(null);

  // تحديد الحد الأقصى للرسائل بناءً على العضوية
  const maxMessages = isPremium ? 200 : 15;

  useEffect(() => {
    if (user) {
      supabase.from('profiles').select('*').eq('id', user.id).single().then(({ data }) => setProfile(data));
    }
  }, [user]);

  useEffect(() => {
    const today = new Date().toDateString();
    const lastDate = localStorage.getItem("tutor_last_date");
    if (lastDate !== today) {
      localStorage.setItem("tutor_last_date", today);
      localStorage.setItem("tutor_messages_today", "0");
      setMessagesToday(0);
    } else {
      setMessagesToday(parseInt(localStorage.getItem("tutor_messages_today") || "0"));
    }
  }, []);

  const formatText = (text) => {
    return text.split('\n').map((line, i) => (
      <span key={i} style={{ display: 'block', marginBottom: '4px' }}>
        {line.split('**').map((part, j) => j % 2 === 1 ? <strong key={j}>{part}</strong> : part)}
      </span>
    ));
  };

  const sendMessage = async (customText = null, newMode = null, hideUserMessage = false) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || loading) return;
    
    let historyToKeep = [...messages];
    if (newMode && activeMode && newMode !== activeMode) {
      historyToKeep = [];
      setMessages([]);
    }
    const currentMode = newMode || activeMode || "general";
    setActiveMode(currentMode);

    // التحقق من حدود الرسائل
    if (messagesToday >= maxMessages) {
      setMessages((prev) => [...prev, { role: "ai", text: `لقد وصلت إلى الحد الأقصى (${maxMessages} رسالة) اليوم. ${isPremium ? "" : "يرجى الترقية لمواصلة التحدث."}` }]);
      return;
    }

    const userMessage = { role: "user", text: textToSend };
    let updatedMessages = [...historyToKeep];
    
    // إضافة رسالة المستخدم للشاشة فقط إذا لم تكن مخفية (رسائل الأزرار التلقائية)
    if (!hideUserMessage) {
      updatedMessages.push(userMessage);
      setMessages(updatedMessages);
    }
    
    setInput("");
    setLoading(true);

    // إرسال تاريخ المحادثة (بما فيه الرسالة المخفية) للـ API
    const messagesForAPI = [...historyToKeep, userMessage].slice(-15).map(m => ({ role: m.role, content: m.text }));

    let lessonContext = null;
    if (selectedLessonId) {
      const lesson = sessions.find((s) => s.id === parseInt(selectedLessonId));
      if (lesson) {
        lessonContext = { title: lesson.title, rules: lesson.rules_content.replace(/<[^>]+>/g, ' ') };
      }
    }

    const userContext = {
      name: profile?.full_name || user?.email?.split('@')[0] || "طالب",
      sex: profile?.sex || "غير معروف"
    };

    // زيادة عداد الرسائل
    const newCount = messagesToday + 1;
    localStorage.setItem("tutor_messages_today", newCount.toString());
    setMessagesToday(newCount);

    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatHistory: messagesForAPI, lessonContext, userContext }),
      });
      const data = await res.json();
      const aiMessage = { role: "ai", text: data.reply || "عذراً، حدث خطأ ما." };
      let finalMessages = [...updatedMessages, aiMessage];
      if (finalMessages.length > 15) finalMessages = finalMessages.slice(-15);
      setMessages(finalMessages);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "ai", text: "فشل الاتصال بالخادم." }]);
    } finally {
      setLoading(false);
    }
  };

  const whatsappLink = `https://wa.me/22238393963?text=${encodeURIComponent("مرحباً، أريد الترقية إلى العضوية الذهبية. بريدي الإلكتروني: " + (user?.email || "") + "\nرقم الطالب (ID): " + (user?.id || ""))}`;

  const availableLessons = isPremium ? sessions : sessions.filter(s => s.id === 1);

  return (
    <main className="min-h-screen flex flex-col p-4 pt-8">
      <div className="text-center mb-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-2">🤖</div>
        <h1 className="text-xl font-bold text-gray-800">المعلم الذكي</h1>
        <p className="text-sm text-gray-500">اسأل أي سؤال أو اطلب اختباراً</p>
        
        {/* شارة العضوية الذهبية */}
        {isPremium && (
          <div className="inline-block mt-2 bg-gradient-to-l from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            👑 عضو ذهبي
          </div>
        )}
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-4">
        <label className="block text-sm font-bold text-gray-700 mb-2">اختر الدرس:</label>
        <select value={selectedLessonId} onChange={(e) => setSelectedLessonId(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 text-sm text-gray-800 bg-white">
          <option value="" disabled>اختر درساً للبدء...</option>
          {availableLessons.map((lesson) => (
            <option key={lesson.id} value={lesson.id}>{lesson.id}. {lesson.title}</option>
          ))}
        </select>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <button onClick={() => sendMessage("أريد اختبار مدى حفظي للقواعد. اطرح علي سؤالاً مباشراً وانتظر إجابتي.", "rules", true)} disabled={!selectedLessonId || loading} className={`py-2 px-3 rounded-xl text-sm font-bold transition-colors ${!selectedLessonId ? "bg-gray-100 text-gray-400" : "bg-blue-100 text-blue-700 hover:bg-blue-200"}`}>📝 اختبرني بالقواعد</button>
          <button onClick={() => sendMessage("أريد حلاً لتمرين تطبيقي. اطرح علي تمريناً وانتظر حلي لتصححه لي.", "exercises", true)} disabled={!selectedLessonId || loading} className={`py-2 px-3 rounded-xl text-sm font-bold transition-colors ${!selectedLessonId ? "bg-gray-100 text-gray-400" : "bg-orange-100 text-orange-700 hover:bg-orange-200"}`}>🧮 اختبرني بالتمارين</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 p-2 mb-4 bg-gray-50 rounded-2xl border border-gray-100" style={{minHeight: "300px"}}>
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-20 p-4">
            <p>مرحباً {profile?.full_name || ""}! أنا معلمك الخصوصي.</p>
            <p className="text-sm mt-2">اختر الدرس من الأعلى، أو استخدم أزرار الاختبار، ثم اكتب سؤالك في الأسفل لتبدأ.</p>
          </div>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${msg.role === "user" ? "bg-blue-600 text-white rounded-br-none" : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"}`}>
              {msg.role === "ai" ? formatText(msg.text) : msg.text}
            </div>
          </div>
        ))}
        {loading && <div className="flex justify-start"><div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-none text-sm text-gray-500 shadow-sm animate-pulse">يكتب الآن...</div></div>}
      </div>

      {!isPremium && (
        <div className="text-center text-xs text-gray-500 mb-2 flex items-center justify-center gap-2">
          <span>الرسائل المتبقية اليوم: {15 - messagesToday}/15</span>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-yellow-600 font-bold hover:underline">ترقية 👑</a>
        </div>
      )}
      
      <div className="sticky bottom-16 bg-white pt-2">
        <div className="flex gap-2 p-2 border border-gray-200 rounded-2xl shadow-sm bg-white">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage(null, null, false)} placeholder={selectedLessonId ? "اكتب سؤالك أو إجابتك هنا..." : "الرجاء اختيار درس أولاً..."} disabled={!selectedLessonId} className="flex-1 px-4 py-2 border-0 focus:outline-none text-sm text-gray-800 bg-transparent disabled:bg-gray-100"/>
          <button onClick={() => sendMessage(null, null, false)} disabled={loading || !selectedLessonId} className="w-10 h-10 bg-blue-600 text-white rounded-xl hover:bg-blue-700 flex items-center justify-center text-lg transition-colors disabled:opacity-50">➤</button>
        </div>
      </div>
    </main>
  );
}