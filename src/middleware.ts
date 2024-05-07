export { default } from "next-auth/middleware";

export const config = { matcher: ["/your-rooms", "/browse"] };
//ensures /your-rooms endpoint is only accessible to logged in users
