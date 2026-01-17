"use client";
import axios from "axios";
import { useState } from "react";
import Answer from "./Answer/Answer";
import LoadingUI from "../UI/LoadingUI";
import { useUserStore } from "@/store/userDataStore";
import { useAnswerStore } from "../store/useAnswerStore";
import { useSelectedStore } from "../store/useSelectedStore";
import { useRouter } from "next/navigation";
import FormSection from "./Form/FormSection";

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
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // store
  const { userData, setUserData } = useUserStore()
  const { answerData, setAnswerData, resetAnswerData } = useAnswerStore()
  const { resetSelectedType } = useSelectedStore()
  const { selectedType } = useSelectedStore()


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
          type: selectedType //사주타입
        };

        const response = await axios.post("/api/ask", params);
        if (!response.data) return;

        //응답데이터를 프론트측에서 사용이 용이하도록 가공
        const makeAnswerData = { category: selectedType, data: response.data.answer }

        setAnswerData(makeAnswerData);
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
      resetAnswerData()
      resetSelectedType() // 리셋해야 컴포넌트가 제일 처음 컴포넌트로 돌아감.
      // 🔥 hash 제거 + 루트로 완전 교체
      router.replace("/");
    }
  };


  return (
    !loading ? (
      <LoadingUI sajuType={selectedType} />
    ) : !answerData ? (
      <FormSection onClick={handleClickEvent} />
    ) : (
      <Answer onClick={handleClickEvent} />
    )
  )
};

export default BaZi;

