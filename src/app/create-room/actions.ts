"use server";

import { Room, room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { createRoom } from "@/data-access/rooms";

export async function createRoomAction(roomData: Omit<Room, "id" | "userId">) {
  //omit userId from room because user will enter their userId
  const session = await getSession();

  if (!session) {
    throw new Error("Must be logged in to start a session.");
  }

  await createRoom(roomData, session.user.id);

  revalidatePath("/");
}
