'use client';
import { Button } from '@/components/ui/button';
import axios from '@/lib/axios';

export default function Home() {
  const clickHandler = async () => {
    const res = await axios.get('/');
    console.log(res.data);
  };

  return <Button className="w-min" onClick={clickHandler}>Test me!</Button>;
}
