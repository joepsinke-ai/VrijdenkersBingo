import { SlidersHorizontal } from 'lucide-react';
import type { IntakeContext } from '../types';

interface Props {
  context: IntakeContext;
  onChangeContext: () => void;
}

export default function TopBar({ context, onChangeContext }: Props) {
  return (
    <div className="mx-auto flex w-full max-w-md items-center justify-between px-1 pb-6 pt-2">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="rounded-full bg-ink-900/6 px-3 py-1.5 text-[11px] font-medium text-ink-700">
          {context.company}
        </span>
        <span className="rounded-full bg-ink-900/6 px-3 py-1.5 text-[11px] font-medium text-ink-700">
          {context.mood.split(' & ')[0]}
        </span>
      </div>
      <button
        type="button"
        onClick={onChangeContext}
        aria-label="Nieuwe context instellen"
        className="flex items-center gap-1.5 rounded-full border border-ink-900/10 bg-cream-50 px-3 py-1.5 text-[11px] font-semibold text-ink-700 shadow-sm transition-colors hover:border-ink-900/25"
      >
        <SlidersHorizontal size={13} strokeWidth={2.3} />
        Opnieuw afstemmen
      </button>
    </div>
  );
}
