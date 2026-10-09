"use client";
import { useProgress } from "@/context/ProgressContext";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const { unlockedLevel, solvedExercises } = useProgress();
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [streak, setStreak] = useState(1);

  const totalLevels = 8;
  const totalExercises = 64; 
  const completedLessons = unlockedLevel - 1;
  const expPoints = solvedExercises * 15;
  const exercisesProgress = Math.min(100, Math.round((solvedExercises / totalExercises) * 100));
  const levelsProgress = Math.round((unlockedLevel / totalLevels) * 100);
  const certificates = unlockedLevel > 8 ? 1 : 0;

  useEffect(() => {
    if (user) {
      supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
        .then(({ data }) => setProfile(data));
    }

    // حساب الأيام المتتالية (نفس نظام الصفحة الرئيسية)
    const today = new Date().toDateString();
    const lastActive = localStorage.getItem("lastActiveDate");
    if (lastActive !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      let currentStreak = parseInt(localStorage.getItem("streak") || "0");
      if (lastActive === yesterday) {
        currentStreak += 1;
      } else {
        currentStreak = 1;
      }
      localStorage.setItem("lastActiveDate", today);
      localStorage.setItem("streak", currentStreak.toString());
      setStreak(currentStreak);
    } else {
      setStreak(parseInt(localStorage.getItem("streak") || "1"));
    }
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/auth");
  };

  return (
    <main className="min-h-screen p-6 pt-8">
      {/* Profile Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-4xl text-white shadow-lg mb-3">
          {profile?.avatar_url || "🧑‍🎓"}
        </div>
        <h1 className="text-xl font-bold text-gray-800">{profile?.full_name || "طالب"}</h1>
        <p className="text-sm text-gray-500">@{profile?.username || "username"}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="bg-white p-4 rounded-2xl shadow-sm text-center border border-gray-100">
          <h3 className="text-2xl font-bold text-blue-600">{solvedExercises}</h3>
          <p className="text-xs text-gray-500 mt-1">تمارين محلولة</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm text-center border border-gray-100">
          <h3 className="text-2xl font-bold text-orange-500">{expPoints}</h3>
          <p className="text-xs text-gray-500 mt-1">نقطة الخبرة</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm text-center border border-gray-100">
          <h3 className="text-2xl font-bold text-green-500">🔥 {streak}</h3>
          <p className="text-xs text-gray-500 mt-1">أيام متتالية</p>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8 space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">تقدم التمارين</span>
            <span className="text-sm font-bold text-blue-600">{exercisesProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${exercisesProgress}%` }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">تقدم المستويات</span>
            <span className="text-sm font-bold text-orange-500">{levelsProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: `${levelsProgress}%` }}></div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <h2 className="text-lg font-bold text-gray-800 mb-4">الإنجازات</h2>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-4">
        
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-2xl">🥇</div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-800 text-sm">بداية الرحلة</h4>
            <p className="text-xs text-gray-500">إكمال أول تمرين</p>
          </div>
          {solvedExercises > 0 ? <span className="text-green-500 text-sm font-bold">مكتمل</span> : <span className="text-gray-400 text-sm">مقفل</span>}
        </div>
        
        <div className="border-t border-gray-100"></div>
        
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${unlockedLevel >= 5 ? "bg-purple-100" : "bg-gray-100"}`}>🚀</div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-800 text-sm">نصف الطريق</h4>
            <p className="text-xs text-gray-500">الوصول إلى المستوى 5</p>
          </div>
          {unlockedLevel >= 5 ? <span className="text-green-500 text-sm font-bold">مكتمل</span> : <span className="text-gray-400 text-sm">مقفل</span>}
        </div>
        
        <div className="border-t border-gray-100"></div>
        
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${unlockedLevel >= 8 ? "bg-blue-100" : "bg-gray-100"}`}>🏆</div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-800 text-sm">بطل الرياضيات</h4>
            <p className="text-xs text-gray-500">إكمال جميع المستويات</p>
          </div>
          {unlockedLevel >= 8 ? <span className="text-green-500 text-sm font-bold">مكتمل</span> : <span className="text-gray-400 text-sm">مقفل</span>}
        </div>

      </div>

      {/* Settings */}
      <h2 className="text-lg font-bold text-gray-800 mb-4 mt-8">الإعدادات</h2>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100">
        <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50">
          <span className="text-sm text-gray-700">🔔 الإشعارات</span>
          <span className="text-gray-400">←</span>
        </button>
        <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50">
          <span className="text-sm text-gray-700">🌍 اللغة</span>
          <span className="text-gray-400 text-sm">العربية</span>
        </button>
        <button 
          onClick={handleSignOut}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
        >
          <span className="text-sm text-red-500">🚪 تسجيل الخروج</span>
        </button>
      </div>
    </main>
  );
}