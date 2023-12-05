import { useState, useEffect } from 'react';
import { Notice } from '@type/api/notice';
import { useLocation, useParams } from 'react-router-dom';
import { Auth } from '@type/api/auth';
import { Socket } from 'socket.io-client';

export default function useNoticeSocket(socket: Socket, auth: Auth | null) {
  const [campsWithChatNotice, setCampsWithChatNotice] = useState<string[]>([]);
  const [campsWithPostNotice, setCampsWithPostNotice] = useState<string[]>([]);
  const { campId } = useParams();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!auth || auth.isMaster) {
      return;
    }

    function onNotice(notice: Notice) {
      const { type, campName } = notice;
      if (type === 'chat' && !campsWithChatNotice.includes(campName)) {
        setCampsWithChatNotice((prev) => [...prev, campName]);
        return;
      }
      if (type === 'post' && !campsWithPostNotice.includes(campName)) {
        setCampsWithPostNotice((prev) => [...prev, campName]);
      }
    }

    socket.connect();
    socket.emit('login', { publicId: auth?.publicId });
    socket.on('notice', onNotice);

    return () => {
      socket.off('connect');
      socket.off('notice', onNotice);
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (pathname.endsWith('post')) {
      removePostNotice();
    }
    if (pathname.endsWith('chat')) {
      removeChatNotice();
    }

    function removeChatNotice() {
      if (campId && campsWithChatNotice.includes(campId)) {
        setCampsWithChatNotice((prev) =>
          prev.filter((campName) => campName !== campId)
        );
      }
    }
    function removePostNotice() {
      if (campId && campsWithPostNotice.includes(campId)) {
        setCampsWithPostNotice((prev) =>
          prev.filter((campName) => campName !== campId)
        );
      }
    }
  }, [pathname]);

  return { campsWithChatNotice, campsWithPostNotice };
}
