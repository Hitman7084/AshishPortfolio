import { FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-transparent text-white py-8 px-6 relative overflow-hidden border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
        <p className="text-sm">© 2025 Ashish Kumar. All rights reserved.</p>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-violet-400 transition"><FaInstagram size={20} /></a>
          <a href="#" className="hover:text-violet-400 transition"><FaYoutube size={20} /></a>
          <a href="#" className="hover:text-violet-400 transition"><FaLinkedin size={20} /></a>
        </div>
      </div>
      {/* removed the old green spin animation to avoid clashing with the starfield */}
    </footer>
  );
}
