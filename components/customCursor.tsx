'use client';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [isClient, setIsClient] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

    // Use spring for smooth cursor movement
  const springConfig = { damping: 25, stiffness: 700 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    setIsClient(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);

  if (!isClient) {
    return null;
  }

  return (
    <>
      {/* The larger, outlined circle with a delay */}
      <motion.div
        className="hidden md:block fixed w-8 h-8 border-2 border-accent-secondary rounded-full pointer-events-none"
        style={{
          translateX: springX,
          translateY: springY,
          left: -16,
          top: -16,
        }}
      />
      {/* The small, precise dot */}
      <motion.div
        className="hidden md:block fixed w-2 h-2 bg-foreground rounded-full pointer-events-none"
        style={{
          translateX: cursorX,
          translateY: cursorY,
          top: -4,
          left: -4, 
        }}
      />
    </>
  );
}
