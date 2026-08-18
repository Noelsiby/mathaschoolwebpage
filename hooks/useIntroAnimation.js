'use client';

import { useState, useEffect, useRef } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

export function useIntroAnimation() {
  // Default to already revealed — server render + returning visitors get site instantly
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
      // Already seen — restore scroll just in case and return
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

      // Animate fly-through (progress → 1), then hard-reveal after animation plays
      progressRaw.set(1);
      setTimeout(() => {
        setIsRevealed(true);
        setShowIntro(false);
        window.scrollTo(0, 0);
      }, 900);
    };

    const handleWheel = (e) => {
      if (completedRef.current) return;
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
      // Upward swipe of 15px+ triggers entry
      if (delta > 15) {
        e.preventDefault();
        complete();
      }
    };

    // Tap anywhere on the INTRO SCREEN only (not on links/buttons) to enter
    // We use a named handler so we can remove it cleanly
    const handleIntroTap = (e) => {
      if (completedRef.current) return;
      // Only trigger if the tap target is the intro overlay itself,
      // not a child button/link — this prevents interfering with nav
      const introEl = document.getElementById('intro-screen-overlay');
      if (introEl && introEl.contains(e.target)) {
        complete();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('click', handleIntroTap);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('click', handleIntroTap);
      document.body.style.overflow = '';
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { showIntro, isRevealed, progress };
}
