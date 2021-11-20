export interface Language {
  id: number;
  name: string;
}

export interface Translation {
  id: number;
  wordFrom: string;
  wordTo: string;
}

export interface Category {
  id: number;
  name: string;
  translations: Array<Translation>;
}

export interface Course {
  id: number;
  title: string;
  languageFrom: Language;
  languageTo: Language;
  categories: Array<Category>;
}