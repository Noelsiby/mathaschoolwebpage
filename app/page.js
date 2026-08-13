/* eslint-disable react/no-unescaped-entities */
'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import HeroSection from '@/components/HeroSection';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import Link from 'next/link';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  GraduationCap, Users, BookOpen, Trophy, ArrowRight,
  CheckCircle2, Target, Heart, Shield, Sparkles,
  ChevronLeft, ChevronRight, Quote, Star, ZoomIn
} from 'lucide-react';

// Custom Counter Hook
function useCounter(end, duration = 1500, delay = 0) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  
  useEffect(() => {
    if (inView) {
      let start = null;
      let timeout;
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percentage = Math.min(progress / duration, 1);
        const ease = 1 - Math.pow(1 - percentage, 4);
        setCount(Math.floor(ease * end));
        if (progress < duration) window.requestAnimationFrame(step);
        else setCount(end);
      };
      timeout = setTimeout(() => {
        window.requestAnimationFrame(step);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [inView, end, duration, delay]);
  return { count, ref };
}

function StatCard({ icon: Icon, num, suffix, label, delayIndex }) {
  const { count, ref } = useCounter(num, 1500, delayIndex * 150);
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ delay: delayIndex * 0.15, duration: 0.6 }} whileHover={{ y: -8, boxShadow: '0 12px 30px rgba(13,27,62,0.08)' }} className="bg-white rounded-xl p-6 md:p-8 flex items-center gap-5 transition-all duration-300" style={{ borderLeft: '4px solid #F5B700', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
      <div className="w-[50px] h-[50px] flex-shrink-0 rounded-full flex items-center justify-center" style={{ background: 'rgba(245, 183, 0, 0.15)' }}>
        <Icon className="w-6 h-6" style={{ color: '#F5B700' }} />
      </div>
      <div>
        <div className="font-bold leading-none mb-1" style={{ fontFamily: '"Playfair Display", serif', fontSize: '56px', color: '#1A2E6C' }}>
          {count}{suffix}
        </div>
        <div style={{ fontFamily: '"Inter", sans-serif', fontSize: '14px', color: '#64748B', fontWeight: 500 }}>
          {label}
        </div>
      </div>
    </motion.div>
  );
}

const STATS = [
  { icon: GraduationCap, num: 500, suffix: '+', label: 'Students Enrolled' },
  { icon: Users, num: 19, suffix: '+', label: 'Qualified Teachers' },
  { icon: BookOpen, num: 14, suffix: '', label: 'Classes (LKG-10)' },
  { icon: Trophy, num: 100, suffix: '%', label: 'Board Results' },
];

const FEATURES = [
  { icon: Target, title: 'Academic Excellence', desc: 'Consistently achieving outstanding board results with dedicated teaching and personalized attention.' },
  { icon: Users, title: 'Experienced Faculty', desc: 'Our team of 19+ qualified teachers bring years of expertise and passion to every classroom.' },
  { icon: Sparkles, title: 'Holistic Development', desc: 'Beyond academics — sports, arts, cultural activities shape well-rounded individuals.' },
  { icon: BookOpen, title: 'Modern Facilities', desc: 'State-of-the-art classrooms, library, science lab, and playground for complete learning.' },
  { icon: Heart, title: 'Parent Partnership', desc: 'Regular communication and involvement of parents in the child\'s educational journey.' },
  { icon: Shield, title: 'Safe Environment', desc: 'A nurturing, safe, and inclusive environment where every child feels valued.' }
];

const GALLERY_PHOTOS = [
  { label: 'Annual Day Celebration', className: 'md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto', variant: 'primary' },
  { label: 'Sports Day Event', className: 'md:col-span-1 md:row-span-2 aspect-square md:aspect-auto', variant: 'dark' },
  { label: 'Science Exhibition', className: 'md:col-span-1 aspect-[4/3]', variant: 'light' },
  { label: 'Cultural Program', className: 'md:col-span-1 aspect-[4/3]', variant: 'gold' },
  { label: 'Classroom Learning', className: 'md:col-span-1 aspect-[4/3]', variant: 'cyan' },
];

const TESTIMONIALS = [
  {
    quote: `${process.env.NEXT_PUBLIC_SCHOOL_NAME || "Matha English Medium School"} has been a wonderful experience for my child. The teachers are dedicated and the environment is nurturing. My daughter has grown academically and personally.`,
    name: "Mrs. Lakshmi Prasad",
    role: "Parent of Class 8 Student",
    photo: "Parent Photo 1"
  },
  {
    quote: "The school's focus on both academics and extracurricular activities has helped my son develop into a confident young individual. Truly a path to success!",
    name: "Mr. Ravi Kumar",
    role: "Parent of Class 10 Student",
    photo: "Parent Photo 2"
  },
  {
    quote: `Excellent teachers, safe environment, and modern teaching methods. I am proud to have my children studying at ${process.env.NEXT_PUBLIC_SCHOOL_NAME || "Matha English Medium School"}.`,
    name: "Mrs. Sunitha Reddy",
    role: "Parent of Class 5 Student",
    photo: "Parent Photo 3"
  }
];

export default function HomePage() {
  const { scrollY } = useScroll();
  const ctaParallaxY = useTransform(scrollY, [0, 5000], [0, -400]);

  // Testimonials Carousel Logic
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(nextTestimonial, 5000);
    return () => clearInterval(timer);
  }, [isHovered, nextTestimonial]);

  return (
    <div className="bg-white">
      <HeroSection />

      {/* SECTION 1 — ANIMATED STATS COUNTER */}
      <section className="bg-white py-20 px-6 relative z-10">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <StatCard key={i} {...stat} delayIndex={i} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2 — ABOUT US PREVIEW */}
      <section className="bg-white py-24 px-6 overflow-hidden">
        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side: Image Grid */}
          <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="grid grid-cols-2 grid-rows-2 gap-4 h-[500px]">
            <div className="relative row-span-2 rounded-2xl overflow-hidden group">
              <motion.div initial={{ scaleY: 1 }} whileInView={{ scaleY: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: 0.2, duration: 0.8, ease: 'easeInOut' }} className="absolute inset-0 z-10 bg-white origin-top" />
              <ImagePlaceholder label="School Building Side View" width={500} height={800} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" variant="primary" />
            </div>
            <div className="relative rounded-2xl overflow-hidden group border-[6px] border-[#F5B700]">
              <motion.div initial={{ scaleY: 1 }} whileInView={{ scaleY: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: 0.4, duration: 0.8, ease: 'easeInOut' }} className="absolute inset-0 z-10 bg-white origin-top" />
              <ImagePlaceholder label="Students in Classroom" width={400} height={400} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" variant="dark" />
            </div>
            <div className="relative rounded-2xl overflow-hidden group">
              <motion.div initial={{ scaleY: 1 }} whileInView={{ scaleY: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: 0.6, duration: 0.8, ease: 'easeInOut' }} className="absolute inset-0 z-10 bg-white origin-top" />
              <ImagePlaceholder label="School Activities" width={400} height={400} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" variant="light" />
            </div>
          </motion.div>

          {/* Right side: Text Content */}
          <motion.div initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="flex flex-col items-start">
            <span className="text-[#F5B700] text-[13px] font-bold tracking-[0.2em] uppercase mb-4">ABOUT OUR SCHOOL</span>
            <h2 className="text-[#1A2E6C] font-bold leading-[1.15] mb-6" style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(32px, 4vw, 40px)' }}>Nurturing Excellence Since Our Foundation</h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.6 }} className="text-[#475569] leading-[1.8] text-[16px] mb-8">
              {process.env.NEXT_PUBLIC_SCHOOL_NAME || "Matha English Medium School"} in Kaikalur has been a beacon of quality education, shaping young minds with a perfect blend of academic excellence and holistic development. Our dedicated faculty and modern facilities create an environment where every student thrives.
            </motion.p>
            <div className="flex flex-col gap-4 mb-10 w-full">
              {['Excellence in Academics', 'Holistic Development', 'Modern Learning Environment'].map((point, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 + (idx * 0.15), duration: 0.5 }} className="flex items-center gap-3">
                  <CheckCircle2 className="text-[#10B981] w-6 h-6 flex-shrink-0" />
                  <span className="text-[#334155] font-semibold">{point}</span>
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.9, duration: 0.5 }}>
              <Link href="/about" className="group inline-flex items-center gap-2 border-2 border-[#F5B700] text-[#1A2E6C] font-bold px-8 py-4 rounded-full transition-all duration-300 hover:bg-[#F5B700] hover:text-[#0D1B3E]">
                Learn More About Us <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 — WHY CHOOSE US */}
      <section className="relative py-24 px-6 overflow-hidden" style={{ background: '#1A2E6C' }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 2px, transparent 2px)', backgroundSize: '30px 30px' }} />
        <div className="max-w-[1440px] mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: -30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="flex flex-col items-center text-center mb-16">
            <span className="text-white text-[14px] font-medium tracking-[0.2em] uppercase mb-3">WHY CHOOSE</span>
            <h2 className="text-white font-bold mb-6 leading-tight" style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(36px, 5vw, 48px)' }}>{process.env.NEXT_PUBLIC_SCHOOL_NAME || "Matha English Medium School"}?</h2>
            <div className="w-[60px] h-[3px] bg-[#F5B700] rounded-full" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ delay: i * 0.1, duration: 0.6 }} className="group relative bg-white/10 p-8 pt-10 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.15] cursor-default border border-transparent hover:border-white/10">
                  <div className="absolute top-0 left-0 h-[3px] bg-[#F5B700] transition-all duration-500 w-0 group-hover:w-full rounded-t-2xl" />
                  <motion.div initial={{ width: '0%' }} whileInView={{ width: '100%' }} viewport={{ once: true }} transition={{ delay: 0.4 + (i * 0.1), duration: 0.7, ease: 'easeOut' }} className="absolute top-0 left-0 h-[3px] bg-[#F5B700]/40 rounded-t-2xl" />
                  <div className="mb-6 transform transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125 origin-left">
                    <Icon className="w-12 h-12 text-[#F5B700]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-white text-[20px] font-bold mb-3">{feature.title}</h3>
                  <p className="text-white/80 text-[14px] leading-relaxed">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4 — GALLERY PREVIEW */}
      <section className="bg-white py-24 px-6 overflow-hidden">
        <div className="max-w-[1440px] mx-auto">
          <motion.div initial={{ opacity: 0, y: -30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="flex flex-col items-center text-center mb-16">
            <span className="text-[#F5B700] text-[14px] font-bold tracking-[0.2em] uppercase mb-3">OUR GALLERY</span>
            <h2 className="text-[#1A2E6C] font-bold mb-4 leading-tight" style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(32px, 5vw, 40px)' }}>Glimpses of School Life</h2>
            <p className="text-[#64748B] text-[16px] max-w-2xl mx-auto">Explore the vibrant activities, events, and daily life at {process.env.NEXT_PUBLIC_SCHOOL_NAME || "Matha English Medium School"}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 md:h-[600px] mb-12">
            {GALLERY_PHOTOS.map((photo, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`relative group rounded-xl overflow-hidden cursor-zoom-in ${photo.className}`}
              >
                {/* Curtain reveal */}
                <motion.div 
                  initial={{ scaleY: 1 }} 
                  whileInView={{ scaleY: 0 }} 
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (i * 0.1), duration: 0.6, ease: 'easeInOut' }}
                  className="absolute inset-0 z-20 bg-[#1A2E6C] origin-bottom" 
                />
                
                <ImagePlaceholder label={photo.label} width={800} height={600} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" variant={photo.variant} />
                
                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col items-center justify-center">
                  <ZoomIn className="text-white w-8 h-8 mb-2 transform scale-50 group-hover:scale-100 transition-transform duration-300" />
                  <span className="text-white font-semibold text-lg tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {photo.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.8, duration: 0.5 }} className="flex justify-center">
            <Link href="/gallery" className="group inline-flex items-center gap-2 bg-[#F5B700] text-[#0D1B3E] font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#F5B700]/30">
              View Full Gallery <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5 — TESTIMONIALS / PARENT VOICES */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ background: '#F3F4F6' }}>
        {/* Subtle Logo Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none flex items-center justify-center" style={{ width: '600px', height: '600px' }}>
          <ImagePlaceholder label="School Logo Watermark" width={600} height={600} className="w-full h-full object-contain rounded-full" variant="light" />
        </div>

        <div className="max-w-[1000px] mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: -30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="flex flex-col items-center text-center mb-16">
            <span className="text-[#F5B700] text-[14px] font-bold tracking-[0.2em] uppercase mb-3">TESTIMONIALS</span>
            <h2 className="text-[#1A2E6C] font-bold leading-tight" style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(32px, 5vw, 40px)' }}>What Parents Say About Us</h2>
          </motion.div>

          <div 
            className="relative" 
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="overflow-hidden min-h-[350px] relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-2xl p-10 md:p-14 shadow-xl border border-gray-100 relative"
                >
                  <Quote className="absolute top-6 left-6 md:top-10 md:left-10 text-[#F5B700]/20 w-16 h-16 md:w-20 md:h-20" />
                  
                  <p className="text-[#1A2E6C] text-lg md:text-2xl leading-relaxed italic mb-8 relative z-10 font-medium" style={{ fontFamily: '"Playfair Display", serif' }}>
                    "{TESTIMONIALS[currentTestimonial].quote}"
                  </p>
                  
                  <div className="w-full h-[1px] bg-gray-100 mb-8" />
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-[60px] h-[60px] rounded-full overflow-hidden border-2 border-[#F5B700]">
                        <ImagePlaceholder label={TESTIMONIALS[currentTestimonial].photo} width={60} height={60} className="w-full h-full object-cover" variant="dark" />
                      </div>
                      <div>
                        <h4 className="text-[#1A2E6C] font-bold text-[18px]">{TESTIMONIALS[currentTestimonial].name}</h4>
                        <p className="text-[#64748B] text-[14px]">{TESTIMONIALS[currentTestimonial].role}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-1">
                      {[0, 1, 2, 3, 4].map((starIndex) => (
                        <motion.div
                          key={starIndex}
                          initial={{ opacity: 0, scale: 0, rotate: -45 }}
                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                          transition={{ delay: 0.3 + (starIndex * 0.1), type: 'spring' }}
                        >
                          <Star className="w-5 h-5 text-[#F5B700] fill-[#F5B700]" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6 mt-10">
              <button onClick={prevTestimonial} aria-label="Previous Testimonial" className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-[#1A2E6C] hover:bg-[#1A2E6C] hover:text-white transition-colors duration-300">
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex gap-3">
                {TESTIMONIALS.map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setCurrentTestimonial(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${i === currentTestimonial ? 'bg-[#F5B700] scale-125' : 'bg-gray-300 hover:bg-gray-400'}`}
                  />
                ))}
              </div>
              
              <button onClick={nextTestimonial} aria-label="Next Testimonial" className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-[#1A2E6C] hover:bg-[#1A2E6C] hover:text-white transition-colors duration-300">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — CALL TO ACTION (Admissions Banner) */}
      <section className="relative overflow-hidden h-[300px] flex items-center" style={{ background: 'linear-gradient(135deg, #F5B700, #E09900)' }}>
        
        {/* Parallax Pattern Background */}
        <motion.div 
          className="absolute inset-0 opacity-20 pointer-events-none" 
          style={{ 
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)',
            y: ctaParallaxY
          }} 
        />
        
        {/* Subtle moving gradient overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-white/10 to-transparent animate-pulse" />

        <div className="w-full max-w-[1440px] mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-[#0D1B3E] font-bold mb-4 leading-tight" 
            style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(28px, 4vw, 40px)' }}
          >
            Start Your Child's Journey to Excellence
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            className="text-[#0D1B3E]/90 text-[16px] md:text-[18px] mb-8 font-medium max-w-2xl"
          >
            Admissions open for Academic Year 2026-27. Limited seats available. Apply today!
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link 
              href="/admissions" 
              className="group inline-flex items-center justify-center gap-2 bg-[#0D1B3E] text-white font-bold h-[56px] w-[220px] rounded-full transition-all duration-300 hover:bg-white hover:text-[#0D1B3E] hover:shadow-xl relative overflow-hidden"
            >
              {/* Subtle pulse ring */}
              <div className="absolute inset-0 rounded-full border border-white opacity-0 group-hover:animate-ping" />
              Apply for Admission <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}



