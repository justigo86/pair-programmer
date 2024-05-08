"use server";

import { Room, room } from "@/db/schema";
import { db } from "@/db";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createRoomAction(roomData: Omit<Room, "id" | "userId">) {
  //omit userId from room because user will enter their userId
  const session = await getSession();

  if (!session) {
    throw new Error("Must be logged in to start a session.");
  }

  await db.insert(room).values({ ...roomData, userId: session.user.id });
  //userId coming from auth.ts

  revalidatePath("/");
}
