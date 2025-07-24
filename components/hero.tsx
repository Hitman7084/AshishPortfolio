'use client';
import { motion, useTransform, useMotionValue } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const textX = useTransform(mouseX, (v) => v / -25);
  const textY = useTransform(mouseY, (v) => v / -25);

  const name = "Ashish Kumar";
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
    <section
      onMouseMove={handleMouseMove}
      className="h-screen flex flex-col justify-center items-center text-center relative overflow-hidden"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1] opacity-20"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/50 z-[-1]"></div>

      <motion.h1
        style={{ x: textX, y: textY }}
        variants={sentence}
        initial="hidden"
        animate="visible"
        className="text-5xl md:text-7xl font-extrabold tracking-tighter"
      >
        {name.split("").map((char, index) => (
          <motion.span key={char + "-" + index} variants={letter} className="inline-block">
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="text-xl md:text-3xl font-semibold mt-4 text-green-400"
      >
        Creative Video Editor | Graphic Designer
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="mt-2 text-sm md:text-base text-gray-300 max-w-xl"
      >
        Generated 10M+ Views on Social Media • Worked With 100+ Influencers and Agencies
      </motion.p>
      
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 100 }}
      >
        <Link
          href="#projects"
          className="bg-green-400 hover:bg-green-500 text-black font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/40"
        >
          View My Work
        </Link>
      </motion.div>
    </section>
  );
}