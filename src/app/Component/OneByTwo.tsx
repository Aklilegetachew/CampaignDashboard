"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface CoffeeSectionProps {
  title: string;
  heading: string;
  description: string;
  features: {
    icon: string;
    title: string;
    description: string;
  }[];
  ctaText: string;
  images: string;
}

export default function OneByTwo({
  title,
  heading,
  description,
  features,
  ctaText,
  images,
}: CoffeeSectionProps) {
  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden  mt-28 px-4 py-16 md:px-6 lg:px-8">
      {/* Decorative beans */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-10 left-10"
      >
        <img
          src="/leaf-bg-coffee.svg"
          alt=""
          width={200}
          height={100}
          className="opacity-30"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto grid gap-12 lg:grid-cols-2 items-center">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-orange-500 font-medium">{title}</h2>
            <h3 className="text-4xl md:text-5xl font-bold leading-tight">
              {heading}
            </h3>
            <p className="text-gray-400 leading-relaxed">{description}</p>
          </div>

          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
                className="flex gap-4 items-start"
              >
                <div className="text-2xl">{feature.icon}</div>
                <div>
                  <h4 className="font-semibold text-xl mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-orange-500 text-white px-8 py-3 rounded-md hover:bg-orange-600 transition-colors"
          >
            {ctaText}
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          <img
            src={images}
            alt="Vintage coffee illustration"
            width={600}
            height={600}
            className="rounded-lg"
          />
        </motion.div>
      </div>

      {/* More decorative beans */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute bottom-10 right-10"
      >
        <img
          src="/leaf-bg-coffee.svg"
          alt=""
          width={350}
          height={250}
          className="opacity-30 transform rotate-45"
        />
      </motion.div>
    </div>
  );
}
