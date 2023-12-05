import useAuth from '@hooks/useAuth';
import { useState, useEffect } from 'react';
import { CHAT_MESSAGE_MAX_LENGTH } from '@constants/chat';
import { Message } from '@type/api/chat';

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
  const { auth } = useAuth();
  const { chatName } = auth!;
  const [inputText, setInputText] = useState('');
  const [isInputValidated, setIsInputValidated] = useState(false);

  const handleInputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  useEffect(() => {
    const text = inputText.trim();
    if (text.length > 0 && text.length <= CHAT_MESSAGE_MAX_LENGTH) {
      setIsInputValidated(true);
      return;
    }
    setIsInputValidated(false);
  }, [inputText]);

  const handleMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isInputValidated) {
      return;
    }

    onSubmitMessage(inputText);
    const newMessage = {
      chatId: -(messages.length + 1), // 클라이언트 단에서 쓰이는 임시 id
      isMyMessage: true,
      createdAt: String(new Date()),
      stringContent: inputText,
      profileImage: '',
      chatName,
    };
    setMessages((prev) => [...prev, newMessage]);
    setInputText('');
  };

  return (
    <form onSubmit={handleMessageSubmit} className="flex border">
      <input
        name="inputText"
        className="w-full bg-contour-primary p-4 display-regular-16"
        onChange={handleInputTextChange}
        value={inputText}
        placeholder="메세지를 보내보세요! 😁"
      />
      <button
        className="w-[5rem] border-l bg-point-yellow p-2 display-regular-14 disabled:bg-text-secondary"
        type="submit"
        disabled={!isInputValidated}
      >
        전송
      </button>
    </form>
  );
}
