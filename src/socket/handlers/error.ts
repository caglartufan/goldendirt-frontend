'use client';
import { Socket } from 'socket.io-client';

export function handleError(error: any) {
  console.log('An error occured over the socket session!', error);
}

export function handleConnectError(this: Socket, error: Error) {
  const socket = this;
  const description = 'description' in error ? error.description : undefined;

  console.log('Connect error:', error);
  if (description === 403) {
    if (socket.connected) {
      socket.disconnect();
    }
    console.log(
      'Socket.io connection failed due to no API token being sent to the server.'
    );
  }
}
