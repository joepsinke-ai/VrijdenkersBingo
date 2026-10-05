import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { questionsData } from '../data/questionsData';
import { tileColor } from '../lib/tileColor';
import type { Category } from '../types';
import FloatingBar from './FloatingBar';
import Wordmark from './Wordmark';
import Tag from './Tag';

const steps = [
  { title: 'Stem af', text: 'Kies met wie je bent, waar je zit en waar je zin in hebt.' },
  { title: 'Kies een vraag', text: 'Blader door de stapel. Duim omhoog of omlaag, en bewaar je favorieten.' },
  { title: 'Stel hem', text: 'Zet de vraag groot in beeld en laat het gesprek zijn werk doen.' },
];

const previewCategories: Category[] = ['Filosofie & Verdieping', 'Jaaroverzicht & Feestdagen', 'Weekend & Reflectie'];
const previewTiles = previewCategories.flatMap((category) => {
  const question = questionsData.find((q) => q.category === category && !q.holidays?.length);
  return question ? [question] : [];
});
const previewPose = ['-rotate-6 translate-y-4', 'z-10 -translate-y-1', 'rotate-6 translate-y-4'];

interface Props {
  onStart: () => void;
}

export default function Landing({ onStart }: Props) {
  return (
    <div className="min-h-dvh pb-28">
      <header className="overflow-x-clip bg-band px-6 pt-6">
        <div className="mx-auto flex w-full max-w-lg flex-col items-center text-center">
          <Wordmark />
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <h1 className="mt-9 font-serif text-[34px] font-bold leading-[1.06] tracking-[-0.01em] sm:text-5xl">
              Betere gesprekken beginnen met een goede vraag
            </h1>
            <p className="mx-auto mt-4 max-w-sm font-serif text-[17px] leading-[1.6]">
              Een kaartenspel met vragen die een gesprek op gang brengen: aan tafel, in de kroeg of
              onderweg.
            </p>
          </motion.div>

          <div aria-hidden className="-mb-14 mt-9 flex justify-center">
            {previewTiles.map((q, i) => (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="-mx-2 w-36 shrink-0 sm:w-44"
              >
                <div
                  className={`flex h-44 flex-col items-start gap-3 rounded-tile p-4 text-left text-tile-ink shadow-tile sm:h-52 ${tileColor[q.category]} ${previewPose[i]}`}
                >
                  <Tag mood={q.mood}>{q.mood}</Tag>
                  <p className="line-clamp-5 font-serif text-[15px] font-bold leading-[1.15] sm:text-lg">{q.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-lg px-6 pt-28">
        <ol className="flex flex-col gap-6">
          {steps.map((step, i) => (
            <li key={step.title} className="flex gap-4">
              <span className="w-5 shrink-0 font-serif text-2xl font-bold leading-none text-accent">{i + 1}</span>
              <div>
                <p className="font-serif text-2xl font-bold leading-none">{step.title}</p>
                <p className="mt-2 font-serif text-base leading-[1.6] text-ink-soft">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <section className="mt-12 rounded-tile border border-line bg-wash p-6">
          <h2 className="font-serif text-[26px] font-bold leading-[1.1]">Ons verhaal</h2>
          <p className="mt-4 font-serif text-[17px] leading-[1.7]">
            We zijn digitaal meer verbonden dan ooit. Met social media en telefoons zijn we in staat
            om iedereen te volgen. Maar we lijken te vergeten om een diep, persoonlijk gesprek te
            voeren. Om kwetsbaar te durven zijn, en elkaar in de ogen aan te kijken. Om verbinding te
            maken in het echte leven.
          </p>
          <p className="mt-4 font-serif text-[17px] leading-[1.7]">
            Door elkaar mooie en prikkelende vragen te stellen, ontstaat er verbinding. Een gesprek
            kan het begin zijn van iets moois. Daarom hebben we dit kaartenspel bedacht: hopelijk
            brengt het je mooie gesprekken.
          </p>
        </section>
      </main>

      <FloatingBar>
        <motion.button
          type="button"
          onClick={onStart}
          whileTap={{ scale: 0.98 }}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-accent px-6 py-3.5 text-base font-semibold text-on-accent transition-colors duration-200 hover:bg-accent-deep"
        >
          Aan de slag
          <ChevronRight size={18} strokeWidth={2.5} />
        </motion.button>
      </FloatingBar>
    </div>
  );
}
