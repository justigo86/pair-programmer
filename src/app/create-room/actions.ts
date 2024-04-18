"use server";

import { Room, room } from "@/db/schema";
import { db } from "@/db";
import { getSession } from "@/lib/auth";

export async function createRoomAction(roomData: Omit<Room, "userId">) {
  //omit userId from room because user will enter their userId
  const session = await getSession();
  console.log(session);
  await db.insert(room).values({ ...roomData, userId: "TODO" });
}
