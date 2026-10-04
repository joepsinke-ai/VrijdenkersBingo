import { forwardRef, useImperativeHandle } from 'react';
import { animate, motion, useMotionValue, useTransform, type PanInfo } from 'framer-motion';
import { Bookmark, ThumbsDown, ThumbsUp } from 'lucide-react';
import { tileColor } from '../lib/tileColor';
import type { Question } from '../types';

interface Props {
  question: Question;
  isTop: boolean;
  saved: boolean;
  stackDepth: number;
  onSwipe: (direction: 'left' | 'right') => void;
  onToggleSave: () => void;
}

export interface QuestionCardHandle {
  flyOut: (direction: 'left' | 'right') => void;
}

const SWIPE_THRESHOLD = 110;
const FLY_OUT_DISTANCE = 600;

const QuestionCard = forwardRef<QuestionCardHandle, Props>(function QuestionCard(
  { question, isTop, saved, stackDepth, onSwipe, onToggleSave },
  ref,
) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-220, 0, 220], [-10, 0, 10]);
  const likeOpacity = useTransform(x, [16, 110], [0, 1]);
  const likeScale = useTransform(x, [16, 110], [0.75, 1]);
  const dislikeOpacity = useTransform(x, [-110, -16], [1, 0]);
  const dislikeScale = useTransform(x, [-110, -16], [1, 0.75]);
  const flyOut = (direction: 'left' | 'right') => {
    const target = direction === 'right' ? FLY_OUT_DISTANCE : -FLY_OUT_DISTANCE;
    animate(x, target, { type: 'spring', stiffness: 260, damping: 26 }).then(() => onSwipe(direction));
  };

  useImperativeHandle(ref, () => ({ flyOut }));

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > SWIPE_THRESHOLD) {
      flyOut('right');
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      flyOut('left');
    }
  };

  const scale = 1 - Math.min(stackDepth, 2) * 0.045;
  const translateY = Math.min(stackDepth, 2) * 14;

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        zIndex: 10 - stackDepth,
      }}
      initial={{ scale: scale - 0.02, y: translateY + 6, opacity: 0 }}
      animate={{ scale, y: translateY, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={isTop ? handleDragEnd : undefined}
    >
      <div
        aria-hidden={!isTop}
        className={`relative flex h-full w-full flex-col overflow-hidden rounded-tile border border-tile-ink/15 p-7 text-tile-ink shadow-tile ${tileColor[question.category]} ${
          isTop ? '' : 'pointer-events-none'
        }`}
      >
        {isTop && (
          <>
            <motion.div
              style={{ opacity: likeOpacity, scale: likeScale }}
              className="pointer-events-none absolute left-1/2 top-9 z-20 flex -translate-x-1/2 rotate-[-5deg] items-center gap-2 whitespace-nowrap rounded-full bg-tile-ink px-5 py-2.5 text-on-accent"
            >
              <ThumbsUp size={20} strokeWidth={2.5} />
              <span className="text-base font-bold">Wel mijn ding</span>
            </motion.div>
            <motion.div
              style={{ opacity: dislikeOpacity, scale: dislikeScale }}
              className="pointer-events-none absolute left-1/2 top-9 z-20 flex -translate-x-1/2 rotate-[5deg] items-center gap-2 whitespace-nowrap rounded-full bg-tile-ink px-5 py-2.5 text-on-accent"
            >
              <ThumbsDown size={20} strokeWidth={2.5} />
              <span className="text-base font-bold">Niet mijn ding</span>
            </motion.div>
          </>
        )}

        <div className="relative z-10 flex h-full flex-col">
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-tile-ink px-2.5 py-1 text-[11px] font-semibold text-on-accent">
              {question.mood}
            </span>
            <span className="text-xs font-semibold">
              {question.company === 'Hecht' ? 'Hechte vrienden' : question.company}
            </span>
          </div>

          <div className="flex flex-1 items-center">
            <p className="font-serif text-[30px] font-bold leading-[1.12] tracking-[-0.01em] sm:text-[34px]">
              {question.text}
            </p>
          </div>

          <div className="-mb-2 -mr-2 mt-6 flex items-center justify-between">
            <span className="text-xs font-semibold">{question.category}</span>
            {isTop && (
              <button
                type="button"
                onClick={onToggleSave}
                aria-label="Vraag opslaan"
                className="rounded-full p-2.5 transition-colors hover:bg-tile-ink/10"
              >
                <Bookmark size={20} strokeWidth={2.2} fill={saved ? 'currentColor' : 'none'} />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default QuestionCard;
