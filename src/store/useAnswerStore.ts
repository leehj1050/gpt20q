import { create } from "zustand";

interface AnswerData {
  summary: string;
  personality: string;
  wealth: string;
  relationship: string;
  romanticFortune: string;
  career: string;
  yinYangFiveElements: string;
}

type AnswerStore = {
  answerData: AnswerData | null;

  setAnswerData: (data: AnswerData) => void;
  clearAnswerData: () => void;
};


export const useAnswerStore = create<AnswerStore>((set) => ({
  answerData: null,

  setAnswerData: (data) =>
    set({
      answerData: data,
    }),

  clearAnswerData: () =>
    set({
      answerData: null,
    }),
}));