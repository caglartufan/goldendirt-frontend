'use client';
import { createContext, useEffect, useMemo, useState } from 'react';
import { type Socket, io } from 'socket.io-client';
import { onConnect, onDisconnect } from '@/lib/socket-handlers/connection';
import { handleConnectError, handleError } from '@/lib/socket-handlers/error';

export const SocketContext = createContext<Socket | null>(null);

export const SocketContextProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const contextValue = useMemo(() => socket, [socket]);
  const url = process.env.NEXT_PUBLIC_SOCKETIO_URL;

  useEffect(() => {
    if (!url) {
      // TODO: Show an alert component for this case and for other socket-related events to inform the user.
      console.error(
        'Could not establish connection with Socket.io server because URL was not defined as an environment variable!'
      );
      return;
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

    // Clean up function, when user leaves the context.
    // In this case, (game) sub-route.
    return () => {
      socketInstance.off('connect', onConnect);
      socketInstance.off('disconnect', onDisconnect);
      socketInstance.off('connect_error', handleConnectError);
      socketInstance.off('error', handleError);

      // Disconenct client
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};
