"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryProps {
  images: GalleryImage[];
}

export default function ModernGallery({ images }: GalleryProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <>
      <div>
        <h1 className="text-3xl text-center font-semibold text-white sm:text-4xl lg:text-6xl">
          From Our Gallery
        </h1>
      </div>
      <motion.div
        className="container mx-auto px-4 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg shadow-lg"
              variants={itemVariants}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={image.src}
                alt={image.alt}
                // layout="fill"
                // objectFit="cover"
                className="transition-transform duration-300 ease-in-out h-full w-full object-cover"
                style={{
                  transform: hoveredIndex === index ? "scale(1.1)" : "scale(1)",
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100" />
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-in-out"
                style={{
                  opacity: hoveredIndex === index ? 1 : 0,
                }}
              >
                <p className="text-white text-lg font-semibold">{image.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
}
