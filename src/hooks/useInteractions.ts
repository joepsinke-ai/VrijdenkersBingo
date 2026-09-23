import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { InteractionStore } from '../types';

const STORAGE_KEY = 'vrijdenkers.interactions.v1';

function getOrDefault(store: InteractionStore, id: number) {
  return store[id] ?? { likes: 0, dislikes: 0, saved: false };
}

export function useInteractions() {
  const [store, setStore] = useLocalStorage<InteractionStore>(STORAGE_KEY, {});

  const like = useCallback(
    (id: number) => {
      setStore((prev) => ({
        ...prev,
        [id]: { ...getOrDefault(prev, id), likes: getOrDefault(prev, id).likes + 1 },
      }));
    },
    [setStore],
  );

  const dislike = useCallback(
    (id: number) => {
      setStore((prev) => ({
        ...prev,
        [id]: { ...getOrDefault(prev, id), dislikes: getOrDefault(prev, id).dislikes + 1 },
      }));
    },
    [setStore],
  );

  const toggleSave = useCallback(
    (id: number) => {
      setStore((prev) => ({
        ...prev,
        [id]: { ...getOrDefault(prev, id), saved: !getOrDefault(prev, id).saved },
      }));
    },
    [setStore],
  );

  const isSaved = useCallback((id: number) => Boolean(store[id]?.saved), [store]);

  const savedIds = Object.entries(store)
    .filter(([, v]) => v.saved)
    .map(([id]) => Number(id));

  return { store, like, dislike, toggleSave, isSaved, savedIds };
}
