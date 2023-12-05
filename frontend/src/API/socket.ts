import { SOCKET_BASE_URL } from '@constants/URLs';
import { io } from 'socket.io-client';

export const chatSocket = io(`${SOCKET_BASE_URL}/chat`, { autoConnect: false });
export const commentSocket = io(`${SOCKET_BASE_URL}/comment`, {
  autoConnect: false,
});
export const postSocket = io(`${SOCKET_BASE_URL}/post`, {
  autoConnect: false,
});
export const noticeSocket = io(`${SOCKET_BASE_URL}/notice`, {
  autoConnect: false,
});
