'use client'
import { Gowun_Batang } from "next/font/google";
import MainSelect from "../component/MainSelect";
import { useEffect } from "react";
import { useSelectedStore } from "@/store/useSelectedStore";
import { useUserStore } from "@/store/userDataStore";
import { useAnswerStore } from "@/store/useAnswerStore";
import { SajuType } from "./types";

const gowun = Gowun_Batang({ weight: ["400", "700"], subsets: ["latin"] });

export default function Home() {
  const { setSelectedType, resetSelectedType } = useSelectedStore()
  const { resetUserData } = useUserStore()
  const { resetAnswerData } = useAnswerStore()



  // ✅ 뒤로가기(popstate) 이벤트 감지 → 홈화면으로 복귀
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace("#", "") as SajuType;
      if (!hash) {
        // 해시가 없으면 홈으로 (선택타입을 리셋)
        resetSelectedType();
        // 뒤로가기 클릭시 입력한 유저정보 및 결과데이터 리셋
        resetUserData()
        resetAnswerData()
      } else {
        // 해시가 있으면 해당 상태 복원
        setSelectedType(hash);
      }
    };

    // 초기 로딩 시 해시 확인
    handlePopState();

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);


  return (
    <div className="w-full bg-gradient-to-br from-[#0B0B0D] via-[#1F1144] to-[#0B0B0D] text-white flex flex-col items-center justify-center px-4 py-10 gap-3">
      <header className="w-full max-w-2xl flex flex-col justify-center items-center shrink-0">
        <h1 className={`${gowun.className} text-3xl md:text-5xl font-serif tracking-wider mb-3 text-[#FACC15]`}>
          오늘, 당신의 운명은?
        </h1>
        <p className="text-gray-400 text-base sm:text-lg md:text-xl lg:text-2xl">
          AI가 해석해주는 당신의 사주와 운명 이야기
        </p>
      </header>

      <main className="w-full max-w-2xl h-full bg-[#141322]/60 border border-[#8B5CF6]/40 rounded-2xl p-8 shadow-[0_0_40px_rgba(139,92,246,0.2)] overflow-y-auto scrollbar-thin scrollbar-thumb-[#8B5CF6]/40 scrollbar-track-transparent flex-1">
        <MainSelect />
      </main>

      <footer className="flex justify-center items-center w-full max-w-2xl text-gray-500 text-sm shrink-0">
        © 2025 Hyejin's SaJu | Powered by OpenAI
      </footer>
    </div>
  );
}
