import React, { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/UserSlice";
import axios from "axios";
import { selectSession } from "../../slices/SessionSlice";
import { getRandomInt, shuffle } from "../../helpers/getRandomHelper";
import "./CourseSession.scss";
import { Link } from "react-router-dom";

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

  const [started, setStarted] = useState(false);
  const [end, setEnd] = useState(false);
  const [overlay, setOverlay] = useState(false);

  const [points, setPoints] = useState(0);
  const [count, setCount] = useState(1);

  const wordsPerRound = 5;
  const pointsForGoodAnswer = 10;
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
      setRandomWords(shuffle(randomWords));
    }
  };

  const start = () => {
    setStarted(true);
    setUpSessionStep();
  };

  const [styles, setStyles] = useState("session-translation-card");
  const [borderStyle, setBorderStyle] = useState("session-translation-card");
  const [clicked, setClicked] = useState("");

  const checkAnswer = (word: string) => {
    if (count === wordsPerRound) {
      setTimeout(() => {
        setEnd(true);
      }, 3000);
    }

    setClicked(word);
    if (word === currentTranslation?.wordTo) {
      setStyles("session-translation-card correct");
      setPoints(points + pointsForGoodAnswer);
    } else {
      setStyles("session-translation-card wrong");
      setBorderStyle("session-translation-card was-correct");
    }
    setOverlay(true);
    setTimeout(() => {
      setUpSessionStep();
      setStyles("session-translation-card");
      setBorderStyle("session-translation-card");
      setCount(count + 1);
      setOverlay(false);
    }, 3000);

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
      {overlay && <div className="overlay" />}
      {!started && (
        <div onClick={start} className="start">
          START
        </div>
      )}
      {end && (
        <div className="end-container">
          <div className="end">SESSION ENDED</div>
          <div>You gained {points} points!</div>
          <div className="links-container">
            <Link to="/" className="end-link">
              Go to homepage
            </Link>
            <Link to={`/mycourse/${session.courseId}`} className="end-link">
              Go back to course
            </Link>
          </div>
        </div>
      )}
      <div className="session-info-counter">
        <div>
          {!end &&
            currentTranslation &&
            count + " / " + wordsPerRound + " words"}
        </div>
        <div>{!end && currentTranslation && points + " points"}</div>
      </div>
      <div className="session-word">
        {!end && currentTranslation && currentTranslation.wordFrom}
      </div>
      <div className="session-translation-group">
        {!end &&
          randomWords &&
          currentTranslation &&
          randomWords.map((word, i) => (
            <div
              key={i}
              className={
                word === clicked
                  ? styles
                  : word === currentTranslation.wordTo
                  ? borderStyle
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
