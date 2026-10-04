import { motion } from 'framer-motion';
import { Bookmark, Maximize2 } from 'lucide-react';
import { questionsData } from '../data/questionsData';
import { tileColor } from '../lib/tileColor';
import type { Question } from '../types';

interface Props {
  savedIds: number[];
  toggleSave: (id: number) => void;
  onFocusQuestion: (question: Question) => void;
}

export default function SavedQuestions({ savedIds, toggleSave, onFocusQuestion }: Props) {
  const saved = questionsData.filter((q) => savedIds.includes(q.id));

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col px-1 pb-6 pt-10">
      <h2 className="font-serif text-4xl font-bold leading-[1.06] tracking-[-0.01em]">Bewaarde vragen</h2>
      <p className="mt-3 font-serif text-[17px] leading-[1.6] text-ink-soft">
        {saved.length > 0
          ? `${saved.length} ${saved.length === 1 ? 'vraag die het bewaren waard was' : 'vragen die het bewaren waard waren'}.`
          : 'Nog niets bewaard. Tik op de bladwijzer bij een vraag die je later terug wilt vinden.'}
      </p>

      <div className="mt-7 flex flex-1 flex-col gap-3">
        {saved.map((q) => (
          <motion.div
            layout
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            key={q.id}
            className={`rounded-tile p-5 text-tile-ink ${tileColor[q.category]}`}
          >
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-tile-ink px-2.5 py-1 text-[11px] font-semibold text-on-accent">
                {q.mood}
              </span>
              <span className="text-xs font-semibold">{q.category}</span>
            </div>
            <p className="font-serif text-[22px] font-bold leading-[1.15]">{q.text}</p>
            <div className="-mb-2 -mr-2 mt-3 flex items-center justify-end gap-1">
              <button
                type="button"
                onClick={() => onFocusQuestion(q)}
                aria-label="Stel deze vraag"
                className="rounded-full p-2.5 transition-colors hover:bg-tile-ink/10"
              >
                <Maximize2 size={18} strokeWidth={2.2} />
              </button>
              <button
                type="button"
                onClick={() => toggleSave(q.id)}
                aria-label="Verwijderen uit bewaard"
                className="rounded-full p-2.5 transition-colors hover:bg-tile-ink/10"
              >
                <Bookmark size={18} strokeWidth={2.2} fill="currentColor" />
              </button>
            </div>
          </motion.div>
        ))}

        {saved.length === 0 && (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-tile border border-line bg-wash py-16 text-center text-ink-soft">
            <Bookmark size={28} strokeWidth={1.6} />
            <span className="text-sm font-medium">Leeg voor nu</span>
          </div>
        )}
      </div>
    </div>
  );
}
