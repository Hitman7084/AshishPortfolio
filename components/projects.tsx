'use client';

import { motion, useAnimationControls } from 'framer-motion';
import { FaFilm } from 'react-icons/fa';
import { useRef, useState, useEffect } from 'react';

const projects = [
  {
    id: 1,
    title: 'Jealousy spreads fast',
    description: 'Not every smile is genuine. Share the wrong secret, and you will learn how fast jealousy truly spreads.',
    duration: '0:18',
    thumbnail: '/thumbnails/enemy.jpg',
    preview: '/previews/pro1.mp4',
    isReel: true,
    icon: 'keyhole'
  },
  {
    id: 2,
    title: 'Admission in College',
    description: 'A dummy reel showcasing the journey of a student getting admitted into college, filled with excitement and challenges.',
    duration: '0:56',
    thumbnail: '/thumbnails/admission.jpg',
    preview: '/previews/pro2.mp4',
    isReel: true,
    icon: 'confetti'
  },
  {
    id: 3,
    title: 'Urban Exploration',
    description: 'Money is a powerful tool, but it can also be a dangerous game. This cinematic piece explores the allure and risks of wealth.',
    duration: '0:11',
    thumbnail: '/thumbnails/money.jpg',
    preview: '/previews/pro3.mp4',
    isReel: false,
    icon: 'gem'
  },
];

type ProjectVideoPlayerProps = {
  preview: string;
  thumbnail: string;
  isReel: boolean;
  title: string;
};

type CreativeIconProps = {
  iconType: 'keyhole' | 'confetti' | 'gem';
};



function CreativeIcon({ iconType }: CreativeIconProps) {
  const controls = useAnimationControls();

  const handleClick = () => {
    controls.start({
      rotate: [0, 360],
      scale: [1, 1.2, 1],
      transition: { duration: 0.7, ease: "easeInOut" },
    });
  };

  const getIcon = () => {
    switch (iconType) {
      case 'keyhole':
        return (
          <svg className="w-8 h-8 text-violet-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
          </svg>
        );
      case 'confetti':
        return (
          <svg className="w-8 h-8 text-violet-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 22.5l-.648-1.938a3.375 3.375 0 00-2.684-2.684L11.25 18l1.938-.648a3.375 3.375 0 002.684-2.684L16.25 13.5l.648 1.938a3.375 3.375 0 002.684 2.684L21.75 18l-1.938.648a3.375 3.375 0 00-2.684 2.684z" />
          </svg>
        );
      case 'gem':
        return (
          <svg className="w-8 h-8 text-violet-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
        );
    }
  };

  return (
    <motion.div
      className="cursor-pointer"
      onClick={handleClick}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <motion.div animate={controls}>
        {getIcon()}
      </motion.div>
    </motion.div>
  );
}


function ProjectVideoPlayer({ preview, thumbnail, isReel, title }: ProjectVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (isInView) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [isInView]);

  return (
    <motion.div
      onViewportEnter={() => setIsInView(true)}
      onViewportLeave={() => setIsInView(false)}
      className={`relative w-full md:w-1/2 ${
          isReel ? 'aspect-[9/16] mx-auto md:max-w-[300px]' : 'aspect-video'
        } overflow-hidden rounded-xl shadow-2xl`}
    >
      <img
        src={thumbnail}
        alt={title}
        className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-500 ${isInView ? 'opacity-0' : 'opacity-100'}`}
      />
      <video
        ref={videoRef}
        src={preview}
        muted
        loop
        playsInline
        className={`w-full h-full object-cover transition-opacity duration-500 ${isInView ? 'opacity-100' : 'opacity-0'}`}
      />
    </motion.div>
  );
}


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
            <ProjectVideoPlayer
              preview={project.preview}
              thumbnail={project.thumbnail}
              isReel={project.isReel}
              title={project.title}
            />
            <div className="w-full md:w-1/2 space-y-4 relative">
               <div className="absolute -top-4 right-0 md:-right-4 z-10">
                <CreativeIcon iconType={project.icon as 'keyhole' | 'confetti' | 'gem'} />
              </div>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-violet-300">{project.title}</h3>
              <p className="text-lg text-white/80 leading-relaxed">{project.description}</p>
              <div className="flex items-center gap-2 text-sm text-white/60 pt-2">
                 <FaFilm />
                 <span>Duration: {project.duration}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}