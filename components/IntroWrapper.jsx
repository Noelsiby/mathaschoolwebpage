'use client';

import { useIntroAnimation } from '@/hooks/useIntroAnimation';
import IntroScreen from './IntroScreen';
import { motion, useTransform } from 'framer-motion';

export default function IntroWrapper({ children }) {
  const { showIntro, isRevealed, progress } = useIntroAnimation();
  
  // Fade and scale the site in as the user scrolls through the intro.
  // Once fully revealed, remove all motion styles so nothing is ever invisible or blocked.
  const opacity = useTransform(progress, [0.5, 1], [0, 1]);
  const scale   = useTransform(progress, [0, 0.7, 1], [0.9, 0.97, 1]);

  return (
    <>
      {showIntro && <IntroScreen progress={progress} />}
      <motion.div
        // Only apply animation styles while the intro is actively playing
        style={(!isRevealed && showIntro) ? { opacity, scale } : {}}
        className="flex flex-col min-h-screen"
      >
        {children}
      </motion.div>
    </>
  );
}
