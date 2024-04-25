import { Badge } from "@/components/ui/badge";
import { getRoom } from "@/data-access/rooms";
import { GithubIcon } from "lucide-react";
import Link from "next/link";

export default async function RoomPage(props: { params: { roomid: string } }) {
  const roomId = props.params.roomid;

  const room = await getRoom(roomId);

  if (!room) {
    return <h1>Room not found</h1>;
  }

  const languages = room.language.split(",").map((lang) => lang.trim());

  return (
    <div className="grid grid-cols-4 min-h-screen">
      <div className="col-span-3 p-4 pr-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
          video player
        </div>
      </div>
      <div className="col-span-1 p-4 pl-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
          <h1 className="text-base">{room.name}</h1>
          <p className="text-base text-gray-600">{room.description}</p>
          <h3>Tags:</h3>
          {languages.map((lang) => (
            <Badge className="w-fit" key={lang}>
              {lang}
            </Badge>
          ))}
          {room.githubRepo && (
            <Link
              href={room.githubRepo}
              className="flex items-center gap-2"
              target="_blank"
              rel="noreferrer"
            >
              <GithubIcon />
              Github Project
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
