import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const steps = [
  { title: 'Stem af', text: 'Kies met wie je bent, waar je zit en waar je zin in hebt.' },
  { title: 'Kies een vraag', text: 'Blader door de stapel. Duim omhoog of omlaag, en bewaar je favorieten.' },
  { title: 'Stel hem', text: 'Zet de vraag groot in beeld en laat het gesprek zijn werk doen.' },
];

interface Props {
  onStart: () => void;
}

export default function Landing({ onStart }: Props) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-6 pb-10 pt-12">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="mb-10"
      >
        <div className="mb-4 flex items-center gap-2 text-terracotta-600">
          <Sparkles size={18} strokeWidth={2} />
          <span className="text-xs font-semibold uppercase tracking-[0.18em]">De Vrijdenkers</span>
        </div>
        <h1 className="font-serif text-4xl font-medium leading-tight text-ink-950">
          Betere gesprekken beginnen met een goede vraag
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
          De Vrijdenkers is een kaartenspel met vragen die een gesprek op gang brengen: aan tafel, in
          de kroeg of onderweg.
        </p>
      </motion.div>

      <div className="flex flex-1 flex-col gap-9">
        <ol className="flex flex-col gap-5">
          {steps.map((step, i) => (
            <li key={step.title} className="flex gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink-900 text-[10px] font-semibold text-cream-50">
                {i + 1}
              </span>
              <div>
                <p className="text-[15px] font-semibold text-ink-900">{step.title}</p>
                <p className="mt-0.5 text-[15px] leading-relaxed text-ink-600">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="border-l-2 border-terracotta-500/25 pl-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">Ons verhaal</p>
          <p className="text-[15px] leading-relaxed text-ink-600">
            We zijn digitaal meer verbonden dan ooit. Met social media en telefoons zijn we in staat
            om iedereen te volgen. Maar we lijken te vergeten om een diep, persoonlijk gesprek te
            voeren. Om kwetsbaar te durven zijn, en elkaar in de ogen aan te kijken. Om verbinding te
            maken in het echte leven.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
            Door elkaar mooie en prikkelende vragen te stellen, ontstaat er iets moois. Een gesprek
            kan het begin zijn van iets moois. Daarom hebben we dit kaartspel bedacht: hopelijk
            brengt het je iets moois.
          </p>
        </div>
      </div>

      <motion.button
        type="button"
        onClick={onStart}
        whileTap={{ scale: 0.98 }}
        className="mt-10 flex items-center justify-center gap-2 rounded-2xl bg-terracotta-600 px-6 py-4 text-base font-semibold text-cream-50 shadow-card transition-all duration-200 hover:bg-terracotta-700"
      >
        Aan de slag
        <ArrowRight size={18} strokeWidth={2.5} />
      </motion.button>
    </div>
  );
}
