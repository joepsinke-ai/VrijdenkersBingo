export type Mood =
  | 'Verdiepend'
  | 'Eerlijk'
  | 'Luchtig'
  | 'Humor'
  | 'Filosofisch'
  | 'Inspirerend'
  | 'Positief'
  | 'Creatief';

export type Company = 'Hecht' | 'Vrienden' | 'Allen';

export type Category =
  | 'Weekend & Reflectie'
  | 'Jaaroverzicht & Feestdagen'
  | 'Nieuw Jaar & Toekomst'
  | 'Filosofie & Verdieping'
  | 'Luchtig & Kroegpraat';

export interface Question {
  id: number;
  text: string;
  category: Category;
  mood: Mood;
  company: Company;
  /** Alleen tonen bij deze feestdag(en). Leeg = altijd bruikbaar. */
  holidays?: HolidayIntake[];
}

export type CompanyIntake =
  | 'Hechte vrienden'
  | 'Nieuwe kennissen'
  | 'Familie'
  | "Met z'n tweeën"
  | "Collega's";

export type LocationIntake =
  | 'In de kroeg / Op het terras'
  | 'Thuis op de bank / Diner'
  | 'Onderweg / Kampvuur';

export type MoodIntake =
  | 'Verdiepend & Eerlijk'
  | 'Luchtig & Humoristisch'
  | 'Filosofisch & Prikkelend'
  | 'Creatief & Spel'
  | 'Inspirerend & Positief';

export type MomentIntake = 'Geen speciale aanleiding' | 'Feestdag' | 'Afscheid' | 'Vakantie';

export type HolidayIntake =
  | 'Kerst'
  | 'Oud & Nieuw'
  | 'Pasen'
  | 'Suikerfeest'
  | 'Offerfeest'
  | 'Sinterklaas'
  | 'Koningsdag'
  | 'Diwali'
  | 'Chinees Nieuwjaar'
  | 'Verjaardag'
  | 'Jubileum'
  | 'Anders';

export interface IntakeContext {
  company: CompanyIntake;
  location: LocationIntake;
  mood: MoodIntake;
  moment: MomentIntake;
  holiday?: HolidayIntake;
}

export interface Interaction {
  likes: number;
  dislikes: number;
  saved: boolean;
}

export type InteractionStore = Record<number, Interaction>;
