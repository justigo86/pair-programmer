import { db } from "@/db";
import { unstable_noStore } from "next/cache";

export async function getRooms() {
  unstable_noStore();
  //query data from db into component
  const rooms = await db.query.room.findMany();
  return rooms;
}
