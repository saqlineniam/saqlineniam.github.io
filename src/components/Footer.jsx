const Footer = () => {
  return (
    <footer className="border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 py-12 relative z-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div>
          <span className="text-ag-green font-bold text-xl">Saklain Niam</span>
        </div>

        <div className="flex gap-6">
          <a href="https://github.com/saqlineniam" className="text-slate-400 dark:text-slate-500 hover:text-ag-green transition-colors text-sm font-bold uppercase tracking-widest">GitHub</a>
          <a href="https://linkedin.com/in/saklain-niam" className="text-slate-400 dark:text-slate-500 hover:text-ag-green transition-colors text-sm font-bold uppercase tracking-widest">LinkedIn</a>
          <a href="mailto:saklain35@student.sust.edu" className="text-slate-400 dark:text-slate-500 hover:text-ag-green transition-colors text-sm font-bold uppercase tracking-widest">Email</a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;