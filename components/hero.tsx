import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="h-screen flex flex-col justify-center items-center text-center relative overflow-hidden">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-7xl font-extrabold"
      >
        Ashish Kumar
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="text-xl md:text-3xl font-semibold mt-4 text-green-400"
      >
        Creative Video Editor | Graphic Designer
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="mt-2 text-sm md:text-base text-gray-300 max-w-xl"
      >
        Generated 10M+ Views on Social Media • Worked With 100+ Influencers and Agencies
      </motion.p>
      <motion.div className="mt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
        <Link
          href="#projects"
          className="bg-green-400 hover:bg-green-500 text-black font-bold px-6 py-3 rounded-full transition shadow-lg"
        >
          View Work
        </Link>
      </motion.div>
      <div className="absolute bottom-0 w-full">
        <svg viewBox="0 0 1440 320" className="fill-current text-green-500">
          <path d="M0,288L1440,96L1440,320L0,320Z" />
        </svg>
      </div>
    </section>
  );
}