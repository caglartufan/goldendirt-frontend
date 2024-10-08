'use client';
import { BadgeCent, Gift, Star } from 'lucide-react';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { useAuth } from '@/hooks/auth';

export default function StatsBar() {
  const { user } = useAuth({
    middleware: 'auth'
  });

  if(!user) {
    return;
  }

  return (
    <div className="flex justify-between mb-2">
      <div className="flex bg-muted border ps-3 py-1 rounded-md shadow-sm overflow-hidden">
        <span className="font-medium">Gold</span>
        <div className="flex items-center px-2 align-top text-gold">
          <span className="inline-block font-bold me-1">{user.golds}</span>
          <BadgeCent className="inline-block h-4 w-4" />
        </div>
      </div>
      <div className="flex bg-muted border rounded-md shadow-sm overflow-hidden">
        <div className="flex border-e px-2 py-1">
          <span className="text-2xl leading-6 font-extrabold inline-block text-sky-400">
            {user.level}
          </span>
          <Star className="w-6 h-6 text-sky-400 fill-sky-400" />
        </div>
        <div className="flex flex-col justify-center px-2 border-e">
          <span className="text-xs font-medium">
            {user.current_xp}/{user.xp_required_for_next_level}
          </span>
          <Progress
            value={Math.floor(user.current_xp / user.xp_required_for_next_level * 100)}
            className="w-[200px] h-2 bg-sky-200"
            indicatorClassName="bg-sky-400"
          />
        </div>
        <Button
          size="icon"
          variant="link"
          className="h-full w-auto px-2 hover:bg-sky-100 rounded-s-none"
        >
          <Gift className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
