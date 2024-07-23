'use client';
import { useState } from 'react';
import { Sprout } from 'lucide-react';

import { Alert } from '../ui/alert';

export default function WelcomeAlert({ className }: Readonly<{ className?: string; }>) {
  const [dismissed, setDismissed] = useState<boolean>(false);

  const handleDissmis = () => {
    setDismissed(true);
  };

  if (dismissed) {
    return;
  }

  return (
    <Alert
      variant="successive"
      className={className}
      icon={<Sprout />}
      title="Welcome to Golden Dirt!"
      description={
        <>
          <p>
            It's good to see new faces around here! This is your farm, your
            home.
          </p>
          <p>
            It seems that your farm needs a little bit of cleaning. Let's get
            started!
          </p>
        </>
      }
      onDismiss={handleDissmis}
      dismissable
    />
  );
}
