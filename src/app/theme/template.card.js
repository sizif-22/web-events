"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function TemplateCard({ title, imgSrc }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/eventEditor?theme=${encodeURIComponent(title)}`);
  };
  return (
    <div
      className=" group relative rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
      onClick={handleClick}
    >
      <div className="aspect-w-16 aspect-h-9">
        <Image
          src={imgSrc}
          width={1920}
          height={1080}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
    </div>
  );
}
