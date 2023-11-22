import { io } from 'socket.io-client';

export const socket = io('/chat', { autoConnect: false });
