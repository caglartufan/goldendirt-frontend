'use client';
import WelcomeAlert from '@/components/alerts/welcome';
import StatsBar from '@/components/layout/stats-bar';
import { useEffect, useState } from 'react';
import { socket } from '../../socket';

export default function GameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isWelcomed = false;

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onError(error: any) {
      console.log('ERROR OCCURED', error);
    }

    function onConnectError(error: Error) {
      console.log('Connect error:', error);
      const description =
        'description' in error ? error.description : undefined;
      if (description === 403) {
        socket.disconnect();
        console.log(
          'Socket.io connection failed due to np API token being sent to the server.'
        );
      }
    }

    function onConnect() {
      console.log('Socket ID:', socket.id);
      socket.emit('ping');
    }

    function onPong(username: string) {
      console.log(username + ' ponged!');
    }

    function onDisconnect() {
      console.log('Disconneted!');
    }

    socket.on('connect', onConnect);
    socket.on('error', onError);
    socket.on('connect_error', onConnectError);
    socket.on('pong', onPong);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('error', onError);
      socket.off('connect_error', onConnectError);
      socket.off('pong', onPong);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return (
    <>
      <StatsBar />
      {!isWelcomed && <WelcomeAlert className="mb-6" />}
      <div>{children}</div>
    </>
  );
}
