'use client';
import { Button } from '@/components/ui/button';
import axios from '@/lib/axios';

export default function Home() {
  const clickHandler = async () => {
    const res = await axios.get('/');
    console.log(res.data);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button onClick={clickHandler}>Test me!</Button>
    </main>
  );
}
