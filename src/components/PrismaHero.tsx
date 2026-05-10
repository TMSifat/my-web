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
        {/* Background Video - Cinematic Burger */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        >
          <source
            src="https://cdn.pixabay.com/video/2023/11/04/187707-880753063_large.mp4"
            type="video/mp4"
          />
        </video>

        {/* Noise Overlay */}
        <div className="absolute inset-0 noise-overlay opacity-[0.5] mix-blend-overlay pointer-events-none" />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />

        {/* Atmospheric Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Glowing Orbs */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
              x: [0, 50, 0],
              y: [0, 30, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-10%] right-[-5%] w-[60%] h-[60%] bg-orange-500/20 rounded-full blur-[120px]"
          />

          {/* Hero Double Decker Burger Background - MASSIVE */}
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.25 }}
            transition={{ duration: 3, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center z-0 overflow-hidden"
          >
            <motion.img 
              animate={{ 
                y: [-20, 20, -20],
                rotate: [-2, 2, -2]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              src="/assets/hero-burger.png" 
              alt="" 
              className="w-full h-full object-cover scale-[1.8] opacity-30 blur-[4px] md:blur-[2px] mix-blend-screen"
            />
          </motion.div>

          {/* Subtle Grid Texture */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16 z-10">
          <div className="grid grid-cols-12 gap-6 items-end">
            {/* Heading */}
            <div className="col-span-12 lg:col-span-8 overflow-visible">
              <WordsPullUp
                text="CrunchBite"
                showAsterisk
                className="text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[9vw] xl:text-[8vw] 2xl:text-[7vw] font-black leading-[0.85] tracking-[-0.05em] uppercase whitespace-nowrap"
                style={{ color: "#E1E0CC" }}
              />
            </div>

            {/* Description & CTA */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-primary/90 text-sm sm:text-base md:text-lg font-medium leading-tight max-w-xs italic font-serif"
              >
                Experience the ultimate crunch. Handcrafted burgers, fresh ingredients, and flavors that tell a story.
              </motion.p>

              <motion.button
                onClick={() => window.location.href = '#menu'}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="group flex items-center gap-2 bg-orange-500 rounded-full px-1 py-1 pr-1 w-fit transition-all hover:gap-3 shadow-2xl shadow-orange-500/20"
              >
                <span className="text-white font-black text-sm sm:text-base pl-8 pr-2 uppercase tracking-widest">Order Now</span>
                <div className="bg-white rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform group-hover:scale-110">
                  <ArrowRight className="w-5 h-5 text-orange-500" />
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
