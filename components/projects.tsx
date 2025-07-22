'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

const sampleProjects = [
  {
    id: 1,
    title: 'Instagram Reel Campaign',
    category: 'video',
    thumbnail: '/thumbnails/reel1.jpg',
    videoUrl: '/videos/reel1.mp4'
  },
  {
    id: 2,
    title: 'YouTube Cashcow Channel Intro',
    category: 'video',
    thumbnail: '/thumbnails/cashcow1.jpg',
    videoUrl: '/videos/cashcow1.mp4'
  },
  {
    id: 3,
    title: 'Minimalist Thumbnail Set',
    category: 'design',
    thumbnail: '/thumbnails/thumb1.jpg'
  },
  {
    id: 4,
    title: 'AI-Powered Social Graphic',
    category: 'design',
    thumbnail: '/thumbnails/ai1.jpg'
  }
];

export default function Projects() {
  const [filter, setFilter] = useState<'all' | 'video' | 'design'>('all');
  const filtered =
    filter === 'all' ? sampleProjects : sampleProjects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-20 px-6 md:px-16 bg-black text-white relative z-10">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold mb-10"
        >
          Projects & Portfolio
        </motion.h2>

        <div className="flex justify-center gap-4 mb-10">
          {['all', 'video', 'design'].map(type => (
            <button
              key={type}
              onClick={() => setFilter(type as any)}
              className={`px-4 py-2 rounded-full font-medium transition border ${
                filter === type ? 'bg-green-500 text-black' : 'border-green-500 text-green-400'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {filtered.map(project => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="group relative overflow-hidden rounded-xl border border-white/10 shadow-lg hover:shadow-green-500/20 transition"
            >
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-lg font-bold">
                {project.title}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-green-500 rounded-full mix-blend-lighten blur-2xl opacity-10 animate-ping"></div>
      </div>
    </section>
  );
}