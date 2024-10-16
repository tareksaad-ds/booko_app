"use server";
import { createAdminClient } from "@/config/appwrite";
import checkAuth from "./checkAuth";
import { ID } from "node-appwrite";
import { revalidatePath } from "next/cache";

async function createRoom(previousState, formData) {
  //GET ACCESS DATABASES
  const { databases, storage } = await createAdminClient();
  try {
    //GET USER (REQUIRED USER_ID for ROOM FORM DATA)
    const { user } = await checkAuth();
    if (!user) {
      return {
        error: "You must be logged in to create a room!",
      };
    }

    //UPLOADING IMAGE
    let imageID;
    const image = formData.get("image");
    if (image && image.size > 0 && image.name !== "undefined") {
      try {
        const response = await storage.createFile("rooms", ID.unique(), image);
        imageID = response.$id;
      } catch (error) {
        return {
          error: "Error Uploading Image.",
        };
      }
    } else {
      console.log("No image file provided or invalid file ");
    }
    //CREATE A ROOM
    const newRoom = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTIONS_ROOMS,
      ID.unique(),
      {
        user_id: user.id,
        name: formData.get("name"),
        description: formData.get("description"),
        image: imageID,
        location: formData.get("location"),
        address: formData.get("address"),
        amenities: formData.get("amenities"),
        availability: formData.get("availability"),
        price_per_hour: parseInt(formData.get("price_per_hour")),
        capacity: parseInt(formData.get("capacity")),
        sqft: parseInt(formData.get("sqft")),
      }
    );
    revalidatePath("/", "layout");
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      error: "An unexpected error has occured",
    };
  }
}

export default createRoom;
