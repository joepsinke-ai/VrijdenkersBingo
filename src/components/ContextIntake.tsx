import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import type {
  CompanyIntake,
  HolidayIntake,
  IntakeContext,
  LocationIntake,
  MomentIntake,
  MoodIntake,
} from '../types';

const companyOptions: CompanyIntake[] = [
  'Hechte vrienden',
  'Nieuwe kennissen',
  'Familie',
  "Met z'n tweeën",
  "Collega's",
];

const locationOptions: LocationIntake[] = [
  'In de kroeg / Op het terras',
  'Thuis op de bank / Diner',
  'Onderweg / Kampvuur',
];

const moodOptions: MoodIntake[] = [
  'Verdiepend & Eerlijk',
  'Luchtig & Humoristisch',
  'Filosofisch & Prikkelend',
  'Creatief & Spel',
  'Inspirerend & Positief',
];

const momentOptions: MomentIntake[] = ['Geen speciale aanleiding', 'Feestdag', 'Afscheid', 'Vakantie'];

const holidayOptions: HolidayIntake[] = [
  'Kerst',
  'Oud & Nieuw',
  'Pasen',
  'Suikerfeest',
  'Offerfeest',
  'Sinterklaas',
  'Koningsdag',
  'Diwali',
  'Chinees Nieuwjaar',
  'Verjaardag',
  'Jubileum',
  'Anders',
];

interface Props {
  initial?: Partial<IntakeContext>;
  onComplete: (context: IntakeContext) => void;
}

function OptionGroup<T extends string>({
  label,
  step,
  options,
  value,
  onChange,
  nested,
}: {
  label: string;
  step?: string;
  options: T[];
  value: T | undefined;
  onChange: (v: T) => void;
  nested?: boolean;
}) {
  return (
    <div className={nested ? 'border-l-2 border-terracotta-500/25 pl-4' : undefined}>
      <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">
        {step && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ink-900 text-[10px] text-cream-50">
            {step}
          </span>
        )}
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = option === value;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`rounded-full border px-4 py-2.5 text-left text-sm font-medium transition-all duration-150 active:scale-[0.97] ${
                selected
                  ? 'border-ink-900 bg-ink-900 text-cream-50 shadow-card'
                  : 'border-ink-900/15 bg-cream-50 text-ink-800 hover:border-ink-900/30 hover:bg-cream-200/60'
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function ContextIntake({ initial, onComplete }: Props) {
  const [company, setCompany] = useState<CompanyIntake | undefined>(initial?.company);
  const [location, setLocation] = useState<LocationIntake | undefined>(initial?.location);
  const [mood, setMood] = useState<MoodIntake | undefined>(initial?.mood);
  const [moment, setMoment] = useState<MomentIntake | undefined>(initial?.moment);
  const [holiday, setHoliday] = useState<HolidayIntake | undefined>(initial?.holiday);

  const needsHoliday = moment === 'Feestdag';
  const canSubmit = Boolean(company && location && mood && moment && (!needsHoliday || holiday));

  const handleMomentChange = (v: MomentIntake) => {
    setMoment(v);
    if (v !== 'Feestdag') setHoliday(undefined);
  };

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
        <h1 className="font-serif text-4xl font-medium leading-tight text-ink-950">Even afstemmen</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
          Vier korte keuzes, zodat de vragen aansluiten bij het gezelschap, de plek, jouw stemming en
          het moment.
        </p>
      </motion.div>

      <div className="flex flex-1 flex-col gap-9">
        <OptionGroup
          step="1"
          label="Gezelschap"
          options={companyOptions}
          value={company}
          onChange={setCompany}
        />
        <OptionGroup
          step="2"
          label="Locatie"
          options={locationOptions}
          value={location}
          onChange={setLocation}
        />
        <OptionGroup step="3" label="Stemming" options={moodOptions} value={mood} onChange={setMood} />
        <div className="flex flex-col gap-4">
          <OptionGroup step="4" label="Moment" options={momentOptions} value={moment} onChange={handleMomentChange} />
          <AnimatePresence>
            {needsHoliday && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="overflow-hidden"
              >
                <OptionGroup
                  label="Welke feestdag?"
                  options={holidayOptions}
                  value={holiday}
                  onChange={setHoliday}
                  nested
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <motion.button
        type="button"
        disabled={!canSubmit}
        onClick={() =>
          canSubmit &&
          onComplete({
            company: company!,
            location: location!,
            mood: mood!,
            moment: moment!,
            holiday: needsHoliday ? holiday : undefined,
          })
        }
        whileTap={canSubmit ? { scale: 0.98 } : undefined}
        className={`mt-10 flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-base font-semibold transition-all duration-200 ${
          canSubmit
            ? 'bg-terracotta-600 text-cream-50 shadow-card hover:bg-terracotta-700'
            : 'cursor-not-allowed bg-ink-900/10 text-ink-500'
        }`}
      >
        Genereer vragen
        <ArrowRight size={18} strokeWidth={2.5} />
      </motion.button>
    </div>
  );
}
