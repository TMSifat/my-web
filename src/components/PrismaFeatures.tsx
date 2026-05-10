"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { WordsPullUpMultiStyle } from "./ui/prisma-components";

const FeatureCard = ({ icon, title, number, items, delay }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className="bg-[#212121] rounded-3xl p-6 flex flex-col h-full group"
    >
      <div className="flex justify-between items-start mb-8">
        <img src={icon} alt="" className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover" />
        <span className="text-gray-500 font-mono text-sm">({number})</span>
      </div>

      <h3 className="text-primary text-xl font-medium mb-6">{title}</h3>

      <div className="flex flex-col gap-4 flex-grow">
        {items.map((item: string, i: number) => (
          <div key={i} className="flex items-start gap-3">
            <Check className="w-4 h-4 text-primary mt-1 shrink-0" />
            <p className="text-gray-400 text-sm leading-snug">{item}</p>
          </div>
        ))}
      </div>

      <button className="mt-8 flex items-center gap-2 text-primary text-sm font-medium hover:underline group/btn">
        Learn more
        <ArrowRight className="w-4 h-4 -rotate-45 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
      </button>
    </motion.div>
  );
};

export const PrismaFeatures = () => {
  return (
    <section className="relative min-h-screen bg-black py-24 md:py-32 px-4 md:px-6 overflow-hidden">
      {/* Noise Overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.15] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20">
          <WordsPullUpMultiStyle
            segments={[
              { text: "Studio-grade workflows for visionary creators.", className: "text-primary" },
              { text: "Built for pure vision. Powered by art.", className: "text-gray-500" },
            ]}
            containerClassName="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-left block max-w-2xl"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:h-[480px]">
          {/* Video Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl overflow-hidden h-full min-h-[300px] lg:min-h-0"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
                type="video/mp4"
              />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="text-[#E1E0CC] font-medium italic font-serif text-lg">Your creative canvas.</p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <FeatureCard
            icon="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85"
            title="Project Storyboard."
            number="01"
            delay={0.15}
            items={[
              "Visual reference mapping.",
              "Shot-by-shot planning tools.",
              "Collaborative moodboarding.",
              "Asset management system."
            ]}
          />

          {/* Card 3 */}
          <FeatureCard
            icon="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85"
            title="Smart Critiques."
            number="02"
            delay={0.3}
            items={[
              "AI-powered composition analysis.",
              "Creative notes and feedback loops.",
              "Seamless tool integrations."
            ]}
          />

          {/* Card 4 */}
          <FeatureCard
            icon="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85"
            title="Immersion Capsule."
            number="03"
            delay={0.45}
            items={[
              "Intelligent notification silencing.",
              "Ambient creative soundscapes.",
              "Schedule and focus syncing."
            ]}
          />
        </div>
      </div>
    </section>
  );
};
