"use client";
import { useProgress } from "@/context/ProgressContext";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const { unlockedLevel } = useProgress();
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (user) {
      supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
        .then(({ data }) => setProfile(data));
    }
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/auth");
  };

  return (
    <main className="min-h-screen p-6 pt-8">
      {/* Profile Header - Now Dynamic! */}
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
          <h3 className="text-2xl font-bold text-blue-600">{unlockedLevel - 1}</h3>
          <p className="text-xs text-gray-500 mt-1">دروس مكتملة</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm text-center border border-gray-100">
          <h3 className="text-2xl font-bold text-orange-500">120</h3>
          <p className="text-xs text-gray-500 mt-1">نقطة الخبرة</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm text-center border border-gray-100">
          <h3 className="text-2xl font-bold text-green-500">🔥 5</h3>
          <p className="text-xs text-gray-500 mt-1">أيام متتالية</p>
        </div>
      </div>

      {/* Achievements */}
      <h2 className="text-lg font-bold text-gray-800 mb-4">الإنجازات</h2>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-2xl">🥇</div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-800 text-sm">بداية الرحلة</h4>
            <p className="text-xs text-gray-500">إكمال أول درس</p>
          </div>
          {unlockedLevel > 1 ? <span className="text-green-500 text-sm font-bold">مكتمل</span> : <span className="text-gray-400 text-sm">مقفل</span>}
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

      {/* Settings Mockup */}
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