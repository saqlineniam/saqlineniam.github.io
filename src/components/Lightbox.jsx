import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Lightbox = ({ img, onClose }) => {
  useEffect(() => {
    if (!img) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [img, onClose]);

  return (
    <AnimatePresence>
      {img && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-zinc-950/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-label={img.alt || 'Image preview'}
        >
          <motion.figure
            initial={{ scale: 0.96 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute -top-11 right-0 text-white/70 hover:text-white flex items-center gap-1.5 text-sm" aria-label="Close">
              <X size={18} /> Close
            </button>
            <img src={img.src} alt={img.alt} className="w-full max-h-[80vh] object-contain rounded-xl bg-white" />
            {img.caption && <figcaption className="text-white/70 text-sm text-center mt-4 max-w-2xl mx-auto">{img.caption}</figcaption>}
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Lightbox;
