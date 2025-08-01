'use client';
import { motion } from 'framer-motion';
import { expertiseList } from './content';

export default function Expertise() {
  return (
    <section id="expertise" className="py-20 px-6 md:px-16 bg-transparent relative z-10">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold mb-12"
        >
          Expertise
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {expertiseList.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-lg transform transition-all duration-300 group hover:!opacity-100 hover:shadow-violet-500/20 hover:-translate-y-2"
            >
              <motion.div
                className="flex items-center justify-center text-violet-400 mb-4"
                whileHover={{ scale: 1.2, rotate: [0, 15, -15, 0] }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <item.icon size={50} />
              </motion.div>
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
