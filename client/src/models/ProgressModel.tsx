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

export interface translationUserProgress {
  userId: number;
  translationId: number;
  isLearned: boolean;
  isToReview: boolean;
  timesRepeated: number;
}

export interface wordsStats {
  learnedWordsSum: number;
  allWordsSum: number;
  learnedWordsIds: Array<number>;
}
