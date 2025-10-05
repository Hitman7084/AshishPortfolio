'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { contactContent } from './content';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setModalMessage("You can't export an empty timeline, Fill out the form first. 🎬😉");
      setShowModal(true);
      return;
    }

    try {
      // Type-safe environment variable checks
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID;
      const receiveEmail = process.env.NEXT_PUBLIC_RECIEVE_EMAIL;

      if (!serviceId || !templateId || !userId || !receiveEmail) {
        throw new Error('Missing required EmailJS configuration');
      }

      const templateParams = {
        from_name: name,
        reply_to: email,
        to_email: receiveEmail,
        message: message
      };

      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        userId
      );

      setModalMessage("Message sent! Time to hit render. 🚀");
      setShowModal(true);

      // Clear form on success
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Failed to send message:', error instanceof Error ? {
        message: error.message,
        stack: error.stack
      } : 'Unknown error');
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Unknown error occurred';

      setModalMessage(
        errorMessage === 'Invalid response from server'
          ? "Server error. Please try again later. 🔄"
          : "Failed to send message. Please try again. 🔄"
      );
      setShowModal(true);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-16 bg-transparent text-white relative z-10">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold mb-6"
        >
          {contactContent.title}
        </motion.h2>

        <p className="mb-12 text-gray-400">
          {contactContent.paragraph}
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-lg p-8 rounded-xl shadow-2xl border border-white/10 space-y-6"
        >
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-black border border-white/10 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-black border border-white/10 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <textarea
            placeholder="Your Message"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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

      {showModal && (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="bg-gradient-to-br from-violet-500/90 to-purple-700/90 text-white p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center border border-white/20"
        >
          <p className="mb-6 text-lg font-semibold">{modalMessage}</p>
          <button
            onClick={() => setShowModal(false)}
            className="px-6 py-2 bg-white text-violet-700 font-bold rounded-full hover:bg-violet-100 transition"
          >
            Got it!
          </button>
        </motion.div>
      </div>
    )}
    </section>
  );
}
