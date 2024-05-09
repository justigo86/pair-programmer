"use server";

import { deleteRoom, getRoom } from "@/data-access/rooms";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function deleteRoomAction(roomId: string) {
  //authenticate
  const session = await getSession();
  if (!session) {
    throw new Error("User not authenticated");
  }

  //ensure the user created the room
  const room = await getRoom(roomId);
  if (room?.userId !== session.user.id) {
    throw new Error("User not authorized to edit room");
  }

  await deleteRoom(roomId);

  //refresh page to update after delete
  revalidatePath("/your-rooms");
}
