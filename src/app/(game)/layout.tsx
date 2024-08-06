'use client';
import WelcomeAlert from '@/components/alerts/welcome';
import StatsBar from '@/components/layout/stats-bar';
import { SocketContextProvider } from '@/context/socket';
import { useAuth } from '@/hooks/auth';

export default function GameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useAuth({
    middleware: 'auth'
  });
  const isWelcomed = false;

  return (
    <SocketContextProvider>
      <StatsBar />
      {!isWelcomed && <WelcomeAlert className="mb-6" />}
      <div>{children}</div>
    </SocketContextProvider>
  );
}
