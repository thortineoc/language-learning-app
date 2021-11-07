import React, { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/UserSlice";
import axios from "axios";
import { selectSession } from "../../slices/SessionSlice";
import { getRandomInt, shuffle } from "../../helpers/getRandomHelper";
import "./CourseSession.scss";

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
  const session = useSelector(selectSession);
  const user = useSelector(selectUser);

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

  const [getTranslationsUrl, setGetTranslationsUrl] = useState("");
  const [getRandomWordsUrl, setGetRandomWordsUrl] = useState("");

  const [display, setDisplay] = useState(0);

  const numberOfWordsInSession = 4;

  const setUpSessionStep = () => {
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
  };

  let isCorrect: boolean;

  const checkAnswer = (word: string) => {
    if (word === currentTranslation?.wordTo) {
      isCorrect = true;
    } else {
      isCorrect = false;
    }
    setUpSessionStep();
    console.log("Changed CLICKED");
  };

  useEffect(() => {
    setGetTranslationsUrl(
      `https://localhost:5001/api/course/${session.courseId}/category/${session.categoryId}`
    );
    setGetRandomWordsUrl(
      `https://localhost:5001/api/random/${session.courseId}`
    );
  }, [session]);

  useEffect(() => {
    if (getRandomWordsUrl !== undefined && getTranslationsUrl !== undefined) {
      axios
        .get(getTranslationsUrl, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
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
        .get(getRandomWordsUrl, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((res) => {
          setRandomWords(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [getRandomWordsUrl, getTranslationsUrl, user.token]);

  useEffect(() => {
    console.log("random", randomWords);
    setDisplay(display + 1);
    console.log("disp");
  }, [randomWords]);

  useEffect(() => {
    if (display === 2) {
      setUpSessionStep();
      console.log("Changed");
    } else {
      console.log(display);
    }
  }, [display]);

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

  return (
    <div className="session-display">
      <div className="session-word">
        {currentTranslation && currentTranslation.wordFrom}
      </div>
      <div className="session-translation-group">
        {randomWords &&
          display == 2 &&
          randomWords.map((word, i) => (
            <div
              key={i}
              className={
                isCorrect
                  ? "session-translation-card  "
                  : "session-translation-card"
              }
              onClick={() => checkAnswer(word)}
            >
              {word}
            </div>
          ))}
      </div>
    </div>
  );
}

export default CourseSession;
