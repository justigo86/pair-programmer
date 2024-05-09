"use server";

import { Room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { editRoom, getRoom } from "@/data-access/rooms";
import { redirect } from "next/navigation";

export async function editRoomAction(roomData: Omit<Room, "userId">) {
  //authenticate
  const session = await getSession();
  if (!session) {
    throw new Error("User not authenticated");
  }

  //ensure the user created the room
  const room = await getRoom(roomData.id);
  if (room?.userId !== session.user.id) {
    throw new Error("User not authorized to edit room");
  }

  await editRoom({ ...roomData, userId: room.userId });
  //overrid data with roomData - but also need to hard-code the userId so it canno tbe changed

  revalidatePath("/your-rooms");
  redirect("/your-rooms");
}
