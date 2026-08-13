'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="bg-[#0D1B3E] min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6">
      {/* Decorative Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#F5B700] rounded-full blur-[120px] opacity-10 pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center flex flex-col items-center"
      >
        <div className="w-24 h-24 border-4 border-[#F5B700] rounded-full mb-8 flex items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-[#F5B700]/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <span className="text-[#F5B700] text-3xl font-bold">M</span>
        </div>

        <motion.h1 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
          className="text-[#F5B700] font-bold text-8xl md:text-9xl mb-4" 
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          404
        </motion.h1>

        <h2 className="text-white text-2xl md:text-3xl font-bold mb-6">Oops! Page Not Found</h2>
        
        <p className="text-white/70 max-w-md mx-auto mb-10 leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <Link href="/" className="inline-flex items-center gap-2 bg-[#F5B700] text-[#0D1B3E] font-bold px-8 py-4 rounded-full hover:bg-white transition-colors group">
          <Home className="w-5 h-5" /> Go Back Home 
          <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </div>
  );
}
