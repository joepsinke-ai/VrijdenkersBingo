import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ContextIntake from './components/ContextIntake';
import Landing from './components/Landing';
import TopBar from './components/TopBar';
import CardStack from './components/CardStack';
import BottomNav, { type Tab } from './components/BottomNav';
import SavedQuestions from './components/SavedQuestions';
import FocusMode from './components/FocusMode';
import { useInteractions } from './hooks/useInteractions';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { IntakeContext, Question } from './types';

function App() {
  const [context, setContext] = useLocalStorage<IntakeContext | null>('vrijdenkers.context.v1', null);
  const [started, setStarted] = useState(context !== null);
  const [tab, setTab] = useState<Tab>('deck');
  const [focusQuestion, setFocusQuestion] = useState<Question | null>(null);
  const { store, like, dislike, toggleSave, isSaved, savedIds } = useInteractions();

  if (!started) {
    return (
      <div className="min-h-dvh bg-paper">
        <Landing onStart={() => setStarted(true)} />
      </div>
    );
  }

  if (!context) {
    return (
      <div className="min-h-dvh bg-paper">
        <ContextIntake onComplete={setContext} onHome={() => setStarted(false)} />
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col bg-paper">
      <div className={`flex flex-1 flex-col px-5 ${tab === 'deck' ? '' : 'hidden'}`}>
        <TopBar context={context} onChangeContext={() => setContext(null)} />
        <CardStack
          context={context}
          interactions={store}
          like={like}
          dislike={dislike}
          toggleSave={toggleSave}
          isSaved={isSaved}
          onFocusQuestion={setFocusQuestion}
        />
      </div>
      <div className={`flex flex-1 flex-col px-5 ${tab === 'saved' ? '' : 'hidden'}`}>
        <SavedQuestions savedIds={savedIds} toggleSave={toggleSave} onFocusQuestion={setFocusQuestion} />
      </div>

      <BottomNav active={tab} onChange={setTab} onHome={() => setStarted(false)} savedCount={savedIds.length} />

      <AnimatePresence>
        {focusQuestion && (
          <FocusMode
            question={focusQuestion}
            saved={isSaved(focusQuestion.id)}
            onClose={() => setFocusQuestion(null)}
            onToggleSave={() => toggleSave(focusQuestion.id)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
