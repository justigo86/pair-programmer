"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HeartHandshakeIcon, LogInIcon, LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

function AccountDropdown() {
  const session = useSession();
  // const isLoggedId = !!session.data;
  //cast to boolean

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" className="text-lg">
          <Avatar className="mr-2 h-8 w-8">
            <AvatarImage src={session.data?.user?.image ?? ""} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {session.data?.user?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() =>
            signOut({
              callbackUrl: "/",
              // any page in which the user signs out will send home - prevents errors
            })
          }
        >
          <LogOutIcon className="mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Header() {
  const session = useSession();

  return (
    <header className="bg-gray-200 dark:bg-gray-900 py-4 container mx-auto">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl hover:underline"
        >
          <HeartHandshakeIcon />
          PairProgrammer
        </Link>
        <div className="flex items-center gap-2">
          {session.data && ( //if user is signed in - account button
            <AccountDropdown />
          )}
          {!session.data && ( //if user is not signed in - sign in button
            <Button variant="link" onClick={() => signIn()}>
              <LogInIcon />
              Sign In
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
