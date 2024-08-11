'use client';
import { useContext, useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { FarmFieldsGridView } from '@/components/game/farm/farm-fields-grid-view';
import { SocketContext } from '@/context/socket';
import { ponged } from '@/lib/socket-handlers/misc';

export default function Farm() {
  const [isTableView, setIsTableView] = useState<boolean>(false);
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (!socket) {
      return;
    }

    // Misc
    socket.on('misc:pong', ponged);

    return () => {
      // Misc
      socket.off('misc:pong', ponged);
    };
  }, [socket]);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Farm</CardTitle>
          <div className="flex items-center space-x-2">
            <Label htmlFor="airplane-mode">Table view</Label>
            <Switch id="airplane-mode" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <FarmFieldsGridView />
      </CardContent>
    </Card>
  );
}
