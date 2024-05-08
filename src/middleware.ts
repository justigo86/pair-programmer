export { default } from "next-auth/middleware";

export const config = { matcher: ["/your-rooms", "/browse", "/edit-room"] };
//ensures /your-rooms endpoint is only accessible to logged in users
