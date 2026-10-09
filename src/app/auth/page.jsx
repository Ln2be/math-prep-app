"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [sex, setSex] = useState(""); // ذكر أو أنثى
  const [avatar, setAvatar] = useState("🧑‍🎓");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [usernameSuggestion, setUsernameSuggestion] = useState(null);
  const router = useRouter();

  const avatars = ["🧑‍🎓", "👨‍🏫", "👩‍🏫", "🦸‍♂️", "🦸‍♀️", "🧠", "🚀", "🏆"];

  // التحقق من توفر اسم المستخدم
  const checkUsername = async (name) => {
    setUsername(name);
    setUsernameSuggestion(null);
    if (!name || isLogin) return;
    
    const { data } = await supabase.from('profiles').select('username').ilike('username', name);
    if (data && data.length > 0) {
      const suggestions = [`${name}_math`, `${name}${Math.floor(Math.random() * 100)}`];
      setUsernameSuggestion(suggestions);
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // تحويل رقم الهاتف إلى بريد إلكتروني وهمي إذا لم يكن المدخل بريداً
    let authEmail = emailOrPhone;
    if (!emailOrPhone.includes('@')) {
      authEmail = `${emailOrPhone.replace(/[^0-9]/g, '')}@mathprep.app`;
    }

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email: authEmail, password });
        if (error) throw error;
        router.push("/");
      } else {
        if (!sex) throw new Error("الرجاء تحديد الجنس (ذكر أو أنثى).");
        
        const { data, error } = await supabase.auth.signUp({ email: authEmail, password });
        if (error) throw error;

        if (data.user) {
          const { error: profileError } = await supabase.from('profiles').insert([
            { 
              id: data.user.id, 
              full_name: fullName, 
              username: username, 
              avatar_url: avatar,
              sex: sex // حفظ الجنس
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
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">{avatar}</div>
          <h1 className="text-2xl font-bold text-gray-800">{isLogin ? "مرحباً بعودتك!" : "أنشئ حسابك المجاني"}</h1>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
          <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
            <button onClick={() => setIsLogin(true)} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors ${isLogin ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"}`}>تسجيل الدخول</button>
            <button onClick={() => setIsLogin(false)} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors ${!isLogin ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"}`}>حساب جديد</button>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
                  <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 text-sm text-gray-800" placeholder="مثال: أحمد محمد"/>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">اسم المستخدم</label>
                  <input type="text" value={username} onChange={(e) => checkUsername(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 text-sm text-gray-800" placeholder="مثال: ahmed_math"/>
                  {usernameSuggestion && (
                    <div className="mt-2 text-xs text-red-500 bg-red-50 p-2 rounded-lg">
                      اسم المستخدم محجوز. اقتراحات: 
                      {usernameSuggestion.map(s => <button type="button" key={s} onClick={() => { setUsername(s); setUsernameSuggestion(null); }} className="font-bold text-blue-600 mx-1 underline">{s}</button>)}
                    </div>
                  )}
                </div>

                {/* حقل الجنس */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الجنس (مطلوب)</label>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setSex("ذكر")} className={`flex-1 py-3 rounded-xl border-2 text-sm font-medium ${sex === "ذكر" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-700"}`}>ذكر</button>
                    <button type="button" onClick={() => setSex("أنثى")} className={`flex-1 py-3 rounded-xl border-2 text-sm font-medium ${sex === "أنثى" ? "border-pink-500 bg-pink-50 text-pink-700" : "border-gray-200 text-gray-700"}`}>أنثى</button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">اختر صورتك الشخصية</label>
                  <div className="flex flex-wrap gap-2">
                    {avatars.map((av) => (
                      <button type="button" key={av} onClick={() => setAvatar(av)} className={`w-12 h-12 rounded-full text-2xl flex items-center justify-center transition-all ${avatar === av ? "bg-blue-100 ring-2 ring-blue-500 scale-110" : "bg-gray-100"}`}>{av}</button>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني أو رقم الهاتف</label>
              <input type="text" value={emailOrPhone} onChange={(e) => setEmailOrPhone(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 text-sm text-gray-800" placeholder="you@example.com أو 12345678"/>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 text-sm text-gray-800" placeholder="••••••••"/>
            </div>

            {error && <div className="bg-red-50 text-red-500 text-sm p-3 rounded-xl">{error}</div>}

            <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 mt-2">
              {loading ? "جاري المعالجة..." : isLogin ? "دخول" : "إنشاء الحساب"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}