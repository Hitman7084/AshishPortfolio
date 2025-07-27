'use client';
import { motion } from 'framer-motion';
import { FaPlay, FaFilm } from 'react-icons/fa';

const projects = [
  {
    id: 1,
    title: 'Jealousy spreads fast',
    description: 'Not every smile is genuine. Share the wrong secret, and you will learn how fast jealousy truly spreads.',
    duration: '0:18',
    thumbnail: '/thumbnails/enemy.jpg',
    preview: '/previews/pro1.mp4',
    isReel: true
  },
  {
    id: 2,
    title: 'Admission in College',
    description: 'A dummy reel showcasing the journey of a student getting admitted into college, filled with excitement and challenges.',
    duration: '0:56',
    thumbnail: '/thumbnails/admission.jpg',
    preview: '/previews/pro2.mp4',
    isReel: true
  },
  {
    id: 3,
    title: 'Urban Exploration',
    description: 'Money is a powerful tool, but it can also be a dangerous game. This cinematic piece explores the allure and risks of wealth.',
    duration: '0:11',
    thumbnail: '/thumbnails/money.jpg',
    preview: '/previews/pro3.mp4',
    isReel: false
  },
  // maybe add more idk
];

export default function ProjectsShowcase() {
  return (
    <section id="projects" className="py-24 px-6 md:px-20 bg-black text-white relative overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-6xl font-serif font-bold mb-16 text-center"
      >
        Cinematic Works
      </motion.h2>

      <div className="space-y-28">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? '' : 'md:flex-row-reverse'} gap-8 md:gap-12`}
          >
            {/* Thumbnail / Video Preview */}
            <div className={`relative w-full md:w-1/2 ${
                project.isReel ? 'aspect-[9/16] mx-auto md:max-w-[300px]' : 'aspect-video'
              } overflow-hidden rounded-xl group shadow-2xl cursor-pointer`}>
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-500 group-hover:opacity-0"
              />
              <video
                src={project.preview}
                muted
                loop
                playsInline
                autoPlay
                className="w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            </div>

            {/* Content */}
            <div className="w-full md:w-1/2 space-y-4">
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-violet-300">{project.title}</h3>
              <p className="text-lg text-white/80 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-4 mt-4">
                <span className="text-sm text-white/60 flex items-center gap-2">
                  <FaFilm /> Original video duration: {project.duration}
                </span>
              </div>
              <button className="mt-6 inline-flex items-center gap-2 bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-violet-400 transition">
                <FaPlay /> Watch Full
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}