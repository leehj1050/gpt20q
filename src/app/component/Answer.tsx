import React from "react";
import { AnswerData } from "../types";

const Answer = ({ answer }: { answer: AnswerData }) => {
  if (!answer) return null;

  const sections = [
    { title: "🔮 사주 전체 요약", content: answer.summary },
    { title: "🌿 성격", content: answer.personality },
    { title: "💰 재물운", content: answer.wealth },
    { title: "👥 인간관계", content: answer.relationship },
    { title: "💞 연애운", content: answer.romanticFortune },
    { title: "💼 직업운", content: answer.career },
    { title: "☯️ 음양오행", content: answer.yinYangFiveElements },
  ];

  return (
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
  );
};

export default Answer;
