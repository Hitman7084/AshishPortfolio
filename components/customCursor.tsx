'use client';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [isClient, setIsClient] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    setIsClient(true);

    document.body.style.cursor = 'none';

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);

    // Restore the default cursor when the component unmounts
    return () => {
      document.body.style.cursor = 'auto';
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
        className="fixed w-8 h-8 border-2 border-accent-secondary rounded-full pointer-events-none"
        style={{
          translateX: springX,
          translateY: springY,
          left: -16,
          top: -16,
          zIndex: 99999,
        }}
      />
      {/* The small, precise dot */}
      <motion.div
        className="fixed w-2 h-2 bg-foreground rounded-full pointer-events-none"
        style={{
          translateX: cursorX,
          translateY: cursorY,
          top: -4,
          left: -4,
          zIndex: 99999,
        }}
      />
    </>
  );
}