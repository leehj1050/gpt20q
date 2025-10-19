import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });

export async function POST(req: any, res: any) {
  const request = await req.json();
  const { question, secret, history } = request;

  const systemPrompt = `
  너는 지금 스무고개 게임의 진행자야.
  정답은 "${secret}"이야. 사용자는 스무번의 질문을 할 수 있어.
  사용자가 질문을 하면 답변해줘. 그리고 추가로 몇번 질문했는지 횟수도 알려줘.
  단, 정답을 직접 언급하거나 힌트를 노골적으로 주면 안 돼.
  `;

  const messages: any = [
    { role: "system", content: systemPrompt },
    ...history.map((h: any) => ({ role: "user", content: h.question })),
    ...history.map((h: any) => ({ role: "assistant", content: h.answer })),
    { role: "user", content: question },
  ];

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
    temperature: 0.7,
  });

  return NextResponse.json({ answer: completion.choices[0].message.content });
}
