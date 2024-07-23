'use client';
import { useAuth } from "@/hooks/auth";

export default function Farm() {
  const { user } = useAuth({
    middleware: 'auth'
  });

  return (
    <div>
      <h1>FARM</h1>
    </div>
  );
}
