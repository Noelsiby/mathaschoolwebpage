'use client';

import { motion, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function IntroScreen({ progress }) {
  // Fly-through transforms based on scroll progress (0 to 1)
  
  // Background fades out
  const bgOpacity = useTransform(progress, [0.4, 1], [1, 0]);
  
  // Logo scales up massively and then fades out
  const logoScale = useTransform(progress, [0, 1], [1, 25]);
  const logoOpacity = useTransform(progress, [0.6, 1], [1, 0]);
  
  // Text and particles fade out quickly as soon as you start scrolling
  const textOpacity = useTransform(progress, [0, 0.3], [1, 0]);
  
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    // Generate 15 random particles
    const newParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      size: Math.floor(Math.random() * 6) + 3,
      left: Math.floor(Math.random() * 100),
      duration: Math.floor(Math.random() * 5) + 4,
      delay: Math.random() * 4,
    }));
    setParticles(newParticles);
  }, []);

  const schoolName = process.env.NEXT_PUBLIC_SCHOOL_NAME || "MATHA ENGLISH MEDIUM SCHOOL";
  const nameLetters = schoolName.toUpperCase().split("");

  return (
    <motion.div 
      style={{ opacity: bgOpacity }}
      className="fixed inset-0 z-[9999] bg-[#1A2E6C] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Particles Background */}
      <motion.div style={{ opacity: textOpacity }} className="absolute inset-0 hidden md:block">
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
      </motion.div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 h-full justify-center mt-[-10vh]">
        
        {/* Pulsing Aura Behind Logo */}
        <motion.div 
          style={{ opacity: textOpacity }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.3, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[250px] h-[250px] md:w-[350px] md:h-[350px] bg-[#F5B700] rounded-full blur-[100px] z-0"
        />

        {/* Logo Container (Scales up on scroll) */}
        <motion.div
          style={{ scale: logoScale, opacity: logoOpacity }}
          className="relative z-10 origin-center flex flex-col items-center"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-[120px] h-[120px] md:w-[180px] md:h-[180px] relative mb-10 overflow-hidden"
          >
            <Image
              src="/logo/matha-logo.png"
              alt="Matha School Logo"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
            
            {/* Diagonal Light Sweep Effect */}
            <motion.div 
              initial={{ x: '-150%', y: '-100%', rotate: 45 }}
              animate={{ x: '150%', y: '100%', rotate: 45 }}
              transition={{ delay: 1, duration: 2, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-transparent w-[200%] h-[50%]"
            />
          </motion.div>
        </motion.div>

        {/* School Name */}
        <motion.div style={{ opacity: textOpacity }} className="flex flex-wrap justify-center overflow-hidden mb-4 relative z-10">
          {nameLetters.map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 1 + (index * 0.04), duration: 0.6 }}
              className={`text-white text-xl md:text-[32px] tracking-[6px] font-bold ${letter === ' ' ? 'w-3 md:w-5' : ''}`}
              style={{ fontFamily: '"Playfair Display", serif', textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>

        {/* Location */}
        <motion.div
          style={{ opacity: textOpacity }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.5 }}
          className="text-[#F5B700] text-sm md:text-base font-medium mb-10 uppercase tracking-widest relative z-10"
        >
          Kaikalur, Andhra Pradesh
        </motion.div>

        {/* Tagline Typewriter */}
        <motion.div
          style={{ opacity: textOpacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="text-[#F5B700] italic text-lg md:text-[28px] relative z-10"
          style={{ fontFamily: '"Playfair Display", serif', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
        >
          {"Path to Success".split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 1.5, filter: "blur(5px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ delay: 2.2 + (index * 0.06), type: "spring" }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Scroll Hint */}
      <motion.div
        style={{ opacity: textOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
        className="absolute bottom-12 left-0 right-0 flex flex-col items-center text-white/80"
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowUp className="w-6 h-6 mb-3 text-[#F5B700]" />
        </motion.div>
        <span className="text-[13px] uppercase tracking-widest font-semibold hidden md:block">
          Scroll up to enter
        </span>
        <span className="text-[13px] uppercase tracking-widest font-semibold md:hidden block">
          Swipe up to enter
        </span>
      </motion.div>
    </motion.div>
  );
}
