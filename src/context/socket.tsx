'use client';
import { createContext, useEffect, useState } from 'react';
import { type Socket, io } from 'socket.io-client';
import { onConnect, onDisconnect } from '@/lib/socket-handlers/connection';
import { handleConnectError, handleError } from '@/lib/socket-handlers/error';

export const SocketContext = createContext<Socket | null>(null);

export const SocketContextProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SOCKETIO_URL;

    if (!url) {
      throw new Error(
        'Could not establish connection with Socket.io server because URL was not defined as an environment variable!'
      );
    }

    const socketInstance = io(url, {
      withCredentials: true,
    });

    // Connection
    socketInstance.on('connect', onConnect);
    socketInstance.on('disconnect', onDisconnect);

    // Error handling
    socketInstance.on('connect_error', handleConnectError);
    socketInstance.on('error', handleError);

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
