'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

/**
 * Animated number counter that counts up when scrolled into view.
 *
 * @param {number} target   - Final number to count to
 * @param {string} suffix   - Suffix to append ('+', '%', 'K', etc.)
 * @param {string} prefix   - Prefix to prepend ('$', etc.)
 * @param {number} duration - Animation duration in ms (default 2000)
 * @param {string} label    - Descriptive label shown below the number
 */
export default function StatCounter({
  target = 100,
  suffix = '',
  prefix = '',
  duration = 2000,
  label = '',
  className = '',
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const started = useRef(false);

  useEffect(() => {
    if (!isInView || started.current) return;
    started.current = true;

    const startTime = performance.now();
    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return (
    <div ref={ref} className={`text-center ${className}`}>
      <p className="font-heading font-bold text-4xl md:text-5xl"
         style={{ color: 'var(--secondary)' }}>
        {prefix}{count.toLocaleString()}{suffix}
      </p>
      {label && (
        <p className="mt-2 text-sm font-medium text-white/80 uppercase tracking-widest">
          {label}
        </p>
      )}
    </div>
  );
}
