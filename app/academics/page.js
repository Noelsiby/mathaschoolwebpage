'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import Link from 'next/link';
import { ChevronRight, Plus, Minus, CheckCircle, GraduationCap, Microscope, Users, Palette, Trophy, Globe, BookOpen } from 'lucide-react';

const CLASSES = [
  { name: 'LKG', age: 'Ages 3-4', type: 'Primary' },
  { name: 'UKG', age: 'Ages 4-5', type: 'Primary' },
  { name: 'Class 1', age: 'Ages 5-6', type: 'Primary' },
  { name: 'Class 2', age: 'Ages 6-7', type: 'Primary' },
  { name: 'Class 3', age: 'Ages 7-8', type: 'Primary' },
  { name: 'Class 4', age: 'Ages 8-9', type: 'Primary' },
  { name: 'Class 5', age: 'Ages 9-10', type: 'Primary' },
  { name: 'Class 6', age: 'Ages 10-11', type: 'Middle' },
  { name: 'Class 7', age: 'Ages 11-12', type: 'Middle' },
  { name: 'Class 8', age: 'Ages 12-13', type: 'Middle' },
  { name: 'Class 9', age: 'Ages 13-14', type: 'Secondary' },
  { name: 'Class 10', age: 'Ages 14-15', type: 'Secondary' },
];

const SUBJECTS = [
  { title: 'Languages (English, Telugu, Hindi)', desc: 'Comprehensive language program focusing on reading, writing, listening, and speaking skills. English is our primary medium of instruction.' },
  { title: 'Mathematics', desc: 'Developing logical reasoning, problem-solving skills, and mathematical foundations from basic arithmetic to advanced algebra and geometry.' },
  { title: 'Sciences (Physics, Chemistry, Biology)', desc: 'Inquiry-based approach to understanding the natural world, supported by practical experiments in our modern laboratories.' },
  { title: 'Social Studies', desc: 'Understanding our history, geography, and society to become informed and responsible citizens.' },
  { title: 'Computer Science', desc: 'Digital literacy, programming basics, and modern computing skills for the digital age.' },
  { title: 'Arts & Crafts', desc: 'Fostering creativity, imagination, and fine motor skills through various artistic mediums.' },
  { title: 'Physical Education', desc: 'Promoting health, fitness, teamwork, and sportsmanship through structured physical activities.' }
];

const METHODOLOGY = [
  { icon: Microscope, title: 'Digital Learning', desc: 'Smart boards and technology integrated into daily lessons for interactive learning.', img: 'Smart Classroom Photo' },
  { icon: GraduationCap, title: 'Practical Learning', desc: 'Hands-on lab experiments and real-world projects to solidify theoretical concepts.', img: 'Science Lab Photo' },
  { icon: Users, title: 'Collaborative Learning', desc: 'Group activities and peer-to-peer discussions to build teamwork and communication.', img: 'Group Activity Photo' },
  { icon: Palette, title: 'Creative Learning', desc: 'Arts integrated education to stimulate imagination and creative problem solving.', img: 'Art Class Photo' },
];

export default function AcademicsPage() {
  const [openSubject, setOpenSubject] = useState(0);

  return (
    <div className="bg-white">
      {/* ─── PAGE HERO ─── */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <ImagePlaceholder 
            label="Students in Classroom / Library" 
            width={1920} height={1080} 
            className="w-full h-full object-cover" 
            variant="dark" 
          />
        </div>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#1A2E6C]/90 to-[#0D1B3E]/80" />
        
        <div className="relative z-20 container-custom px-6 text-center pt-16">
          <div className="absolute top-0 left-6 flex items-center gap-2 text-white/70 text-sm font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Academics</span>
          </div>
          
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-[#F5B700] text-[13px] font-bold tracking-[0.2em] uppercase mb-4 block">
              ACADEMICS
            </span>
            <h1 className="text-white font-bold leading-tight" style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(40px, 6vw, 56px)' }}>
              Excellence in Learning
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 1: CLASSES OVERVIEW ─── */}
      <section className="py-24 px-6 bg-[#F8FAFC]">
        <div className="max-w-[1280px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-[#1A2E6C] font-bold tracking-wider text-xl md:text-2xl uppercase">FROM LKG TO CLASS 10</h2>
            <div className="w-20 h-1 bg-[#F5B700] mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {CLASSES.map((cls, i) => {
              // Color coding
              let bg = 'bg-blue-50 border-blue-200';
              let text = 'text-blue-900';
              let accent = 'text-blue-600';
              if (cls.type === 'Middle') {
                bg = 'bg-yellow-50 border-yellow-200';
                text = 'text-yellow-900';
                accent = 'text-yellow-600';
              } else if (cls.type === 'Secondary') {
                bg = 'bg-[#1A2E6C]/5 border-[#1A2E6C]/20';
                text = 'text-[#1A2E6C]';
                accent = 'text-[#1A2E6C]';
              }

              return (
                <motion.div
                  key={cls.name}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.1, duration: 0.5, type: 'spring', bounce: 0.4 }}
                  className={`border rounded-2xl p-6 relative overflow-hidden group hover:shadow-xl transition-shadow ${bg}`}
                >
                  <div className={`text-2xl font-bold mb-1 ${text}`} style={{ fontFamily: '"Playfair Display", serif' }}>
                    {cls.name}
                  </div>
                  <div className={`text-sm font-medium mb-4 ${accent}`}>
                    {cls.age}
                  </div>
                  <div className="text-gray-600 text-sm space-y-2 mb-6">
                    <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#F5B700]" /> ~30 Students</div>
                    <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#F5B700]" /> Core Subjects</div>
                  </div>
                  <Link href="/admissions" className={`text-sm font-bold flex items-center gap-1 ${accent} hover:underline`}>
                    Learn More <ChevronRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: CURRICULUM ─── */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-2 gap-16 items-start">
          
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <span className="text-[#F5B700] text-[13px] font-bold tracking-[0.2em] uppercase mb-4 block">OUR CURRICULUM</span>
            <h2 className="text-[#1A2E6C] font-bold mb-6" style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(32px, 4vw, 40px)' }}>
              Balanced Education for Complete Development
            </h2>
            <p className="text-[#475569] leading-relaxed mb-6 text-lg">
              Our curriculum is thoughtfully designed to provide a comprehensive education that balances academic rigor with holistic development. We focus on conceptual clarity, critical thinking, and practical application of knowledge.
            </p>
            <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Globe className="text-blue-600 w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1A2E6C]">Medium of Instruction</h4>
                  <p className="text-gray-600">English</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                  <BookOpen className="text-yellow-600 w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1A2E6C]">Board Affiliation</h4>
                  <p className="text-gray-600">[BOARD TO BE ADDED]</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="space-y-4">
              {SUBJECTS.map((sub, i) => (
                <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => setOpenSubject(openSubject === i ? -1 : i)}
                    className="w-full px-6 py-5 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-bold text-[#1A2E6C] text-left">{sub.title}</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openSubject === i ? 'bg-[#F5B700] text-white' : 'bg-gray-100 text-gray-500'}`}>
                      {openSubject === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>
                  <AnimatePresence>
                    {openSubject === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-100 mt-2">
                          <div className="pt-3">{sub.desc}</div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 3: TEACHING METHODOLOGY ─── */}
      <section className="py-24 px-6 bg-[#1A2E6C]">
        <div className="max-w-[1280px] mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <span className="text-[#F5B700] text-[13px] font-bold tracking-[0.2em] uppercase mb-4 block">OUR APPROACH</span>
            <h2 className="text-white font-bold" style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(32px, 4vw, 40px)' }}>
              Teaching Methodology
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {METHODOLOGY.map((method, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col group"
              >
                <div className="h-[200px] overflow-hidden relative">
                  <ImagePlaceholder label={method.img} width={400} height={300} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" variant="light" />
                </div>
                <div className="p-8 flex flex-col items-center flex-1">
                  <div className="w-14 h-14 rounded-full bg-[#F5B700]/20 flex items-center justify-center -mt-14 mb-4 relative z-10 border-4 border-white shadow-sm">
                    <method.icon className="w-6 h-6 text-[#F5B700]" />
                  </div>
                  <h3 className="text-[#1A2E6C] font-bold text-xl mb-3">{method.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{method.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: ACADEMIC RESULTS ─── */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-[1000px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-[#F5B700] to-[#E09900] rounded-3xl p-10 md:p-16 text-center shadow-2xl relative overflow-hidden"
          >
            {/* Background decoration */}
            <Trophy className="absolute -right-10 -bottom-10 w-64 h-64 text-white opacity-10" />
            <Trophy className="absolute -left-10 -top-10 w-40 h-40 text-white opacity-10 transform -scale-x-100" />
            
            <div className="relative z-10">
              <span className="bg-white text-[#E09900] font-bold px-4 py-1 rounded-full text-sm uppercase tracking-wider mb-6 inline-block shadow-sm">Proven Excellence</span>
              <h2 className="text-[#0D1B3E] font-bold mb-10" style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(36px, 5vw, 56px)' }}>
                100% Board Results
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { year: '2023-24', val: '45', label: 'Distinctions' },
                  { year: '2022-23', val: '42', label: 'Distinctions' },
                  { year: '2021-22', val: '38', label: 'Distinctions' },
                ].map((res, i) => (
                  <div key={i} className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 text-[#0D1B3E]">
                    <div className="text-lg font-bold mb-2 opacity-80">{res.year}</div>
                    <div className="text-4xl font-bold mb-1">{res.val}</div>
                    <div className="text-sm font-semibold uppercase">{res.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
