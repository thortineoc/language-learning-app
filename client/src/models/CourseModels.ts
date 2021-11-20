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
  languageFrom: {
    id: number;
    name: string;
  };
  languageTo: {
    id: number;
    name: string;
  };
  categories: Array<Category>;
}
