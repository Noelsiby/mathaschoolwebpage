'use client';

import { useIntroAnimation } from '@/hooks/useIntroAnimation';
import IntroScreen from './IntroScreen';
import { motion, useTransform } from 'framer-motion';

export default function IntroWrapper({ children }) {
  const { showIntro, isRevealed, progress } = useIntroAnimation();
  
  // As progress goes from 0 to 1, the main content moves from 100vh to 0vh
  const y = useTransform(progress, [0, 1], ['100vh', '0vh']);

  return (
    <>
      {showIntro && <IntroScreen progress={progress} />}
      <motion.div 
        style={!isRevealed ? { y } : {}}
        className="flex flex-col min-h-screen relative z-0"
      >
        {children}
      </motion.div>
    </>
  );
}
