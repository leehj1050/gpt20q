import { create } from "zustand";


export type UserData = {
  userName: string;     // 유저 이름
  gender: "male" | "female";
  birthDate: string;   // 생년월일
  birthMoon: "solar" | "lunar" | "leap";
  birthTime: string;   // 출생 시간
  unknown: boolean;    // 출생시간 모름 여부
};

type UserStore = {
  userData: UserData;

  setUserData: (data: Partial<UserData>) => void;
  resetUserData: () => void;
};


export const useUserStore = create<UserStore>((set) => ({
  userData: {
    userName: "",
    gender: "male",
    birthDate: "",
    birthMoon: "solar",
    birthTime: "",
    unknown: false,
  },

  // 부분 업데이트
  setUserData: (data) =>
    set((state) => ({
      userData: {
        ...state.userData,
        ...data,
      },
    })),

  // 초기화
  resetUserData: () =>
    set({
      userData: {
        userName: "",
        gender: "male",
        birthDate: "",
        birthMoon: "solar",
        birthTime: "",
        unknown: false,
      },
    }),
}));
