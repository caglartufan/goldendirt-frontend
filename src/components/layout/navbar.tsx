'use client';
import { useAuth } from '@/hooks/auth';
import Link from 'next/link';

const LINKS = {
  guest: [
    {
      href: '/about',
      text: 'About',
    },
    {
      href: '/contact',
      text: 'Contact',
    },
  ],
  auth: [
    {
      href: '/farm',
      text: 'Farm',
    },
  ],
};

export function DefaultNavbar() {
  const { user } = useAuth();

  return (
    <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:justify-between md:gap-5 md:text-sm lg:gap-6">
      <Link
        href="/"
        className="flex items-center gap-2 text-lg font-semibold md:text-base"
      >
        {/* <Package2 className="h-6 w-6" />
        <span className="sr-only">Golden Dirt</span> */}
        <h1 className="text-2xl font-semibold uppercase text-nowrap">
          Golden Dirt
        </h1>
      </Link>
      {(typeof user === 'undefined' ? LINKS.guest : LINKS.auth).map(({ href, text }) => (
        <Link
          key={href}
          href={href}
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          {text}
        </Link>
      ))}
      {/* <Link
        href="#"
        className="text-foreground transition-colors hover:text-foreground"
      >
        Settings
      </Link> */}
    </nav>
  );
}

export function DrawerNavbar() {
  const { user } = useAuth();
  
  return (
    <nav className="grid gap-6 text-lg font-medium">
      <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
        {/* <Package2 className="h-6 w-6" />
        <span className="sr-only">Golden Dirt</span> */}
        <h1 className="text-2xl font-extrabold uppercase text-nowrap">
          Golden Dirt
        </h1>
      </Link>
      {(typeof user === 'undefined' ? LINKS.guest : LINKS.auth).map(({ href, text }) => (
        <Link
          key={href}
          href={href}
          className="text-muted-foreground hover:text-foreground"
        >
          {text}
        </Link>
      ))}
      {/* <Link href="#" className="hover:text-foreground">
        Settings
      </Link> */}
    </nav>
  );
}
