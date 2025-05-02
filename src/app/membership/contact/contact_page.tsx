'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SendHorizonal } from 'lucide-react';

const Input = ({ label, ...props }: React.ComponentProps<'input'> & { label: string }) => (
  <label className="flex flex-col space-y-2 w-full">
    <span className="text-sm font-medium text-white font-heading uppercase tracking-wide">
      {label}
    </span>
    <input
      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent placeholder-white-400 text-white-100"
      {...props}
    />
  </label>
);

const TextArea = ({ label, ...props }: React.ComponentProps<'textarea'> & { label: string }) => (
  <label className="flex flex-col space-y-2 w-full">
    <span className="text-sm font-medium text-white font-heading uppercase tracking-wide">
      {label}
    </span>
    <textarea
      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg px-4 py-3 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-accent placeholder-white-400 text-white-100"
      {...props}
    />
  </label>
);

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('error');
    }
  };

  return (
    <div className="w-full text-white overflow-x-hidden font-sans py-24 px-4 md:px-8 lg:px-16 relative">

      {/* Preserved heading block */}
      <div className="flex flex-col gap-2 w-full justify-center items-center mb-12 relative z-10">
        <h3 className="text-accent text-center uppercase font-heading font-bold tracking-widest">
          Get in Touch
        </h3>
        <h1 className="text-3xl text-center lg:text-5xl font-heading font-bold leading-tight">
          Contact Us
        </h1>
      </div>

      {/* Form card */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 max-w-3xl mx-auto space-y-6 backdrop-blur-lg border rounded-2xl p-8"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <Input
            label="Name"
            name="name"
            type="text"
            placeholder="Your full name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <Input
          label="Subject"
          name="subject"
          type="text"
          placeholder="Why are you reaching out?"
          value={form.subject}
          onChange={handleChange}
          required
        />
        <TextArea
          label="Message"
          name="message"
          placeholder="Tell us how we can help you…"
          value={form.message}
          onChange={handleChange}
          required
        />

        <motion.button
          type="submit"
          disabled={status === 'loading'}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center justify-center px-8 py-3 border"
        >
          {status === 'loading' ? (
            <span className="animate-pulse">Sending…</span>
          ) : (
            <>
              <SendHorizonal size={18} className="mr-2" /> Send Message
            </>
          )}
        </motion.button>

        {status === 'success' && (
          <p className="text-green-400 pt-4">Thank you! Your message has been sent.</p>
        )}
        {status === 'error' && (
          <p className="text-red-400 pt-4">Oops! Something went wrong. Please try again later.</p>
        )}
      </motion.form>
    </div>
  );
}

