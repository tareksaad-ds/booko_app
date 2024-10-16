"use server";

import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Query } from "node-appwrite";

async function getMyRooms() {
  const sessionCookies = cookies().get("appwrite-session");
  if (!sessionCookies) {
    redirect("/login");
  }
  try {
    const { account, databases } = await createSessionClient(
      sessionCookies.value
    );
    const user = await account.get();
    const userId = user.$id;
    // Fetch user Rooms
    const { documents: rooms } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTIONS_ROOMS,
      [Query.equal("user_id", userId)]
    );
    // Revalidate the cache for this path
    return rooms;
  } catch (error) {
    console.log("Failed to get user rooms", error);
    redirect("/error");
  }
}

export default getMyRooms;
