'use client';
import { LandsGridView } from '@/components/game/farm/lands/lands-grid-view';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

export default function Farm() {
  const [isTableView, setIsTableView] = useState<boolean>(false);

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
        <LandsGridView />
      </CardContent>
    </Card>
  );
}
