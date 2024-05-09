import { CreateRoomForm } from "./create-room-form";
import { unstable_noStore } from "next/cache";

export default function CreateRoomPage() {
  unstable_noStore();
  return (
    <div className="container mx-auto flex flex-col gap-6 pt-12 pb-24">
      <h1 className="text-3xl font-bold">Create Room</h1>
      <CreateRoomForm />
    </div>
  );
}
