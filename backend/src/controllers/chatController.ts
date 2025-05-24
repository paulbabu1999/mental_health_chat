import { Request, Response } from 'express';
import { User } from '../models/User';
import { Chat } from '../models/Chat';
import { getChatCompletion } from '../services/openaiService';

export const startChat = async (req: Request, res: Response) => {
  console.log('Starting chat');
  const { name, phone } = req.body;
  //const user = await User.create({ name, phone });
  res.json({ message: 'Chat started' });
};

export const getChat = async (req: Request, res: Response) => {
  console.log('Getting chat');
  //const user = await User.create({ name, phone });
  res.json({ message: 'Chat started' });
};

export const sendMessage = async (req: Request, res: Response) => {
  const { userId, message } = req.body;

  // Save message
  let chat = await Chat.findOne({ userId });
  if (!chat) chat = new Chat({ userId, messages: [] });
  chat.messages.push({ sender: 'user', text: message });

  // Get bot response
  const context = chat.messages
    .map((m) => ({
      role: m.sender === 'user' ? 'user' as 'user' : 'assistant' as 'assistant',
      content: m.text,
    }))
    .filter((m): m is { role: 'user' | 'assistant'; content: string } => m.content !== null && m.content !== undefined);
  const reply = await getChatCompletion(context);

  chat.messages.push({ sender: 'bot', text: reply });
  await chat.save();

  res.json({ reply });
};

export const endChat = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const chat = await Chat.findOne({ userId });
  if (!chat) return res.status(404).json({ error: 'Chat not found' });

  const summary = await getChatCompletion([
    { role: 'system', content: 'Summarize the following conversation:' },
    ...chat.messages
      .filter(m => typeof m.text === 'string')
      .map(m => ({
        role: m.sender === 'user' ? 'user' as 'user' : 'assistant' as 'assistant',
        content: m.text as string,
      })),
  ]);

  await User.update({ summary }, { where: { phone: userId } });

  res.json({ summary });
};
