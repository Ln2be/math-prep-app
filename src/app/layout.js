"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ProgressProvider } from "@/context/ProgressContext";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import BottomNav from "@/components/BottomNav";
import 'katex/dist/katex.min.css';
import "./globals.css";

function AppGuard({ children }) {
  const { session, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only redirect if NOT logged in AND NOT on /auth AND NOT on /admin
    if (!loading && !session && pathname !== "/auth" && pathname !== "/admin") {
      router.replace("/auth");
    }
  }, [session, loading, pathname, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-blue-500 animate-pulse">جاري التحميل...</div>
      </div>
    );
  }

  // If user is not logged in, only show the auth page or admin page
  if (!session && pathname !== "/auth" && pathname !== "/admin") {
    return null;
  }

  return (
    <>
      {children}
      {/* Only show Bottom Nav if logged in AND not on /admin or /auth */}
      {session && pathname !== "/admin" && pathname !== "/auth" && <BottomNav />} 
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-gray-100">
        <AuthProvider>
          <ProgressProvider>
            <div className="max-w-md mx-auto bg-gray-50 min-h-screen shadow-xl relative pb-20">
              <AppGuard>{children}</AppGuard>
            </div>
          </ProgressProvider>
        </AuthProvider>
      </body>
    </html>
  );
}