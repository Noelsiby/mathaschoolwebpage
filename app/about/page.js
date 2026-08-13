/* eslint-disable react/no-unescaped-entities */
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import Link from 'next/link';
import { 
  ChevronRight, Eye, Target, Quote, 
  Star, Heart, Lightbulb, Shield, Users, Target as ResilienceIcon
} from 'lucide-react';

const TIMELINE = [
  { year: '1995', desc: 'School founded with a vision for quality education' },
  { year: '1998', desc: 'First batch of students successfully graduated' },
  { year: '2005', desc: 'Added secondary classes (High School)' },
  { year: '2012', desc: 'Achieved 100% board results milestone' },
  { year: '2026', desc: '500+ students enrolled in modern campus' },
];

const VALUES = [
  { icon: Star, title: 'Excellence', desc: 'Striving for the highest standards' },
  { icon: Shield, title: 'Integrity', desc: 'Honesty and ethical conduct always' },
  { icon: Lightbulb, title: 'Innovation', desc: 'Modern teaching for modern world' },
  { icon: Heart, title: 'Compassion', desc: 'Caring for every student\'s wellbeing' },
  { icon: Users, title: 'Respect', desc: 'Valuing diversity and inclusion' },
  { icon: ResilienceIcon, title: 'Resilience', desc: 'Building strength through challenges' },
];

export default function AboutPage() {
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 500], [0, 150]);

  // Framer motion variants
  const slideLeft = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } } };
  const slideRight = { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } } };
  const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <div className="bg-white">
      
      {/* ─── PAGE HERO ─── */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden flex items-center justify-center">
        <motion.div className="absolute inset-0 z-0" style={{ y: heroParallax }}>
          <ImagePlaceholder 
            label="School Wide Campus View" 
            width={1920} height={1080} 
            className="w-full h-full object-cover" 
            variant="dark" 
          />
        </motion.div>
        {/* Dark blue overlay gradient */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#1A2E6C]/90 to-[#0D1B3E]/80" />
        
        <div className="relative z-20 container-custom px-6 text-center pt-16">
          <div className="absolute top-0 left-6 flex items-center gap-2 text-white/70 text-sm font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">About Us</span>
          </div>
          
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className="text-[#F5B700] text-[13px] font-bold tracking-[0.2em] uppercase mb-4 block">
              ABOUT US
            </span>
            <h1 className="text-white font-bold leading-tight" style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(40px, 6vw, 56px)' }}>
              Our Story, Our Mission
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 1: OUR STORY (History) ─── */}
      <section className="py-24 px-6 overflow-hidden bg-white">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={slideLeft}>
            <span className="text-[#F5B700] text-[13px] font-bold tracking-[0.2em] uppercase mb-4 block">
              OUR STORY
            </span>
            <h2 className="text-[#1A2E6C] font-bold mb-6" style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(32px, 4vw, 40px)' }}>
              A Legacy of Excellence in Education
            </h2>
            <p className="text-[#475569] leading-relaxed mb-10">
              Founded with a vision to provide quality English medium education in Kaikalur, {process.env.NEXT_PUBLIC_SCHOOL_NAME || "Matha English Medium School"} has grown from humble beginnings to become one of the most trusted educational institutions in the region. [SCHOOL HISTORY TO BE ADDED]
            </p>

            {/* Timeline */}
            <div className="relative pl-6 border-l-2 border-[#F5B700]/30 space-y-8">
              {TIMELINE.map((item, i) => (
                <div key={i} className="relative">
                  {/* Timeline Dot */}
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: i * 0.15, type: 'spring' }}
                    className="absolute -left-[31px] top-1 w-[14px] h-[14px] rounded-full bg-[#F5B700] border-[3px] border-white shadow-sm"
                  />
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: 0.1 + (i * 0.15) }}
                  >
                    <span className="font-bold text-[#1A2E6C] mr-2 text-lg">{item.year}</span>
                    <span className="text-[#475569]">— {item.desc}</span>
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={slideRight} className="relative">
            <div className="absolute inset-0 bg-[#F5B700] rounded-2xl transform translate-x-4 translate-y-4 -z-10" />
            <ImagePlaceholder 
              label="School Founding / Historic Photo (Add school founding or early days photo here)" 
              width={600} height={700} 
              className="w-full h-auto rounded-2xl shadow-xl object-cover aspect-[4/5]" 
              variant="dark"
            />
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 2: VISION & MISSION ─── */}
      <section className="py-24 px-6 bg-gray-50 overflow-hidden">
        <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-8">
          
          {/* Vision Card */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={slideLeft}
            className="bg-[#1A2E6C] rounded-3xl p-10 md:p-14 shadow-2xl flex flex-col justify-center text-white"
          >
            <Eye className="w-16 h-16 text-[#F5B700] mb-8" />
            <h3 className="text-3xl font-bold mb-6" style={{ fontFamily: '"Playfair Display", serif' }}>Our Vision</h3>
            <p className="text-white/80 leading-relaxed text-lg">
              To be the leading institution for holistic education in Kaikalur, nurturing students to become confident, responsible, and successful individuals who contribute positively to society.
            </p>
          </motion.div>

          {/* Mission Card */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={slideRight}
            className="bg-[#F5B700] rounded-3xl p-10 md:p-14 shadow-2xl flex flex-col justify-center text-[#0D1B3E]"
          >
            <Target className="w-16 h-16 text-[#0D1B3E] mb-8" />
            <h3 className="text-3xl font-bold mb-6" style={{ fontFamily: '"Playfair Display", serif' }}>Our Mission</h3>
            <p className="text-[#0D1B3E]/80 leading-relaxed text-lg font-medium">
              To provide quality English medium education that combines academic excellence with character development, preparing students for the challenges of tomorrow through innovative teaching and a supportive learning environment.
            </p>
          </motion.div>

        </div>
      </section>

      {/* ─── SECTION 3: PRINCIPAL'S MESSAGE ─── */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: Principal Photo */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={fadeUp} className="lg:col-span-5 relative">
            <div className="border-4 border-[#F5B700] rounded-2xl p-2 relative bg-white z-10 shadow-2xl max-w-md mx-auto">
              <ImagePlaceholder 
                label="Principal's Official Photo (Replace with principal's professional photo)" 
                width={400} height={500} 
                className="w-full h-auto rounded-xl object-cover" 
                variant="primary"
              />
            </div>
            {/* Name Plate */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4/5 max-w-sm bg-[#1A2E6C] text-white p-4 rounded-xl text-center shadow-xl z-20">
              <p className="font-bold text-lg mb-1">Principal Name</p>
              <p className="text-[#F5B700] text-sm font-medium">Principal, {process.env.NEXT_PUBLIC_SCHOOL_NAME || "Matha English Medium School"}</p>
            </div>
          </motion.div>

          {/* Right: Message */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={slideRight} className="lg:col-span-7 pt-10 lg:pt-0">
            <div className="flex flex-col items-start relative">
              <Quote className="absolute -top-10 -left-6 w-24 h-24 text-[#F5B700] opacity-20 -z-10 transform -scale-x-100" />
              
              <span className="text-[#F5B700] text-[13px] font-bold tracking-[0.2em] uppercase mb-4 block">
                A MESSAGE FROM
              </span>
              <h2 className="text-[#1A2E6C] font-bold mb-8" style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(32px, 4vw, 40px)' }}>
                Our Principal
              </h2>
              
              <div className="text-[#475569] leading-relaxed text-[17px] space-y-4 mb-8 italic">
                <p>
                  "Welcome to {process.env.NEXT_PUBLIC_SCHOOL_NAME || "Matha English Medium School"}. Our commitment to excellence goes beyond academics. We believe in nurturing every child's unique talents and helping them discover their true potential. 
                </p>
                <p>
                  Our dedicated team of educators works tirelessly to create a learning environment that is both challenging and supportive. We are proud of our students' achievements and look forward to welcoming new families to our school community."
                </p>
                <p className="text-xs text-gray-400 font-sans not-italic">
                  [PRINCIPAL MESSAGE TO BE ADDED — Add principal's personal message about school values, goals, and welcome to parents/students]
                </p>
              </div>

              <div className="text-[#F5B700] font-bold text-2xl" style={{ fontFamily: '"Playfair Display", serif' }}>
                Principal Name
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ─── SECTION 4: SCHOOL VALUES ─── */}
      <section className="py-24 px-6 bg-[#F8FAFC]">
        <div className="max-w-[1280px] mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16">
            <span className="text-[#F5B700] text-[13px] font-bold tracking-[0.2em] uppercase mb-4 block">OUR GUIDING PRINCIPLES</span>
            <h2 className="text-[#1A2E6C] font-bold" style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(32px, 4vw, 40px)' }}>
              School Values
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
            {VALUES.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, rotateX: -90, y: 50 }}
                  whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.1, duration: 0.8, type: 'spring', bounce: 0.3 }}
                  className="bg-white rounded-2xl p-8 shadow-lg border-t-4 border-[#F5B700] flex flex-col items-center hover:shadow-2xl transition-shadow duration-300 transform-gpu"
                >
                  <div className="w-16 h-16 rounded-full bg-[#F5B700]/10 flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-[#F5B700]" />
                  </div>
                  <h3 className="text-[#1A2E6C] text-xl font-bold mb-3 font-heading">{value.title}</h3>
                  <p className="text-[#64748B] leading-relaxed">{value.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: RECOGNITION & AFFILIATIONS ─── */}
      <section className="py-20 px-6 bg-white border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h3 className="text-[#64748B] font-semibold tracking-wide uppercase mb-8">
              Affiliated with [BOARD NAME — Add board here]
            </h3>
            
            <div className="flex flex-wrap justify-center gap-10 opacity-70 hover:opacity-100 transition-opacity duration-300">
              <ImagePlaceholder label="Board Affiliation Logo" width={180} height={80} className="w-auto h-[60px] object-contain grayscale hover:grayscale-0 transition-all duration-300" variant="light" />
              <ImagePlaceholder label="Recognition Certificate" width={180} height={80} className="w-auto h-[60px] object-contain grayscale hover:grayscale-0 transition-all duration-300" variant="light" />
            </div>
            
            <p className="text-sm text-gray-400 mt-8 max-w-md mx-auto italic">
              * Any awards or recognitions placeholder text to be added here.
            </p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}


