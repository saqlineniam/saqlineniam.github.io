const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-forest-900/80 backdrop-blur-md py-12 relative z-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div>
          <span className="text-acid font-bold text-xl block mb-1">Saklain Niam</span>
          <p className="text-slate-500 text-sm font-mono">BSc Food Engineering & Tea Technology, SUST.</p>
        </div>

        <div className="flex gap-6">
          <a href="https://github.com/saqlineniam" className="text-slate-400 hover:text-acid transition-colors">GitHub</a>
          <a href="https://linkedin.com/in/saklain-niam" className="text-slate-400 hover:text-acid transition-colors">LinkedIn</a>
          <a href="mailto:saklain35@student.sust.edu" className="text-slate-400 hover:text-acid transition-colors">Email</a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;