import { forwardRef, useImperativeHandle } from 'react';
import { animate, motion, useMotionValue, useTransform, type PanInfo } from 'framer-motion';
import { Bookmark, ThumbsDown, ThumbsUp } from 'lucide-react';
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
  const tintColor = useTransform(
    x,
    [-160, -16, 0, 16, 160],
    [
      'rgba(168, 84, 60, 0.22)',
      'rgba(168, 84, 60, 0)',
      'rgba(0, 0, 0, 0)',
      'rgba(127, 148, 130, 0)',
      'rgba(127, 148, 130, 0.22)',
    ],
  );

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
        className={`relative flex h-full w-full flex-col overflow-hidden rounded-[28px] border border-ink-900/8 bg-cream-50 p-7 shadow-card-lg ${
          isTop ? '' : 'pointer-events-none'
        }`}
      >
        {isTop && (
          <>
            <motion.div
              style={{ backgroundColor: tintColor }}
              className="pointer-events-none absolute inset-0 z-0 rounded-[28px]"
            />
            <motion.div
              style={{ opacity: likeOpacity, scale: likeScale }}
              className="pointer-events-none absolute left-1/2 top-9 z-20 flex -translate-x-1/2 rotate-[-5deg] items-center gap-2 rounded-2xl bg-sage-500 px-5 py-2.5 text-cream-50 shadow-card"
            >
              <ThumbsUp size={20} strokeWidth={2.5} />
              <span className="text-base font-bold uppercase tracking-wide">Wel mijn ding</span>
            </motion.div>
            <motion.div
              style={{ opacity: dislikeOpacity, scale: dislikeScale }}
              className="pointer-events-none absolute left-1/2 top-9 z-20 flex -translate-x-1/2 rotate-[5deg] items-center gap-2 rounded-2xl bg-terracotta-600 px-5 py-2.5 text-cream-50 shadow-card"
            >
              <ThumbsDown size={20} strokeWidth={2.5} />
              <span className="text-base font-bold uppercase tracking-wide">Niet mijn ding</span>
            </motion.div>
          </>
        )}

        <div className="relative z-10 flex h-full flex-col">
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-terracotta-500/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-terracotta-700">
              #{question.mood}
            </span>
            <span className="rounded-full bg-ink-900/6 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink-600">
              #{question.company === 'Hecht' ? 'HechteVrienden' : question.company}
            </span>
          </div>

          <div className="flex flex-1 items-center">
            <p className="font-serif text-[28px] font-medium leading-[1.28] text-ink-950 sm:text-[32px]">
              {question.text}
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-ink-900/8 pt-5">
            <span className="text-xs font-medium text-ink-500">{question.category}</span>
            {isTop && (
              <button
                type="button"
                onClick={onToggleSave}
                aria-label="Vraag opslaan"
                className={`rounded-full p-2.5 transition-colors ${
                  saved ? 'text-gold-500' : 'text-ink-500 hover:text-ink-900'
                }`}
              >
                <Bookmark size={19} strokeWidth={2.2} fill={saved ? 'currentColor' : 'none'} />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default QuestionCard;
