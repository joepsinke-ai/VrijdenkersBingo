import { SlidersHorizontal } from 'lucide-react';
import type { IntakeContext } from '../types';

interface Props {
  context: IntakeContext;
  onChangeContext: () => void;
}

export default function TopBar({ context, onChangeContext }: Props) {
  return (
    <div className="mx-auto flex w-full max-w-md items-center justify-between gap-3 pb-5 pt-4">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold text-paper">{context.company}</span>
        <span className="rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold text-paper">
          {context.mood.split(' & ')[0]}
        </span>
      </div>
      <button
        type="button"
        onClick={onChangeContext}
        aria-label="Nieuwe context instellen"
        className="flex shrink-0 items-center gap-1.5 rounded-full border border-ink/30 px-3 py-1.5 text-xs font-semibold transition-colors hover:border-ink"
      >
        <SlidersHorizontal size={13} strokeWidth={2.3} />
        Opnieuw afstemmen
      </button>
    </div>
  );
}
