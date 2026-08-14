'use client';

import { useState, useEffect, useRef } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

export function useIntroAnimation() {
  // Default to already revealed so server render and non-intro paths work cleanly
  const [showIntro, setShowIntro] = useState(false);
  const [isRevealed, setIsRevealed] = useState(true);
  
  const progressRaw = useMotionValue(1);
  const progress = useSpring(progressRaw, { stiffness: 80, damping: 18, restDelta: 0.001 });
  const touchStartY = useRef(0);
  const completedRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const seen = sessionStorage.getItem('introSeen');
    if (seen) {
      // Already seen — keep defaults (revealed, no intro)
      document.body.style.overflow = '';
      return;
    }

    // First visit — show intro
    setShowIntro(true);
    setIsRevealed(false);
    progressRaw.set(0);
    document.body.style.overflow = 'hidden';

    const complete = () => {
      if (completedRef.current) return;
      completedRef.current = true;
      sessionStorage.setItem('introSeen', 'true');
      document.body.style.overflow = '';
      progressRaw.set(1);
      // Small delay so the fly-through animation plays, then hard-reveal
      setTimeout(() => {
        setIsRevealed(true);
        setShowIntro(false);
      }, 800);
    };

    const handleWheel = (e) => {
      if (completedRef.current) return;
      // Only intercept downward scroll (scrolling down = intent to enter)
      if (e.deltaY > 0) {
        e.preventDefault();
        const newProg = Math.min(progressRaw.get() + Math.abs(e.deltaY) / 600, 1);
        progressRaw.set(newProg);
        if (newProg >= 1) complete();
      }
    };

    const handleTouchStart = (e) => {
      if (completedRef.current) return;
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (completedRef.current) return;
      const delta = touchStartY.current - e.touches[0].clientY;
      if (delta > 0) {
        // Only prevent default scroll when actively driving the intro animation
        e.preventDefault();
        const newProg = Math.min(progressRaw.get() + delta / 400, 1);
        progressRaw.set(newProg);
        touchStartY.current = e.touches[0].clientY;
        if (newProg >= 1) complete();
      }
    };

    // Safety fallback — if user somehow can't scroll (trackpad etc.), 
    // auto-complete after 6 seconds so the site is never permanently blocked
    const safetyTimer = setTimeout(() => {
      if (!completedRef.current) complete();
    }, 6500);

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      clearTimeout(safetyTimer);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      // Always restore scroll on cleanup
      document.body.style.overflow = '';
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { showIntro, isRevealed, progress };
}
