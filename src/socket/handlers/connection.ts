'use client';
import { Socket } from 'socket.io-client';

export function onConnect(this: Socket) {
  const socket = this;
  console.log('Socket ID:', socket.id);
  socket.emit('misc:ping');
}

export function onDisconnect() {
  console.log('Disconneted!');
}
