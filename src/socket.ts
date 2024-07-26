'use client';
import { io } from 'socket.io-client';

const url = process.env.NEXT_PUBLIC_SOCKETIO_URL as string;

export const socket = io(url);