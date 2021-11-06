import React, { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/UserSlice";
import axios from "axios";
import { selectSession } from "../../slices/SessionSlice";

interface translationUserProgressType {
  appUserId: number;
  translationId: number;
  timesRepeated: number;
  isLearned: boolean;
  isToReview: boolean;
}

interface allTranslationsType {
  id: number;
  wordFrom: string;
  wordTo: string;
  image: null;
  categoryId: number;
  translationUserProgress: translationUserProgressType[];
}

function CourseSession(): ReactElement {
  const { courseId, categoryId } = useSelector(selectSession);
  const user = useSelector(selectUser);
  let url = `https://localhost:5001/api/course/2/category/2`;
  let urlToGetRandomWords = `https://localhost:5001/api/random/2`;

  const [allTranslations, setAllTranslations] = useState<
    allTranslationsType[] | undefined
  >([]);
  const [sessionTranslations, setSessionTranslations] = useState<
    allTranslationsType[] | undefined
  >([]);
  const [randomWords, setRandomWords] = useState<string[] | undefined>([]);
  const [currentTranslation, setCurrentTranslation] = useState<
    allTranslationsType | undefined
  >(undefined);

  const numberOfWordsInSession = 4;

  useEffect(() => {
    axios
      .get(url, { headers: { Authorization: `Bearer ${user.token}` } })
      .then((res) => {
        console.log(
          res.data[0].userCourses[0].course.categories[0].translations
        );
        setAllTranslations(
          res.data[0].userCourses[0].course.categories[0].translations
        );
      })
      .catch((err) => console.log(err));

    axios
      .get(urlToGetRandomWords, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        setRandomWords(res.data);
      })
      .catch((err) => console.log(err));
  }, [url, urlToGetRandomWords, user.token]);

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < allTranslations!.length; i++) {
      if (arr.length === numberOfWordsInSession) {
        break;
      }
      if (
        allTranslations &&
        allTranslations[i] &&
        !allTranslations[i].translationUserProgress[0].isLearned
      ) {
        arr.push(allTranslations[i]);
      }
    }
    setSessionTranslations(arr);
  }, [allTranslations]);

  function getRandomInt(max: number | undefined): number {
    if (max) {
      return Math.floor(Math.random() * max);
    } else {
      return 0;
    }
  }

  function shuffle(array: Array<string> | undefined): string[] | undefined {
    let currentIndex = array?.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = getRandomInt(currentIndex);
      if (currentIndex && array) {
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }
    }
    return array;
  }

  useEffect(() => {
    let num = getRandomInt(numberOfWordsInSession);
    if (sessionTranslations && sessionTranslations[num]) {
      setCurrentTranslation(sessionTranslations[num]);
      if (randomWords?.includes(sessionTranslations[num].wordTo)) {
      } else {
        randomWords?.pop();
        randomWords?.push(sessionTranslations[num].wordTo);
      }
      shuffle(randomWords);
    }
  }, [randomWords, sessionTranslations, shuffle]);

  return (
    <div>
      <div>{currentTranslation && currentTranslation.wordFrom}</div>
      {randomWords && randomWords.map((word) => <div>{word}</div>)}
    </div>
  );
}

export default CourseSession;
