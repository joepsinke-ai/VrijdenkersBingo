import { motion } from 'framer-motion';
import { Bookmark, Maximize2 } from 'lucide-react';
import { questionsData } from '../data/questionsData';
import type { Question } from '../types';

interface Props {
  savedIds: number[];
  toggleSave: (id: number) => void;
  onFocusQuestion: (question: Question) => void;
}

export default function SavedQuestions({ savedIds, toggleSave, onFocusQuestion }: Props) {
  const saved = questionsData.filter((q) => savedIds.includes(q.id));

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col px-6 pb-6 pt-10">
      <h2 className="font-serif text-3xl font-medium text-ink-950">Bewaarde vragen</h2>
      <p className="mt-2 text-[15px] text-ink-600">
        {saved.length > 0
          ? `${saved.length} vraag${saved.length === 1 ? '' : 'en'} die het bewaren waard waren.`
          : 'Nog niets bewaard — tik op het sterretje bij een vraag die je later terug wilt vinden.'}
      </p>

      <div className="mt-6 flex flex-1 flex-col gap-3">
        {saved.map((q) => (
          <motion.div
            layout
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            key={q.id}
            className="rounded-2xl border border-ink-900/8 bg-cream-50 p-5 shadow-card"
          >
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-terracotta-500/12 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-terracotta-700">
                #{q.mood}
              </span>
              <span className="rounded-full bg-ink-900/6 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-ink-600">
                {q.category}
              </span>
            </div>
            <p className="font-serif text-lg leading-snug text-ink-950">{q.text}</p>
            <div className="mt-4 flex items-center justify-end gap-1 border-t border-ink-900/8 pt-3">
              <button
                type="button"
                onClick={() => onFocusQuestion(q)}
                aria-label="Stel deze vraag"
                className="rounded-full p-2 text-ink-500 transition-colors hover:text-ink-900"
              >
                <Maximize2 size={17} strokeWidth={2.2} />
              </button>
              <button
                type="button"
                onClick={() => toggleSave(q.id)}
                aria-label="Verwijderen uit bewaard"
                className="rounded-full p-2 text-gold-500 transition-colors hover:text-terracotta-600"
              >
                <Bookmark size={17} strokeWidth={2.2} fill="currentColor" />
              </button>
            </div>
          </motion.div>
        ))}

        {saved.length === 0 && (
          <div className="mt-4 flex flex-1 flex-col items-center justify-center gap-3 rounded-[28px] border border-dashed border-ink-900/15 py-16 text-center text-ink-400">
            <Bookmark size={28} strokeWidth={1.6} />
            <span className="text-sm">Leeg voor nu</span>
          </div>
        )}
      </div>
    </div>
  );
}
