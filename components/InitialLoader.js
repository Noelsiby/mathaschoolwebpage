'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InitialLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only show loader once per session
    const hasLoaded = sessionStorage.getItem('initialLoadDone');
    
    if (hasLoaded) {
      setLoading(false);
    } else {
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem('initialLoadDone', 'true');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] bg-[#0D1B3E] flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            {/* Logo placeholder animation */}
            <div className="w-24 h-24 rounded-full border-4 border-[#F5B700] mb-6 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/10 animate-pulse" />
            </div>
            
            <h1 className="text-white text-2xl md:text-4xl font-bold tracking-widest uppercase mb-8 text-center" style={{ fontFamily: '"Playfair Display", serif' }}>
              {process.env.NEXT_PUBLIC_SCHOOL_NAME || "Matha English Medium School"}
            </h1>
            
            {/* Loading Bar */}
            <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                className="h-full bg-[#F5B700]"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

