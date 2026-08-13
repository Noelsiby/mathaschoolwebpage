/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import Link from 'next/link';
import { ChevronRight, Mail, MessageCircle, Briefcase, GraduationCap, Quote } from 'lucide-react';

const TEACHERS = [
  // Class Teachers (11)
  { name: 'Mrs. Jhansi', role: 'Class 1A Teacher', type: 'Class Teacher', subject: 'Primary Education' },
  { name: 'Ms. Naga Mani', role: 'Class 2A Teacher', type: 'Class Teacher', subject: 'Primary Education' },
  { name: 'Ms. Lalitha', role: 'Class 3A Teacher', type: 'Class Teacher', subject: 'Primary Education' },
  { name: 'Mrs. Naga Lakshmi', role: 'Class 3B Teacher', type: 'Class Teacher', subject: 'Primary Education' },
  { name: 'Mr. Praveen', role: 'Class 4 Teacher', type: 'Class Teacher', subject: 'Primary Education' },
  { name: 'Mrs. Remyamol E.R', role: 'Class 5 Teacher', type: 'Class Teacher', subject: 'Primary Education' },
  { name: 'Mrs. Suma Latha', role: 'Class 6 Teacher', type: 'Class Teacher', subject: 'Middle School Education' },
  { name: 'Mr. Naga Raju', role: 'Class 7 Teacher', type: 'Class Teacher', subject: 'Middle School Education' },
  { name: 'Ms. Sree Resmi', role: 'Class 8 Teacher', type: 'Class Teacher', subject: 'Middle School Education' },
  { name: 'Mr. Kalidas', role: 'Class 9 Teacher', type: 'Class Teacher', subject: 'Secondary Education' },
  { name: 'Mrs. Rehana', role: 'Class 10 Teacher', type: 'Class Teacher', subject: 'Secondary Education' },
  // Subject Teachers (3)
  { name: 'Mrs. Rama Devi', role: 'Subject Teacher', type: 'Subject Teacher', subject: 'Specialized Subject' },
  { name: 'Mrs. Sharmila', role: 'Subject Teacher', type: 'Subject Teacher', subject: 'Specialized Subject' },
  { name: 'Mrs. Deepa Kurian', role: 'Subject Teacher', type: 'Subject Teacher', subject: 'Specialized Subject' },
];

export default function FacultyPage() {
  const [filter, setFilter] = useState('All');
  
  const filteredTeachers = TEACHERS.filter(t => filter === 'All' || t.type === filter);

  return (
    <div className="bg-white">
      {/* ─── PAGE HERO ─── */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <ImagePlaceholder 
            label="Teachers Group Photo (Replace with actual group photo of all teachers)" 
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
            <span className="text-white">Our Faculty</span>
          </div>
          
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-[#F5B700] text-[13px] font-bold tracking-[0.2em] uppercase mb-4 block">
              OUR FACULTY
            </span>
            <h1 className="text-white font-bold leading-tight" style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(40px, 6vw, 56px)' }}>
              Meet Our Dedicated Educators
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 1: PRINCIPAL PROFILE ─── */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-[1000px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(26,46,108,0.08)] border border-gray-100 overflow-hidden flex flex-col md:flex-row"
          >
            {/* Left Image */}
            <div className="md:w-[400px] bg-[#1A2E6C] p-6 flex-shrink-0 flex items-center justify-center">
              <div className="w-full border-4 border-[#F5B700] rounded-xl overflow-hidden shadow-2xl bg-white p-2">
                <ImagePlaceholder 
                  label="Principal Professional Photo (Official photo of school principal)" 
                  width={300} height={400} 
                  className="w-full h-auto object-cover rounded-lg aspect-[3/4]" 
                  variant="primary" 
                />
              </div>
            </div>
            
            {/* Right Details */}
            <div className="p-8 md:p-12 flex flex-col justify-center flex-1 relative">
              <Quote className="absolute top-8 right-8 w-24 h-24 text-gray-50 opacity-50 z-0" />
              
              <div className="relative z-10">
                <span className="inline-block bg-[#F5B700]/20 text-[#D97706] font-bold tracking-[0.2em] uppercase text-xs px-3 py-1 rounded-full mb-4">
                  PRINCIPAL
                </span>
                <h2 className="text-[#1A2E6C] font-bold text-3xl md:text-4xl mb-6" style={{ fontFamily: '"Playfair Display", serif' }}>
                  [PRINCIPAL NAME — TO BE ADDED]
                </h2>
                
                <div className="flex flex-col gap-3 mb-8">
                  <div className="flex items-center gap-3 text-gray-600">
                    <GraduationCap className="w-5 h-5 text-[#F5B700]" />
                    <span className="font-medium">Qualifications: [TO BE ADDED]</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Briefcase className="w-5 h-5 text-[#F5B700]" />
                    <span className="font-medium">Experience: [TO BE ADDED] years</span>
                  </div>
                </div>

                <div className="border-l-4 border-[#F5B700] pl-6 py-2 mb-8">
                  <p className="text-gray-600 italic text-lg leading-relaxed">
                    "Our commitment to excellence goes beyond academics. We believe in nurturing every child's unique talents and helping them discover their true potential."
                  </p>
                </div>

                <div className="flex gap-4">
                  <a href="mailto:principal@mathaschool.in" className="w-10 h-10 rounded-full bg-[#1A2E6C] flex items-center justify-center text-white hover:bg-[#F5B700] hover:text-[#1A2E6C] transition-colors">
                    <Mail className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#F5B700] hover:text-[#1A2E6C] transition-colors">
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 2: TEACHING STAFF ─── */}
      <section className="py-24 px-6 bg-[#F8FAFC]">
        <div className="max-w-[1280px] mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <h2 className="text-[#1A2E6C] font-bold text-3xl md:text-4xl mb-8" style={{ fontFamily: '"Playfair Display", serif' }}>
              Our Teaching Staff
            </h2>
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-4 bg-white inline-flex p-2 rounded-full shadow-sm border border-gray-100">
              {['All', 'Class Teacher', 'Subject Teacher'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                    filter === tab 
                      ? 'bg-[#1A2E6C] text-white shadow-md' 
                      : 'bg-transparent text-gray-500 hover:text-[#1A2E6C]'
                  }`}
                >
                  {tab} {tab !== 'All' && 's'}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Teacher Grid */}
          <motion.div layout className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-8 perspective-1000">
            <AnimatePresence mode="popLayout">
              {filteredTeachers.map((teacher, i) => {
                const isClassTeacher = teacher.type === 'Class Teacher';
                const bannerColor = isClassTeacher ? 'bg-[#1A2E6C]' : 'bg-[#F5B700]';
                
                return (
                  <motion.div
                    key={teacher.name}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4, type: 'spring' }}
                    className="relative w-full aspect-[3/4] group cursor-pointer"
                  >
                    {/* Inner wrapper for 3D flip */}
                    <div className="w-full h-full absolute transition-transform duration-700 preserve-3d group-hover:rotate-y-180 rounded-2xl shadow-lg hover:shadow-2xl">
                      
                      {/* FRONT FACE */}
                      <div className="absolute w-full h-full backface-hidden bg-white rounded-2xl overflow-hidden flex flex-col border border-gray-100">
                        <div className={`h-2 w-full ${bannerColor}`} />
                        <div className="flex-1 p-4 flex flex-col items-center justify-center">
                          <div className="w-full aspect-[4/5] rounded-xl overflow-hidden mb-4 bg-gray-50">
                            <ImagePlaceholder 
                              label={`${teacher.name} Photo`} 
                              width={300} height={350} 
                              className="w-full h-full object-cover" 
                              variant={isClassTeacher ? 'light' : 'gold'} 
                            />
                          </div>
                          <h3 className="text-[#1A2E6C] font-bold text-lg leading-tight mb-1">{teacher.name}</h3>
                          <p className="text-[#D97706] font-bold text-xs uppercase tracking-wide mb-1">{teacher.role}</p>
                          <p className="text-gray-500 text-xs">{teacher.subject}</p>
                        </div>
                      </div>

                      {/* BACK FACE */}
                      <div className="absolute w-full h-full backface-hidden bg-[#1A2E6C] text-white rounded-2xl overflow-hidden flex flex-col items-center justify-center p-8 rotate-y-180 border border-[#0D1B3E]">
                        <h3 className="font-bold text-xl mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>{teacher.name}</h3>
                        <p className="text-[#F5B700] text-sm mb-6 font-medium">{teacher.role}</p>
                        
                        <p className="text-white/80 text-sm text-center mb-8 leading-relaxed">
                          A passionate educator dedicated to fostering a supportive and engaging learning environment for every student.
                        </p>
                        
                        <div className="flex flex-col gap-3 w-full">
                          <a href={`mailto:${teacher.name.toLowerCase().replace(/[^a-z]/g, '')}@mathaschool.in`} className="w-full bg-white/10 hover:bg-[#F5B700] hover:text-[#1A2E6C] text-sm font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                            <Mail className="w-4 h-4" /> Message
                          </a>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 3: JOIN OUR TEAM ─── */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-[800px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-[#1A2E6C] to-[#0D1B3E] rounded-3xl p-10 md:p-16 text-center shadow-2xl relative overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3" />
            
            <div className="relative z-10">
              <span className="text-[#F5B700] text-[13px] font-bold tracking-[0.2em] uppercase mb-4 block">Careers at Matha School</span>
              <h2 className="text-white font-bold mb-6" style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(28px, 4vw, 40px)' }}>
                We are always looking for passionate educators.
              </h2>
              <p className="text-white/70 mb-10 text-lg">
                Join our family of dedicated teachers and help shape the future generation. Send your CV to <strong className="text-white">admin@mathaschool.in</strong>
              </p>
              
              <a href="mailto:admin@mathaschool.in" className="inline-flex items-center justify-center gap-2 bg-[#F5B700] text-[#0D1B3E] font-bold h-14 px-8 rounded-full transition-all duration-300 hover:bg-white hover:text-[#0D1B3E] hover:shadow-xl hover:-translate-y-1">
                Apply Now <ChevronRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}


