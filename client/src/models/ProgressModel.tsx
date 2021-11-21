export interface courseInformation {
  id: number;
  name: string;
  languageFrom: string;
  languageTo: string;
  isFinished: boolean;
}

export interface appUserInformation {
  username: string;
  email: string;
  points: number;
  courses: Array<courseInformation>;
}
