'use client';
import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 md:px-16 bg-transparent text-white relative z-10">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold mb-6"
        >
          Let’s Work Together
        </motion.h2>

        <p className="mb-12 text-gray-400">
          Ready to bring your vision to life? Reach out and let's get started.
        </p>

        <form className="bg-white/5 backdrop-blur-lg p-8 rounded-xl shadow-2xl border border-white/10 space-y-6">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-3 bg-black border border-white/10 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-3 bg-black border border-white/10 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <textarea
            placeholder="Your Message"
            rows={5}
            className="w-full px-4 py-3 bg-black border border-white/10 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <button
            type="submit"
            className="bg-violet-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-violet-600 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
