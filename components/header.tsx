'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';
import { headerLinks } from './content';

export default function Header() {
  const [open, setOpen] = useState(false);

  // Custom click handler for smooth scrolling
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    const targetElement = document.querySelector(href);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }

    // Close the mobile menu after a link is clicked
    setOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur bg-black/50 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 md:px-16 flex items-center justify-between h-16">
        <Link href="/" className="text-xl font-bold text-violet-400">
          Ashish Kumar
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 text-white font-medium">
          {headerLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="hover:text-violet-400 transition cursor-pointer"
            >
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
          {headerLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="block py-2 text-white hover:text-violet-400 cursor-pointer"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
