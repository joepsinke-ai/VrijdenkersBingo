import type { ReactNode } from 'react';
import { moodColor } from '../lib/moodColor';
import type { Mood } from '../types';

// Label in Linear-stijl: dun omlijnd, met een kleurstip, zodat het niet als knop leest.
// Met `mood` krijgt de stip de kleur van die stemming, anders is hij neutraal.
export default function Tag({ children, mood }: { children: ReactNode; mood?: Mood }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-current/25 px-2 py-0.5 text-[11px] font-medium leading-4">
      <span
        aria-hidden
        className={`h-1.5 w-1.5 rounded-full ${mood ? '' : 'bg-current opacity-40'}`}
        style={mood ? { backgroundColor: moodColor[mood] } : undefined}
      />
      {children}
    </span>
  );
}
