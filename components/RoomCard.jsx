import React from "react";
import Link from "next/link";

export default function ({ room }) {
  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOMS;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;
  const imageURL = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${room.image}/view?project=${projectId}`;
  const imageSrc = room.image ? imageURL : "/images/rooms/no-photo.jpg";
  return (
    <div className="bg-white shadow rounded-lg p-4 mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
      <div className="flex flex-col sm:flex-row sm:space-x-4">
        <img
          src={imageSrc}
          alt="Grand Conference Hall"
          className="w-full sm:w-32 sm:h-32 mb-3 sm:mb-0 object-cover rounded-lg"
        />
        <div className="space-y-1">
          <h4 className="text-lg font-semibold">{room.title}</h4>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800"> Address:</span>{" "}
            {room.address}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800"> Availability:</span>{" "}
            {room.availability}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800"> Price:</span>{" "}
            {room.price_per_hour} LE / hour
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800"> Amenities:</span>{" "}
            {room.amenities}
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row w-full sm:w-auto sm:space-x-2 mt-2 sm:mt-0">
        <Link
          href={`/rooms/${room.$id}`}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-blue-700"
        >
          View Room
        </Link>
      </div>
    </div>
  );
}
