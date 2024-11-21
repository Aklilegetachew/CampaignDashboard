"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function SubHeader() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="/beans.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/70" />
      </div>
      <div className="relative z-10 flex h-full flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-white sm:text-6xl lg:text-7xl">
              Our Story!
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
