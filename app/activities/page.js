'use client';

import { motion } from 'framer-motion';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import Link from 'next/link';
import { ChevronRight, Trophy, Palette, Book, Microscope, Laptop, Music, Leaf, ArrowRight } from 'lucide-react';

const SPORTS = [
  { icon: '⚽', name: 'Football', desc: 'Developing teamwork and physical endurance on our large field.' },
  { icon: '🏏', name: 'Cricket', desc: 'Professional coaching and practice nets for budding cricketers.' },
  { icon: '🏸', name: 'Badminton', desc: 'Indoor courts to improve agility and reflexes.' },
  { icon: '🏃', name: 'Athletics', desc: 'Track and field events to build stamina and speed.' },
  { icon: '🏐', name: 'Volleyball', desc: 'Dedicated courts for regular practice and tournaments.' },
  { icon: '🤸', name: 'Gymnastics', desc: 'Flexibility and core strength training with safety mats.' },
];

const CULTURAL = [
  { 
    title: 'Annual Day', 
    img: 'Annual Day Stage Performance', 
    desc: 'Our grand Annual Day is the highlight of the year. Students showcase their talents in drama, music, and dance in front of parents and distinguished guests. It is a celebration of our school spirit and the hard work of our students throughout the year.',
    variant: 'dark'
  },
  { 
    title: 'Cultural Programs', 
    img: 'Cultural Dance Performance', 
    desc: 'We regularly host cultural programs celebrating various festivals and national holidays. These events help students stay connected to their roots, understand diverse traditions, and build confidence through stage performances.',
    variant: 'gold'
  },
  { 
    title: 'Art & Craft Exhibitions', 
    img: 'Students Art Exhibition', 
    desc: 'Creativity knows no bounds at Matha School. Our annual art exhibitions provide a platform for students to display their paintings, sculptures, and craftwork. It encourages innovative thinking and appreciation for aesthetics.',
    variant: 'light'
  }
];

const CLUBS = [
  { icon: Palette, name: 'Art Club', desc: 'Exploring various mediums like painting, sketching, and clay modeling.', color: 'text-pink-500', bg: 'bg-pink-100' },
  { icon: Book, name: 'Library Club', desc: 'Fostering a love for reading and organizing literary events.', color: 'text-blue-500', bg: 'bg-blue-100' },
  { icon: Microscope, name: 'Science Club', desc: 'Hands-on experiments and projects for curious minds.', color: 'text-purple-500', bg: 'bg-purple-100' },
  { icon: Laptop, name: 'Computer Club', desc: 'Learning coding basics, digital design, and computer literacy.', color: 'text-cyan-500', bg: 'bg-cyan-100' },
  { icon: Music, name: 'Music Club', desc: 'Vocal and instrumental training for aspiring musicians.', color: 'text-amber-500', bg: 'bg-amber-100' },
  { icon: Leaf, name: 'Eco Club', desc: 'Environmental awareness, gardening, and sustainability projects.', color: 'text-green-500', bg: 'bg-green-100' },
];

const FACILITIES = [
  { img: 'School Library Interior', title: 'Library', desc: 'Well-stocked library with thousands of books covering all subjects, encyclopedias, and fiction.' },
  { img: 'Science Lab Photo', title: 'Science Laboratory', desc: 'Fully equipped modern lab for safe and interactive practical experiments in physics, chemistry, and biology.' },
  { img: 'Computer Lab Photo', title: 'Computer Lab', desc: 'Air-conditioned lab with modern computers, high-speed internet, and latest software tools.' },
  { img: 'School Playground', title: 'Playground', desc: 'Spacious, well-maintained playground for outdoor sports, athletics, and physical education classes.' },
  { img: 'School Cafeteria', title: 'Cafeteria', desc: 'Clean and hygienic canteen serving nutritious, freshly prepared meals and snacks during breaks.' },
  { img: 'School Bus Photo', title: 'Transport', desc: 'Safe and reliable fleet of school buses covering all major routes with trained drivers and attendants.' },
];

export default function ActivitiesPage() {
  return (
    <div className="bg-white">
      {/* ─── PAGE HERO ─── */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <ImagePlaceholder 
            label="Students in Activity / Sports" 
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
            <span className="text-white">Activities</span>
          </div>
          
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-[#F5B700] text-[13px] font-bold tracking-[0.2em] uppercase mb-4 block">
              BEYOND THE CLASSROOM
            </span>
            <h1 className="text-white font-bold leading-tight" style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(40px, 6vw, 56px)' }}>
              School Activities
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 1: SPORTS & GAMES ─── */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto">
          <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-[#1A2E6C] font-bold text-3xl md:text-4xl mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
              Sports & Physical Education
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Physical fitness is a core part of our curriculum. We offer a wide range of sports facilities to keep students active, healthy, and learn the value of teamwork.</p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Sports Grid */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
              {SPORTS.map((sport, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow group"
                >
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform origin-left">{sport.icon}</div>
                  <h3 className="text-[#1A2E6C] font-bold text-lg mb-2">{sport.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{sport.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Right: Photo Grid */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4 h-[400px] lg:h-full">
              <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="rounded-2xl overflow-hidden row-span-2">
                <ImagePlaceholder label="Cricket Match Photo" width={300} height={600} className="w-full h-full object-cover" variant="primary" />
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="rounded-2xl overflow-hidden">
                <ImagePlaceholder label="Football Practice Photo" width={300} height={300} className="w-full h-full object-cover" variant="dark" />
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }} className="rounded-2xl overflow-hidden">
                <ImagePlaceholder label="Athletics Event Photo" width={300} height={300} className="w-full h-full object-cover" variant="gold" />
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── SECTION 2: CULTURAL ACTIVITIES ─── */}
      <section className="py-24 px-6 bg-[#1A2E6C] overflow-hidden text-white">
        <div className="max-w-[1280px] mx-auto">
          <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
            <span className="text-[#F5B700] text-[13px] font-bold tracking-[0.2em] uppercase mb-4 block">CELEBRATING TALENT</span>
            <h2 className="font-bold text-3xl md:text-4xl" style={{ fontFamily: '"Playfair Display", serif' }}>
              Cultural Activities
            </h2>
          </motion.div>

          <div className="space-y-24">
            {CULTURAL.map((item, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={i} className={`flex flex-col gap-10 md:gap-16 items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  
                  {/* Image side */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }} 
                    whileInView={{ opacity: 1, x: 0 }} 
                    viewport={{ once: true, margin: '-100px' }} 
                    transition={{ duration: 0.7 }}
                    className="w-full md:w-1/2"
                  >
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 aspect-[4/3] group">
                      <ImagePlaceholder label={item.img} width={800} height={600} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" variant={item.variant} />
                    </div>
                  </motion.div>

                  {/* Text side */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }} 
                    whileInView={{ opacity: 1, x: 0 }} 
                    viewport={{ once: true, margin: '-100px' }} 
                    transition={{ duration: 0.7 }}
                    className="w-full md:w-1/2 flex flex-col justify-center"
                  >
                    <div className="w-16 h-1 bg-[#F5B700] mb-6 rounded-full" />
                    <h3 className="text-3xl font-bold mb-6" style={{ fontFamily: '"Playfair Display", serif' }}>{item.title}</h3>
                    <p className="text-white/80 leading-relaxed text-lg mb-8">{item.desc}</p>
                  </motion.div>

                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: CLUBS & EXTRACURRICULARS ─── */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-[1280px] mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <h2 className="text-[#1A2E6C] font-bold text-3xl md:text-4xl mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
              Clubs & Societies
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Explore your passions and develop new skills through our diverse range of student clubs.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CLUBS.map((club, i) => {
              const Icon = club.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-shadow flex flex-col items-start text-left group"
                >
                  <div className={`w-14 h-14 rounded-xl ${club.bg} flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300`}>
                    <Icon className={`w-7 h-7 ${club.color}`} />
                  </div>
                  <h3 className="text-[#1A2E6C] font-bold text-xl mb-3">{club.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">{club.desc}</p>
                  <span className="text-[#F5B700] font-bold text-sm flex items-center gap-1 group-hover:underline cursor-pointer">
                    Join Club <ArrowRight className="w-4 h-4" />
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: FACILITIES ─── */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto">
          <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-[#F5B700] text-[13px] font-bold tracking-[0.2em] uppercase mb-4 block">INFRASTRUCTURE</span>
            <h2 className="text-[#1A2E6C] font-bold text-3xl md:text-4xl mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
              World-Class Facilities
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FACILITIES.map((fac, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group"
              >
                <div className="h-[240px] overflow-hidden relative">
                  <ImagePlaceholder label={fac.img} width={400} height={300} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" variant="light" />
                </div>
                <div className="p-6">
                  <h3 className="text-[#1A2E6C] font-bold text-xl mb-3">{fac.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{fac.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
