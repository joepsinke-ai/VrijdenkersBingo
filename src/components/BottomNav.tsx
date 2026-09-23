import { Bookmark, Layers } from 'lucide-react';

export type Tab = 'deck' | 'saved';

interface Props {
  active: Tab;
  onChange: (tab: Tab) => void;
  savedCount: number;
}

export default function BottomNav({ active, onChange, savedCount }: Props) {
  const items: { key: Tab; label: string; icon: typeof Layers }[] = [
    { key: 'deck', label: 'Kaarten', icon: Layers },
    { key: 'saved', label: 'Bewaard', icon: Bookmark },
  ];

  return (
    <nav className="sticky bottom-0 z-20 border-t border-ink-900/8 bg-cream-100/90 pb-[env(safe-area-inset-bottom)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-lg items-stretch justify-around">
        {items.map(({ key, label, icon: Icon }) => {
          const isActive = key === active;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onChange(key)}
              className="relative flex flex-1 flex-col items-center gap-1 py-3"
            >
              <div className="relative">
                <Icon
                  size={21}
                  strokeWidth={2.2}
                  className={isActive ? 'text-ink-900' : 'text-ink-500'}
                  fill={isActive && key === 'saved' ? 'currentColor' : 'none'}
                />
                {key === 'saved' && savedCount > 0 && (
                  <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-terracotta-600 px-1 text-[9px] font-bold text-cream-50">
                    {savedCount}
                  </span>
                )}
              </div>
              <span className={`text-[11px] font-medium ${isActive ? 'text-ink-900' : 'text-ink-500'}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
