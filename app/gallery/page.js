'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import Link from 'next/link';
import { ChevronRight, X, ChevronLeft as LeftIcon, ChevronRight as RightIcon } from 'lucide-react';

const CATEGORIES = ['All', 'Annual Day', 'Sports', 'Cultural', 'Classroom', 'Achievements'];

const PHOTOS = [
  // Annual Day (5)
  { id: 1, category: 'Annual Day', label: 'Annual Day 2025 - Stage', size: 'large', variant: 'dark' },
  { id: 2, category: 'Annual Day', label: 'Annual Day - Prize Distribution', size: 'normal', variant: 'primary' },
  { id: 3, category: 'Annual Day', label: 'Annual Day - Cultural Performance', size: 'tall', variant: 'gold' },
  { id: 4, category: 'Annual Day', label: 'Annual Day - Chief Guest', size: 'normal', variant: 'light' },
  { id: 5, category: 'Annual Day', label: 'Annual Day - Students', size: 'normal', variant: 'dark' },
  
  // Sports (4)
  { id: 6, category: 'Sports', label: 'Sports Day - Running Race', size: 'large', variant: 'gold' },
  { id: 7, category: 'Sports', label: 'Cricket Team Photo', size: 'normal', variant: 'primary' },
  { id: 8, category: 'Sports', label: 'Football Match', size: 'tall', variant: 'dark' },
  { id: 9, category: 'Sports', label: 'Sports Day Parade', size: 'normal', variant: 'light' },
  
  // Cultural (4)
  { id: 10, category: 'Cultural', label: 'Republic Day Celebration', size: 'large', variant: 'primary' },
  { id: 11, category: 'Cultural', label: 'Independence Day', size: 'normal', variant: 'gold' },
  { id: 12, category: 'Cultural', label: 'Diwali Celebration', size: 'tall', variant: 'dark' },
  { id: 13, category: 'Cultural', label: 'Christmas Celebration', size: 'normal', variant: 'light' },
  
  // Classroom (4)
  { id: 14, category: 'Classroom', label: 'Classroom Learning', size: 'large', variant: 'light' },
  { id: 15, category: 'Classroom', label: 'Science Experiment', size: 'normal', variant: 'primary' },
  { id: 16, category: 'Classroom', label: 'Art Class', size: 'tall', variant: 'gold' },
  { id: 17, category: 'Classroom', label: 'Computer Lab', size: 'normal', variant: 'dark' },
  
  // Achievements (3)
  { id: 18, category: 'Achievements', label: 'Award Ceremony', size: 'normal', variant: 'gold' },
  { id: 19, category: 'Achievements', label: 'Board Results Celebration', size: 'tall', variant: 'primary' },
  { id: 20, category: 'Achievements', label: 'Trophy Display', size: 'normal', variant: 'dark' },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Filter photos
  const filteredPhotos = PHOTOS.filter(p => filter === 'All' || p.category === filter);

  // Lightbox Navigation
  const openLightbox = (id) => {
    const index = filteredPhotos.findIndex(p => p.id === id);
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = 'auto';
  }, []);

  const nextPhoto = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev + 1) % filteredPhotos.length);
    }
  }, [lightboxIndex, filteredPhotos.length]);

  const prevPhoto = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  }, [lightboxIndex, filteredPhotos.length]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, nextPhoto, prevPhoto, closeLightbox]);

  return (
    <div className="bg-white min-h-screen">
      {/* ─── PAGE HERO ─── */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <ImagePlaceholder 
            label="School Collage / Best Event Photo" 
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
            <span className="text-white">Gallery</span>
          </div>
          
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-[#F5B700] text-[13px] font-bold tracking-[0.2em] uppercase mb-4 block">
              MEMORIES & MOMENTS
            </span>
            <h1 className="text-white font-bold leading-tight" style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(40px, 6vw, 56px)' }}>
              Our Gallery
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ─── FILTER & GALLERY GRID ─── */}
      <section className="py-20 px-6">
        <div className="max-w-[1440px] mx-auto">
          
          {/* Filters */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border-2 ${
                  filter === cat 
                    ? 'bg-[#F5B700] border-[#F5B700] text-white shadow-lg' 
                    : 'bg-white border-[#1A2E6C]/20 text-[#1A2E6C] hover:border-[#1A2E6C]/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Masonry Grid */}
          <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredPhotos.map((photo, i) => {
                // Determine height based on size type for masonry effect
                let h = 300;
                if (photo.size === 'large') h = 450;
                if (photo.size === 'tall') h = 500;
                
                return (
                  <motion.div
                    layout
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
                    className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-[12px] shadow-sm hover:shadow-xl transition-all duration-300"
                    onClick={() => openLightbox(photo.id)}
                  >
                    {/* Add a wrapper with fixed aspect ratio to ensure layout stability during animation */}
                    <div style={{ height: h }} className="w-full relative bg-gray-100">
                      <ImagePlaceholder 
                        label={photo.label} 
                        width={600} height={h} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        variant={photo.variant} 
                      />
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <span className="text-[#F5B700] text-xs font-bold uppercase tracking-wider mb-1">{photo.category}</span>
                      <h3 className="text-white font-bold text-lg leading-tight transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{photo.label}</h3>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* ─── LIGHTBOX ─── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center backdrop-blur-sm"
          >
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20">
              <div className="text-white/60 text-sm font-bold">
                {lightboxIndex + 1} / {filteredPhotos.length}
              </div>
              <button 
                onClick={closeLightbox}
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#F5B700] hover:text-[#0D1B3E] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#F5B700] hover:text-[#0D1B3E] transition-colors z-20 hidden md:flex"
            >
              <LeftIcon className="w-8 h-8" />
            </button>
            
            <button 
              onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#F5B700] hover:text-[#0D1B3E] transition-colors z-20 hidden md:flex"
            >
              <RightIcon className="w-8 h-8" />
            </button>

            {/* Image Container */}
            <div className="relative w-full max-w-6xl max-h-[80vh] flex items-center justify-center px-4" onClick={closeLightbox}>
              <motion.div
                key={filteredPhotos[lightboxIndex].id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', bounce: 0.3, duration: 0.5 }}
                className="relative overflow-hidden rounded-xl shadow-2xl max-w-full max-h-full"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
              >
                {/* Simulated Image */}
                <div className="w-[1200px] h-[800px] max-w-[90vw] max-h-[70vh] bg-gray-900 flex items-center justify-center">
                  <ImagePlaceholder 
                    label={filteredPhotos[lightboxIndex].label} 
                    width={1200} height={800} 
                    className="w-full h-full object-contain" 
                    variant={filteredPhotos[lightboxIndex].variant} 
                  />
                </div>
              </motion.div>
            </div>

            {/* Bottom Title Bar */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-10 left-0 right-0 text-center px-6"
            >
              <h3 className="text-white text-xl md:text-3xl font-bold mb-2 tracking-wide">
                {filteredPhotos[lightboxIndex].label}
              </h3>
              <p className="text-[#F5B700] uppercase tracking-widest text-sm font-bold">
                {filteredPhotos[lightboxIndex].category}
              </p>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
