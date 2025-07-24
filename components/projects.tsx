'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

// Need to add project data waiting for candidate to provide real data
const sampleProjects = [
  { id: 1, title: 'Instagram Reel Campaign', category: 'video', thumbnail: '/thumbnails/reel1.jpg' },
  { id: 2, title: 'YouTube Cashcow Intro', category: 'video', thumbnail: '/thumbnails/cashcow1.jpg' },
  { id: 3, title: 'Minimalist Thumbnail Set', category: 'design', thumbnail: '/thumbnails/thumb1.jpg' },
  { id: 4, title: 'AI-Powered Social Graphic', category: 'design', thumbnail: '/thumbnails/ai1.jpg' }
];

export default function Projects() {
  const [filter, setFilter] = useState<'all' | 'video' | 'design'>('all');
  const filtered = filter === 'all' ? sampleProjects : sampleProjects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-20 px-6 md:px-16 bg-black text-white relative z-10">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold mb-10"
        >
          Projects & Portfolio
        </motion.h2>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-10">
          {['all', 'video', 'design'].map(type => (
            <button
              key={type}
              onClick={() => setFilter(type as any)}
              className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 border-2 ${
                filter === type
                  ? 'bg-green-400 text-black border-green-400'
                  : 'border-white/50 text-white hover:bg-white/10 hover:border-white'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.2 }}
        >
          {filtered.map(project => (
            <motion.div
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              className="group relative overflow-hidden rounded-lg border border-white/10 shadow-lg cursor-pointer"
            >
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              {/* Animated Frame */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-green-400 transition-all duration-300 rounded-lg scale-95 group-hover:scale-100" />
              
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <div className="overflow-hidden">
                  <motion.h3
                    className="text-2xl font-bold text-white transform-gpu translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"
                  >
                    {project.title}
                  </motion.h3>
                </div>
                 <motion.p
                    className="text-green-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200"
                  >
                    {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                  </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}