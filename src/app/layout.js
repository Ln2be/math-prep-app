"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ProgressProvider } from "@/context/ProgressContext";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import BottomNav from "@/components/BottomNav";
import 'katex/dist/katex.min.css'; // Make sure this is here!
import "./globals.css";

// ... rest of your layout code (AppGuard and RootLayout) ...

function AppGuard({ children }) {
  const { session, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only redirect if we are SURE there is no session and we aren't on the auth page
    if (!loading && !session && pathname !== "/auth") {
      router.replace("/auth");
    }
  }, [session, loading, pathname, router]);

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-blue-500 animate-pulse">جاري التحميل...</div>
      </div>
    );
  }

  // If user is not logged in, only show the auth page, hide everything else
  if (!session && pathname !== "/auth") {
    return null;
  }

  // If logged in, OR if on the auth page, show the content
  return (
    <>
      {children}
      {/* Only show Bottom Nav if logged in */}
      {session && <BottomNav />} 
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