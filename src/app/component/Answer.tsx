import React from "react";

const Answer = ({ answer }: { answer: any }) => {
  console.log("answer > ", answer);
  return (
    <div className="text-black">
      <h2 className="text-2xl font-bold mb-4">분석 결과</h2>
      <h3 className="text-xl font-bold">요약</h3>
      <p>{answer.summary}</p>
    </div>
  );
};

export default Answer;
