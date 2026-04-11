import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navigation = () => {
  const links = [
    { path: '/', label: 'About' },
    { path: '/publications', label: 'Publications' },
    { path: '/projects', label: 'Projects' },
    { path: '/cv', label: 'CV & Skills' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav transition-all duration-300">
      <div className="max-w-5xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <NavLink to="/" className="font-serif text-xl font-semibold tracking-wide text-slate-900 group">
          Saklain<span className="text-uga-red">.</span>Niam
        </NavLink>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => 
                `text-sm font-medium transition-colors relative py-1 ${
                  isActive ? 'text-uga-red' : 'text-slate-500 hover:text-slate-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-uga-red"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Menu Button (Minimalist) */}
        <button className="md:hidden text-slate-500 hover:text-slate-900 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </button>

      </div>
    </header>
  );
};

export default Navigation;