import { Sparkles } from 'lucide-react';

export default function Wordmark({ className = 'text-brand' }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <Sparkles size={18} strokeWidth={2} />
      <span className="text-xs font-semibold uppercase tracking-[0.18em]">De Vrijdenkers</span>
    </span>
  );
}
