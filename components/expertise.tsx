// components/Expertise.tsx
import { motion } from 'framer-motion';
import { FaVideo, FaBrain, FaMagic, FaImage, FaRobot, FaTh } from 'react-icons/fa';

const expertiseList = [
  { icon: <FaVideo size={28} />, title: 'Documentary Videos' },
  { icon: <FaBrain size={28} />, title: 'Cashcow Videos' },
  { icon: <FaRobot size={28} />, title: 'AI Videos' },
  { icon: <FaMagic size={28} />, title: 'Reel Editing' },
  { icon: <FaImage size={28} />, title: 'Thumbnail Designing' },
  { icon: <FaTh size={28} />, title: 'AI Thumbnails' }
];

export default function Expertise() {
  return (
    <section id="expertise" className="py-20 px-6 md:px-16 bg-black relative z-10">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold mb-12"
        >
          Expert In
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {expertiseList.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10 shadow-xl hover:shadow-green-500/20 transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="flex items-center justify-center text-green-400 mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            </motion.div>
          ))}
        </div>

        <div className="absolute -top-8 left-1/4 w-32 h-32 bg-green-400 rounded-full mix-blend-lighten blur-2xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-10 w-40 h-40 bg-green-500 rounded-full mix-blend-lighten blur-3xl opacity-20 animate-bounce"></div>
      </div>
    </section>
  );
}