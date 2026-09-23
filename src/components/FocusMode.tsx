import { motion } from 'framer-motion';
import { Bookmark, X } from 'lucide-react';
import type { Question } from '../types';

interface Props {
  question: Question;
  saved: boolean;
  onClose: () => void;
  onToggleSave: () => void;
}

export default function FocusMode({ question, saved, onClose, onToggleSave }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col bg-ink-950 px-7 py-8 text-cream-50"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-cream-100/50">
          De Vrijdenkers
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onToggleSave}
            aria-label="Vraag opslaan"
            className={`rounded-full p-2.5 transition-colors ${saved ? 'text-gold-400' : 'text-cream-100/60 hover:text-cream-50'}`}
          >
            <Bookmark size={20} strokeWidth={2.2} fill={saved ? 'currentColor' : 'none'} />
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Focusmodus sluiten"
            className="rounded-full p-2.5 text-cream-100/60 transition-colors hover:text-cream-50"
          >
            <X size={22} strokeWidth={2.2} />
          </button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5, ease: 'easeOut' }}
        className="flex flex-1 items-center justify-center"
        onClick={onClose}
      >
        <p className="text-center font-serif text-[9vw] font-medium leading-[1.15] sm:text-5xl">
          {question.text}
        </p>
      </motion.div>

      <p className="text-center text-xs font-medium uppercase tracking-[0.14em] text-cream-100/40">
        Tik ergens om terug te keren
      </p>
    </motion.div>
  );
}
