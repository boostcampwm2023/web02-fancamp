import { useState, useEffect } from 'react';
import { Notice } from '@type/api/notice';
import { useLocation, useParams } from 'react-router-dom';
import { Auth } from '@type/api/auth';
import { Socket } from 'socket.io-client';
import { CHAT_NOTICE, POST_NOTICE } from '@constants/localStorageKeys';

export default function useNoticeSocket(socket: Socket, auth: Auth | null) {
  const storedChatNotices: string[] = JSON.parse(
    localStorage.getItem(CHAT_NOTICE) || '[]'
  );
  const storedPostNotices: string[] = JSON.parse(
    localStorage.getItem(POST_NOTICE) || '[]'
  );
  const [campsWithChatNotice, setCampsWithChatNotice] =
    useState<string[]>(storedChatNotices);
  const [campsWithPostNotice, setCampsWithPostNotice] =
    useState<string[]>(storedPostNotices);
  const { campId } = useParams();
  const { pathname } = useLocation();

  const onNotice = (notice: Notice) => {
    const { type, campName } = notice;
    if (type === 'chat' && !campsWithChatNotice.includes(campName)) {
      const newChatNotices = [...campsWithChatNotice, campName];
      setCampsWithChatNotice(newChatNotices);
      localStorage.setItem(
        CHAT_NOTICE,
        JSON.stringify([...new Set(newChatNotices)])
      );
      return;
    }
    if (type === 'post' && !campsWithPostNotice.includes(campName)) {
      const newPostNotices = [...campsWithPostNotice, campName];
      setCampsWithPostNotice(newPostNotices);
      localStorage.setItem(
        POST_NOTICE,
        JSON.stringify([...new Set(newPostNotices)])
      );
    }
  };

  useEffect(() => {
    (function connectSocketOnMount() {
      if (!auth || auth.isMaster) {
        return;
      }

      socket.connect();
      socket.emit('login', { publicId: auth?.publicId });
      socket.on('notice', onNotice);

      return () => {
        socket.off('connect');
        socket.off('notice', onNotice);
        socket.disconnect();
      };
    })();
  }, []);

  const removeChatNotice = () => {
    if (campId && campsWithChatNotice.includes(campId)) {
      const filteredChatNotices = campsWithChatNotice.filter(
        (campName) => campName !== campId
      );
      setCampsWithChatNotice(filteredChatNotices);
      localStorage.setItem(
        CHAT_NOTICE,
        JSON.stringify([...new Set(filteredChatNotices)])
      );
    }
  };
  const removePostNotice = () => {
    if (campId && campsWithPostNotice.includes(campId)) {
      const filteredPostNotices = campsWithPostNotice.filter(
        (campName) => campName !== campId
      );
      setCampsWithPostNotice(filteredPostNotices);
      localStorage.setItem(
        POST_NOTICE,
        JSON.stringify([...new Set(filteredPostNotices)])
      );
    }
  };

  useEffect(() => {
    (function removeNoticeOnRoutes() {
      if (pathname.endsWith('post')) {
        removePostNotice();
      }
      if (pathname.endsWith('chat')) {
        removeChatNotice();
      }
    })();
  }, [pathname]);

  return { campsWithChatNotice, campsWithPostNotice };
}
