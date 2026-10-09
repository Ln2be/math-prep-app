// src/app/api/admin/upgrade/route.js
import { createClient } from "@supabase/supabase-js";

export async function POST(req) {
  try {
    const { adminCode, userId, action } = await req.json();

    if (adminCode !== process.env.ADMIN_SECRET) {
      return Response.json({ error: "رمز المدير غير صحيح" }, { status: 403 });
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SECRET_KEY
    );

    if (action === "search") {
      const { data, error } = await supabaseAdmin.from('profiles').select('*').eq('id', userId).single();
      if (error) throw error;
      return Response.json({ user: data });
    } 
    else if (action === "upgrade") {
      // إضافة شهر كامل من الآن كتاريخ لانتهاء الاشتراك
      const nextMonth = new Date();
      nextMonth.setDate(nextMonth.getDate() + 30);
      
      const { data, error } = await supabaseAdmin.from('profiles')
        .update({ 
          premium_until: nextMonth.toISOString() 
        }).eq('id', userId).select();
        
      if (error) throw error;
      return Response.json({ success: true, user: data[0] });
    }

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}