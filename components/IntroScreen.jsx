'use client';

import { motion, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function IntroScreen({ progress }) {
  // Translate up as progress goes from 0 to 1
  const y = useTransform(progress, [0, 1], ['0vh', '-100vh']);
  
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    // Generate 15 random particles
    const newParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      size: Math.floor(Math.random() * 6) + 3, // 3px to 8px
      left: Math.floor(Math.random() * 100), // 0% to 100%
      duration: Math.floor(Math.random() * 5) + 4, // 4s to 8s
      delay: Math.random() * 4, // 0s to 4s
    }));
    setParticles(newParticles);
  }, []);

  const schoolName = process.env.NEXT_PUBLIC_SCHOOL_NAME || "MATHA ENGLISH MEDIUM SCHOOL";
  const nameLetters = schoolName.toUpperCase().split("");

  return (
    <motion.div 
      style={{ y }}
      className="fixed inset-0 z-[9999] bg-[#1A2E6C] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Particles Background */}
      <div className="absolute inset-0 hidden md:block">
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              bottom: '-10px',
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] relative mb-8"
        >
          <Image
            src="/logo/matha-logo.png"
            alt="Matha School Logo"
            fill
            className="object-contain"
            priority
          />
        </motion.div>

        {/* School Name */}
        <div className="flex flex-wrap justify-center overflow-hidden mb-4">
          {nameLetters.map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + (index * 0.03), duration: 0.4 }}
              className={`text-white text-xl md:text-[28px] tracking-[4px] ${letter === ' ' ? 'w-3 md:w-4' : ''}`}
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="text-[#F5B700] text-sm md:text-base font-medium mb-8 uppercase tracking-widest"
        >
          Kaikalur, Andhra Pradesh
        </motion.div>

        {/* Tagline Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="text-[#F5B700] italic text-lg md:text-[24px]"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          {"Path to Success".split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 + (index * 0.05) }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Scroll Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-12 left-0 right-0 flex flex-col items-center text-white/70"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowUp className="w-5 h-5 mb-2" />
        </motion.div>
        <span className="text-[12px] uppercase tracking-wider font-medium hidden md:block">
          Scroll up to enter
        </span>
        <span className="text-[12px] uppercase tracking-wider font-medium md:hidden block">
          Swipe up to enter
        </span>
      </motion.div>
    </motion.div>
  );
}
