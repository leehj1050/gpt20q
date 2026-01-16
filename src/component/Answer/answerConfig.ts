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
    { title: "🌅 오늘의 기운", content: answerData?.data.energy },
    { title: "💡 오늘 하면 좋은 일", content: answerData?.data.do },
    { title: "🚫 오늘 피해야 할 것", content: answerData?.data.avoid },
    { title: "🍀 행운 포인트", content: answerData?.data.lucky },
    { title: "🧘 오늘의 조언", content: answerData?.data.advice },
  ],

  newyear: (answerData) => [
    { title: "🔮 신년운세 요약", content: answerData?.data.summary },
    { title: "🌱 1월", content: answerData?.data.jan },   // 시작, 새출발
    { title: "💰 2월", content: answerData?.data.feb },   // 재물, 현실
    { title: "🌿 3월", content: answerData?.data.mar },   // 성장, 기운 상승
    { title: "💞 4월", content: answerData?.data.apr },   // 사랑, 인간관계
    { title: "💼 5월", content: answerData?.data.may },   // 일, 커리어
    { title: "☀️ 6월", content: answerData?.data.jun },   // 에너지, 전환점
    { title: "🔥 7월", content: answerData?.data.jul },   // 열정, 피크
    { title: "🌊 8월", content: answerData?.data.aug },   // 흐름, 감정
    { title: "🍂 9월", content: answerData?.data.sep },   // 정리, 수확
    { title: "⚖️ 10월", content: answerData?.data.oct },  // 균형, 판단
    { title: "🧘 11월", content: answerData?.data.nov },  // 성찰, 내면
    { title: "🎁 12월", content: answerData?.data.dec },  // 마무리, 보상
    ],
  match: (answerData) => [
    { title: "🎉 신년 총운", content: answerData?.data.summary },
    { title: "💰 재물 흐름", content: answerData?.data.wealth },
    { title: "💼 직업 변화", content: answerData?.data.career },
  ]
};


