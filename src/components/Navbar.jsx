import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Research', href: '#research' },
    { name: 'Publications', href: '#publications' },
    { name: 'Stack', href: '#stack' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'}`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className={`glass-panel rounded-full px-6 py-3 flex items-center justify-between ${scrolled ? 'bg-forest-800/80' : 'bg-transparent border-transparent shadow-none'}`}>
          
          <a href="#" className="text-xl font-bold tracking-tight flex items-center gap-2">
            <span className="text-acid">SN.</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-acid transition-colors font-mono"
              >
                {link.name}
              </a>
            ))}
            <a href="https://github.com/saqlineniam" target="_blank" rel="noreferrer" className="px-5 py-2 rounded-full border border-acid/50 text-acid hover:bg-acid hover:text-forest-900 transition-all font-mono text-sm">
              GitHub
            </a>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-slate-300 hover:text-acid" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 glass-panel rounded-2xl p-6 flex flex-col gap-4 bg-forest-800/95"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-slate-300 hover:text-acid transition-colors"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;