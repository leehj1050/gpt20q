import { useAnswerStore } from "../store/useAnswerStore";

const genderMap: Record<string, string> = {
  femail: "여성",
  mail: "남성",
};

const birthMoonMap: Record<string, string> = {
  solar: "양력",
  lunar: "음력",
  yundal: "윤달",
};

const Answer = ({ onClick }: { onClick: () => void }) => {
  const { answerData } = useAnswerStore()

  const sections = [
    { title: "🔮 사주 전체 요약", content: answerData?.summary },
    { title: "🌿 성격", content: answerData?.personality },
    { title: "💰 재물운", content: answerData?.wealth },
    { title: "👥 인간관계", content: answerData?.relationship },
    { title: "💞 연애운", content: answerData?.romanticFortune },
    { title: "💼 직업운", content: answerData?.career },
    { title: "☯️ 음양오행", content: answerData?.yinYangFiveElements },
  ]


  return (
    <div className="w-full flex flex-1 flex-col ">
      <div className="flex flex-1 flex-col min-h-0 gap-3">
        <div className="animate-fade-in">
          {/* 헤더 */}
          <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-[#8B5CF6] to-[#FACC15] text-transparent bg-clip-text">✨ 사주 분석 결과 ✨</h2>

          {/* 스크롤 영역 (Tailwind만으로 구현) */}
          <div className="space-y-6">
            {sections.map((section, idx) => (
              <div key={idx} className="mb-6">
                <h3 className="text-xl font-semibold text-[#FACC15] mb-2">{section.title}</h3>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">{section.content || "정보가 부족합니다."}</p>

                {/* 구분선 (Separator 대체) */}
                {idx < sections.length - 1 && <div className="my-5 h-[1px] w-full bg-gradient-to-r from-transparent via-[#8B5CF6]/30 to-transparent" />}
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={onClick}
          className="w-full mt-auto py-3 bg-gradient-to-r from-[#8B5CF6] to-[#FACC15] text-black font-semibold rounded-lg shadow-lg hover:scale-[1.02] transition">
          다시 보기
        </button>
      </div>
    </div>
  );
};

export default Answer;
