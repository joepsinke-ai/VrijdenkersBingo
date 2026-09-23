import { questionsData } from '../data/questionsData';
import type {
  Category,
  Company,
  CompanyIntake,
  HolidayIntake,
  IntakeContext,
  InteractionStore,
  LocationIntake,
  Mood,
  MomentIntake,
  MoodIntake,
  Question,
} from '../types';

const companyMap: Record<CompanyIntake, Company[]> = {
  'Hechte vrienden': ['Hecht', 'Vrienden', 'Allen'],
  "Met z'n tweeën": ['Hecht', 'Vrienden', 'Allen'],
  Familie: ['Vrienden', 'Allen'],
  'Nieuwe kennissen': ['Allen'],
  "Collega's": ['Vrienden', 'Allen'],
};

const moodMap: Record<MoodIntake, Mood[]> = {
  'Verdiepend & Eerlijk': ['Verdiepend', 'Eerlijk'],
  'Luchtig & Humoristisch': ['Luchtig', 'Humor'],
  'Filosofisch & Prikkelend': ['Filosofisch'],
  'Creatief & Spel': ['Creatief'],
  'Inspirerend & Positief': ['Inspirerend', 'Positief'],
};

const locationBoostMap: Record<LocationIntake, Category[]> = {
  'In de kroeg / Op het terras': ['Luchtig & Kroegpraat', 'Weekend & Reflectie'],
  'Thuis op de bank / Diner': ['Filosofie & Verdieping', 'Weekend & Reflectie'],
  'Onderweg / Kampvuur': ['Filosofie & Verdieping', 'Nieuw Jaar & Toekomst'],
};

const momentBoostMap: Record<MomentIntake, Category[]> = {
  'Geen speciale aanleiding': [],
  Feestdag: ['Jaaroverzicht & Feestdagen', 'Nieuw Jaar & Toekomst'],
  Afscheid: ['Weekend & Reflectie', 'Filosofie & Verdieping'],
  Vakantie: ['Weekend & Reflectie', 'Luchtig & Kroegpraat'],
};

function scoreAndSort(
  pool: Question[],
  boostCategories: Set<Category>,
  holiday: HolidayIntake | undefined,
  interactions: InteractionStore,
): Question[] {
  return pool
    .map((q) => {
      const interaction = interactions[q.id] ?? { likes: 0, dislikes: 0, saved: false };
      let score = 0;
      if (boostCategories.has(q.category)) score += 1;
      if (holiday && q.holidays?.includes(holiday)) score += 3;
      score += interaction.likes * 2;
      score -= interaction.dislikes * 1.5;
      score += Math.random() * 1.5;
      return { q, score };
    })
    .sort((a, b) => b.score - a.score)
    .map((s) => s.q);
}

/**
 * Bouwt een gesorteerde stapel vragen voor de gegeven context.
 * Gezelschap is een harde filter (privacy/comfort), stemming bepaalt de
 * volgorde (matches eerst) zodat de stapel nooit leeg raakt, en locatie +
 * eerdere waardering wegen mee als tiebreaker. Feestdagvragen verschijnen
 * alleen bij de gekozen feestdag, en dan bovenaan.
 */
export function buildStack(context: IntakeContext, interactions: InteractionStore): Question[] {
  const allowedCompany = new Set(companyMap[context.company]);
  const allowedMoods = new Set(moodMap[context.mood]);
  const boostCategories = new Set([
    ...locationBoostMap[context.location],
    ...momentBoostMap[context.moment],
  ]);

  const companyFiltered = questionsData.filter(
    (q) =>
      allowedCompany.has(q.company) &&
      (!q.holidays || (context.holiday !== undefined && q.holidays.includes(context.holiday))),
  );
  const moodMatched = companyFiltered.filter((q) => allowedMoods.has(q.mood));
  const rest = companyFiltered.filter((q) => !allowedMoods.has(q.mood));

  return [
    ...scoreAndSort(moodMatched, boostCategories, context.holiday, interactions),
    ...scoreAndSort(rest, boostCategories, context.holiday, interactions),
  ];
}
