import { unstable_noStore } from "next/cache";
import { EditRoomForm } from "./edit-room-form";
import { getRoom } from "@/data-access/rooms";

export default async function EditRoomPage({
  params,
}: {
  params: { roomId: string };
}) {
  unstable_noStore();
  //prevents caching - opt out of static rendering
  const room = await getRoom(params.roomId);
  if (!room) {
    throw new Error("Room not found");
  }

  return (
    <div className="container mx-auto flex flex-col gap-6 pt-12 pb-24">
      <h1 className="text-3xl font-bold">Edit Room</h1>
      <EditRoomForm room={room} />
    </div>
  );
}
