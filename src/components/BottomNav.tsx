import { Bookmark, House, Layers } from 'lucide-react';

export type Tab = 'deck' | 'saved';

interface Props {
  active: Tab;
  onChange: (tab: Tab) => void;
  onHome: () => void;
  savedCount: number;
}

const itemClass = 'flex items-center gap-1.5 rounded-full px-3.5 py-2.5 text-[13px] font-semibold transition-colors';

export default function BottomNav({ active, onChange, onHome, savedCount }: Props) {
  const items: { key: Tab; label: string; icon: typeof Layers }[] = [
    { key: 'deck', label: 'Kaarten', icon: Layers },
    { key: 'saved', label: 'Bewaard', icon: Bookmark },
  ];

  return (
    <nav className="pointer-events-none sticky bottom-0 z-20 flex justify-center px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
      <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-line/70 bg-surface p-1.5 shadow-float">
        <button type="button" onClick={onHome} className={`${itemClass} hover:bg-ink/8`}>
          <House size={17} strokeWidth={2.2} />
          Home
        </button>
        {items.map(({ key, label, icon: Icon }) => {
          const isActive = key === active;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onChange(key)}
              aria-current={isActive ? 'page' : undefined}
              className={`${itemClass} ${isActive ? 'bg-ink text-paper' : 'hover:bg-ink/8'}`}
            >
              <Icon size={17} strokeWidth={2.2} />
              {label}
              {key === 'saved' && savedCount > 0 && (
                <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent px-1 text-[11px] font-bold text-on-accent">
                  {savedCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
