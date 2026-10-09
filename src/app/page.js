"use client";
import { useProgress } from "@/context/ProgressContext";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const { unlockedLevel, solvedExercises } = useProgress();
  const { user, isPremium } = useAuth();
  const [profile, setProfile] = useState(null);
  const [streak, setStreak] = useState(1);
  const [showLockAlert, setShowLockAlert] = useState(false); // لرسالة الدروس المغلقة
  
  const totalLevels = 8;
  const progressPercentage = Math.round((unlockedLevel / totalLevels) * 100);
  const completedLessons = unlockedLevel - 1;
  const expPoints = solvedExercises * 15;
  const totalExercises = 64;
  const exercisesProgress = Math.min(100, Math.round((solvedExercises / totalExercises) * 100));
  const levelsProgress = Math.round((unlockedLevel / totalLevels) * 100);
  const certificates = unlockedLevel > 8 ? 1 : 0;

  useEffect(() => {
    if (user) {
      supabase.from('profiles').select('*').eq('id', user.id).single().then(({ data }) => setProfile(data));
    }
    const today = new Date().toDateString();
    const lastActive = localStorage.getItem("lastActiveDate");
    if (lastActive !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      let currentStreak = parseInt(localStorage.getItem("streak") || "0");
      if (lastActive === yesterday) currentStreak += 1;
      else currentStreak = 1;
      localStorage.setItem("lastActiveDate", today);
      localStorage.setItem("streak", currentStreak.toString());
      setStreak(currentStreak);
    } else {
      setStreak(parseInt(localStorage.getItem("streak") || "1"));
    }
  }, [user]);

  return (
    <main className="min-h-screen p-6">
      <header className="flex justify-between items-center mb-8 mt-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            مرحباً، {profile?.full_name || "طالب"}! 
            {isPremium && <span className="text-yellow-500">👑</span>}
          </h1>
          <p className="text-gray-500 text-sm">واصل التحضير للمسابقة</p>
        </div>
        {/* إطار ذهبي للصورة الرمزية إذا كان مشتركاً */}
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${isPremium ? "bg-gradient-to-br from-yellow-400 to-orange-500 p-1" : "bg-blue-100"}`}>
          <div className={`w-full h-full rounded-full flex items-center justify-center ${isPremium ? "bg-white" : ""}`}>
            {profile?.avatar_url || "🧑‍🎓"}
          </div>
        </div>
      </header>

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

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-2xl shadow-sm flex flex-col items-center border border-gray-100">
          <div className="relative w-16 h-16 mb-2">
            <svg className="w-full h-full transform -rotate-90"><circle cx="32" cy="32" r="28" stroke="#e5e7eb" strokeWidth="6" fill="none"></circle><circle cx="32" cy="32" r="28" stroke="#3b82f6" strokeWidth="6" fill="none" strokeDasharray="175.9" strokeDashoffset={175.9 - (175.9 * exercisesProgress) / 100}></circle></svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700">{exercisesProgress}%</span>
          </div>
          <span className="text-xs text-gray-500 text-center">التمارين</span>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm flex flex-col items-center border border-gray-100">
          <div className="relative w-16 h-16 mb-2">
            <svg className="w-full h-full transform -rotate-90"><circle cx="32" cy="32" r="28" stroke="#e5e7eb" strokeWidth="6" fill="none"></circle><circle cx="32" cy="32" r="28" stroke="#f59e0b" strokeWidth="6" fill="none" strokeDasharray="175.9" strokeDashoffset={175.9 - (175.9 * levelsProgress) / 100}></circle></svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700">{unlockedLevel}/{totalLevels}</span>
          </div>
          <span className="text-xs text-gray-500 text-center">المستويات</span>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm flex flex-col items-center border border-gray-100">
          <div className="relative w-16 h-16 mb-2">
            <svg className="w-full h-full transform -rotate-90"><circle cx="32" cy="32" r="28" stroke="#e5e7eb" strokeWidth="6" fill="none"></circle><circle cx="32" cy="32" r="28" stroke="#10b981" strokeWidth="6" fill="none" strokeDasharray="175.9" strokeDashoffset={175.9 - (175.9 * certificates * 100) / 100}></circle></svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700">{certificates}</span>
          </div>
          <span className="text-xs text-gray-500 text-center">الشهادات</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="bg-white p-3 rounded-xl border border-gray-100 text-center"><h3 className="text-lg font-bold text-blue-600">{completedLessons}</h3><p className="text-xs text-gray-500">دروس مكتملة</p></div>
        <div className="bg-white p-3 rounded-xl border border-gray-100 text-center"><h3 className="text-lg font-bold text-orange-500">{expPoints}</h3><p className="text-xs text-gray-500">نقطة الخبرة</p></div>
        <div className="bg-white p-3 rounded-xl border border-gray-100 text-center"><h3 className="text-lg font-bold text-green-500">🔥 {streak}</h3><p className="text-xs text-gray-500">أيام متتالية</p></div>
      </div>

      {!isPremium && (
        <Link href="/upgrade" className="block mb-8 bg-gradient-to-l from-yellow-500 to-orange-500 p-4 rounded-2xl shadow-lg text-white flex items-center justify-between hover:opacity-90 transition-opacity">
          <div><h3 className="font-bold text-sm">العضوية الذهبية 👑</h3><p className="text-xs text-yellow-50">افتح جميع الدروس والرسائل غير المحدودة</p></div>
          <span className="bg-white text-orange-600 px-3 py-1 rounded-lg text-xs font-bold">ترقية الآن</span>
        </Link>
      )}

      {/* رسالة الدرس المغلق للمشتركين */}
      {showLockAlert && (
        <div className="mb-4 bg-orange-50 border border-orange-200 text-orange-700 p-4 rounded-xl text-sm text-center flex justify-between items-center">
          <span>لفتح هذا الدرس، يجب عليك إكمال تمارين الدرس السابق أولاً.</span>
          <button onClick={() => setShowLockAlert(false)} className="text-orange-900 font-bold">✖</button>
        </div>
      )}

      <h3 className="text-lg font-bold text-gray-800 mb-4">أكمل رحلتك</h3>
      <div className="space-y-4">
        {[...Array(totalLevels)].map((_, index) => {
          const levelId = index + 1;
          const isProgressLocked = levelId > unlockedLevel;
          const isPremiumLocked = !isPremium && levelId > 1;
          
          // التعامل مع النقر على الدروس المغلقة
          const handleClick = (e) => {
            if (isPremiumLocked) {
              // ترك الرابط يعمل لصفحة الترقية
            } else if (isProgressLocked) {
              e.preventDefault();
              setShowLockAlert(true); // إظهار رسالة إكمال الدرس السابق
            }
          };

          return (
            <Link 
              href={isPremiumLocked ? "/upgrade" : `/level/${levelId}`} 
              key={levelId}
              onClick={handleClick}
              className={`block p-4 rounded-2xl shadow-sm border transition-all ${
                isProgressLocked || isPremiumLocked ? "bg-gray-100 border-gray-200" : "bg-white border-blue-500 hover:shadow-md"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 flex items-center justify-center rounded-full text-xl font-bold ${
                  isProgressLocked || isPremiumLocked ? "bg-gray-200 text-gray-400" : "bg-blue-100 text-blue-600"
                }`}>
                  {isPremiumLocked ? "👑" : isProgressLocked ? "🔒" : levelId}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 text-sm">
                    الدرس {levelId}: {["التحويلات", "الهندسة", "التجارية", "الحركة", "المعادلات", "مراجعة", "المتتاليات", "امتحان"][index]}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {isPremiumLocked ? "عضوية ذهبية مطلوبة" : isProgressLocked ? "مقفل - أكمل تمارين الدرس السابق" : "اضغط للبدء"}
                  </p>
                </div>
                {(!isProgressLocked && !isPremiumLocked) && <span className="text-blue-600 text-xl">←</span>}
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}