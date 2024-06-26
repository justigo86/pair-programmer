import { db } from "@/db";
import { Room, room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { eq, like } from "drizzle-orm";

export async function getRooms(search: string | undefined) {
  //function for homepage search input based on tags
  //unstable_noStore(); //this is next.js action - arguably, data-access "layer" should be separate from nextjs
  //better to call unstable_noStore() with the component itself - layer of abstraction

  //query data from db into component
  const where = search ? like(room.tags, `%${search}%`) : undefined;
  const rooms = await db.query.room.findMany({ where });
  return rooms;
}

export async function getRoom(roomId: string) {
  //unstable_noStore();
  //query data from db into component
  return await db.query.room.findFirst({
    where: eq(room.id, roomId),
  });
}

export async function getUserRooms() {
  // unstable_noStore();
  const session = await getSession();
  if (!session) {
    throw new Error("No session found");
  }
  const rooms = await db.query.room.findMany({
    where: eq(room.userId, session.user.id),
  });
  return rooms;
}

export async function deleteRoom(roomId: string) {
  await db.delete(room).where(eq(room.id, roomId));
}

export async function createRoom(
  roomData: Omit<Room, "id" | "userId">,
  userId: string
) {
  const inserted = await db
    .insert(room)
    .values({ ...roomData, userId })
    .returning();
  return inserted[0];
}

export async function editRoom(roomData: Room) {
  const updated = await db
    .update(room)
    .set(roomData)
    .where(eq(room.id, roomData.id))
    .returning();
  return updated[0];
}
