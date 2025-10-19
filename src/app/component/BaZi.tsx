"use client";
import axios from "axios";
import React, { ReactHTMLElement, useState } from "react";
import { ButtonList, userInfo } from "./config";



const BaZi = () => {
  const [userName, setUserName] = useState("")
  const [userGender, setUserGender] = useState("")
  const [userBirth, setUserBirth] = useState("")
  const [optionBirth, setOptionBirth] = useState("양력")
  const [userBirthTime, setUserBirthTime] = useState("")

  const [userData, setUserData] = useState({
    userName: "",
    gender: "",
    birthDate: "",
    birthTime: "",
    birthMoon: "",
    unknown: ""
  });


  /** text type input 이벤트 */
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));

  }

  /** check box type input 이벤트 */
  const handleChangeCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, checked } = e.target
    if (checked) {


    }

  }



  const handleClickEvent = async () => {

    console.log('user >> ', userData)

    try {
      const params = {
        name: userName,
        gender: userGender,
        birthday: userBirth,
        optionBirth,
        userBirthTime
      };
      // const response = await axios.post("/api/ask", params);


    } catch (error) {
      console.error("API 요청 중 오류 발생 : ", error);


    }
  };





  return (
    <div className="flex flex-col flex-1 justify-between items-center">
      <section className="flex flex-col flex-1 w-full max-w-[588px] rounded-[15px]">
        <div className="bg-[#3D3D3D] h-[35px] rounded-t-[15px] flex pl-4 gap-[8px] items-center">
          {ButtonList.map((button) => (
            <span key={button.id} className="w-[13px] h-[13px] rounded-full" style={{ backgroundColor: button.color }} />
          ))}
        </div>

        <div className="bg-white flex-1 rounded-b-[15px] p-3">
          <ul>
            {userInfo.map((list) => (
              <li key={list.id} className="text-black">
                <div className="flex gap-[5px] flex-1">
                  <label className="font-[600]" htmlFor={list.id}>{list.title} : </label>
                  <input value={userData[list.name as keyof typeof userData] || ""}
                    className=" border-b-[1px] focus:outline-none "
                    id={list.id}
                    name={list.name}
                    placeholder={list.placeholder}
                    type={list.type}
                    onChange={handleChangeInput} />
                </div>

                {list.child.map((child) => (
                  <div key={child.id} className="flex gap-[5px] flex-1">
                    <label htmlFor={child.id}>{child.title}</label>
                    <input id={child.id} key={child.id} type={child.type} name={child.name} onChange={handleChangeCheckBox} />
                  </div>
                ))}

              </li>
            ))}
          </ul>

          <div className="border border-black text-black flex rounded ">
            <button onClick={handleClickEvent} className="w-full p-3 hover:bg-[#3D3D3D] hover:text-white">GPT에게 물어보기!</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BaZi;
