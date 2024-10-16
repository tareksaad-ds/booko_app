import rooms from "@/data/rooms.json";
import Heading from "@/components/Heading";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";
import BookingForm from "@/components/BookingForm";
import getSingleRoom from "@/app/actions/getSingleRoom";

const RoomPage = async ({ params }) => {
  const { id } = params;
  const room = await getSingleRoom(id);

  if (!room) {
    return <Heading title="Room Not Found" />;
  }

  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOMS;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

  const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${room.image}/view?project=${projectId}`;

  const imageSrc = room.image ? imageUrl : "/images/no-image.jpg";

  return (
    <>
      <Heading title={room.name} />
      <div className="bg-white mb-5 shadow px-4 py-4">
        <Link href="/" className="text-gray-800 flex items-center">
          <IoMdArrowRoundBack className="inline mr-2" /> Back To Rooms
        </Link>
        <div className="flex flex-col sm:flex-row sm:space-x-6">
          <img
            src={imageSrc}
            alt={room.name}
            width={500}
            height={100}
            className="mt-4 sm:h-1/3 h-64 object-cover rounded-lg"
          />
          <div className="mt-4 sm:mt-0 sm:flex-1">
            <p className="text-gray-600 mb-3 mt-5 ">{room.description}</p>
            <ul className="space-y-2">
              <li className="text-sm">Size: {room.sqft} sqft</li>
              <li className="text-sm">Availability: {room.availability}</li>
              <li className="text-sm">Price: {room.price_per_hour} EGP/hour</li>
              <li className="text-sm">Address: {room.address}</li>
            </ul>
          </div>
        </div>
        <BookingForm room={room} />
      </div>
    </>
  );
};

export default RoomPage;
