"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    let active = true;
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (active) {
        setSession(session);
        if (session) fetchProfile(session.user.id);
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) {
        setSession(session);
        if (session) fetchProfile(session.user.id);
        else setIsPremium(false);
        setLoading(false);
      }
    });

    const fetchProfile = async (userId) => {
      const { data } = await supabase.from('profiles').select('premium_until').eq('id', userId).single();
      // التحقق مما إذا كان الاشتراك لا يزال ساري المفعول
      if (data?.premium_until) {
        const isStillPremium = new Date(data.premium_until) > new Date();
        setIsPremium(isStillPremium);
      } else {
        setIsPremium(false);
      }
    };

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const value = {
    session,
    user: session?.user,
    isPremium,
    signOut: () => supabase.auth.signOut(),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}