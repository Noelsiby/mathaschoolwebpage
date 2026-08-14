'use client';

import { useState, useEffect, useRef } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

export function useIntroAnimation() {
  // Default to already revealed so server-render and returning visitors get the site instantly
  const [showIntro, setShowIntro] = useState(false);
  const [isRevealed, setIsRevealed] = useState(true);

  const progressRaw = useMotionValue(1);
  const progress = useSpring(progressRaw, { stiffness: 80, damping: 18, restDelta: 0.001 });
  const completedRef = useRef(false);
  const touchStartY = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const seen = sessionStorage.getItem('introSeen');
    if (seen) {
      document.body.style.overflow = '';
      return;
    }

    // First visit — show the intro
    setShowIntro(true);
    setIsRevealed(false);
    progressRaw.set(0);
    document.body.style.overflow = 'hidden';

    const complete = () => {
      if (completedRef.current) return;
      completedRef.current = true;
      sessionStorage.setItem('introSeen', 'true');
      document.body.style.overflow = '';
      // Animate progress to 1 (triggers fly-through), then hard-reveal after animation
      progressRaw.set(1);
      setTimeout(() => {
        setIsRevealed(true);
        setShowIntro(false);
        window.scrollTo(0, 0);
      }, 900);
    };

    const handleWheel = (e) => {
      if (completedRef.current) return;
      // Any downward scroll → instantly trigger completion
      if (e.deltaY > 0) {
        e.preventDefault();
        complete();
      }
    };

    const handleTouchStart = (e) => {
      if (completedRef.current) return;
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (completedRef.current) return;
      const delta = touchStartY.current - e.touches[0].clientY;
      // Any upward swipe of 10px+ → instantly trigger completion
      if (delta > 10) {
        e.preventDefault();
        complete();
      }
    };

    // Also allow a tap/click on the screen to enter (mobile friendly)
    const handleClick = () => {
      if (completedRef.current) return;
      complete();
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('click', handleClick);
      document.body.style.overflow = '';
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { showIntro, isRevealed, progress };
}
