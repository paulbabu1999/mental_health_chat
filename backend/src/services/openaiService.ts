import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export const getChatCompletion = async (messages: { role: 'user' | 'assistant' | 'system', content: string }[]) => {
  const res = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages,
  });

  return res.choices[0]?.message?.content || 'No response';
};
