'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';

export default function BackgroundEffects() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const background = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(600px at ${x}px ${y}px, rgba(139, 92, 246, 0.15), transparent 80%)`
  );

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-full h-full z-[-3] pointer-events-none"
        style={{ background }}
      />
      <div className="fixed top-0 left-0 w-full h-full z-[-4] pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'url(/noise.svg)' }}></div>
    </>
  );
}