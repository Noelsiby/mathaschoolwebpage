'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown, ArrowRight } from 'lucide-react';
import ImagePlaceholder from './ImagePlaceholder';

export default function HeroSection() {
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], ['0%', '50%']); // 0.5x parallax
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Check mobile for disabling parallax if needed, or adjusting layout
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Animation variants
  const wordAnimation = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] } }
  };

  const typewriterContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 1.0,
        staggerChildren: 0.05
      }
    }
  };

  const typewriterChar = {
    hidden: { opacity: 0, display: 'none' },
    visible: { opacity: 1, display: 'inline' }
  };

  return (
    <section className="relative w-full h-screen min-h-[600px] flex flex-col justify-center overflow-hidden" aria-label="Hero section">
      
      {/* ─── BACKGROUND LAYER & PARALLAX ─── */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: isMobile ? 0 : backgroundY }}
      >
        <ImagePlaceholder
          label="School Building / Campus Hero Photo"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
          variant="dark"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/50 text-xs text-center z-10 w-full px-4">
          This will be replaced with an actual school campus photo — ideally a wide angle shot of the school building
        </div>
      </motion.div>

      {/* ─── OVERLAY ─── */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: 'linear-gradient(135deg, rgba(26, 46, 108, 0.85) 0%, rgba(13, 27, 62, 0.70) 50%, rgba(245, 183, 0, 0.20) 100%)'
        }}
      />

      {/* ─── CONTENT ─── */}
      <div className="relative z-20 container-custom w-full px-6 md:px-12 flex flex-col justify-center h-full pt-16">
        <div className="max-w-4xl text-center md:text-left mx-auto md:mx-0 flex flex-col items-center md:items-start">
          
          {/* Layer 1: Small Label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
            className="mb-4"
          >
            <span style={{ color: '#F5B700', fontSize: '14px', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: 600 }}>
              ✦ Welcome to
            </span>
          </motion.div>

          {/* Layer 2: School Name */}
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.05, delayChildren: 0.4 }}
            className="flex flex-col items-center md:items-start mb-3"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            <div className="flex flex-wrap justify-center md:justify-start gap-x-4">
              <motion.span variants={wordAnimation} className="text-white font-bold leading-tight" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
                MATHA
              </motion.span>
              <motion.span variants={wordAnimation} className="text-white font-bold leading-tight" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
                ENGLISH
              </motion.span>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-x-4">
              <motion.span variants={wordAnimation} style={{ color: '#F5B700', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }} className="font-bold leading-tight">
                MEDIUM
              </motion.span>
              <motion.span variants={wordAnimation} style={{ color: '#F5B700', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }} className="font-bold leading-tight">
                SCHOOL
              </motion.span>
            </div>
          </motion.div>

          {/* Layer 3: Location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mb-6"
          >
            <p className="text-white font-light tracking-wide" style={{ fontSize: 'clamp(14px, 2vw, 18px)' }}>
              Kaikalur, Andhra Pradesh
            </p>
          </motion.div>

          {/* Layer 4: Tagline (Typewriter) */}
          <motion.div
            variants={typewriterContainer}
            initial="hidden"
            animate="visible"
            className="mb-10 min-h-[40px]"
            style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(22px, 3.5vw, 32px)', color: '#F5B700', fontStyle: 'italic' }}
          >
            {"Path to Success".split('').map((char, index) => (
              <motion.span key={index} variants={typewriterChar}>
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.div>

          {/* Layer 5: Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="w-full max-w-3xl mb-12"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 md:gap-y-0 rounded-2xl md:rounded-full bg-white/5 border border-white/10 backdrop-blur-md py-4 md:py-5">
              {[
                { val: '500+', lbl: 'Students' },
                { val: '14', lbl: 'Classes' },
                { val: '19+', lbl: 'Teachers' },
                { val: 'Est.', lbl: '2000' }
              ].map((stat, i) => (
                <div key={i} className={`flex flex-col items-center justify-center ${i % 2 !== 0 && isMobile ? '' : 'border-r-0 md:border-r'} ${i !== 3 && !isMobile ? 'border-white/20' : 'border-transparent'} ${i === 1 && isMobile ? 'border-r border-white/20' : ''}`}>
                  <span className="font-bold font-heading text-2xl md:text-3xl" style={{ color: '#F5B700' }}>
                    {stat.val}
                  </span>
                  <span className="text-white text-xs md:text-sm uppercase tracking-wider opacity-80 mt-1">
                    {stat.lbl}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Layer 6: CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 w-full md:w-auto"
          >
            {/* Button 1 */}
            <Link href="/about" className="group flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold transition-all duration-300 w-full sm:w-auto"
              style={{
                background: '#F5B700',
                color: '#0D1B3E',
                boxShadow: '0 4px 15px rgba(245, 183, 0, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(245, 183, 0, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(245, 183, 0, 0.2)';
              }}
            >
              Explore Our School <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Button 2 */}
            <a href={process.env.NEXT_PUBLIC_RESULTS_URL || "https://results.mathaschool.in"} target="_blank" rel="noopener noreferrer" 
               className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold transition-all duration-300 border-2 w-full sm:w-auto"
               style={{
                 borderColor: '#F5B700',
                 color: '#fff',
               }}
               onMouseEnter={(e) => {
                 e.currentTarget.style.background = '#F5B700';
                 e.currentTarget.style.color = '#0D1B3E';
               }}
               onMouseLeave={(e) => {
                 e.currentTarget.style.background = 'transparent';
                 e.currentTarget.style.color = '#fff';
               }}
            >
              View Results &rarr;
            </a>
          </motion.div>

        </div>
      </div>

      {/* ─── SCROLL INDICATOR ─── */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ delay: 2.2, duration: 0.8 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
          >
            <span className="text-white/60 text-xs tracking-widest uppercase mb-2">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            >
              <ChevronDown className="text-white/80 w-6 h-6" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}


