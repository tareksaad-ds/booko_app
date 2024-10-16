import React from "react";
import getMyBookings from "../actions/getMyBookings";
import Heading from "@/components/Heading";
import BookRoomCard from "@/components/BookRoomCard";

export default async function Bookings() {
  const bookings = await getMyBookings();

  return (
    <>
      <Heading title="My Bookings" />
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <BookRoomCard key={booking.$id} booking={booking} />
        ))
      ) : (
        <h4>No bookings listing here!</h4>
      )}
    </>
  );
}
