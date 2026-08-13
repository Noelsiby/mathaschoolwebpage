'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

/* ─── Social icon SVGs (inline — no broken lucide imports) ─── */
const IconFacebook = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const IconInstagram = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);
const IconYouTube = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon fill="#0D1B3E" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
);
const IconWhatsApp = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.552 4.1 1.516 5.824L.03 23.481a.5.5 0 0 0 .614.614l5.698-1.485A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.936 9.936 0 0 1-5.065-1.381l-.364-.215-3.38.882.898-3.282-.235-.378A9.956 9.956 0 0 1 2 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
  </svg>
);

/* ─── Column fade-in wrapper ─── */
function FadeColumn({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Reusable column heading ─── */
const ColHeading = ({ children }) => (
  <p style={{
    color: '#F5B700',
    fontFamily: '"Inter", sans-serif',
    fontWeight: 700,
    fontSize: '11px',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    marginBottom: '20px',
    paddingBottom: '10px',
    borderBottom: '1px solid rgba(245,183,0,0.2)',
  }}>
    {children}
  </p>
);

/* ─── Quick link item ─── */
const QuickLink = ({ href, label }) => (
  <li>
    <Link href={href} className="quick-link-item"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: 'rgba(255,255,255,0.65)',
        fontSize: '14px',
        padding: '5px 0',
        transition: 'color 200ms, gap 200ms',
        textDecoration: 'none',
      }}
    >
      <span className="quick-arrow" style={{
        opacity: 0,
        transform: 'translateX(-6px)',
        transition: 'opacity 200ms, transform 200ms',
        color: '#F5B700',
        fontSize: '12px',
        lineHeight: 1,
      }}>→</span>
      {label}
    </Link>
  </li>
);

/* ─── Contact row ─── */
const ContactRow = ({ Icon, children }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '14px' }}>
    <span style={{ color: '#F5B700', marginTop: '2px', flexShrink: 0 }}>
      <Icon size={15} />
    </span>
    <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13.5px', lineHeight: 1.55 }}>
      {children}
    </span>
  </div>
);

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{ background: '#0D1B3E', position: 'relative', overflow: 'hidden' }}
      aria-label="Site footer"
    >
      {/* Gold top accent line */}
      <div style={{ height: '3px', background: 'linear-gradient(90deg,#1A2E6C,#F5B700,#00B4D8)' }} />

      {/* Decorative bg circles */}
      <div style={{
        position: 'absolute', bottom: 0, left: -120, width: 320, height: 320,
        borderRadius: '50%', background: 'rgba(26,46,108,0.25)', pointerEvents: 'none',
      }}/>
      <div style={{
        position: 'absolute', top: 0, right: -80, width: 240, height: 240,
        borderRadius: '50%', background: 'rgba(245,183,0,0.04)', pointerEvents: 'none',
      }}/>

      {/* ── Main grid ── */}
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '60px 24px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '40px',
      }}>

        {/* ── COLUMN 1: About ── */}
        <FadeColumn delay={0}>
          {/* Logo — real school image */}
          <div
            style={{
              width: 88, height: 88,
              borderRadius: '50%',
              overflow: 'hidden',
              border: '2.5px solid rgba(245,183,0,0.5)',
              boxShadow: '0 0 0 3px rgba(245,183,0,0.12), 0 4px 20px rgba(0,0,0,0.35)',
              background: '#fff',
              marginBottom: '16px',
              flexShrink: 0,
            }}
          >
            <Image
              src="/logo/matha-logo.png"
              alt={`${process.env.NEXT_PUBLIC_SCHOOL_NAME || "Matha English Medium School"} Logo`}
              width={88}
              height={88}
              className="object-contain w-full h-full"
            />
          </div>

          <p style={{ color: '#fff', fontWeight: 700, fontSize: '15px', marginBottom: '2px' }}>
            {process.env.NEXT_PUBLIC_SCHOOL_NAME || "Matha English Medium School"}
          </p>
          <p style={{
            color: '#F5B700',
            fontStyle: 'italic',
            fontSize: '13px',
            marginBottom: '12px',
          }}>
            Path to Success
          </p>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13.5px', lineHeight: 1.7, marginBottom: '24px' }}>
            Providing quality education in Kaikalur since establishment.
            Nurturing young minds to achieve excellence.
          </p>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: '10px' }}>
            {[
              { Icon: IconFacebook,  label: 'Facebook' },
              { Icon: IconInstagram, label: 'Instagram' },
              { Icon: IconYouTube,   label: 'YouTube' },
              { Icon: IconWhatsApp,  label: 'WhatsApp' },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="social-icon-btn"
                style={{
                  width: 38, height: 38,
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#F5B700',
                  background: 'rgba(245,183,0,0.08)',
                  border: '1px solid rgba(245,183,0,0.22)',
                  transition: 'all 200ms',
                  cursor: 'pointer',
                  textDecoration: 'none',
                }}
              >
                <Icon />
              </a>
            ))}
          </div>
        </FadeColumn>

        {/* ── COLUMN 2: Quick Links ── */}
        <FadeColumn delay={0.12}>
          <ColHeading>Quick Links</ColHeading>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              { href: '/',           label: 'Home' },
              { href: '/about',      label: 'About Us' },
              { href: '/academics',  label: 'Academics' },
              { href: '/admissions', label: 'Admissions' },
              { href: '/activities', label: 'Activities' },
              { href: '/faculty',    label: 'Faculty' },
              { href: '/gallery',    label: 'Gallery' },
              { href: '/contact',    label: 'Contact Us' },
            ].map(l => <QuickLink key={l.href} {...l} />)}
          </ul>
        </FadeColumn>

        {/* ── COLUMN 3: Contact Info ── */}
        <FadeColumn delay={0.22}>
          <ColHeading>Contact Us</ColHeading>
          <ContactRow Icon={MapPin}>
            [ADDRESS PLACEHOLDER]<br />
            Kaikalur, Andhra Pradesh
          </ContactRow>
          <ContactRow Icon={Phone}>
            [PHONE PLACEHOLDER]
          </ContactRow>
          <ContactRow Icon={Mail}>
            <a href="mailto:admin@mathaschool.in"
               style={{ color: 'rgba(255,255,255,0.65)', transition: 'color 200ms' }}
               className="footer-email-link">
              admin@mathaschool.in
            </a>
          </ContactRow>
          <ContactRow Icon={Clock}>
            Mon–Sat: 8:00 AM – 4:00 PM
          </ContactRow>
        </FadeColumn>

        {/* ── COLUMN 4: Parent Portal ── */}
        <FadeColumn delay={0.32}>
          <ColHeading>Parent Portal</ColHeading>
          <p style={{ color: 'rgba(255,255,255,0.60)', fontSize: '13.5px', lineHeight: 1.65, marginBottom: '20px' }}>
            Access exam results, report cards, and school announcements online.
          </p>

          {/* Results button */}
          <a
            href={process.env.NEXT_PUBLIC_RESULTS_URL || "https://results.mathaschool.in"}
            target="_blank"
            rel="noopener noreferrer"
            id="footer-results-btn"
            className="portal-results-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '11px 22px',
              borderRadius: '50px',
              background: '#F5B700',
              color: '#0D1B3E',
              fontWeight: 700,
              fontSize: '13.5px',
              letterSpacing: '0.03em',
              textDecoration: 'none',
              transition: 'transform 200ms, box-shadow 200ms',
              boxShadow: '0 4px 18px rgba(245,183,0,0.3)',
              marginBottom: '20px',
            }}
          >
            View Results →
          </a>

          {/* Timing info */}
          <div style={{
            background: 'rgba(26,46,108,0.45)',
            border: '1px solid rgba(245,183,0,0.15)',
            borderRadius: '12px',
            padding: '16px',
            marginTop: '8px',
          }}>
            <p style={{ color: '#F5B700', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>
              School Timing
            </p>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px' }}>
              🌅 Morning: 9:00 AM – 4:00 PM
            </p>
            <p style={{ color: 'rgba(255,255,255,0.40)', fontSize: '12px', marginTop: '4px' }}>
              Mon – Saturday (Sun: Holiday)
            </p>
          </div>
        </FadeColumn>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div style={{
        borderTop: '1px solid rgba(245,183,0,0.20)',
        padding: '18px 24px',
        textAlign: 'center',
      }}>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12.5px', letterSpacing: '0.02em' }}>
          © {year} {process.env.NEXT_PUBLIC_SCHOOL_NAME || "Matha English Medium School"}, Kaikalur. All Rights Reserved.
        </p>
      </div>

      {/* ── Global hover CSS (no JS event handlers needed) ── */}
      <style>{`
        /* Quick link hover */
        .quick-link-item:hover {
          color: #F5B700 !important;
          gap: 12px !important;
        }
        .quick-link-item:hover .quick-arrow {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }

        /* Social icon hover: gold → white, bounce */
        .social-icon-btn:hover {
          color: #fff !important;
          background: rgba(245,183,0,0.18) !important;
          border-color: rgba(245,183,0,0.5) !important;
          animation: socialBounce 0.35s ease;
        }
        @keyframes socialBounce {
          0%   { transform: scale(1); }
          40%  { transform: scale(1.25); }
          70%  { transform: scale(0.92); }
          100% { transform: scale(1); }
        }

        /* Portal results button hover */
        .portal-results-btn:hover {
          transform: scale(1.05) !important;
          box-shadow: 0 8px 28px rgba(245,183,0,0.45) !important;
        }

        /* Footer email hover */
        .footer-email-link:hover {
          color: #F5B700 !important;
        }

        /* Nav hover underline (for Navbar) */
        a:hover .nav-hover-line {
          width: 100% !important;
        }
      `}</style>
    </footer>
  );
}


