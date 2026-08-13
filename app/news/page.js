/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import Link from 'next/link';
import { ChevronRight, ArrowRight, Calendar, MapPin, Clock, Plus, Minus, Send, CheckCircle2 } from 'lucide-react';

const ANNOUNCEMENTS = [
  {
    type: 'IMPORTANT',
    color: 'border-red-500',
    badgeBg: 'bg-red-100',
    badgeText: 'text-red-700',
    title: 'Admissions Open for 2026-27',
    date: 'August 2026',
    desc: 'Admissions are now open for all classes from LKG to Class 10. Limited seats available. Contact school for details.'
  },
  {
    type: 'EVENT',
    color: 'border-[#F5B700]',
    badgeBg: 'bg-yellow-100',
    badgeText: 'text-yellow-700',
    title: 'Annual Day Celebration 2026',
    date: '[DATE TO BE ADDED]',
    desc: 'Annual Day celebrations scheduled. All parents are cordially invited. [Details to be added]'
  },
  {
    type: 'ACHIEVEMENT',
    color: 'border-green-500',
    badgeBg: 'bg-green-100',
    badgeText: 'text-green-700',
    title: '100% Results in Board Examinations',
    date: '2025-26',
    desc: 'We are proud to announce that all our Class 10 students have passed the board examinations with flying colors.'
  }
];

const EVENTS = [
  { color: 'bg-blue-500', title: 'Parent-Teacher Meeting', date: 'Aug 15', type: 'academic' },
  { color: 'bg-[#F5B700]', title: 'Independence Day Celebration', date: 'Aug 15', type: 'cultural' },
  { color: 'bg-green-500', title: 'Inter-School Sports Competition', date: 'Aug 20', type: 'sports' },
  { color: 'bg-blue-500', title: 'First Term Examination Begins', date: 'Aug 25', type: 'academic' }
];

const HOLIDAYS = [
  {
    term: 'Term 1 Holidays',
    list: [
      { date: 'Aug 15, 2026', name: 'Independence Day' },
      { date: 'Sep 5, 2026', name: 'Teachers Day (Half Day)' },
      { date: 'Oct 2 - Oct 11, 2026', name: 'Dussehra Vacation' }
    ]
  },
  {
    term: 'Term 2 Holidays',
    list: [
      { date: 'Dec 24 - Jan 2, 2027', name: 'Winter/Christmas Vacation' },
      { date: 'Jan 13 - Jan 16, 2027', name: 'Pongal/Sankranti Holidays' }
    ]
  },
  {
    term: 'National Holidays',
    list: [
      { date: 'Jan 26, 2027', name: 'Republic Day' },
      { date: 'Mar 8, 2027', name: 'Maha Shivaratri' },
      { date: 'Mar 24, 2027', name: 'Holi' }
    ]
  }
];

export default function NewsPage() {
  const [openAccordion, setOpenAccordion] = useState(0);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* ─── PAGE HERO ─── */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <ImagePlaceholder 
            label="School Events Header Photo" 
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
            <span className="text-white">News & Events</span>
          </div>
          
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-[#F5B700] text-[13px] font-bold tracking-[0.2em] uppercase mb-4 block">
              STAY UPDATED
            </span>
            <h1 className="text-white font-bold leading-tight" style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(40px, 6vw, 56px)' }}>
              News & Events
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ─── TICKER / MARQUEE ─── */}
      <div className="bg-[#F5B700] text-[#0D1B3E] font-bold py-3 overflow-hidden whitespace-nowrap flex relative shadow-md z-30">
        <motion.div 
          animate={{ x: [0, -1000] }} 
          transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
          className="flex gap-8"
        >
          {/* Duplicate content for seamless loop */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <span key={i} className="text-sm tracking-wide">
              📢 Admissions Open 2026-27 &nbsp;&nbsp;|&nbsp;&nbsp; 🏆 Annual Day on [DATE] &nbsp;&nbsp;|&nbsp;&nbsp; 📚 New Academic Year Begins &nbsp;&nbsp;|&nbsp;&nbsp;
            </span>
          ))}
        </motion.div>
      </div>

      {/* ─── SECTION 1: LATEST ANNOUNCEMENTS ─── */}
      <section className="py-24 px-6 bg-[#F8FAFC]">
        <div className="max-w-[1280px] mx-auto">
          <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <h2 className="text-[#1A2E6C] font-bold text-3xl md:text-4xl mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
              Latest Announcements
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ANNOUNCEMENTS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-l-8 ${item.color} flex flex-col`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wider ${item.badgeBg} ${item.badgeText}`}>
                    {item.type}
                  </span>
                  <span className="text-gray-400 text-sm font-medium">{item.date}</span>
                </div>
                <h3 className="text-[#1A2E6C] font-bold text-xl mb-4 leading-snug">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm mb-8 flex-1">{item.desc}</p>
                <a href="#" className="text-[#1A2E6C] font-bold text-sm flex items-center gap-2 hover:text-[#F5B700] transition-colors w-fit group">
                  Read More <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 2 & 3: CALENDAR & HOLIDAYS ─── */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left: Upcoming Events Calendar */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <h2 className="text-[#1A2E6C] font-bold text-3xl mb-8" style={{ fontFamily: '"Playfair Display", serif' }}>
              Upcoming Events
            </h2>
            
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Calendar Header */}
              <div className="bg-[#1A2E6C] text-white p-6 flex justify-between items-center">
                <button className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors">
                  <ChevronRight className="w-5 h-5 transform rotate-180" />
                </button>
                <h3 className="font-bold text-lg tracking-wide">August 2026</h3>
                <button className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              
              {/* Event List */}
              <div className="p-6">
                <div className="space-y-6">
                  {EVENTS.map((ev, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                      <div className="flex flex-col items-center justify-center w-14 h-14 rounded-lg bg-gray-100 flex-shrink-0 text-center">
                        <span className="text-[#F5B700] text-[10px] font-bold uppercase">{ev.date.split(' ')[0]}</span>
                        <span className="text-[#1A2E6C] text-xl font-bold leading-none">{ev.date.split(' ')[1]}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`w-2 h-2 rounded-full ${ev.color}`} />
                          <h4 className="font-bold text-[#1A2E6C]">{ev.title}</h4>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mt-2">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 09:00 AM</span>
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> School Campus</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Holiday List Accordion */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <h2 className="text-[#1A2E6C] font-bold text-3xl mb-8" style={{ fontFamily: '"Playfair Display", serif' }}>
              Holiday Calendar
            </h2>
            <div className="mb-6 text-gray-500 font-medium">2026-27 Academic Year Holiday List</div>
            
            <div className="space-y-4">
              {HOLIDAYS.map((block, i) => (
                <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === i ? -1 : i)}
                    className="w-full px-6 py-5 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-bold text-[#1A2E6C] text-left">{block.term}</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openAccordion === i ? 'bg-[#F5B700] text-white' : 'bg-gray-100 text-gray-500'}`}>
                      {openAccordion === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>
                  <AnimatePresence>
                    {openAccordion === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-100 mt-2">
                          <div className="pt-4 space-y-4">
                            {block.list.map((holiday, j) => (
                              <div key={j} className="flex justify-between items-center border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                                <span className="font-medium text-gray-800 flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-[#F5B700]" /> {holiday.name}
                                </span>
                                <span className="text-sm font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{holiday.date}</span>
                              </div>
                            ))}
                          </div>
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

      {/* ─── SECTION 4: NEWSLETTER SIGNUP ─── */}
      <section className="py-24 px-6 bg-white border-t border-gray-100">
        <div className="max-w-[800px] mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="bg-[#F5B700] rounded-3xl p-10 md:p-16 shadow-xl relative overflow-hidden"
          >
            {/* Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#1A2E6C] opacity-10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/3" />

            <div className="relative z-10">
              <h2 className="text-[#0D1B3E] font-bold text-3xl md:text-4xl mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
                Stay Updated with School News
              </h2>
              <p className="text-[#0D1B3E]/80 mb-8 max-w-lg mx-auto font-medium">
                Subscribe to our newsletter to receive the latest updates, event invitations, and academic announcements directly to your inbox.
              </p>
              
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative">
                <input 
                  type="email" 
                  required
                  placeholder="Enter your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-6 py-4 rounded-full border-none focus:ring-4 focus:ring-[#1A2E6C]/20 shadow-sm text-gray-800 placeholder-gray-400 outline-none"
                />
                <button 
                  type="submit" 
                  className="bg-[#1A2E6C] text-white px-8 py-4 rounded-full font-bold hover:bg-[#0D1B3E] transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  Subscribe <Send className="w-4 h-4" />
                </button>

                {/* Success Message Overlay */}
                <AnimatePresence>
                  {subscribed && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="absolute inset-0 bg-white rounded-full flex items-center justify-center gap-2 text-green-600 font-bold shadow-lg"
                    >
                      <CheckCircle2 className="w-5 h-5" /> Subscribed successfully!
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
              <p className="text-[#0D1B3E]/60 text-xs mt-4 italic">
                * Note: For now just collect emails, we'll set up backend later.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

