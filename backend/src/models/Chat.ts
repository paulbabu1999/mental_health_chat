import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender: String,
  text: String,
  timestamp: { type: Date, default: Date.now },
});

const chatSchema = new mongoose.Schema({
  userId: String,
  messages: [messageSchema],
});

export const Chat = mongoose.model('Chat', chatSchema);

