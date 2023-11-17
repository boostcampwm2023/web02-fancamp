import { useState } from 'react';
import { Message } from './ChatBox';

type Props = {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};

export default function ChatBoxInputBar({ setMessages }: Props) {
  const [inputText, setInputText] = useState('');

  const handleInputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMessage = {
      messageId: Math.random(),
      isMasterMessage: false,
      time: '오후 4:00',
      text: inputText,
    };
    setMessages((prev) => [...prev, newMessage]);
    setInputText('');
  };

  return (
    <form onSubmit={handleMessageSubmit} className="flex rounded-full border">
      <input
        className="w-full rounded-full"
        onChange={handleInputTextChange}
        value={inputText}
        placeholder="메세지 입력..."
      />
      <button className="" type="submit">
        전송
      </button>
    </form>
  );
}
