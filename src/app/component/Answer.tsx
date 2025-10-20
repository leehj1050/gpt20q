import React from "react";

const Answer = ({ answer }: { answer: any }) => {
  console.log("answer > ", answer);
  return (
    <div className="text-black flex flex-col">
      <h2 className="text-2xl font-bold mb-4">분석 결과</h2>

      <div>
        <h3 className="text-xl font-bold">사주 전체 요약</h3>
        <p>{answer.summary}</p>
      </div>

      <div>
        <h3 className="text-xl font-bold">성격</h3>
        <p>{answer.personality}</p>
      </div>

      <div>
        <h3 className="text-xl font-bold">재물운</h3>
        <p>{answer.wealth}</p>
      </div>
      <div>
        <h3 className="text-xl font-bold">인간관계</h3>
        <p>{answer.relationship}</p>
      </div>

      <div>
        <h3 className="text-xl font-bold">직업적 적성</h3>
        <p>{answer.career}</p>
      </div>

      <div>
        <h3 className="text-xl font-bold">음양오행</h3>
        <p>{answer.yinYangFiveElements}</p>
      </div>

    </div>
  );
};

export default Answer;
