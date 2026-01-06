import { Gowun_Batang } from "next/font/google";
import BaZi from "./component/BaZi";

const gowun = Gowun_Batang({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0B0D] via-[#1F1144] to-[#0B0B0D] text-white flex flex-col items-center justify-center p-4 pt-6">
      {/* Header */}
      <header className="w-full max-w-2xl flex flex-col justify-center items-center flex-1 mb-3">
        <h1 className={`${gowun.className}  text-4xl md:text-5xl  font-serif tracking-wider mb-3 text-[#FACC15]`}>오늘, 당신의 운명은?</h1>
        <p className="text-gray-400 text-base sm:text-lg md:text-xl lg:text-2xl">생년월일을 입력하고 당신의 사주를 확인해보세요.</p>
      </header>

      {/* BaZi Component */}
      <main className="h-[700px] max-h-[700px] w-full max-w-2xl bg-[#141322]/60 border border-[#8B5CF6]/40 rounded-2xl p-8 shadow-[0_0_40px_rgba(139,92,246,0.2)] text-white  overflow-y-auto
        scrollbar-thin scrollbar-thumb-[#8B5CF6]/40 scrollbar-track-transparent">
        <BaZi />
      </main>

      {/* Footer */}
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <footer className="flex justify-center items-center w-full max-w-2xl flex-1 text-gray-500 text-sm">© 2025 Hyejin's SaJu | Powered by OpenAI</footer>
    </div>
  );
}
