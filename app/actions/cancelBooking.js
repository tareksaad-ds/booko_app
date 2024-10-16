"use server";

import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Query } from "node-appwrite";
import checkAuth from "./checkAuth";
import { revalidatePath } from "next/cache";

async function cancelBooking(bookingId) {
  const sessionCookies = cookies().get("appwrite-session");
  if (!sessionCookies) {
    redirect("/login");
  }
  try {
    const { databases } = await createSessionClient(sessionCookies.value);
    //CHECK AUTHENTICATION
    const { user } = await checkAuth();
    if (!user) {
      return {
        error: "You must be logged in!",
      };
    }
    // Get Single Booking
    const booking = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTIONS_BOOKINGS,
      bookingId
    );

    //CHECK OWNERSHIP
    if (booking.user_id !== user.id) {
      return {
        error: "You are not authorized to cancel this booking",
      };
    }

    //DELETE BOOKING
    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTIONS_BOOKINGS,
      bookingId
    );

    // Revalidate the cache for this path
    revalidatePath("/booking", "layout");
    return {
      success: true,
    };
  } catch (error) {
    console.log("Failed to cancel the booking", error);
    return {
      error: "Failed to cancel the booking",
    };
  }
}

export default cancelBooking;
