"use server";

import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Query } from "node-appwrite";
import checkAuth from "./checkAuth";

async function getMyBookings() {
  const sessionCookies = cookies().get("appwrite-session");
  if (!sessionCookies) {
    redirect("/login");
  }
  try {
    const { account, databases } = await createSessionClient(
      sessionCookies.value
    );
    const { user } = await checkAuth();
    if (!user) {
      return {
        error: "You have to be logged in to show bookings.",
      };
    }

    // Fetch user Rooms
    const { documents: rooms } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTIONS_BOOKINGS,
      [Query.equal("user_id", user.id)]
    );
    // Revalidate the cache for this path
    return rooms;
  } catch (error) {
    console.log("Failed to get my bookings", error);
    return {
      error: "Failed to get my bookings",
    };
  }
}

export default getMyBookings;
