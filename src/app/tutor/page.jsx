"use client";
import { useState } from "react";
import { sessions } from "@/data/curriculum";

export default function TutorPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedLessonId, setSelectedLessonId] = useState("");
  const [activeMode, setActiveMode] = useState(null); // لتتبع الوضع (قواعد/تمارين)

  const formatText = (text) => {
    return text.split('\n').map((line, i) => (
      <span key={i} style={{ display: 'block', marginBottom: '4px' }}>
        {line.split('**').map((part, j) => 
          j % 2 === 1 ? <strong key={j}>{part}</strong> : part
        )}
      </span>
    ));
  };

  const sendMessage = async (customText = null, newMode = null) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || loading) return;
    
    let historyToKeep = [...messages];

    // 1. إذا تغير الوضع (مثلاً من القواعد إلى التمارين)، امسح المحادثة السابقة وابدأ من جديد
    if (newMode && activeMode && newMode !== activeMode) {
      historyToKeep = [];
      setMessages([]); // مسح الشاشة للطالب
    }
    
    // تحديد الوضع الحالي
    const currentMode = newMode || activeMode || "general";
    setActiveMode(currentMode);

    // 2. إضافة رسالة الطالب الجديدة
    const userMessage = { role: "user", text: textToSend };
    let updatedMessages = [...historyToKeep, userMessage];
    
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    // 3. تطبيق حد الـ 15 رسالة (نأخذ آخر 15 رسالة فقط لإرسالها للذكاء الاصطناعي)
    const messagesForAPI = updatedMessages.slice(-15).map(m => ({ 
      role: m.role, 
      content: m.text 
    }));

    // تجهيز سياق الدرس المختار
    let lessonContext = null;
    if (selectedLessonId) {
      const lesson = sessions.find((s) => s.id === parseInt(selectedLessonId));
      if (lesson) {
        lessonContext = {
          title: lesson.title,
          rules: lesson.rules_content.replace(/<[^>]+>/g, ' ')
        };
      }
    }

    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          chatHistory: messagesForAPI, 
          lessonContext: lessonContext 
        }),
      });
      const data = await res.json();
      const aiMessage = { role: "ai", text: data.reply || "عذراً، حدث خطأ ما." };
      
      // إضافة رد الذكاء الاصطناعي ومراعاة حد الـ 15 رسالة في الشاشة
      let finalMessages = [...updatedMessages, aiMessage];
      if (finalMessages.length > 15) {
        finalMessages = finalMessages.slice(-15);
      }
      setMessages(finalMessages);

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
        <p className="text-sm text-gray-500">اسأل أي سؤال أو اطلب اختباراً</p>
      </div>

      {/* اختيار الدرس */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-4">
        <label className="block text-sm font-bold text-gray-700 mb-2">اختر الدرس الذي تريد التدرب عليه:</label>
        <select 
          value={selectedLessonId} 
          onChange={(e) => setSelectedLessonId(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 text-sm text-gray-800 bg-white"
        >
          <option value="">سؤال عام في الرياضيات</option>
          {sessions.map((lesson) => (
            <option key={lesson.id} value={lesson.id}>
              {lesson.id}. {lesson.title}
            </option>
          ))}
        </select>

        {/* أزرار الاختبار السريع */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button 
            // عند الضغط هنا، نرسل الوضع "rules"
            onClick={() => sendMessage("أريد اختبار مدى حفظي للقواعد في هذا الدرس. اطرح علي سؤالاً مباشراً وانتظر إجابتي.", "rules")}
            disabled={!selectedLessonId || loading}
            className={`py-2 px-3 rounded-xl text-sm font-bold transition-colors ${
              !selectedLessonId ? "bg-gray-100 text-gray-400" : "bg-blue-100 text-blue-700 hover:bg-blue-200"
            }`}
          >
            📝 اختبرني بالقواعد
          </button>
          <button 
            // عند الضغط هنا، نرسل الوضع "exercises"
            onClick={() => sendMessage("أريد حلاً لتمرين تطبيقي على هذا الدرس. اطرح علي تمريناً وانتظر حلي لتصححه لي.", "exercises")}
            disabled={!selectedLessonId || loading}
            className={`py-2 px-3 rounded-xl text-sm font-bold transition-colors ${
              !selectedLessonId ? "bg-gray-100 text-gray-400" : "bg-orange-100 text-orange-700 hover:bg-orange-200"
            }`}
          >
            🧮 اختبرني بالتمارين
          </button>
        </div>
      </div>

      {/* مساحة المحادثة */}
      <div className="flex-1 overflow-y-auto space-y-4 p-2 mb-4 bg-gray-50 rounded-2xl border border-gray-100" style={{minHeight: "300px"}}>
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-20 p-4">
            <p>مرحباً! أنا معلمك الخصوصي.</p>
            <p className="text-sm mt-2">اختر الدرس من الأعلى، أو استخدم أزرار الاختبار، ثم اكتب سؤالك في الأسفل لتبدأ.</p>
          </div>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div 
              className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${
                msg.role === "user" ? "bg-blue-600 text-white rounded-br-none" : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.role === "ai" ? formatText(msg.text) : msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-none text-sm text-gray-500 shadow-sm animate-pulse">
              يكتب الآن...
            </div>
          </div>
        )}
      </div>

      {/* حقل إدخال السؤال */}
      <div className="sticky bottom-16 bg-white pt-2">
        <div className="flex gap-2 p-2 border border-gray-200 rounded-2xl shadow-sm bg-white">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            // الإرسال العادي يحافظ على الوضع الحالي (null)
            onKeyDown={(e) => e.key === "Enter" && sendMessage(null, null)}
            placeholder="اكتب سؤالك أو إجابتك هنا..."
            className="flex-1 px-4 py-2 border-0 focus:outline-none text-sm text-gray-800 bg-transparent"
          />
          <button 
            onClick={() => sendMessage(null, null)} 
            disabled={loading}
            className="w-10 h-10 bg-blue-600 text-white rounded-xl hover:bg-blue-700 flex items-center justify-center text-lg transition-colors disabled:opacity-50"
          >
            ➤
          </button>
        </div>
      </div>
    </main>
  );
}