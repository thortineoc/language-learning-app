import React, { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/UserSlice";
import axios from "axios";

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
  const user = useSelector(selectUser);
  const url = `https://localhost:5001/api/course/2/category/2`;
  const urlToGetRandomWords = `https://localhost:5001/api/random/2`;

  const [allTranslations, setAllTranslations] = useState<
    allTranslationsType[] | undefined
  >([]);
  const [sessionTranslations, setSessionTranslations] = useState<
    allTranslationsType[] | undefined
  >([]);
  const [randomWords, setRandomWords] = useState<string[] | undefined>([]);

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
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

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
        console.log(arr.length);
      }
    }
    setSessionTranslations(arr);
  }, [allTranslations]);

  return (
    <div>
      {sessionTranslations &&
        sessionTranslations.map((translation) => (
          <div>{translation.wordFrom}</div>
        ))}
    </div>
  );
}

export default CourseSession;
