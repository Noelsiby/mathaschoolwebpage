'use client';

import { motion } from 'framer-motion';

export default function AnimatedElement({
  children,
  className = '',
  animation = 'fadeUp',
  delay = 0,
  duration = 0.6,
  as: Tag = 'div',
  ...props
}) {
  const variants = {
    fadeUp: {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0 },
    },
    fadeLeft: {
      hidden: { opacity: 0, x: -60 },
      visible: { opacity: 1, x: 0 },
    },
    fadeRight: {
      hidden: { opacity: 0, x: 60 },
      visible: { opacity: 1, x: 0 },
    },
    scaleIn: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
    staggerContainer: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: delay,
        },
      },
    },
    staggerItem: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration } },
    },
  };

  const MotionTag = motion[Tag] ?? motion.div;

  if (animation === 'staggerItem') {
    // staggerItem doesn't need its own whileInView, it inherits from staggerContainer
    return (
      <MotionTag className={className} variants={variants.staggerItem} {...props}>
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={variants[animation] || variants.fadeUp}
      transition={{
        duration,
        delay: animation !== 'staggerContainer' ? delay : undefined,
        ease: 'easeOut',
      }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
