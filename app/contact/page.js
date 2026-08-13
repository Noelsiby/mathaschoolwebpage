/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import Link from 'next/link';
import { ChevronRight, MapPin, Phone, Mail, Clock, Send, CheckCircle2, Loader2, BarChart2, GraduationCap, PhoneCall, Globe, MessageCircle, Hash } from 'lucide-react';

export default function ContactPage() {
  const [formState, setFormState] = useState('idle'); // idle | submitting | success
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => {
      setFormState('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setFormState('idle'), 4000);
    }, 2000);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* ─── PAGE HERO ─── */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <ImagePlaceholder 
            label="School Main Gate / Entrance" 
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
            <span className="text-white">Contact Us</span>
          </div>
          
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-[#F5B700] text-[13px] font-bold tracking-[0.2em] uppercase mb-4 block">
              WE'D LOVE TO HEAR FROM YOU
            </span>
            <h1 className="text-white font-bold leading-tight" style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(40px, 6vw, 56px)' }}>
              Contact Us
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 1: CONTACT INFO + MAP ─── */}
      <section className="py-24 px-6 bg-[#F8FAFC]">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column - Contact Details */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-[#1A2E6C] font-bold text-3xl mb-8" style={{ fontFamily: '"Playfair Display", serif' }}>
              Get In Touch
            </h2>
            
            <div className="space-y-8">
              {/* Address */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center flex-shrink-0 text-[#1A2E6C]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1A2E6C] mb-1">Address</h3>
                  <p className="text-gray-600 leading-relaxed">[FULL ADDRESS TO BE ADDED]<br/>Kaikalur, Andhra Pradesh</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center flex-shrink-0 text-[#1A2E6C]">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1A2E6C] mb-1">Phone Numbers</h3>
                  <p className="text-gray-600">Main Office: [PHONE TO BE ADDED]</p>
                  <p className="text-gray-600">Principal: [PHONE TO BE ADDED]</p>
                  <p className="text-gray-600">Admissions: [PHONE TO BE ADDED]</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center flex-shrink-0 text-[#1A2E6C]">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1A2E6C] mb-1">Email</h3>
                  <p className="text-gray-600">General: <a href="mailto:admin@mathaschool.in" className="hover:text-[#F5B700] transition-colors">admin@mathaschool.in</a></p>
                  <p className="text-gray-600">Principal: <a href="mailto:principal@mathaschool.in" className="hover:text-[#F5B700] transition-colors">principal@mathaschool.in</a></p>
                  <p className="text-gray-600">Admissions: <a href="mailto:admissions@mathaschool.in" className="hover:text-[#F5B700] transition-colors">admissions@mathaschool.in</a></p>
                </div>
              </div>

              {/* Office Hours */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center flex-shrink-0 text-[#1A2E6C]">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1A2E6C] mb-1">Office Hours</h3>
                  <p className="text-gray-600">Monday - Saturday: 8:00 AM - 4:30 PM</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-10 pt-10 border-t border-gray-200">
              <h3 className="font-bold text-[#1A2E6C] mb-4">Follow Us</h3>
              <div className="flex gap-4">
                {[Globe, MessageCircle, Hash, Phone].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full bg-[#1A2E6C] text-[#F5B700] flex items-center justify-center hover:bg-[#F5B700] hover:text-[#1A2E6C] transition-colors shadow-md">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Google Map */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="h-full">
            <div className="bg-white p-2 rounded-3xl shadow-lg h-full min-h-[400px] flex flex-col">
              <div className="w-full h-[400px] lg:h-full bg-gray-200 rounded-2xl overflow-hidden relative">
                {/* Embedded Google Map - Placeholder coordinates for Kaikalur */}
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d30564.041695420367!2d81.18956975!3d16.5412499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a361d368e7b9fb5%3A0x6e902b3701a09d3b!2sKaikaluru%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                ></iframe>
              </div>
              <div className="p-4 mt-2">
                <a href="#" className="w-full flex justify-center items-center gap-2 bg-[#F8FAFC] text-[#1A2E6C] font-bold py-3 rounded-xl hover:bg-gray-100 transition-colors border border-gray-200">
                  Get Directions <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
          
        </div>
      </section>

      {/* ─── SECTION 2: CONTACT FORM ─── */}
      <section className="py-24 px-6 bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F5B700]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1A2E6C]/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

        <div className="max-w-[800px] mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-[#F5B700] text-[13px] font-bold tracking-[0.2em] uppercase mb-4 block">ANY QUESTIONS?</span>
            <h2 className="text-[#1A2E6C] font-bold text-3xl md:text-5xl" style={{ fontFamily: '"Playfair Display", serif' }}>
              Send Us a Message
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100"
          >
            {formState === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-[#1A2E6C] mb-2">Message sent!</h3>
                <p className="text-gray-600 mb-8">We'll get back to you within 24 hours.</p>
                <button 
                  onClick={() => setFormState('idle')}
                  className="bg-[#1A2E6C] text-white px-8 py-3 rounded-full font-bold hover:bg-[#0D1B3E] transition-colors"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Floating Label - Name */}
                  <div className="relative">
                    <input
                      type="text" id="name" name="name" required
                      value={formData.name} onChange={handleInputChange}
                      className="block px-2.5 pb-2.5 pt-6 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#F5B700] peer"
                      placeholder=" "
                    />
                    <label htmlFor="name" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#F5B700] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                      Your Name *
                    </label>
                  </div>

                  {/* Floating Label - Email */}
                  <div className="relative">
                    <input
                      type="email" id="email" name="email" required
                      value={formData.email} onChange={handleInputChange}
                      className="block px-2.5 pb-2.5 pt-6 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#F5B700] peer"
                      placeholder=" "
                    />
                    <label htmlFor="email" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#F5B700] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                      Your Email *
                    </label>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Floating Label - Phone */}
                  <div className="relative">
                    <input
                      type="tel" id="phone" name="phone"
                      value={formData.phone} onChange={handleInputChange}
                      className="block px-2.5 pb-2.5 pt-6 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#F5B700] peer"
                      placeholder=" "
                    />
                    <label htmlFor="phone" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#F5B700] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                      Phone Number
                    </label>
                  </div>

                  {/* Floating Label - Subject */}
                  <div className="relative">
                    <select
                      id="subject" name="subject" required
                      value={formData.subject} onChange={handleInputChange}
                      className="block px-2.5 pb-2.5 pt-6 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-[#F5B700] peer"
                    >
                      <option value="" disabled hidden></option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Admissions">Admissions</option>
                      <option value="Fee Related">Fee Related</option>
                      <option value="Academic">Academic</option>
                      <option value="Complaint">Complaint</option>
                      <option value="Other">Other</option>
                    </select>
                    <label htmlFor="subject" className={`absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-white px-2 left-1 ${formData.subject ? 'text-[#F5B700]' : 'peer-focus:text-[#F5B700] peer-focus:-translate-y-4 peer-focus:scale-75'}`}>
                      Subject *
                    </label>
                  </div>
                </div>

                {/* Floating Label - Message */}
                <div className="relative">
                  <textarea
                    id="message" name="message" required rows="5"
                    value={formData.message} onChange={handleInputChange}
                    className="block px-2.5 pb-2.5 pt-6 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#F5B700] peer resize-none"
                    placeholder=" "
                  ></textarea>
                  <label htmlFor="message" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#F5B700] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-6 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                    Your Message *
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="w-full flex items-center justify-center gap-2 bg-[#F5B700] text-[#0D1B3E] font-bold text-lg py-4 rounded-xl hover:bg-[#E09900] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {formState === 'submitting' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 3: QUICK LINKS BOX ─── */}
      <section className="py-24 px-6 bg-[#F8FAFC]">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            
            <Link href={process.env.NEXT_PUBLIC_RESULTS_URL || "https://results.mathaschool.in"} className="group bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BarChart2 className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-[#1A2E6C] text-xl mb-2">View Results</h3>
              <p className="text-gray-500 text-sm">results.mathaschool.in</p>
            </Link>

            <Link href="/admissions" className="group bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-[#1A2E6C] text-xl mb-2">Apply for Admission</h3>
              <p className="text-gray-500 text-sm">/admissions</p>
            </Link>

            <a href="tel:[phone]" className="group bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <PhoneCall className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-[#1A2E6C] text-xl mb-2">Call Us Now</h3>
              <p className="text-gray-500 text-sm">tel:[phone]</p>
            </a>

          </div>
        </div>
      </section>

    </div>
  );
}



