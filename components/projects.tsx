'use client';

import { motion, useAnimationControls } from 'framer-motion';
import Image from 'next/image';
import { FaPlay, FaFilm } from 'react-icons/fa';
import { useRef, useState, useEffect } from 'react';
import { projects } from './content';

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    if (videoSrc && videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          if (error.name !== 'AbortError') {
            console.error("Video play error:", error);
          }
        });
      }
    }
  }, [videoSrc]);

  useEffect(() => {
    return () => {
      if (videoSrc) {
        URL.revokeObjectURL(videoSrc);
      }
    };
  }, [videoSrc]);

  const handlePlay = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(preview);
      const videoBlob = await response.blob();
      const blobUrl = URL.createObjectURL(videoBlob);
      setVideoSrc(blobUrl);
    } catch (error) {
      console.error("Error fetching video:", error);
      setIsLoading(false);
    }
  };

  const handlePause = () => {
    videoRef.current?.pause();
  };
  
  const videoEventHandlers = {
    onPlaying: () => {
      setIsLoading(false);
      setIsPlaying(true);
    },
    onPause: () => {
      setIsPlaying(false);
    },
    onEnded: () => {
      setIsPlaying(false);
      setIsLoading(false);
      setVideoSrc(null); 
    },
  };

  return (
    <motion.div
      className={`relative w-full md:w-1/2 ${
          isReel ? 'aspect-[9/16] mx-auto md:max-w-[300px]' : 'aspect-video'
        } overflow-hidden rounded-xl shadow-2xl bg-black`}
    >
      <Image
        src={thumbnail}
        alt={title}
        fill
        className={`object-cover transition-opacity duration-300 ${isPlaying || isLoading ? 'opacity-0' : 'opacity-100'}`}
      />
      
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          onClick={handlePause}
          {...videoEventHandlers}
          className={`w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
      
      {!isLoading && !isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <button
              onClick={handlePlay}
              aria-label="Play video"
              className="text-white/80 transition-transform duration-300 hover:scale-110"
            >
              <FaPlay className="w-16 h-16" style={{ filter: 'drop-shadow(0 2px 8px rgb(0 0 0 / 0.5))'}} />
            </button>
        </div>
      )}

      {isLoading && (
         <div className="absolute inset-0 flex items-center justify-center">
            <svg className="animate-spin h-12 w-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
         </div>
      )}
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
                <CreativeIcon iconType={project.icon} />
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
