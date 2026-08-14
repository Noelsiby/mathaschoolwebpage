'use client';

import { motion, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

// ─── Particle data generated once ───────────────────────────────────────
function makeParticles(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 5 + 1.5,
    duration: Math.random() * 8 + 5,
    delay: Math.random() * 6,
    drift: (Math.random() - 0.5) * 80,
    opacity: Math.random() * 0.6 + 0.2,
  }));
}

function makeLightRays(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    angle: (i / count) * 360,
    length: Math.random() * 40 + 30,
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 3,
    opacity: Math.random() * 0.15 + 0.05,
  }));
}

// ─── Individual floating particle ───────────────────────────────────────
function Particle({ p }) {
  return (
    <motion.div
      key={p.id}
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${p.x}%`,
        top: `${p.y}%`,
        width: p.size,
        height: p.size,
        background: `radial-gradient(circle, #F5B700, #E09900)`,
        boxShadow: `0 0 ${p.size * 3}px #F5B700`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, p.opacity, p.opacity * 0.5, 0],
        scale: [0, 1, 0.8, 0],
        x: [0, p.drift, p.drift * 0.5, 0],
        y: [0, -80, -160, -220],
      }}
      transition={{
        duration: p.duration,
        delay: p.delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

// ─── Orbiting ring dot ───────────────────────────────────────────────────
function OrbitDot({ radius, angle, size, duration, color = '#F5B700', delay = 0 }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        background: color,
        boxShadow: `0 0 ${size * 4}px ${color}`,
        top: '50%',
        left: '50%',
      }}
      animate={{
        x: [
          Math.cos((angle * Math.PI) / 180) * radius - size / 2,
          Math.cos(((angle + 180) * Math.PI) / 180) * radius - size / 2,
          Math.cos(((angle + 360) * Math.PI) / 180) * radius - size / 2,
        ],
        y: [
          Math.sin((angle * Math.PI) / 180) * radius - size / 2,
          Math.sin(((angle + 180) * Math.PI) / 180) * radius - size / 2,
          Math.sin(((angle + 360) * Math.PI) / 180) * radius - size / 2,
        ],
        opacity: [0.4, 1, 0.4],
      }}
      transition={{ duration, repeat: Infinity, ease: 'linear', delay }}
    />
  );
}

// ─── Main Component ──────────────────────────────────────────────────────
export default function IntroScreen({ progress }) {
  const [particles] = useState(() => makeParticles(60));
  const [lightRays] = useState(() => makeLightRays(16));
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showContent, setShowContent] = useState(false);
  const containerRef = useRef(null);

  // Scroll-driven transforms
  const bgScale       = useTransform(progress, [0, 1], [1, 3.5]);
  const bgOpacity     = useTransform(progress, [0.5, 1], [1, 0]);
  const overlayBlur   = useTransform(progress, [0, 0.5, 1], [0, 10, 30]);
  const logoScale     = useTransform(progress, [0, 0.8, 1], [1, 6, 15]);
  const logoOpacity   = useTransform(progress, [0.5, 0.9], [1, 0]);
  const textY         = useTransform(progress, [0, 0.4], [0, 80]);
  const textOpacity   = useTransform(progress, [0, 0.25], [1, 0]);
  const particleOpacity = useTransform(progress, [0, 0.2], [1, 0]);
  const hintOpacity   = useTransform(progress, [0, 0.1], [1, 0]);

  // Mouse parallax for ambient glow
  useEffect(() => {
    const handleMouse = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 60;
      const y = (e.clientY / window.innerHeight - 0.5) * 60;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  // Delay content reveal for dramatic effect
  useEffect(() => {
    const t = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(t);
  }, []);

  const schoolName = (process.env.NEXT_PUBLIC_SCHOOL_NAME || 'MATHA ENGLISH MEDIUM SCHOOL').toUpperCase();

  return (
    <motion.div
      ref={containerRef}
      style={{ opacity: bgOpacity }}
      className="fixed inset-0 z-[9999] overflow-hidden flex items-center justify-center"
    >
      {/* ── Animated deep gradient background ── */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: bgScale, transformOrigin: 'center center' }}
        animate={{
          background: [
            'radial-gradient(ellipse 80% 60% at 50% 50%, #0a1a4e 0%, #060f30 45%, #020812 100%)',
            'radial-gradient(ellipse 80% 60% at 52% 48%, #0d2060 0%, #060f30 45%, #020812 100%)',
            'radial-gradient(ellipse 80% 60% at 48% 52%, #0a1a4e 0%, #060f30 45%, #020812 100%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Volumetric light behind logo (mouse-reactive) ── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: '600px',
          height: '600px',
          top: '50%',
          left: '50%',
          x: '-50%',
          y: '-50%',
          background: 'radial-gradient(circle, rgba(245,183,0,0.18) 0%, rgba(245,183,0,0.05) 40%, transparent 70%)',
          filter: 'blur(40px)',
          translateX: mousePos.x - 300,
          translateY: mousePos.y - 300,
        }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />

      {/* ── Spinning light rays ── */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        {lightRays.map((ray) => (
          <motion.div
            key={ray.id}
            className="absolute origin-bottom"
            style={{
              width: 2,
              height: `${ray.length}%`,
              bottom: '50%',
              left: 'calc(50% - 1px)',
              rotate: `${ray.angle}deg`,
              background: `linear-gradient(to top, transparent, rgba(245,183,0,${ray.opacity}), transparent)`,
              transformOrigin: 'bottom center',
            }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: ray.duration,
              delay: ray.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      {/* ── Floating particles ── */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: particleOpacity }}>
        {particles.map((p) => (
          <Particle key={p.id} p={p} />
        ))}
      </motion.div>

      {/* ── Orbiting glow dots around logo ── */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            className="absolute pointer-events-none"
            style={{ top: '50%', left: '50%' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            {/* Outer orbit */}
            {[0, 72, 144, 216, 288].map((angle, i) => (
              <OrbitDot key={`outer-${i}`} radius={160} angle={angle} size={6} duration={12} delay={i * 0.4} />
            ))}
            {/* Inner orbit — opposite direction simulated via angle offset over time */}
            {[30, 120, 210, 300].map((angle, i) => (
              <OrbitDot key={`inner-${i}`} radius={105} angle={angle} size={4} duration={8} delay={i * 0.5} color="rgba(255,255,255,0.8)" />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Pulsing concentric rings ── */}
      <div className="absolute pointer-events-none" style={{ top: '50%', left: '50%' }}>
        {[1, 1.8, 2.6].map((scale, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-[#F5B700]/20"
            style={{
              width: 220,
              height: 220,
              top: -110,
              left: -110,
            }}
            animate={{
              scale: [scale, scale + 0.8, scale],
              opacity: [0.4, 0.1, 0.4],
            }}
            transition={{
              duration: 4,
              delay: i * 1.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 select-none" style={{ marginTop: '-6vh' }}>

        {/* Logo */}
        <motion.div
          style={{ scale: logoScale, opacity: logoOpacity, transformOrigin: 'center center' }}
          className="relative mb-10"
        >
          {/* Glowing halo behind logo */}
          <motion.div
            className="absolute inset-[-30px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(245,183,0,0.35) 0%, transparent 70%)', filter: 'blur(20px)' }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Logo itself */}
          <motion.div
            className="relative w-[140px] h-[140px] md:w-[200px] md:h-[200px]"
            initial={{ scale: 0, rotate: -30, opacity: 0, filter: 'blur(30px)' }}
            animate={{ scale: 1, rotate: 0, opacity: 1, filter: 'blur(0px)' }}
            transition={{ delay: 0.5, duration: 1.5, type: 'spring', bounce: 0.3 }}
          >
            <Image
              src="/logo/matha-logo.png"
              alt="Matha School Logo"
              fill
              className="object-contain drop-shadow-[0_0_40px_rgba(245,183,0,0.8)]"
              priority
            />

            {/* Animated gold border ring */}
            <motion.div
              className="absolute inset-[-12px] rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, transparent 0%, #F5B700 20%, transparent 40%, #F5B700 60%, transparent 80%, #F5B700 100%)',
                mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), black 100%)',
                WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), black 100%)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />

            {/* Diagonal shine sweep */}
            <motion.div
              className="absolute inset-0 overflow-hidden rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(130deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)',
                  translateX: '-200%',
                }}
                animate={{ translateX: ['−200%', '200%'] }}
                transition={{ delay: 2, duration: 2.5, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* School name — word by word drop-in */}
        <motion.div style={{ y: textY, opacity: textOpacity }} className="flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 overflow-hidden">
            {schoolName.split(' ').map((word, wi) => (
              <motion.span
                key={wi}
                className="text-white font-bold tracking-[0.3em] overflow-hidden"
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: 'clamp(18px, 3.5vw, 36px)',
                  textShadow: '0 0 40px rgba(245,183,0,0.5), 0 4px 20px rgba(0,0,0,0.8)',
                }}
                initial={{ y: '100%', opacity: 0, filter: 'blur(8px)' }}
                animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                transition={{ delay: 1.4 + wi * 0.12, duration: 0.8, type: 'spring', bounce: 0.25 }}
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* Animated gold divider */}
          <motion.div
            className="bg-[#F5B700] h-[2px] rounded-full"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 2.2, duration: 1, ease: 'easeOut' }}
            style={{ width: 'clamp(200px, 40vw, 420px)' }}
          />

          {/* Location */}
          <motion.p
            className="text-[#F5B700] uppercase tracking-[0.35em] font-semibold"
            style={{ fontSize: 'clamp(11px, 1.4vw, 15px)', textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            animate={{ opacity: 1, letterSpacing: '0.35em' }}
            transition={{ delay: 2.4, duration: 1 }}
          >
            Kaikalur, Andhra Pradesh
          </motion.p>

          {/* Tagline — character-by-character with blur */}
          <motion.div
            className="italic mt-1"
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(20px, 3vw, 32px)',
              color: '#F5B700',
              textShadow: '0 0 30px rgba(245,183,0,0.6), 0 4px 16px rgba(0,0,0,0.7)',
            }}
          >
            {'Path to Success'.split('').map((char, ci) => (
              <motion.span
                key={ci}
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)', scale: 1.5 }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                transition={{
                  delay: 2.8 + ci * 0.07,
                  duration: 0.6,
                  type: 'spring',
                  bounce: 0.2,
                }}
                style={{ display: 'inline-block' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll Hint ── */}
      <motion.div
        style={{ opacity: hintOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.5, duration: 1.2 }}
        className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-3 pointer-events-none"
      >
        {/* Animated triple-chevron scroll indicator */}
        <div className="flex flex-col items-center gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-5 h-5 border-t-2 border-r-2 border-[#F5B700] rotate-[-45deg]"
              animate={{ opacity: [0, 1, 0], y: [0, -6, 0] }}
              transition={{ duration: 1.6, delay: i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </div>
        <motion.p
          className="text-white/60 uppercase text-[11px] tracking-[0.3em] font-semibold"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <span className="hidden md:inline">Scroll up to enter</span>
          <span className="md:hidden">Swipe up to enter</span>
        </motion.p>
      </motion.div>

      {/* ── Edge vignette ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(2,8,18,0.7) 100%)' }}
      />
    </motion.div>
  );
}
