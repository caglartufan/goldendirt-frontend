'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CircleUser } from 'lucide-react';
import { useAuth } from '@/hooks/auth';

function AuthButtons() {
  return (
    <>
      <Button size="sm" asChild>
        <Link href="/sign-in">Sign In</Link>
      </Button>
      <Button size="sm" asChild>
        <Link href="/sign-up">Sign Up</Link>
      </Button>
    </>
  );
}

function UserDropdown({
  user,
  onLogout,
}: Readonly<{
  user: User;
  onLogout: () => void;
}>) {
  const logoutHandler = () => {
    onLogout();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logoutHandler}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function NavbarLeftPortion() {
  const { user, logout } = useAuth();

  console.log(user);

  if (user) {
    return <UserDropdown user={user} onLogout={logout} />;
  }

  return <AuthButtons />;
}
