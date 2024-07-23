import WelcomeAlert from "@/components/alerts/welcome";
import StatsBar from "@/components/layout/stats-bar";

export default function GameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isWelcomed = false;
  
  return (
    <>
      <StatsBar />
      {!isWelcomed && <WelcomeAlert className="mb-6" />}
      <div>
        {children}
      </div>
    </>
  );
}