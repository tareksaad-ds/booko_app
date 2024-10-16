"use server";

import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Query } from "node-appwrite";

async function deleteRoom(roomId) {
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
    const roomToDelete = rooms.find((rm) => (rm.$id = roomId));
    //DELETE THE ROOM
    if (roomToDelete) {
      await databases.deleteDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTIONS_ROOMS,
        roomToDelete.$id
      );
      revalidatePath("/rooms/my", "layout");
      revalidatePath("/", "layout");

      return {
        success: true,
      };
    } else {
      return {
        error: "Room is not found!",
      };
    }
  } catch (error) {
    console.log("Failed to delete room", error);
  }
}

export default deleteRoom;
