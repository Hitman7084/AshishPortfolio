'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Delay to simulate hydration

    return () => clearTimeout(timeout);
  }, []);

  if (!isLoading) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <div className="text-center">
        <div className="animate-spin rounded-full border-t-4 border-b-4 border-white h-16 w-16 mx-auto mb-4"></div>
        <p className="text-lg font-semibold">Loading B</p> 
      </div>
    </motion.div>
  );
}
