import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { systemPrompt } from "./promptConfig";


const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || process.env.OPENAI_API_KEY || "";

if (!apiKey) {
  console.error("❌ Missing OPENAI_API_KEY environment variable!");
}

const openai = new OpenAI({ apiKey });

export const POST = async(req: NextRequest)=> {
  const body = await req.json(); // JSON 본문 파싱
  const { type, ...userData } = body;

  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: systemPrompt(type,userData)},
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
