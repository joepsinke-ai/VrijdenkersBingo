import { motion } from 'framer-motion';
import { Bookmark, X } from 'lucide-react';
import { tileColor } from '../lib/tileColor';
import type { Question } from '../types';
import Wordmark from './Wordmark';

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
      className={`fixed inset-0 z-50 flex flex-col px-7 py-6 text-tile-ink ${tileColor[question.category]}`}
    >
      <div className="flex items-center justify-between">
        <Wordmark className="text-tile-ink/70" />
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onToggleSave}
            aria-label="Vraag opslaan"
            className="rounded-full p-2.5 transition-colors hover:bg-tile-ink/10"
          >
            <Bookmark size={20} strokeWidth={2.2} fill={saved ? 'currentColor' : 'none'} />
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Focusmodus sluiten"
            className="rounded-full p-2.5 transition-colors hover:bg-tile-ink/10"
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
        <p className="max-w-3xl text-center font-serif text-[9.5vw] font-bold leading-[1.08] tracking-[-0.01em] sm:text-6xl">
          {question.text}
        </p>
      </motion.div>

      <p className="text-center text-sm font-medium text-tile-ink/70">Tik ergens om terug te keren</p>
    </motion.div>
  );
}
