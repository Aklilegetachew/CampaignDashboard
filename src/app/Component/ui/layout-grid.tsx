"use client";
import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../lib/utils";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

type Card = {
  id: number;
  content: JSX.Element | React.ReactNode | string;
  className: string;
  thumbnail: string;
};

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  const [selected, setSelected] = useState<Card | null>(null);
  const [lastSelected, setLastSelected] = useState<Card | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768); // Adjust breakpoint as needed
    };

    handleResize(); // Check initial screen size
    window.addEventListener("resize", handleResize); // Listen for screen size changes

    gsap.fromTo(
      ".image-container img",
      { filter: "grayscale(100%)" },
      {
        filter: "grayscale(0%)",
        scrollTrigger: {
          trigger: ".image-container",
          start: "bottom center",
          end: "center center",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      ".name-overlay",
      { opacity: 0 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: ".image-container",
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      }
    );

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = (card: Card) => {
    setLastSelected(selected);
    setSelected(card);
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 max-w-full gap-0 relative">
      {cards.map((card, i) => (
        <div key={i} className={cn(card.className, "")}>
          {isSmallScreen ? (
            <motion.div
              className={cn(
                card.className,
                "relative overflow-hidden image-container",
                selected?.id === card.id
                  ? "cursor-pointer absolute inset-0 h-2/3 w-full md:w-2/3 m-auto z-50 flex justify-center items-center flex-wrap flex-col"
                  : lastSelected?.id === card.id
                  ? "z-40 bg-white h-full w-full"
                  : "bg-white h-full w-full"
              )}
              layoutId={`card-${card.id}`}
            >
              {selected?.id === card.id && <SelectedCard selected={selected} />}
              <ImageComponent
                card={card}
                isSelected={selected?.id === card.id}
              />

              {/* Name Overlay */}
              {/* <div className="absolute bottom-0 left-0 w-full p-4 bg-black bg-opacity-50 text-white text-center name-overlay">
                <p className="text-lg font-bold">{card.name}</p>
              </div> */}
            </motion.div>
          ) : (
            <motion.div
              onClick={() => handleClick(card)}
              className={cn(
                card.className,
                "relative overflow-hidden bg-black ",
                selected?.id === card.id
                  ? "cursor-pointer absolute inset-0 h-2/3 w-full md:w-2/3 m-auto z-50 flex justify-center items-center flex-wrap flex-col"
                  : lastSelected?.id === card.id
                  ? "z-40 bg-white h-full w-full"
                  : "bg-white h-full w-full"
              )}
              layoutId={`card-${card.id}`}
            >
              {selected?.id === card.id && <SelectedCard selected={selected} />}
              <ImageComponent
                card={card}
                isSelected={selected?.id === card.id}
              />

              {/* Name Overlay */}
              {/* <div className="absolute bottom-0 left-0 w-full p-4 bg-black bg-opacity-50 text-white text-center name-overlay">
                <p className="text-lg font-bold">{card.name}</p>
              </div> */}
            </motion.div>
          )}
        </div>
      ))}
      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          "absolute h-full w-full left-0 top-0 bg-black opacity-0 z-10",
          selected?.id ? "pointer-events-auto" : "pointer-events-none"
        )}
        animate={{ opacity: selected?.id ? 0.3 : 0 }}
      />
    </div>
  );
};

const ImageComponent = ({
  card,
  isSelected,
}: {
  card: Card;
  isSelected: boolean;
}) => {
  return (
    <motion.img
      layoutId={`image-${card.id}-image`}
      src={card.thumbnail}
      // className={cn(
      //   "w-full h-full object-cover  absolute transition duration-200"
      // )}
      className={cn(
        "w-full h-full object-cover grayscale relative  sm:absolute  transition duration-200",
        isSelected ? "grayscale-0" : "hover:grayscale-0"
      )}
      alt="thumbnail"
    />
  );
};

const SelectedCard = ({ selected }: { selected: Card | null }) => {
  return (
    <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-lg shadow-2xl relative z-[60]">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 0.6,
        }}
        className="absolute inset-0 h-full w-full z-10"
      />
      <motion.div
        layoutId={`content-${selected?.id}`}
        initial={{
          opacity: 0,
          y: 100,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: 100,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="relative w-full aspect-w-16 aspect-h-9 px-0 pb-0 z-[70]"
      >
        {/* {selected?.content} */}

        <img
          src={selected?.thumbnail || ""}
          alt="Selected Image"
          // layout="fill"
          // objectFit="contain"
          className="grayscale-0 object-contain "
        />
        {selected?.content && (
          <div className="absolute bottom-0 left-0 p-4 bg-black bg-opacity-50 text-white w-full">
            {selected?.content}
          </div>
        )}
      </motion.div>
    </div>
  );
};
