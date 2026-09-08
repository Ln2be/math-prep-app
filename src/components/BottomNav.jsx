"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "الرئيسية", icon: "🏠" },
    { href: "/levels", label: "المستويات", icon: "🧩" },
    { href: "/tutor", label: "المعلم الذكي", icon: "🤖" },
    { href: "/profile", label: "حسابي", icon: "👤" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-md mx-auto flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                isActive ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}