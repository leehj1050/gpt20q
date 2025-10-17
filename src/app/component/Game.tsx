"use client";
import axios from "axios";
import React, { useState } from "react";

const Game = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClickEvent = async () => {
    try {
      const params = {
        question: question,
        //   history: [],
        secret: "Desk",
      };
      const response = await axios.post("/api/ask", params);
      setAnswer(response.data.answer);
      setLoading(true);
    } catch (error) {
      console.error("API 요청 중 오류 발생 : ", error);

      // ✅ 사용자에게 보여줄 피드백 처리
      setAnswer("⚠️ 서버와 통신 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex flex-col">
      <section>
        <input className="border border-white-500" onChange={(e) => setQuestion(e.target.value)} />
        <button className="bg-white text-black cursor-pointer" onClick={handleClickEvent}>
          Click me
        </button>
      </section>

      <section className="border border-red-500 h">
        <ul>
          <li className="text-white-500">Q: {question}</li>

          {loading && <li className="text-red-500">A: {answer}</li>}
        </ul>
      </section>
    </div>
  );
};

export default Game;
