"use client";
import cancelBooking from "@/app/actions/cancelBooking";
import React from "react";
import { toast } from "react-toastify";

export default function CancelBookingButton({ bookingId }) {
  const handleCancel = async () => {
    if (!confirm("Are You Sure You Want To Cancel This Booking?!")) {
      return;
    }

    try {
      const result = await cancelBooking(bookingId);
      if (result.success) {
        toast.success("Booking cancelled successfully!");
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      return {
        error: "Failed to cancel error",
      };
    }
  };
  return (
    <button
      onClick={handleCancel}
      className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto text-center hover:bg-red-700"
    >
      Cancel Booking
    </button>
  );
}
