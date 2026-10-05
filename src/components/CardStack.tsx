import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Maximize2, ThumbsDown, ThumbsUp } from 'lucide-react';
import { buildStack } from '../lib/matching';
import QuestionCard, { type QuestionCardHandle } from './QuestionCard';
import type { IntakeContext, InteractionStore, Question } from '../types';

interface Props {
  context: IntakeContext;
  interactions: InteractionStore;
  like: (id: number) => void;
  dislike: (id: number) => void;
  toggleSave: (id: number) => void;
  isSaved: (id: number) => boolean;
  onFocusQuestion: (question: Question) => void;
}

// `context` only ever changes by unmounting this component (see App.tsx's
// `!context` early return), so a single lazy-init build per mount is enough —
// no effect needed to react to context changes.
export default function CardStack({
  context,
  interactions,
  like,
  dislike,
  toggleSave,
  isSaved,
  onFocusQuestion,
}: Props) {
  const [queue, setQueue] = useState<Question[]>(() => buildStack(context, interactions));
  const topCardRef = useRef<QuestionCardHandle>(null);
  const swipeLockRef = useRef(false);

  const top = queue[0];

  // Called by QuestionCard once its fly-out animation finishes — for both
  // drag-released and button-triggered swipes, so the rating and queue only
  // advance after the card has actually left the screen.
  const commitSwipe = (direction: 'left' | 'right') => {
    swipeLockRef.current = false;
    setQueue((q) => {
      const [swiped, ...rest] = q;
      if (!swiped) return q;
      if (direction === 'right') like(swiped.id);
      else dislike(swiped.id);
      return rest;
    });
  };

  const handleButtonSwipe = (direction: 'left' | 'right') => {
    if (!top || swipeLockRef.current) return;
    swipeLockRef.current = true;
    topCardRef.current?.flyOut(direction);
  };

  const handleSkip = () => {
    if (!top || swipeLockRef.current) return;
    setQueue((q) => q.slice(1));
  };

  const handleReshuffle = () => setQueue(buildStack(context, interactions));

  const visible = queue.slice(0, 3);

  return (
    <div className="flex flex-1 flex-col">
      <div className="relative mx-auto w-full max-w-md flex-1" style={{ minHeight: 420 }}>
        <AnimatePresence mode="popLayout">
          {visible.length > 0 ? (
            visible
              .map((q, i) => (
                <QuestionCard
                  key={q.id}
                  ref={i === 0 ? topCardRef : undefined}
                  question={q}
                  isTop={i === 0}
                  stackDepth={i}
                  saved={isSaved(q.id)}
                  onSwipe={commitSwipe}
                  onToggleSave={() => toggleSave(q.id)}
                />
              ))
              .reverse()
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex h-full flex-col items-center justify-center gap-4 rounded-tile border border-line bg-wash px-8 text-center"
            >
              <p className="font-serif text-3xl font-bold leading-[1.1]">Kaarten op!</p>
              <p className="font-serif text-base leading-[1.6] text-ink-soft">
                Jullie zijn door deze stapel heen. Begin opnieuw of stel de sfeer bij.
              </p>
              <button
                type="button"
                onClick={handleReshuffle}
                className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-transform active:scale-[0.98]"
              >
                Nieuwe stapel
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mx-auto mt-9 flex w-full max-w-md items-start justify-center gap-6">
        <div className="flex flex-col items-center gap-1.5">
          <button
            type="button"
            aria-label="Niet mijn ding"
            disabled={!top}
            onClick={() => handleButtonSwipe('left')}
            className="flex h-14 w-14 items-center justify-center rounded-full border border-ink/30 transition-[transform,border-color] hover:border-ink active:scale-95 disabled:opacity-40"
          >
            <ThumbsDown size={22} strokeWidth={2.2} />
          </button>
          <span className="text-xs font-medium text-ink-soft">Niet mijn ding</span>
        </div>
        <div className="flex flex-col items-center gap-1.5 pt-1.5">
          <button
            type="button"
            aria-label="Nieuwe vraag"
            disabled={!top}
            onClick={handleSkip}
            className="flex h-11 w-11 items-center justify-center rounded-full transition-[transform,background-color] hover:bg-ink/8 active:scale-95 disabled:opacity-40"
          >
            <ArrowRight size={20} strokeWidth={2.2} />
          </button>
          <span className="text-xs font-medium text-ink-soft">Nieuwe vraag</span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <button
            type="button"
            aria-label="Wel mijn ding"
            disabled={!top}
            onClick={() => handleButtonSwipe('right')}
            className="flex h-14 w-14 items-center justify-center rounded-full border border-ink/30 transition-[transform,border-color] hover:border-ink active:scale-95 disabled:opacity-40"
          >
            <ThumbsUp size={22} strokeWidth={2.2} />
          </button>
          <span className="text-xs font-medium text-ink-soft">Wel mijn ding</span>
        </div>
      </div>

      <button
        type="button"
        disabled={!top}
        onClick={() => top && onFocusQuestion(top)}
        className="mx-auto mt-5 flex w-full max-w-md items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-base font-semibold text-on-accent transition-[transform,background-color] hover:bg-accent-deep active:scale-[0.98] disabled:opacity-40"
      >
        <Maximize2 size={17} strokeWidth={2.3} />
        Stel deze vraag
      </button>
    </div>
  );
}
