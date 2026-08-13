'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import Link from 'next/link';
import { ChevronRight, FileText, PhoneCall, CheckSquare, CreditCard, Backpack, CheckCircle2, Loader2, Send } from 'lucide-react';

const PROCESS_STEPS = [
  { icon: FileText, title: 'Submit Application', desc: 'Fill out the online form or visit school' },
  { icon: PhoneCall, title: 'School Interaction', desc: 'Meet with our admission counselor' },
  { icon: CheckSquare, title: 'Document Verification', desc: 'Submit required age & identity proofs' },
  { icon: CreditCard, title: 'Fee Payment', desc: 'Complete the admission fee process' },
  { icon: Backpack, title: 'Welcome to School!', desc: 'Collect uniforms and books' }
];

const AGE_CRITERIA = [
  { class: 'LKG', age: '3 years as of June 1' },
  { class: 'UKG', age: '4 years as of June 1' },
  { class: 'Class 1', age: '5 years as of June 1' },
  { class: 'Class 2', age: '6 years as of June 1' },
  { class: 'Class 3', age: '7 years as of June 1' },
  { class: 'Class 4', age: '8 years as of June 1' },
  { class: 'Class 5', age: '9 years as of June 1' },
];

const DOCUMENTS = [
  'Birth Certificate (Original + Copy)',
  'Previous School Transfer Certificate (if applicable)',
  'Aadhar Card (Student + Parent)',
  'Passport size photographs (4 copies)',
  'Previous year report card (for Class 2 & above)',
  'Residential proof (Electricity bill / Rent agreement)'
];

export default function AdmissionsPage() {
  const [formState, setFormState] = useState('idle'); // idle | submitting | success
  const [formData, setFormData] = useState({ name: '', parent: '', phone: '', email: '', class: '', message: '' });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
      setFormData({ name: '', parent: '', phone: '', email: '', class: '', message: '' });
    }, 1500);
  };

  return (
    <div className="bg-white">
      {/* ─── PAGE HERO ─── */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <ImagePlaceholder 
            label="Students at School Entrance" 
            width={1920} height={1080} 
            className="w-full h-full object-cover" 
            variant="dark" 
          />
        </div>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#1A2E6C]/90 to-[#0D1B3E]/80" />
        
        <div className="relative z-20 container-custom px-6 text-center pt-16 flex flex-col items-center">
          <div className="absolute top-0 left-6 flex items-center gap-2 text-white/70 text-sm font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Admissions</span>
          </div>
          
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, type: 'spring' }} className="mb-6 relative">
            <div className="absolute inset-0 bg-[#F5B700] rounded-full animate-ping opacity-30" />
            <span className="relative bg-[#F5B700] text-[#0D1B3E] font-bold px-6 py-2 rounded-full text-sm uppercase tracking-wider shadow-xl border border-white/20">
              Admissions Open 2026-27
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-white font-bold leading-tight" style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(40px, 6vw, 56px)' }}>
            Join Our Community
          </motion.h1>
        </div>
      </section>

      {/* ─── SECTION 1: ADMISSION PROCESS ─── */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
            <h2 className="text-[#1A2E6C] font-bold text-3xl md:text-4xl" style={{ fontFamily: '"Playfair Display", serif' }}>
              Simple 5-Step Process
            </h2>
          </motion.div>

          {/* Horizontal Stepper (Scrollable on mobile) */}
          <div className="relative">
            <div className="absolute top-[40px] left-0 right-0 h-1 bg-gray-100 hidden md:block z-0" />
            
            <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-4 relative z-10">
              {PROCESS_STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: i * 0.15, duration: 0.5 }}
                    className="flex-1 flex flex-col items-center text-center group"
                  >
                    <div className="relative mb-6">
                      <div className="w-20 h-20 rounded-full bg-white border-4 border-[#F5B700] flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 relative z-10">
                        <Icon className="w-8 h-8 text-[#1A2E6C]" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#1A2E6C] text-white flex items-center justify-center font-bold text-sm border-2 border-white z-20 shadow-md">
                        {i + 1}
                      </div>
                    </div>
                    <h3 className="font-bold text-[#1A2E6C] text-lg mb-2">{step.title}</h3>
                    <p className="text-gray-500 text-sm max-w-[200px] mx-auto leading-relaxed">{step.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2 & 3: CRITERIA AND DOCUMENTS ─── */}
      <section className="py-24 px-6 bg-[#F8FAFC]">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-2 gap-16">
          
          {/* Age Criteria Table */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 className="text-[#1A2E6C] font-bold text-2xl mb-8" style={{ fontFamily: '"Playfair Display", serif' }}>
              Age Criteria
            </h3>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#1A2E6C] text-white">
                    <th className="py-4 px-6 font-semibold">Class</th>
                    <th className="py-4 px-6 font-semibold">Age Requirement</th>
                  </tr>
                </thead>
                <tbody>
                  {AGE_CRITERIA.map((row, i) => (
                    <tr key={i} className={`border-b border-gray-50 hover:bg-blue-50/50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                      <td className="py-4 px-6 font-semibold text-[#1A2E6C]">{row.class}</td>
                      <td className="py-4 px-6 text-gray-600">{row.age}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Documents Checklist */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 className="text-[#1A2E6C] font-bold text-2xl mb-8" style={{ fontFamily: '"Playfair Display", serif' }}>
              Documents Required
            </h3>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <ul className="space-y-4">
                {DOCUMENTS.map((doc, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="mt-1 bg-[#F5B700]/20 rounded p-1 flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-[#E09900]" />
                    </div>
                    <span className="text-gray-700 font-medium leading-relaxed">{doc}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 4: INQUIRY FORM ─── */}
      <section className="py-24 px-6 bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F5B700]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1A2E6C]/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

        <div className="max-w-[800px] mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-[#F5B700] text-[13px] font-bold tracking-[0.2em] uppercase mb-4 block">GET IN TOUCH</span>
            <h2 className="text-[#1A2E6C] font-bold text-3xl md:text-5xl" style={{ fontFamily: '"Playfair Display", serif' }}>
              Admission Inquiry
            </h2>
            <p className="text-gray-500 mt-4 max-w-lg mx-auto">Leave your details below and our admissions team will get back to you shortly.</p>
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
                <h3 className="text-2xl font-bold text-[#1A2E6C] mb-2">Inquiry Submitted Successfully!</h3>
                <p className="text-gray-600 mb-8">Thank you for your interest in {process.env.NEXT_PUBLIC_SCHOOL_NAME || "Matha English Medium School"}. Our team will contact you soon.</p>
                <button 
                  onClick={() => setFormState('idle')}
                  className="bg-[#1A2E6C] text-white px-8 py-3 rounded-full font-bold hover:bg-[#0D1B3E] transition-colors"
                >
                  Send Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Floating Label Input - Name */}
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="block px-2.5 pb-2.5 pt-6 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#F5B700] peer"
                      placeholder=" "
                    />
                    <label htmlFor="name" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#F5B700] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                      Student Full Name *
                    </label>
                  </div>

                  {/* Floating Label Input - Parent */}
                  <div className="relative">
                    <input
                      type="text"
                      id="parent"
                      name="parent"
                      value={formData.parent}
                      onChange={handleInputChange}
                      required
                      className="block px-2.5 pb-2.5 pt-6 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#F5B700] peer"
                      placeholder=" "
                    />
                    <label htmlFor="parent" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#F5B700] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                      Parent/Guardian Name *
                    </label>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Floating Label Input - Phone */}
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="block px-2.5 pb-2.5 pt-6 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#F5B700] peer"
                      placeholder=" "
                    />
                    <label htmlFor="phone" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#F5B700] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                      Phone Number *
                    </label>
                  </div>

                  {/* Floating Label Input - Email */}
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="block px-2.5 pb-2.5 pt-6 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#F5B700] peer"
                      placeholder=" "
                    />
                    <label htmlFor="email" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#F5B700] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                      Email Address (Optional)
                    </label>
                  </div>
                </div>

                {/* Floating Label Select - Class */}
                <div className="relative">
                  <select
                    id="class"
                    name="class"
                    value={formData.class}
                    onChange={handleInputChange}
                    required
                    className="block px-2.5 pb-2.5 pt-6 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-[#F5B700] peer"
                  >
                    <option value="" disabled hidden></option>
                    <option value="LKG">LKG</option>
                    <option value="UKG">UKG</option>
                    <option value="Class 1">Class 1</option>
                    <option value="Class 2">Class 2</option>
                    <option value="Class 3">Class 3</option>
                    <option value="Class 4">Class 4</option>
                    <option value="Class 5">Class 5</option>
                    <option value="Class 6">Class 6</option>
                    <option value="Class 7">Class 7</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                  </select>
                  <label htmlFor="class" className={`absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-white px-2 left-1 ${formData.class ? 'text-[#F5B700]' : 'peer-focus:text-[#F5B700] peer-focus:-translate-y-4 peer-focus:scale-75'}`}>
                    Class Applying For *
                  </label>
                </div>

                {/* Floating Label Textarea - Message */}
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    className="block px-2.5 pb-2.5 pt-6 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#F5B700] peer resize-none"
                    placeholder=" "
                  ></textarea>
                  <label htmlFor="message" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#F5B700] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-6 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                    Any Message or Questions? (Optional)
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="w-full flex items-center justify-center gap-2 bg-[#F5B700] text-[#0D1B3E] font-bold text-lg py-4 rounded-xl hover:bg-[#E09900] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {formState === 'submitting' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      Submit Inquiry <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

