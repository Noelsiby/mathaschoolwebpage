'use client';

import { useState, useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

export function useIntroAnimation() {
  const [showIntro, setShowIntro] = useState(true);
  const [isRevealed, setIsRevealed] = useState(false);
  
  // progress goes from 0 to 1
  const progressRaw = useMotionValue(0);
  const progress = useSpring(progressRaw, { stiffness: 100, damping: 20, restDelta: 0.001 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const seen = sessionStorage.getItem('introSeen');
      if (seen) {
        setShowIntro(false);
        setIsRevealed(true);
        progressRaw.set(1);
      } else {
        // Prevent background scrolling while intro is active
        document.body.style.overflow = 'hidden';
      }
    }
  }, [progressRaw]);

  useEffect(() => {
    if (!showIntro || isRevealed) return;

    let touchStartY = 0;

    const handleWheel = (e) => {
      // e.deltaY > 0 means scrolling down (which means swiping up on trackpad)
      if (e.deltaY > 0) {
        const newProg = Math.min(progressRaw.get() + (e.deltaY / 1000), 1);
        progressRaw.set(newProg);
        checkCompletion(newProg);
      }
    };

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const touchY = e.touches[0].clientY;
      const delta = touchStartY - touchY;
      
      // delta > 0 means swiping up (finger moves up)
      if (delta > 0) {
        const newProg = Math.min(progressRaw.get() + (delta / 500), 1);
        progressRaw.set(newProg);
        checkCompletion(newProg);
        touchStartY = touchY;
      }
    };

    const checkCompletion = (val) => {
      if (val >= 1) {
        setIsRevealed(true);
        sessionStorage.setItem('introSeen', 'true');
        document.body.style.overflow = 'auto';
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      document.body.style.overflow = 'auto';
    };
  }, [showIntro, isRevealed, progressRaw]);

  return { showIntro, isRevealed, progress };
}
