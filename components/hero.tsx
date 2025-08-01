'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import { heroContent } from './content';

export default function Hero() {
  const sentence = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.08,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="h-screen flex flex-col justify-center items-center text-center relative overflow-hidden px-6">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-[-5] opacity-70"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 bg-black/70 z-[-1]" aria-hidden="true"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        <motion.h1
          variants={sentence}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-8xl font-extrabold tracking-tighter"
        >
          {heroContent.name.split("").map((char, index) => (
            <motion.span key={char + "-" + index} variants={letter} className="inline-block">
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-xl md:text-3xl font-semibold mt-4 text-violet-400"
        >
          {heroContent.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="mt-4 text-sm md:text-base text-gray-300 max-w-xl"
        >
          {heroContent.subtitle}
        </motion.p>
        
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, type: 'spring', stiffness: 100 }}
        >
          <Link
            href="#projects"
            className="bg-violet-500 hover:bg-violet-600 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/50"
          >
            View My Work
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
