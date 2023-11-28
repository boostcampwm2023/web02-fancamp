import { useState } from 'react';
import { Message } from './ChatBox';

type Props = {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  onSubmitMessage: (message: string) => void;
};

export default function ChatBoxInputBar({
  messages,
  setMessages,
  onSubmitMessage,
}: Props) {
  const [inputText, setInputText] = useState('');

  const handleInputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputText.trim().length === 0) {
      return;
    }

    onSubmitMessage(inputText);
    const newMessage = {
      chatId: messages.length + 1,
      isMyMessage: true,
      createdAt: String(new Date()),
      stringContent: inputText,
    };
    setMessages((prev) => [...prev, newMessage]);
    setInputText('');
  };

  return (
    <form onSubmit={handleMessageSubmit} className="flex border border-border">
      <input
        className="w-full bg-contour-primary p-4 display-regular-16"
        onChange={handleInputTextChange}
        value={inputText}
        placeholder="메세지를 보내보세요! 😁"
      />
      <button
        className="bg-contour-primary p-2"
        type="submit"
        aria-label="submit your message"
      >
        <img src="/SubmitMessageIcon.png" />
      </button>
    </form>
  );
}
