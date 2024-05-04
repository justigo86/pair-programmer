import { db } from "@/db";
import { room } from "@/db/schema";
import { eq, like } from "drizzle-orm";
import { unstable_noStore } from "next/cache";

export async function getRooms(search: string | undefined) {
  //function for homepage search input based on tags
  unstable_noStore();
  //query data from db into component
  const where = search ? like(room.tags, `%${search}%`) : undefined;
  const rooms = await db.query.room.findMany({ where });
  return rooms;
}

export async function getRoom(roomId: string) {
  unstable_noStore();
  //query data from db into component
  return await db.query.room.findFirst({
    where: eq(room.id, roomId),
  });
}
