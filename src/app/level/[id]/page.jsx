"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useProgress } from "@/context/ProgressContext";
import { sessions } from "@/data/curriculum";
import Link from "next/link";
import katex from "katex";
import { useAuth } from "@/context/AuthContext";
import Paywall from "@/components/Paywall";

function renderLatexInHtml(htmlString) {
  if (!htmlString) return "";
  try {
    let html = htmlString.replace(/\$\$(.*?)\$\$/gs, (match, p1) => {
      return katex.renderToString(p1, { displayMode: true, throwOnError: false });
    });
    
    html = html.replace(/\$(.*?)\$/g, (match, p1) => {
      return katex.renderToString(p1, { displayMode: false, throwOnError: false });
    });
    
  return html;
  } catch (e) {
    console.error("KaTeX rendering error:", e);
    return htmlString;
  }
}

export default function LevelPage() {
  const params = useParams();
  const router = useRouter();
   const { unlockNextLevel, addSolvedExercise } = useProgress();
    const { isPremium } = useAuth();

  const [activeTab, setActiveTab] = useState("rules");
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [aiHelp, setAiHelp] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);

  const id = parseInt(params.id);
  const lessonData = sessions.find((s) => s.id === id);

  if (!lessonData) {

      if (id > 1 && !isPremium) {
    return (
      <main className="min-h-screen p-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="text-blue-600 hover:underline text-sm block mb-6">← العودة للخريطة</Link>
          <Paywall message="الدرس الأول مجاني بالكامل! لفتح بقية الدروس والوصول لجميع التمارين، تحتاج إلى عضوية ذهبية." />
        </div>
      </main>
    );
  }
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">الدرس غير موجود.</p>
          <Link href="/" className="text-blue-600 mt-4 inline-block">العودة للرئيسية</Link>
        </div>
      </div>
    );
  }

  const handleCheckAnswer = () => {
    const correct = selectedOption === lessonData.quiz[currentQ].correctAnswer;
    setIsCorrect(correct);
    if (correct) {
      setAiHelp(null);
      addSolvedExercise(); // <--- أضف هذا السطر لزيادة عدد التمارين المحلولة
      if (currentQ === lessonData.quiz.length - 1) {
        setQuizPassed(true);
      }
    }
  };

  const handleNextQuestion = () => {
    setCurrentQ(currentQ + 1);
    setSelectedOption(null);
    setIsCorrect(null);
    setAiHelp(null);
  };

  const handleAiHelp = async () => {
    setAiLoading(true);
    setAiHelp(null);
    const q = lessonData.quiz[currentQ];
    
    // We prepare the context of the current lesson to send it to the AI
    const lessonContext = {
      title: lessonData.title,
      rules: lessonData.rules_content.replace(/<[^>]+>/g, ' ') // This removes HTML tags to make it clean text for the AI
    };

    const context = `The student is practicing math. The question was: "${q.question}". The correct answer is "${q.options[q.correctAnswer]}". The student wrongly chose: "${q.options[selectedOption]}". Give them a short, encouraging hint in Arabic to guide them to the correct answer WITHOUT giving the answer directly. Use the provided hint as reference: "${q.hint}"`;
    
    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // We now send both the question and the lessonContext
        body: JSON.stringify({ question: context, lessonContext: lessonContext }),
      });
      const data = await res.json();
      setAiHelp(data.reply || "عذراً، حدث خطأ ما.");
    } catch (error) {
      setAiHelp("فشل الاتصال بالمعلم الذكي.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleComplete = () => {
    unlockNextLevel(id);
    router.push("/");
  };

  return (
    <main className="min-h-screen p-6 bg-gray-50 pb-24">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <Link href="/" className="text-blue-600 hover:underline text-sm">← العودة للخريطة</Link>
          <span className={`text-xs font-bold px-3 py-1 rounded ${lessonData.type === "حساب أساسي" ? "bg-blue-100 text-blue-800" : "bg-orange-100 text-orange-800"}`}>
            {lessonData.type}
          </span>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-blue-500">
          {lessonData.id}. {lessonData.title}
        </h1>

        {/* Tabs */}
        <div className="flex bg-white p-1 rounded-xl shadow-sm mb-6 sticky top-0 z-10">
          <button 
            onClick={() => setActiveTab("rules")} 
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === "rules" ? "bg-blue-600 text-white" : "text-gray-500"}`}
          >
            1. القواعد
          </button>
          <button 
            onClick={() => setActiveTab("resources")} 
            className={`flex-1 py-2 rounded-lg text-sm font-bold mx-1 transition-colors ${activeTab === "resources" ? "bg-blue-600 text-white" : "text-gray-500"}`}
          >
            2. موارد
          </button>
          <button 
            onClick={() => setActiveTab("quiz")} 
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === "quiz" ? "bg-blue-600 text-white" : "text-gray-500"}`}
          >
            3. اختبار
          </button>
        </div>

        {/* Content Area */}
        {activeTab === "rules" && (
          <div 
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lesson-content text-right" 
            dangerouslySetInnerHTML={{ __html: renderLatexInHtml(lessonData.rules_content) }} 
          />
        )}

        {activeTab === "resources" && (
          <div className="space-y-4">
            {lessonData.resources.length === 0 ? (
              <p className="text-gray-500 text-center">لا توجد موارد إضافية لهذا الدرس حالياً.</p>
            ) : 
              lessonData.resources.map((res, idx) => (
                <a 
                  key={idx} 
                  href={res.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-2xl">▶️</div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-sm">{res.title}</h3>
                      <p className="text-xs text-blue-500 mt-1">مشاهدة على يوتيوب</p>
                    </div>
                  </div>
                </a>
              ))
            }
          </div>
        )}

        {activeTab === "quiz" && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            {lessonData.quiz.length === 0 ? (
              <p className="text-gray-500 text-center">لا يوجد اختبار لهذا الدرس حالياً.</p>
            ) : !quizPassed ? (
              <>
                <p className="text-sm text-gray-500 mb-2">سؤال {currentQ + 1} من {lessonData.quiz.length}</p>
                
                {/* Render Quiz Question with Math */}
                <h2 
                  className="text-lg font-bold text-gray-800 mb-4" 
                  dangerouslySetInnerHTML={{ __html: renderLatexInHtml(lessonData.quiz[currentQ].question) }} 
                />
                
                <div className="space-y-3 mb-6">
                  {lessonData.quiz[currentQ].options.map((opt, idx) => {
                    let style = "border-gray-200 hover:border-blue-400 text-gray-800 bg-white";
                    if (selectedOption === idx && isCorrect === null) {
                      style = "border-blue-500 bg-blue-50 text-blue-800 ring-1 ring-blue-500";
                    }
                    if (selectedOption === idx && isCorrect === true) {
                      style = "border-green-500 bg-green-50 text-green-800";
                    }
                    if (selectedOption === idx && isCorrect === false) {
                      style = "border-red-500 bg-red-50 text-red-800";
                    }
                    
                    return (
                      <button 
                        key={idx} 
                        onClick={() => { if(isCorrect === null) { setSelectedOption(idx); }}} 
                        disabled={isCorrect !== null}
                        className={`w-full text-right p-4 rounded-xl border-2 transition-colors font-medium ${style}`}
                        dangerouslySetInnerHTML={{ __html: renderLatexInHtml(opt) }}
                      />
                    );
                  })}
                </div>

                {/* Action Buttons */}
                {selectedOption !== null && isCorrect === null && (
                  <button 
                    onClick={handleCheckAnswer} 
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
                  >
                    تحقق من الإجابة
                  </button>
                )}

                {isCorrect === true && currentQ < lessonData.quiz.length - 1 && (
                  <button 
                    onClick={handleNextQuestion} 
                    className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-colors"
                  >
                    إجابة صحيحة! التالي ←
                  </button>
                )}

                {isCorrect === false && (
                  <div className="mt-4">
                    <button 
                      onClick={handleAiHelp} 
                      disabled={aiLoading} 
                      className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 disabled:opacity-50 transition-colors"
                    >
                      {aiLoading ? "جاري التفكير..." : "🧑‍🏫 اطلب مساعدة المعلم الذكي"}
                    </button>
                    {aiHelp && (
                      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-gray-700">
                        <strong>المعلم الذكي:</strong> {aiHelp}
                      </div>
                    )}
                    <button 
                      onClick={() => { setIsCorrect(null); setSelectedOption(null); setAiHelp(null); }} 
                      className="w-full mt-2 text-gray-500 py-2 rounded-xl font-bold hover:bg-gray-100 transition-colors"
                    >
                      المحاولة مرة أخرى
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">أحسنت! لقد نجحت في الاختبار</h2>
                <p className="text-gray-500 mb-6">لقد فتحت المستوى التالي بنجاح.</p>
                <button 
                  onClick={handleComplete} 
                  className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors text-lg"
                >
                  العودة للخريطة والمتابعة ✓
                </button>
              </div>
            )}
          </div>
        )}

        {/* Bottom Navigation for Tabs */}
        <div className="mt-8 flex justify-between">
          {activeTab !== "rules" && (
            <button 
              onClick={() => setActiveTab(activeTab === "quiz" ? "resources" : "rules")} 
              className="text-blue-600 font-bold py-2 px-4"
            >
              → السابق
            </button>
          )}
          {activeTab !== "quiz" && (
            <button 
              onClick={() => setActiveTab(activeTab === "rules" ? "resources" : "quiz")} 
              className="text-blue-600 font-bold py-2 px-4 mr-auto"
            >
              التالي ←
            </button>
          )}
        </div>
      </div>
    </main>
  );
}