'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

/**
 * Reusable scroll-triggered animation wrapper.
 *
 * @param {React.ReactNode} children
 * @param {string}  className  - Additional classes for the wrapper div
 * @param {string}  direction  - 'up' | 'down' | 'left' | 'right' | 'none'
 * @param {number}  delay      - Seconds to delay animation (default 0)
 * @param {number}  duration   - Animation duration in seconds (default 0.7)
 * @param {string}  as         - HTML element to render ('div' | 'section' | 'li' etc.)
 */
export default function AnimatedSection({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.7,
  as: Tag = 'div',
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const directionMap = {
    up:    { hidden: { opacity: 0, y: 40 },  visible: { opacity: 1, y: 0 } },
    down:  { hidden: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0 } },
    left:  { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 40 },  visible: { opacity: 1, x: 0 } },
    none:  { hidden: { opacity: 0 },          visible: { opacity: 1 } },
  };

  const variants = directionMap[direction] || directionMap.up;

  const MotionTag = motion[Tag] ?? motion.div;

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}
