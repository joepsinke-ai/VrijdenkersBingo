import type { ReactNode } from 'react';

export default function FloatingBar({ children }: { children: ReactNode }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 flex justify-center px-5 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <div className="pointer-events-auto flex w-full max-w-sm rounded-full border border-line/70 bg-surface p-1.5 shadow-float">
        {children}
      </div>
    </div>
  );
}
