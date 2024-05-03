"use server";

import { getSession } from "@/lib/auth";
import { StreamChat } from "stream-chat";

export async function generateToken() {
  const session = await getSession();

  if (!session) {
    throw new Error("No session found");
  }

  const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!;
  const api_secret = process.env.GET_STREAM_SECRET_KEY!;
  // initialize the server client
  const serverClient = StreamChat.getInstance(apiKey, api_secret);
  // create user token
  const token = serverClient.createToken(session.user.id);
  // console.log("token", token);
  return token;
}
