"use client";

import React, { useRef } from "react";
import { motion, useInView, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
}

export const WordsPullUp: React.FC<WordsPullUpProps> = ({ text, className, showAsterisk }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <div ref={ref} className={cn("flex flex-wrap", className)}>
      {words.map((word, i) => (
        <span key={i} className="relative inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : { y: "100%" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block"
          >
            {word}
            {showAsterisk && i === words.length - 1 && (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>
            )}
          </motion.span>
        </span>
      ))}
    </div>
  );
};

interface WordsPullUpMultiStyleProps {
  segments: { text: string; className?: string }[];
  containerClassName?: string;
}

export const WordsPullUpMultiStyle: React.FC<WordsPullUpMultiStyleProps> = ({ segments, containerClassName }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  let wordIndex = 0;

  return (
    <div ref={ref} className={cn("inline-flex flex-wrap justify-center", containerClassName)}>
      {segments.map((segment, segmentIndex) => {
        const words = segment.text.split(" ");
        return words.map((word, i) => {
          const currentIdx = wordIndex++;
          return (
            <span key={`${segmentIndex}-${i}`} className={cn("relative inline-block overflow-hidden mr-[0.25em]", segment.className)}>
              <motion.span
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : { y: "100%" }}
                transition={{ duration: 0.5, delay: currentIdx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block"
              >
                {word}{i === words.length - 1 ? "" : ""}
              </motion.span>
            </span>
          );
        });
      })}
    </div>
  );
};

interface AnimatedLetterProps {
  children: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

export const AnimatedLetter: React.FC<AnimatedLetterProps> = ({ children, index, total, progress }) => {
  const charProgress = index / total;
  const opacity = useTransform(
    progress,
    [Math.max(0, charProgress - 0.1), Math.min(1, charProgress + 0.05)],
    [0.2, 1]
  );

  return <motion.span style={{ opacity }}>{children}</motion.span>;
};
