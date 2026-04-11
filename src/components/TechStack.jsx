import { motion } from 'framer-motion';

const stack = [
  { category: "ML & Vision", items: ["Python", "PyTorch", "OpenCV", "YOLOv8", "Vision Transformers"] },
  { category: "Data & Geo", items: ["pyKrige", "PCMCI", "RDKit", "Statistica", "PCA / LDA"] },
  { category: "Tools & OS", items: ["Fedora Linux", "LaTeX", "Git", "MLflow", "Docker"] }
];

const TechStack = () => {
  return (
    <section id="stack" className="py-32 relative overflow-hidden">
      {/* Decorative Matrix Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none flex justify-center items-center">
         <div className="w-[800px] h-[800px] border-[1px] border-acid/20 rounded-full border-dashed animate-[spin_120s_linear_infinite]" />
         <div className="absolute w-[600px] h-[600px] border-[1px] border-emerald-500/20 rounded-full border-dashed animate-[spin_90s_linear_infinite_reverse]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 inline-block relative">
            Technical Ecosystem
            <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-acid to-transparent"></div>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stack.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-panel p-8 rounded-3xl"
            >
              <h3 className="text-xl font-mono font-bold text-acid mb-6">./{group.category.toLowerCase().replace(' & ', '_')}</h3>
              <div className="flex flex-wrap gap-3">
                {group.items.map(item => (
                  <span 
                    key={item} 
                    className="px-4 py-2 bg-forest-900 rounded-lg text-sm border border-white/5 text-slate-300 hover:border-acid/30 hover:text-white transition-colors cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;