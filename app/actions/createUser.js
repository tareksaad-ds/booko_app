"use server";

import { createAdminClient } from "@/config/appwrite";
import { ID } from "node-appwrite";

async function createUser(previousState, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (!name || !email || !password || !confirmPassword) {
    return {
      error: "Please fill out all fields",
    };
  }
  if (password.length < 8) {
    return {
      error: "Password must be at least 8 letters/numbers.",
    };
  }
  if (confirmPassword !== password) {
    return {
      error: "Confirm password doesn't match",
    };
  }

  //GET ACCOUNT INSTANCE
  const { account } = await createAdminClient();

  try {
    await account.create(ID.unique(), email, password, name);
    return {
      success: true,
    };
  } catch (error) {
    return {
      error: `Registeration Error: ${error}`,
    };
  }
}

export default createUser;
