"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  DeleteIcon,
  HeartHandshakeIcon,
  LogInIcon,
  LogOutIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { deleteAccountAction } from "./actions";
// import { deleteRoomAction } from "./your-rooms/actions";

function AccountDropdown() {
  const session = useSession();
  // const isLoggedId = !!session.data;
  // cast to boolean
  const [open, setOpen] = useState(false);

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and any data associated with it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                //delete account
                await deleteAccountAction();
                signOut({ callbackUrl: "/" });
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
            className="cursor-pointer"
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
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              setOpen(true);
            }}
          >
            <DeleteIcon className="mr-2" />
            Delete Account
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

function HamburgerMenu() {
  const [open, setOpen] = useState(false);

  return (
    <section className="MOBILE-MENU flex flex-col md:hidden">
      <div>
        <div>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </Button>
          <ul className="NAVIGATION-MOBILE-OPEN flex flex-col gap-2">
            <li>
              <Link href="/" className="flex hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href={"/browse"}>
                Browse
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href={"/your-rooms"}>
                Your Rooms
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Header() {
  const session = useSession();
  const isLoggedId = !!session.data;

  return (
    <header className="bg-gray-200 dark:bg-transparent py-4 z-10 relative">
      <div className="container mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="hidden md:flex items-center gap-2 text-xl hover:underline"
        >
          <HeartHandshakeIcon />
          PairProgrammer
        </Link>

        <HamburgerMenu />

        <nav className="hidden md:flex gap-8">
          {isLoggedId && (
            <>
              <Link className="hover:underline" href={"/browse"}>
                Browse
              </Link>

              {/* should only show if user is logged in */}
              <Link className="hover:underline" href={"/your-rooms"}>
                Your Rooms
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-2">
          {isLoggedId && ( //if user is signed in - account button
            <AccountDropdown />
          )}
          {!isLoggedId && ( //if user is not signed in - sign in button
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
