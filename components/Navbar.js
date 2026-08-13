'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '/',           label: 'Home' },
  { href: '/about',      label: 'About Us' },
  { href: '/academics',  label: 'Academics' },
  { href: '/admissions', label: 'Admissions' },
  { href: '/activities', label: 'Activities' },
  { href: '/faculty',    label: 'Faculty' },
  { href: '/gallery',    label: 'Gallery' },
  { href: '/news',       label: 'News & Events' },
  { href: '/contact',    label: 'Contact Us' },
];

/* ─── School Logo — real image ─── */
function SchoolLogo({ size = 60 }) {
  return (
    <div
      className="rounded-full flex-shrink-0 overflow-hidden transition-all duration-300"
      style={{
        width: size,
        height: size,
        border: '2px solid rgba(245,183,0,0.55)',
        boxShadow: '0 0 0 1px rgba(245,183,0,0.18)',
        background: '#fff',
      }}
    >
      <Image
        src="/logo/matha-logo.png"
        alt={`${process.env.NEXT_PUBLIC_SCHOOL_NAME || "Matha English Medium School"} Logo`}
        width={size}
        height={size}
        className="object-contain w-full h-full"
        priority
      />
    </div>
  );
}

/* ─── Single desktop nav link ─── */
function NavLink({ href, label, active, index }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 + index * 0.07, duration: 0.4, ease: 'easeOut' }}
    >
      <Link
        href={href}
        className="relative group flex flex-col items-center gap-0.5 px-1 py-1"
        aria-current={active ? 'page' : undefined}
        style={{
          color: active ? '#fff' : 'rgba(255,255,255,0.80)',
          fontSize: '13.5px',
          fontWeight: 500,
          letterSpacing: '0.01em',
          whiteSpace: 'nowrap',
          transition: 'color 150ms',
        }}
      >
        <span className="group-hover:text-white transition-colors duration-150">{label}</span>

        {/* Gold underline: always visible for active, slides in from left on hover */}
        <span
          className="absolute bottom-0 left-0 h-[2px] rounded-full transition-all duration-200"
          style={{
            background: '#F5B700',
            width: active ? '100%' : '0%',
            left: 0,
          }}
          aria-hidden="true"
        />
        {/* Hover underline (CSS group-hover via inline style trick) */}
        <style>{`
          .nav-underline-${index}:hover .nav-ul-${index} { width: 100% !important; }
        `}</style>
      </Link>
    </motion.li>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted]   = useState(false);

  /* detect scroll */
  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll(); // initialise
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* close menu on navigation */
  useEffect(() => { setIsOpen(false); }, [pathname]);

  /* lock body scroll when menu open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* ══════════════ NAV BAR ══════════════ */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          transition: 'background 300ms ease, box-shadow 300ms ease',
          background: scrolled
            ? 'rgba(26,46,108,0.97)'
            : 'transparent',
          boxShadow: scrolled
            ? '0 4px 32px rgba(13,27,62,0.55)'
            : 'none',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        <div className="w-full max-w-[1440px] mx-auto px-5 md:px-10 flex items-center justify-between">

          {/* ── LOGO + SCHOOL NAME ── */}
          <Link
            href="/"
            className="flex items-center gap-3 flex-shrink-0"
            aria-label={`${process.env.NEXT_PUBLIC_SCHOOL_NAME || "Matha English Medium School"} — Home`}
          >
            <motion.div
              animate={{ width: scrolled ? 50 : 60, height: scrolled ? 50 : 60 }}
              transition={{ duration: 0.3 }}
              style={{ flexShrink: 0 }}
            >
              <SchoolLogo size={scrolled ? 50 : 60} />
            </motion.div>

            <div className="leading-tight select-none">
              <p style={{
                fontFamily: '"Inter", sans-serif',
                fontWeight: 700,
                fontSize: '13px',
                color: '#fff',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                lineHeight: 1.3,
              }}>
                {process.env.NEXT_PUBLIC_SCHOOL_NAME || "Matha English Medium School"}
              </p>
              <p style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '11px',
                fontWeight: 500,
                color: '#F5B700',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                lineHeight: 1.3,
              }}>
                Kaikalur
              </p>
            </div>
          </Link>

          {/* ── DESKTOP NAV LINKS ── */}
          <ul
            className="hidden lg:flex items-center"
            style={{ gap: '20px' }}
            role="list"
          >
            {NAV_LINKS.map((link, i) => {
              const active = pathname === link.href;
              return (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.4, ease: 'easeOut' }}
                  className="relative group"
                >
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      color: active ? '#fff' : 'rgba(255,255,255,0.80)',
                      fontSize: '13.5px',
                      fontWeight: 500,
                      whiteSpace: 'nowrap',
                      padding: '4px 0',
                      transition: 'color 150ms',
                      position: 'relative',
                    }}
                    className="hover:!text-white"
                  >
                    {link.label}

                    {/* Active gold underline */}
                    {active && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: -1,
                          left: 0,
                          width: '100%',
                          height: '2px',
                          background: '#F5B700',
                          borderRadius: '2px',
                        }}
                        aria-hidden="true"
                      />
                    )}

                    {/* Hover gold underline — slides from left */}
                    {!active && (
                      <span
                        className="nav-hover-line"
                        style={{
                          position: 'absolute',
                          bottom: -1,
                          left: 0,
                          width: '0%',
                          height: '2px',
                          background: '#F5B700',
                          borderRadius: '2px',
                          transition: 'width 200ms ease',
                        }}
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </motion.li>
              );
            })}
          </ul>

          {/* ── HAMBURGER (mobile) ── */}
          <button
            id="hamburger-btn"
            className="lg:hidden flex items-center justify-center rounded-xl transition-colors duration-200"
            style={{
              width: 44,
              height: 44,
              color: '#fff',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.span key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}>
                  <X size={22} />
                </motion.span>
              ) : (
                <motion.span key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18 }}>
                  <Menu size={22} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* ══════════════ MOBILE FULL-SCREEN OVERLAY ══════════════ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 999,
              background: 'linear-gradient(160deg, #0D1B3E 0%, #1A2E6C 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '80px 24px 48px',
            }}
          >
            {/* Close button */}
            <button
              id="mobile-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              style={{
                position: 'absolute',
                top: 20,
                right: 20,
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={22} />
            </button>

            {/* Logo inside menu */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="flex flex-col items-center mb-10"
            >
              <SchoolLogo size={72} />
              <p style={{ color: '#F5B700', fontSize: '12px', letterSpacing: '0.18em', marginTop: 10, textTransform: 'uppercase' }}>
                Kaikalur
              </p>
            </motion.div>

            {/* Nav links — stagger from right */}
            <ul className="flex flex-col items-center gap-1 w-full max-w-sm" role="list">
              {NAV_LINKS.map((link, i) => {
                const active = pathname === link.href;
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.3, ease: 'easeOut' }}
                    className="w-full"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      aria-current={active ? 'page' : undefined}
                      style={{
                        display: 'block',
                        textAlign: 'center',
                        padding: '14px 24px',
                        borderRadius: '12px',
                        fontSize: '18px',
                        fontWeight: active ? 700 : 500,
                        color: active ? '#F5B700' : 'rgba(255,255,255,0.85)',
                        background: active ? 'rgba(245,183,0,0.08)' : 'transparent',
                        border: active ? '1px solid rgba(245,183,0,0.25)' : '1px solid transparent',
                        letterSpacing: '0.02em',
                        transition: 'all 180ms',
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>

            {/* Apply button */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.3 }}
              className="mt-8 w-full max-w-sm"
            >
              <Link
                href="/admissions"
                id="mobile-apply-btn"
                onClick={() => setIsOpen(false)}
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '15px 24px',
                  borderRadius: '50px',
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#0D1B3E',
                  background: '#F5B700',
                  letterSpacing: '0.04em',
                }}
              >
                Apply Now →
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover underline CSS (slides from left) */}
      <style>{`
        .nav-hover-line { transition: width 200ms ease !important; }
        a:hover .nav-hover-line { width: 100% !important; }
      `}</style>
    </>
  );
}


