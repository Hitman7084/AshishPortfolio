'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Header() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: 'About', href: '#about' },
    { name: 'Expertise', href: '#expertise' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur bg-black/50 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 md:px-16 flex items-center justify-between h-16">
        <Link href="/" className="text-xl font-bold text-green-400">
          Ashish Kumar
        </Link>

        <nav className="hidden md:flex gap-8 text-white font-medium">
          {links.map(link => (
            <a key={link.name} href={link.href} className="hover:text-green-400 transition">
              {link.name}
            </a>
          ))}
        </nav>

        <button
          className="md:hidden text-white"
          onClick={() => setOpen(prev => !prev)}
        >
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black border-t border-white/10 px-6 py-4">
          {links.map(link => (
            <a
              key={link.name}
              href={link.href}
              className="block py-2 text-white hover:text-green-400"
              onClick={() => setOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
