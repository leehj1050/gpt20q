import { SajuType } from "@/app/types";
import { create } from "zustand";


export interface AnswerData {
  category: SajuType | null;
  data: {
    //사주팔자타입
    summary?: string;
    personality?: string;
    wealth?: string;
    relationship?: string;
    romanticFortune?: string;
    career?: string;
    yinYangFiveElements?: string;
    //신년운세타입
    jan?: string;
    feb?: string;
    mar?: string;
    apr?: string;
    may?: string;
    jun?: string;
    jul?: string;
    aug?: string;
    sep?: string;
    oct?: string;
    nov?: string;
    dec?: string;
    //오늘의운세타입
    energy?: string;
    do?: string;
    avoid?: string;
    lucky?: string;
    advice?: string;
    //궁합타입
  };
}


type AnswerStore = {
  answerData: AnswerData | null;
  setAnswerData: (data: AnswerData) => void;
  resetAnswerData: () => void;
};


export const useAnswerStore = create<AnswerStore>((set) => ({
  answerData: null,

  setAnswerData: (data) =>
    set({
      answerData: data,
    }),

  resetAnswerData: () =>
    set({
      answerData: null,
    }),
}));