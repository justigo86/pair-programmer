"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function AccountDropdown() {
  const session = useSession();
  const isLoggedId = !!session.data;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger> {session.data?.user?.name}</DropdownMenuTrigger>
      <DropdownMenuContent>
        {session.data ? (
          <DropdownMenuItem onClick={() => signOut()}>
            Sign Out
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => signIn("google")}>
            Sign In
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Header() {
  const session = useSession();

  return (
    <header className="bg-gray-50 dark:bg-gray-900 py-4 container mx-auto">
      <div className="flex items-center justify-between">
        <div>LOGO</div>
        <div>
          <AccountDropdown />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
