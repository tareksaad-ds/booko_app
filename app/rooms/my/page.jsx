import React from "react";
import getMyRooms from "@/app/actions/getMyRooms";
import Heading from "@/components/Heading";
import MyRoomCard from "@/components/MyRoomCard";

export default async function MyRoomsPage() {
  const rooms = await getMyRooms();
  return (
    <>
      <Heading title="My Rooms" />
      {rooms.length > 0 ? (
        rooms.map((room) => <MyRoomCard key={room.$id} room={room} />)
      ) : (
        <h4>You have no room listing</h4>
      )}
    </>
  );
}
