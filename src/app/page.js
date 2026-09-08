"use client";
import { useProgress } from "@/context/ProgressContext";
import Link from "next/link";

export default function Home() {
  const { unlockedLevel } = useProgress();
  const totalLevels = 8;
  const progressPercentage = Math.round((unlockedLevel / totalLevels) * 100);

  return (
    <main className="min-h-screen p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8 mt-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">مرحباً، طالبنا! 👋</h1>
          <p className="text-gray-500 text-sm">واصل التحضير للمسابقة</p>
        </div>
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">🧑‍🎓</div>
      </header>

      {/* Progress Card (Like the green banner in your screenshot) */}
      <div className="bg-gradient-to-l from-blue-600 to-blue-500 p-6 rounded-3xl text-white shadow-lg mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">تقدمك العام</h2>
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-white/30 rounded-full h-3 mb-2">
          <div className="bg-white h-3 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
        </div>
        <p className="text-sm text-blue-100">لقد فتحت {unlockedLevel} من أصل {totalLevels} مستويات</p>
      </div>

      {/* Quick Stats (Circular Progress Style) */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-2xl shadow-sm flex flex-col items-center border border-gray-100">
          <div className="relative w-16 h-16 mb-2">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="32" cy="32" r="28" stroke="#e5e7eb" strokeWidth="6" fill="none"></circle>
              <circle cx="32" cy="32" r="28" stroke="#3b82f6" strokeWidth="6" fill="none" strokeDasharray="175.9" strokeDashoffset="175.9"></circle>
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700">0%</span>
          </div>
          <span className="text-xs text-gray-500 text-center">التمارين</span>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm flex flex-col items-center border border-gray-100">
          <div className="relative w-16 h-16 mb-2">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="32" cy="32" r="28" stroke="#e5e7eb" strokeWidth="6" fill="none"></circle>
              <circle cx="32" cy="32" r="28" stroke="#f59e0b" strokeWidth="6" fill="none" strokeDasharray="175.9" strokeDashoffset="140"></circle>
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700">1/8</span>
          </div>
          <span className="text-xs text-gray-500 text-center">المستويات</span>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm flex flex-col items-center border border-gray-100">
          <div className="relative w-16 h-16 mb-2">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="32" cy="32" r="28" stroke="#e5e7eb" strokeWidth="6" fill="none"></circle>
              <circle cx="32" cy="32" r="28" stroke="#10b981" strokeWidth="6" fill="none" strokeDasharray="175.9" strokeDashoffset="175.9"></circle>
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700">0</span>
          </div>
          <span className="text-xs text-gray-500 text-center">الشهادات</span>
        </div>
      </div>

      {/* Continue Learning Section */}
      <h3 className="text-lg font-bold text-gray-800 mb-4">أكمل رحلتك</h3>
      <div className="space-y-4">
        {[...Array(totalLevels)].map((_, index) => {
          const levelId = index + 1;
          const isLocked = levelId > unlockedLevel;
          
          return (
            <Link 
              href={isLocked ? "#" : `/level/${levelId}`} 
              key={levelId}
              className={`block p-4 rounded-2xl shadow-sm border transition-all ${
                isLocked ? "bg-gray-100 border-gray-200" : "bg-white border-blue-500 hover:shadow-md"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 flex items-center justify-center rounded-full text-xl font-bold ${
                  isLocked ? "bg-gray-200 text-gray-400" : "bg-blue-100 text-blue-600"
                }`}>
                  {isLocked ? "🔒" : levelId}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 text-sm">
                    الدرس {levelId}: {["التحويلات", "الهندسة", "التجارية", "الحركة", "المعادلات", "مراجعة", "المتتاليات", "امتحان"][index]}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {isLocked ? "مقفل - أكمل الدرس السابق" : "اضغط للبدء"}
                  </p>
                </div>
                {!isLocked && <span className="text-blue-600 text-xl">←</span>}
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}