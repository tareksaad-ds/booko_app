"use server";

import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ID } from "node-appwrite";
import checkAuth from "./checkAuth";
import { revalidatePath } from "next/cache";
import checkRoomAvailability from "./checkRoomAv";

async function bookRoom(previousState, formData) {
  const sessionCookies = cookies().get("appwrite-session");
  if (!sessionCookies) {
    redirect("/login");
  }
  try {
    const { databases } = await createSessionClient(sessionCookies.value);
    //CHECK AUTH
    const { user } = await checkAuth();
    if (!user) {
      return {
        error: "You have to be logged in to book a room.",
      };
    }
    //EXTRACT DATE DATA INTO ISO TIME TYPE
    const checkInDate = formData.get("check_in_date");
    const checkInTime = formData.get("check_in_time");
    const checkOutDate = formData.get("check_out_date");
    const checkOutTime = formData.get("check_out_time");
    const roomId = formData.get("room_id");
    //COMBINE DATE AND TIME
    const checkInDateTime = `${checkInDate}T${checkInTime}`;
    const checkoutDateTime = `${checkOutDate}T${checkOutTime}`;
    // Check if room is available
    const isAvailable = await checkRoomAvailability(
      roomId,
      checkInDateTime,
      checkoutDateTime
    );

    if (!isAvailable) {
      return {
        error: "This room is already booked for the selected time",
      };
    }

    const bookingData = {
      check_in: checkInDateTime,
      check_out: checkoutDateTime,
      user_id: user.id,
      room_id: roomId,
    };

    const newBooking = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTIONS_BOOKINGS,
      ID.unique(),
      bookingData
    );

    revalidatePath("/booking", "layout");

    return {
      success: true,
    };
  } catch (error) {
    console.log("Failed to book room", error);
    return {
      error: "Something went wrong!",
    };
  }
}

export default bookRoom;
