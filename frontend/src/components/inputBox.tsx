import React, { useState } from 'react';

interface Props {
  onSend: (text: string) => void;
}

const InputBox: React.FC<Props> = ({ onSend }) => {
  const [text, setText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText('');
  };

  return (
    <form onSubmit={handleSend} className="input-box">
      <input
        type="text"
        value={text}
        placeholder="Type your message..."
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default InputBox;
