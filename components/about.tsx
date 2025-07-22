import { motion } from 'framer-motion';
import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="py-20 px-6 md:px-16 bg-black relative z-10">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold mb-6"
        >
          Creative Video Editor and Graphic Designer
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-300 max-w-2xl mx-auto mb-8"
        >
          With over 10 million views generated across social media and collaborations with 100+ influencers and agencies, I craft compelling video content and striking graphics that engage and convert.
        </motion.p>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="w-48 h-48 mx-auto relative rounded-full overflow-hidden shadow-lg border-4 border-green-400 bg-gradient-to-br from-green-500/20 to-green-800/10"
        >
          <Image
            src="/pic.jpg"
            alt="Ashish Avatar"
            fill
            className="object-cover"
            loading="lazy"
          />
        </motion.div>
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-green-400 rounded-full mix-blend-lighten blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-green-500 rounded-full mix-blend-lighten blur-2xl opacity-20 animate-spin"></div>
      </div>
    </section>
  );
}
