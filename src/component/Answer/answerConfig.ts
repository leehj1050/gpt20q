import { AnswerData } from "@/store/useAnswerStore";

export type Section = {
  title: string;
  content?: string;
};

export const SECTION_CONFIG: Record<string, (answerData: AnswerData | null) => Section[]> = {
  saju: (answerData) => [
    { title: "🔮 사주 전체 요약", content: answerData?.data.summary },
    { title: "🌿 성격", content: answerData?.data.personality },
    { title: "💰 재물운", content: answerData?.data.wealth },
    { title: "👥 인간관계", content: answerData?.data.relationship },
    { title: "💞 연애운", content: answerData?.data.romanticFortune },
    { title: "💼 직업운", content: answerData?.data.career },
    { title: "☯️ 음양오행", content: answerData?.data.yinYangFiveElements },
  ],

  today: (answerData) => [
    { title: "📅 오늘의 운세", content: answerData?.data.summary },
    { title: "💡 오늘의 조언", content: answerData?.data.career },
  ],

  newyear: (answerData) => [
    { title: "🔮 신년운세 요약", content: answerData?.data.summary },
    { title: "🌿 1월", content: answerData?.data.jan },
    { title: "💰 2월", content: answerData?.data.feb },
    { title: "👥 3월", content: answerData?.data.mar },
    { title: "💞 4월", content: answerData?.data.apr },
    { title: "💼 5월", content: answerData?.data.may },
    { title: "☯️ 6월", content: answerData?.data.jun },
    { title: "☯️ 7월", content: answerData?.data.jul },
    { title: "☯️ 8월", content: answerData?.data.aug },
    { title: "☯️ 9월", content: answerData?.data.sep },
    { title: "☯️ 10월", content: answerData?.data.oct },
    { title: "☯️ 11월", content: answerData?.data.nov },
    { title: "☯️ 12월", content: answerData?.data.dec },
    ],
  match: (answerData) => [
    { title: "🎉 신년 총운", content: answerData?.data.summary },
    { title: "💰 재물 흐름", content: answerData?.data.wealth },
    { title: "💼 직업 변화", content: answerData?.data.career },
  ]
};


