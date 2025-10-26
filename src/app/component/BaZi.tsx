"use client";
import axios from "axios";
import React, { useRef, useState } from "react";
import Answer from "./Answer";
import Pending from "../UI/Pending";
import { AnswerData } from "../types";

const genderMap: Record<string, string> = {
  femail: "여성",
  mail: "남성",
};

const birthMoonMap: Record<string, string> = {
  solar: "양력",
  lunar: "음력",
  yundal: "윤달",
};

const BaZi = () => {
  const [loading, setLoading] = useState(false);
  const [answerData, setAnswerData] = useState<AnswerData | null>(null);

  const [userData, setUserData] = useState({
    userName: "", //유저이름
    gender: "male", //유저성별
    birthDate: "", //유저생년월일
    birthMoon: "solar", //생년월일 양력,음력,윤달
    birthTime: "", //유저출생시간
    unknown: false, //출생시간 모를때
  });

  /** text type input 이벤트 */
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    switch (type) {
      case "text": // 이름
        setUserData((prev) => ({
          ...prev,
          [name]: value,
        }));
        return;
      case "date": // 생년월일
        setUserData((prev) => ({
          ...prev,
          [name]: value,
        }));
        return;
      case "time": // 출생시간
        setUserData((prev) => ({
          ...prev,
          [name]: value,
          unknown: false,
        }));
        return;
      case "checkbox": // checkbox "모름"
        if (checked) {
          setUserData((prev) => ({
            ...prev,
            [name]: true,
            birthTime: "",
          }));
          return;
        }
    }
  };

  const handleSelectOptions = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    // 두 select 모두 같은 핸들러 쓰므로 name이나 id로 구분 필요
    // 양력/음력/윤달 select
    if (["solar", "lunar", "leap"].includes(value)) {
      setUserData((prev) => ({
        ...prev,
        birthMoon: value,
      }));
    }

    // 성별 select
    if (["male", "female"].includes(value)) {
      setUserData((prev) => ({
        ...prev,
        gender: value,
      }));
    }
  };

  /** post : gpt api */
  const handleClickEvent = async () => {
    if (!answerData) {
      // "운세보기" 모드
      if (!userData.userName || !userData.birthDate) {
        alert("빠진정보가 없는지 확인해주세요.");
        return;
      }
      if (userData.birthTime === "" && !userData.unknown) {
        alert("출생시간이 없으면 모름에 체크해주세요.");
        return;
      }

      setLoading(true); // ✅ 로딩 시작

      try {
        const params = {
          ...userData,
          gender: genderMap[userData.gender],
          birthMoon: birthMoonMap[userData.birthMoon],
        };

        const response = await axios.post("/api/ask", params);

        setAnswerData(response.data.answer);
      } catch (error) {
        console.error("API 요청 중 오류 발생 : ", error);
      } finally {
        setLoading(false); // ✅ 성공/실패 상관없이 로딩 종료
      }
    } else {
      // "다시보기" 모드
      // 폼 초기화 & 결과 리셋
      setUserData({
        userName: "", //유저이름
        gender: "male", //유저성별
        birthDate: "", //유저생년월일
        birthMoon: "solar", //생년월일 양력,음력,윤달
        birthTime: "", //유저출생시간
        unknown: false, //출생시간 모를때
      });
      setAnswerData(null)
    }


  };

  //-----// Ref for date and time inputs

  const dateRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);

  const openDatePicker = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const el = dateRef.current as any;

    if (el) {
      if ("showPicker" in el) {
        el.showPicker();
      } else {
        el.focus();
      }
    }
  };

  const openTimePicker = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const el = timeRef.current as any; // ✅ 명시적 단언;

    if (el) {
      if ("showPicker" in el) {
        el.showPicker();
      } else {
        el.focus();
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-1 flex-col">
      {/* 내용이 많으면 이 영역만 스크롤되도록 */}
      <div className="h-full flex flex-col justify-between">
        {loading ? (
          <Pending />
        ) : !answerData ? (
          <form className=" flex flex-col gap-8 ">
            <div>
              <label className="block mb-1 text-gray-300">이름</label>
              <input
                value={userData.userName}
                name="userName"
                type="text"
                placeholder="홍길동"
                className="w-full bg-transparent border border-gray-600 rounded-lg px-3 py-2 focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] outline-none"
                onChange={handleChangeInput}
              />
            </div>

            <div className="flex gap-3">
              <select value={userData.birthMoon} className="flex-1 bg-transparent border border-gray-600 rounded-lg px-3 py-2 focus:border-[#8B5CF6]" onChange={handleSelectOptions}>
                <option value="solar" id="solar">
                  양력
                </option>
                <option value="lunar" id="lunar">
                  음력
                </option>
                <option value="leap" id="leap">
                  윤달
                </option>
              </select>
              <select value={userData.gender} className="flex-1 bg-transparent border border-gray-600 rounded-lg px-3 py-2 focus:border-[#8B5CF6]" onChange={handleSelectOptions}>
                <option value="male">남자</option>
                <option value="female">여자</option>
              </select>
            </div>

            <div onClick={openDatePicker}>
              <label htmlFor="birthDate" className="block mb-1 text-gray-300">
                생년월일
              </label>
              <input
                value={userData.birthDate}
                name="birthDate"
                ref={dateRef}
                id="birthDate"
                type="date"
                className="w-full bg-transparent border border-gray-600 rounded-lg px-3 py-2 focus:border-[#8B5CF6]"
                onChange={handleChangeInput}
              />
            </div>

            <div onClick={openTimePicker}>
              <label htmlFor="birthTime" className="block mb-1 text-gray-300">
                출생 시간
              </label>
              <input
                value={userData.birthTime}
                name="birthTime"
                ref={timeRef}
                id="birthTime"
                type="time"
                className="w-full bg-transparent border border-gray-600 rounded-lg px-3 py-2 focus:border-[#8B5CF6]"
                onChange={handleChangeInput}
              />
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <p className="text-xs text-gray-500 mt-1">모르면 '모름'에 체크하세요</p>
            </div>

            <div className="flex gap-3">
              <label htmlFor="unknown" className="block text-gray-300 ">
                모름
              </label>
              <input
                name="unknown"
                id="unknown"
                type="checkbox"
                className=" bg-transparent border border-gray-600 rounded-lg px-3 py-2 focus:border-[#8B5CF6]"
                onChange={handleChangeInput}
                checked={userData.unknown}
              />
            </div>
          </form>
        ) : (
          <Answer answer={answerData} />
        )}

        {/** 버튼 */}
        <button
          disabled={loading ? true : false}
          type="button"
          onClick={handleClickEvent}
          className="w-full mt-4 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#FACC15] text-black font-semibold rounded-lg shadow-lg hover:scale-[1.02] transition">
          {loading ? "로딩중.." : !answerData ? "운세 보기 🔮" : "다시 보기 🔁"}
        </button>
      </div>
    </div>
  );
};

export default BaZi;
