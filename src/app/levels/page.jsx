"use client";
import { useProgress } from "@/context/ProgressContext";
import Link from "next/link";

export default function LevelsPage() {
  const { unlockedLevel } = useProgress();
  
  const levelsData = [
    { id: 1, title: "تحويلات الوحدات", color: "bg-blue-500" },
    { id: 2, title: "الهندسة والسلم", color: "bg-blue-500" },
    { id: 3, title: "المسائل المالية", color: "bg-blue-500" },
    { id: 4, title: "التناسب والحركة", color: "bg-blue-500" },
    { id: 5, title: "المعادلات (الجبر)", color: "bg-orange-500" },
    { id: 6, title: "مراجعة مركبة", color: "bg-purple-500" },
    { id: 7, title: "المتتاليات", color: "bg-orange-500" },
    { id: 8, title: "امتحان تجريبي", color: "bg-green-500" },
  ];

  return (
    <main className="min-h-screen p-6 pt-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">المستويات</h1>
      
      <div className="grid grid-cols-2 gap-4">
        {levelsData.map((level) => {
          const isLocked = level.id > unlockedLevel;
          
          return (
            <Link 
              href={isLocked ? "#" : `/level/${level.id}`} 
              key={level.id}
              className={`relative p-5 rounded-2xl shadow-sm border transition-all flex flex-col items-center justify-center aspect-square ${
                isLocked ? "bg-gray-100 border-gray-200" : "bg-white border-gray-100 hover:shadow-md hover:-translate-y-1"
              }`}
            >
              <div className={`w-14 h-14 flex items-center justify-center rounded-2xl text-2xl font-bold mb-3 ${
                isLocked ? "bg-gray-200 text-gray-400" : `${level.color} text-white`
              }`}>
                {isLocked ? "🔒" : level.id}
              </div>
              <h3 className="font-bold text-gray-800 text-sm text-center">{level.title}</h3>
              {!isLocked && (
                <span className="absolute top-2 left-2 text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-bold">
                  متاح
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </main>
  );
}