"use client";

import React, { useRef } from "react";
import { useScroll } from "framer-motion";
import { WordsPullUpMultiStyle, AnimatedLetter } from "./ui/prisma-components";

export const PrismaAbout = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });

  const bodyText = "Over the last seven years, I have perfected the art of the perfect crunch, crafting recipes that blend traditional flavors with modern culinary techniques. Together with our team, we have created a menu that has earned acclaim from food critics and burger lovers across the globe.";
  const characters = bodyText.split("");

  return (
    <section className="bg-black py-24 md:py-32 px-4 md:px-6">
      <div className="max-w-6xl mx-auto bg-[#101010] rounded-[2rem] p-8 md:p-16 lg:p-24 text-center">
        <span className="text-primary text-[10px] sm:text-xs uppercase tracking-widest block mb-8">
          The Perfect Crunch
        </span>

        <WordsPullUpMultiStyle
          segments={[
            { text: "I am the Lead Chef,", className: "font-normal" },
            { text: "a flavor-obsessed creator.", className: "font-serif italic text-primary" },
            { text: "I have skills in molecular gastronomy, spice blending, and taste architecture.", className: "font-normal" },
          ]}
          containerClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9] text-[#E1E0CC]"
        />

        <div ref={containerRef} className="mt-16 md:mt-24 max-w-2xl mx-auto">
          <p className="text-[#DEDBC8] text-xs sm:text-sm md:text-base leading-relaxed">
            {characters.map((char, i) => (
              <AnimatedLetter
                key={i}
                index={i}
                total={characters.length}
                progress={scrollYProgress}
              >
                {char}
              </AnimatedLetter>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
};
