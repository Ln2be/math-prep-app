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

  if (!session && pathname !== "/auth" && pathname !== "/admin") {
    return null;
  }

  return (
    <>
      {children}
      {session && pathname !== "/admin" && pathname !== "/auth" && <BottomNav />} 
    </>
  );
}

export default function RootLayout({ children }) {
  // Register Service Worker for PWA
  useEffect(() => {
    // Only register service worker in production
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js').catch(console.error);
    }
  }, []);

  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
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