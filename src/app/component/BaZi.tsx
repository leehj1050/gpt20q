"use client";
import axios from "axios";
import React, { ReactHTMLElement, useState } from "react";
import { ButtonList, userInfo } from "./config";
import Answer from "./Answer";
import { RotateCcw } from "lucide-react";
import Pending from "../UI/Pending";

const genderMap: Record<string, string> = {
  gender_femail: "여성",
  gender_mail: "남성",
};

const birthMoonMap: Record<string, string> = {
  birthday_solar: "양력",
  birthday_lunar: "음력",
  birthday_yundal: "윤달",
};

const BaZi = () => {
  const [loading, setLoading] = useState(false);
  const [answerData, setAnswerData] = useState();

  const [userData, setUserData] = useState({
    userName: "", //유저이름
    gender: "", //유저성별
    birthDate: "", //유저생년월일
    birthMoon: "", //생년월일 양력,음력,윤달
    birthTime: "", //유저출생시간
    unknown: "", //출생시간 모를때
  });

  /** text type input 이벤트 */
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, id, checked } = e.target;

    if (type === "text" || type === "time") {
      setUserData((prev) => ({
        ...prev,
        [name]: value,
      }));
      return;
    }

    if (type === "radio") {
      setUserData((prev) => ({
        ...prev,
        [name]: id,
      }));
      return;
    }

    if (type === "checkbox") {
      // 체크된 경우
      if (checked) {
        setUserData((prev) => ({
          ...prev,
          birthTime: "",
          unknown: id, // 체크 시 unknown에 값 세팅
        }));
      } else {
        // 체크 해제 시 unknown 초기화
        setUserData((prev) => ({
          ...prev,
          unknown: "",
        }));
      }
      return;
    }
  };

  /** post : gpt api */
  const handleClickEvent = async () => {
    if (!userData.userName || !userData.gender || !userData.birthDate || !userData.birthMoon) {
      alert("빠진정보가 없는지 확인해주세요.")
    }


    try {
      const params = {
        ...userData,
        gender: genderMap[userData.gender],
        birthMoon: birthMoonMap[userData.birthMoon],
      };

      const response = await axios.post("/api/ask", params);

      setAnswerData(response.data.answer);
      setLoading(true);
    } catch (error) {
      console.error("API 요청 중 오류 발생 : ", error);
    }
  };

  /** reset button event */
  const handleClickReset = () => {

    setLoading(false)
    setUserData({
      userName: "", //유저이름
      gender: "", //유저성별
      birthDate: "", //유저생년월일
      birthMoon: "", //생년월일 양력,음력,윤달
      birthTime: "", //유저출생시간
      unknown: "", //출생시간 모를때
    })

  }

  return (
    <div className="flex flex-col flex-1 justify-between items-center">
      <section className="flex flex-col flex-1 w-full max-w-[588px] rounded-[15px]">
        <div className="bg-[#3D3D3D] h-[35px] rounded-t-[15px] flex pl-4 gap-[8px] items-center">
          {ButtonList.map((button) => (
            <span key={button.id} className="w-[13px] h-[13px] rounded-full" style={{ backgroundColor: button.color }} />
          ))}
        </div>

        <div className="bg-white flex-1 rounded-b-[15px] p-3 overflow-scroll">
          {!loading ? (
            <ul>
              {userInfo.map((list) => (
                <li key={list.id} className="text-black">
                  <div className="flex gap-[5px] flex-1">
                    <label className="font-[600]" htmlFor={list.id}>
                      {list.title}
                    </label>
                    <input
                      value={userData[list.name as keyof typeof userData] || ""}
                      className=" border-b-[1px] focus:outline-none "
                      id={list.id}
                      name={list.name}
                      placeholder={list.placeholder}
                      type={list.type}
                      onChange={handleChangeInput}
                      maxLength={list.name === "birthDate" ? 9 : undefined}
                    />
                  </div>

                  {list.child.map((child) => (
                    <div key={child.id} className="flex gap-[5px] flex-1">
                      <label htmlFor={child.id}>{child.title}</label>
                      <input id={child.id} key={child.id} type={child.type} name={child.name} onChange={handleChangeInput} />
                    </div>
                  ))}
                </li>
              ))}
            </ul>
          ) : (
            <Answer answer={answerData} />
          )}

          <div className="border border-black text-black flex rounded ">
            {!loading ? (
              <button onClick={handleClickEvent} className="w-full p-3 hover:bg-[#3D3D3D] hover:text-white">
                GPT에게 물어보기!
              </button>
            ) : (
              <button onClick={handleClickReset} className="w-full p-3 hover:bg-[#3D3D3D] hover:text-white flex items-center justify-center gap-[10px]">
                <RotateCcw />
                <span>다시하기</span>
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BaZi;
