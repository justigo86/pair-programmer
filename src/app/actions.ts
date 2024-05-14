"use server";

import { deleteUser } from "@/data-access/users";
import { getSession } from "@/lib/auth";

export async function deleteAccountAction() {
  const session = await getSession();

  if (!session) {
    throw new Error("Unable to pull user data to delete account.");
  }

  await deleteUser(session.user.id);
}
