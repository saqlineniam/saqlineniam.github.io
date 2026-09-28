import { useState } from 'react';
import { ScanEye, FlaskConical, Bot, Music, Image as ImageIcon } from 'lucide-react';

const categoryIcon = {
  'Robotics & RL': Bot,
  'Computer Vision': ScanEye,
  'Food Science & Biotech': FlaskConical,
  'Side Projects': Music,
};

// Lazy image that fills its frame, with a tidy placeholder when there's no image
// (or it fails to load). The frame's size comes from className (aspect ratio or layout),
// never from the photo. Children render on top (badges, overlays).
const Thumb = ({ src, alt, category, label, className = '', imgClassName = '', children }) => {
  const [failed, setFailed] = useState(false);
  const Icon = categoryIcon[category] || ImageIcon;

  if (!src || failed) {
    return (
      <div className={`relative flex flex-col items-center justify-center gap-3 text-center p-6 bg-gradient-to-br from-zinc-100 to-emerald-50 dark:from-zinc-900 dark:to-emerald-950/40 ${className}`}>
        <div className="absolute inset-0 opacity-60 [background-size:24px_24px] [background-image:radial-gradient(rgb(16_185_129/.25)_1px,transparent_1px)]" />
        <Icon size={32} className="relative text-emerald-600/70 dark:text-emerald-400/70" strokeWidth={1.5} />
        {label && <span className="relative text-xs font-medium text-zinc-500 dark:text-zinc-400 max-w-[15rem]">{label}</span>}
        {children}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-zinc-100 dark:bg-zinc-800 ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className={`absolute inset-0 w-full h-full object-cover ${imgClassName}`}
      />
      {children}
    </div>
  );
};

export default Thumb;
