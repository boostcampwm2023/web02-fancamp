import { SOCKET_BASE_URL } from '@constants/URLs';
import { io } from 'socket.io-client';

export const chatSocket = io(`${SOCKET_BASE_URL}/chat`, { autoConnect: false });