/**
 * userData변경에 필요한 기능로직
 */

import { useUserStore } from "../../store/userDataStore";

export const useUserFormHandlers = () => {
    const {  setUserData } = useUserStore()

  /** text type input 이벤트 */
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    switch (type) {
      case "text": // 이름
      case "date": // 생년월일
        setUserData({
          [name]: value,
        });
        return;

      case "time": // 출생시간
        setUserData({
          [name]: value,
          unknown: false,
        });
        return;

      case "checkbox": // 출생시간 모름
        if (checked) {
          setUserData({
            [name]: true,
            birthTime: "",
          });
        } else {
          setUserData({
            [name]: false,
          });
        }
        return;
    }
  };

  const handleSelectOptions = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    // 양력 / 음력 / 윤달
    if (["solar", "lunar", "leap"].includes(value)) {
      setUserData({
        birthMoon: value as "solar" | "lunar" | "leap",
      });
      return;
    }

    // 성별
    if (["male", "female"].includes(value)) {
      setUserData({
        gender: value as "male" | "female",
      });
    }
  };

  return{handleChangeInput , handleSelectOptions}
}