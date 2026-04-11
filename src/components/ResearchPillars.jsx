import { motion } from 'framer-motion';
import { Camera, BrainCircuit, Droplets } from 'lucide-react';

const pillars = [
  {
    id: 1,
    title: "Hyperspectral Imaging",
    desc: "Non-destructive quality evaluation and shelf-life prediction of perishable goods using advanced spectral data analysis.",
    icon: <Camera className="text-acid" size={32} />,
    colSpan: "md:col-span-7",
    bg: "bg-forest-800"
  },
  {
    id: 2,
    title: "Deep Learning & YOLO",
    desc: "Real-time UAV-based plant counting, instance segmentation, and weed mapping in small-scale fields.",
    icon: <BrainCircuit className="text-emerald-400" size={32} />,
    colSpan: "md:col-span-5",
    bg: "bg-emerald-900/20"
  },
  {
    id: 3,
    title: "Precision Agriculture",
    desc: "Optimizing edible coatings and bioactives extraction using ML and response surface methodologies.",
    icon: <Droplets className="text-teal-400" size={32} />,
    colSpan: "md:col-span-12",
    bg: "bg-gradient-to-r from-forest-800 to-emerald-900/30"
  }
];

const ResearchPillars = () => {
  return (
    <section id="research" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-4">
            <span className="w-12 h-[2px] bg-acid inline-block"></span>
            Research Pillars
          </h2>
          <p className="text-slate-400 font-mono text-sm max-w-xl">
            // Core domains of my academic investigations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(250px,auto)]">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className={`glass-panel p-8 rounded-3xl ${pillar.colSpan} ${pillar.bg} relative overflow-hidden group flex flex-col justify-between`}
            >
              {/* Subtle background icon */}
              <div className="absolute -bottom-6 -right-6 opacity-5 scale-150 transform group-hover:scale-125 transition-transform duration-500">
                {pillar.icon}
              </div>

              <div>
                <div className="mb-6 p-4 rounded-2xl bg-white/5 inline-block backdrop-blur-md border border-white/10">
                  {pillar.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{pillar.title}</h3>
              </div>
              <p className="text-slate-400 leading-relaxed max-w-lg">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ResearchPillars;