import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";


const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

if (!apiKey) {
  console.error("❌ Missing OPENAI_API_KEY environment variable!");
}

const openai = new OpenAI({ apiKey });

export async function POST(req: NextRequest) {
  const body = await req.json(); // JSON 본문 파싱
  const { userName, gender, birthDate, birthMoon, birthTime, unknown } = body;

  const systemPrompt = `
    당신은 뛰어난 사주 전문가 입니다.
    사용자가 입력한 정보를 바탕으로 사주팔자를 분석해 주세요.
    사용자가 입력한 정보는 다음과 같습니다
    이름: ${userName}
    성별: ${gender}
    생년월일: ${birthDate} (${birthMoon})
    출생시간: ${unknown ? "모름" : birthTime} 입니다.
    위 정보를 기반으로 사주팔자를 분석해 주세요.

    단, 결과는 아래 형식의 JSON으로만 출력해주세요.

    {
      "summary": ${userName}님의 사주요약입니다. "한문장으로 전체 사주에대한 요약을 적어줘." ,
      "personality": "성격에 대한 사주내용을 좀 더 구체적으로 자세히 적어줘.",
      "wealth": "재물운에 대한 사주내용을 좀 더 구체적으로 자세히 적어줘.",
      "romanticFortune": "연애운에 대한 사주내용을 좀 더 구체적으로 자세히 적어줘.",
      "relationship": "인간관계에 대한 사주내용을 좀 더 구체적으로 자세히 적어줘.",
      "career": "직업운에 대한 사주내용을 좀 더 구체적으로 자세히 적어줘.",
      "yinYangFiveElements": "음양오행에대한 사주내용을 좀 더 구체적으로 자세히 적어줘."
    }

    JSON 외의 문장은 절대 포함하지 마세요.
  `;

  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: systemPrompt },
    // ...history.map((h: any) => ({ role: "user", content: h.question })),
    // ...history.map((h: any) => ({ role: "assistant", content: h.answer })),
    // { role: "user", content: question },
  ];

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
    temperature: 0.7,
  });

  const raw = completion.choices[0].message.content ?? "";

  // GPT가 보낸 문자열을 객체로 변환
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    console.error("JSON 파싱 실패:", err);
    parsed = { error: "invalid json format", raw };
  }

  return NextResponse.json({ answer: parsed });
}
