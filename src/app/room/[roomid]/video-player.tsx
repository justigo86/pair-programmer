"use client";

import { Room } from "@/db/schema";
import {
  Call,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-sdk";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const apiKey = process.env.GET_STREAM_API_KEY!;
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzViZWQwNTctOGMxMi00OTA3LWJiZTEtZTY4ODQ4MzhjZTVkIn0.X6J3RK5P6zd04wbDl8Gc3nsOW3JtjG5hn5QfnSzm15Q";

export default function VideoPlayer({ room }: { room: Room }) {
  const session = useSession();
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);

  useEffect(() => {
    if (!session.data) {
      return;
    }
    const userId = session.data?.user?.id;
    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: userId,
      },
      token,
    });
    setClient(client);
    const call = client.call("default", room.id);
    call.join({ create: true });
    setCall(call);
    return () => {
      call.leave();
      client.disconnectUser();
    };
  }, [room.id, session]);

  return (
    client &&
    call && (
      <StreamVideo client={client}>
        <StreamCall call={call}></StreamCall>
      </StreamVideo>
    )
  );
}
