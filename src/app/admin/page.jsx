"use client";
import { useState } from "react";

export default function AdminPage() {
  const [adminCode, setAdminCode] = useState("");
  const [searchId, setSearchId] = useState("");
  const [foundUser, setFoundUser] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setMessage("");
    setFoundUser(null);
    try {
      const res = await fetch("/api/admin/upgrade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminCode, userId: searchId, action: "search" }),
      });
      const data = await res.json();
      if (data.error) { setMessage(`خطأ: ${data.error}`); }
      else if (!data.user) { setMessage("لم يتم العثور على مستخدم بهذا المعرف."); }
      else { setFoundUser(data.user); }
    } catch (e) { setMessage("فشل الاتصال."); } 
    finally { setLoading(false); }
  };

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/upgrade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminCode, userId: foundUser.id, action: "upgrade" }),
      });
      const data = await res.json();
      if (data.error) { setMessage(`خطأ: ${data.error}`); }
      else { setMessage(`✅ تمت ترقية ${data.user.full_name} إلى عضوية ذهبية بنجاح!`); setFoundUser(null); }
    } catch (e) { setMessage("فشل الاتصال."); } 
    finally { setLoading(false); }
  };

  return (
    <main className="min-h-screen p-6 pt-10 bg-gray-900 text-white flex flex-col items-center">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-2xl border border-gray-700">
        <h1 className="text-2xl font-bold mb-6 text-center text-yellow-500">لوحة تحكم المدير 👑</h1>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400">رمز المدير السري</label>
            <input type="password" value={adminCode} onChange={(e) => setAdminCode(e.target.value)} className="w-full mt-1 p-3 rounded-xl bg-gray-700 border border-gray-600 focus:outline-none text-white text-sm"/>
          </div>
          <div>
            <label className="text-sm text-gray-400">معرف الطالب (User ID من Supabase)</label>
            <input type="text" value={searchId} onChange={(e) => setSearchId(e.target.value)} className="w-full mt-1 p-3 rounded-xl bg-gray-700 border border-gray-600 focus:outline-none text-white text-sm"/>
          </div>
          <button onClick={handleSearch} disabled={loading || !adminCode || !searchId} className="w-full py-3 bg-blue-600 rounded-xl font-bold disabled:opacity-50">{loading ? "جاري البحث..." : "بحث عن الطالب"}</button>
        </div>

        {message && <div className="mt-4 text-center text-sm bg-gray-700 p-3 rounded-xl">{message}</div>}

        {foundUser && (
          <div className="mt-6 bg-gray-700 p-4 rounded-xl text-center">
            <div className="text-4xl mb-2">{foundUser.avatar_url}</div>
            <h3 className="font-bold text-lg">{foundUser.full_name}</h3>
            <p className="text-sm text-gray-400">@{foundUser.username}</p>
            <p className="text-xs text-gray-500 mt-1">الحالة الحالية: {foundUser.is_premium ? "عضو ذهبي ✅" : "عضو مجاني ❌"}</p>
            
            {!foundUser.is_premium && (
              <button onClick={handleUpgrade} disabled={loading} className="w-full mt-4 py-3 bg-yellow-500 text-gray-900 font-bold rounded-xl hover:bg-yellow-600">
                ترقية إلى عضو ذهبي 👑
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  );
}