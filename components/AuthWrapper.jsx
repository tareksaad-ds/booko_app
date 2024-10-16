import { AuthProvider } from "@/context/AuthContext";
import React from "react";

export default function AuthWrapper({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
