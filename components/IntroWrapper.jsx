'use client';

import { useIntroAnimation } from '@/hooks/useIntroAnimation';
import IntroScreen from './IntroScreen';
import { motion, useTransform } from 'framer-motion';

export default function IntroWrapper({ children }) {
  const { showIntro, isRevealed, progress } = useIntroAnimation();
  
  // Fly-through effect on main content
  const opacity = useTransform(progress, [0.6, 1], [0, 1]);
  const scale = useTransform(progress, [0, 1], [0.9, 1]);

  return (
    <>
      {showIntro && <IntroScreen progress={progress} />}
      <motion.div 
        style={!isRevealed ? { opacity, scale } : {}}
        className="flex flex-col min-h-screen relative z-0"
      >
        {children}
      </motion.div>
    </>
  );
}
