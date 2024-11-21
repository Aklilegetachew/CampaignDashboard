"use client";
import { MapPin } from "lucide-react";
interface CoffeeRoast {
  title: string;
  image: string;
}

export default function CardShower({
  roasts,
  fontClassName,
}: {
  roasts: CoffeeRoast[];
  fontClassName: string;
}) {
  return (
    <>
      <div className="w-full max-w-6xl mx-auto p-20 bg-black">
        <div>
          <h1 className="text-3xl text-center font-semibold text-white sm:text-4xl lg:text-6xl">
            From Soil to Cup
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto p-6 bg-black">
        {roasts.map((roast, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-lg aspect-[4/3]"
          >
            {/* Background Image with Zoom Effect */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-110"
              style={{
                backgroundImage: `url(${roast.image})`,
              }}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60 transition-opacity duration-300 group-hover:bg-black/40" />

            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
              {/* Cup Icon */}
              <div className="w-12 h-12 mb-4">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-full h-full text-white"
                >
                  <MapPin />
                  {/* <path d="M17 3H3v8c0 3.314 2.686 6 6 6h2c3.314 0 6-2.686 6-6V3z" /> */}
                  {/* <path d="M21 12h-4" /> */}
                </svg>
              </div>

              {/* Title */}
              <h3 className="text-white text-xl font-bold tracking-wide">
                {roast.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
