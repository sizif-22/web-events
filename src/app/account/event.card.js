import Image from "next/image";

export default function EventCard({ event }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 transition transform hover:scale-105 hover:shadow-lg">
      <Image
        src={event.image}
        alt={event.title}
        className="rounded-lg"
        width={600}
        height={300}
        objectFit="cover"
      />
      <h3 className="text-xl font-semibold mt-4">{event.title}</h3>
      <p className="text-gray-600 mt-2">{event.description}</p>
      <p className="text-gray-500 mt-2">
        {new Date(event.date).toLocaleString()}
      </p>
    </div>
  );
}
