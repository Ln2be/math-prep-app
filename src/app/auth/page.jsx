"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("🧑‍🎓");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const avatars = ["🧑‍🎓", "👨‍🏫", "👩‍🏫", "🦸‍♂️", "🦸‍♀️", "🧠", "🚀", "🏆"];

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        // Login
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push("/");
      } else {
        // Signup
        const { data, error } = await supabase.auth.signUp({ 
          email, 
          password 
        });
        
        if (error) throw error;

        // Insert profile data into the profiles table
        if (data.user) {
          const { error: profileError } = await supabase
            .from('profiles')
            .insert([
              { 
                id: data.user.id, 
                full_name: fullName, 
                username: username, 
                avatar_url: avatar 
              }
            ]);
            
          if (profileError) throw profileError;
        }
        router.push("/");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-center p-6 bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">{avatar}</div>
          <h1 className="text-2xl font-bold text-gray-800">
            {isLogin ? "مرحباً بعودتك!" : "أنشئ حسابك المجاني"}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {isLogin ? "سجل دخولك لمواصل التعلم" : "ابدأ رحلتك للنجاح في المسابقة"}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
          {/* Tabs */}
          <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors ${
                isLogin ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"
              }`}
            >
              تسجيل الدخول
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors ${
                !isLogin ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"
              }`}
            >
              حساب جديد
            </button>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 text-sm text-gray-800"
                    placeholder="مثال: أحمد محمد"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">اسم المستخدم</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 text-sm text-gray-800"
                    placeholder="مثال: ahmed_math"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">اختر صورتك الشخصية</label>
                  <div className="flex flex-wrap gap-2">
                    {avatars.map((av) => (
                      <button
                        type="button"
                        key={av}
                        onClick={() => setAvatar(av)}
                        className={`w-12 h-12 rounded-full text-2xl flex items-center justify-center transition-all ${
                          avatar === av ? "bg-blue-100 ring-2 ring-blue-500 scale-110" : "bg-gray-100"
                        }`}
                      >
                        {av}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 text-sm text-gray-800"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 text-sm text-gray-800"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-500 text-sm p-3 rounded-xl">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 mt-2"
            >
              {loading ? "جاري المعالجة..." : isLogin ? "دخول" : "إنشاء الحساب"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}