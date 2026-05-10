"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { WordsPullUp } from "./ui/prisma-components";

export const PrismaHero = () => {
  const navItems = ["Our story", "Collective", "Workshops", "Programs", "Inquiries"];

  return (
    <section className="relative h-screen w-full px-inset overflow-hidden">
      <div className="relative h-full w-full rounded-2xl md:rounded-[2rem] overflow-hidden bg-black">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
            type="video/mp4"
          />
        </video>

        {/* Noise Overlay */}
        <div className="absolute inset-0 noise-overlay opacity-[0.7] mix-blend-overlay pointer-events-none" />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

        {/* Navbar */}
        <nav className="absolute top-0 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8 flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-[10px] sm:text-xs md:text-sm font-medium transition-colors"
                style={{ color: "rgba(225, 224, 204, 0.8)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#E1E0CC")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(225, 224, 204, 0.8)")}
              >
                {item}
              </a>
            ))}
          </div>
        </nav>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16 z-10">
          <div className="grid grid-cols-12 gap-6 items-end">
            {/* Heading */}
            <div className="col-span-12 lg:col-span-8">
              <WordsPullUp
                text="Prisma"
                showAsterisk
                className="text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw] font-medium leading-[0.85] tracking-[-0.07em]"
                style={{ color: "#E1E0CC" }}
              />
            </div>

            {/* Description & CTA */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-primary/70 text-xs sm:text-sm md:text-base leading-[1.2] max-w-xs"
              >
                Prisma is a worldwide network of visual artists, filmmakers and storytellers bound not by place, status or labels but by passion and hunger to unlock potential through our unique perspectives.
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="group flex items-center gap-2 bg-primary rounded-full px-1 py-1 pr-1 w-fit transition-all hover:gap-3"
              >
                <span className="text-black font-medium text-sm sm:text-base pl-6">Join the lab</span>
                <div className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform group-hover:scale-110">
                  <ArrowRight className="w-5 h-5 text-primary" />
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
