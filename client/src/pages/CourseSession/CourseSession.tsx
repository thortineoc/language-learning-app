import React, { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/UserSlice";
import axios from "axios";
import { selectSession } from "../../slices/SessionSlice";
import { getRandomInt, shuffle } from "../../helpers/getRandomHelper";
import "./CourseSession.scss";
import { Link } from "react-router-dom";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";

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

interface translationResultType {
  translationId: number;
  repeated: number;
}

interface sessionResultType {
  courseId: number;
  categoryId: number;
  translations: translationResultType[];
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

  const [isLastWord, setIsLastWord] = useState(false);
  const [results, setResults] = useState<Map<number, number>>(new Map());

  const wordsPerRound = 10;
  const pointsForGoodAnswer = 10;
  const numberOfDifferentWordsInSession = 2;
  const repeatUntilLearned = 3;

  const setUpSessionStep = () => {
    let num = getRandomInt(numberOfDifferentWordsInSession);
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

  useEffect(() => {
    console.log("USEEEEEEEEEEEEE");
    if (clicked !== "") {
      setTimeout(() => {
        setUpSessionStep();
        setStyles("session-translation-card");
        setBorderStyle("session-translation-card");
        setCount(count + 1);
        setOverlay(false);
      }, 3000);
      console.log("sasas");
      console.log(sessionTranslations);

      if (sessionTranslations?.length === 1) {
        setIsLastWord(true);
      }
    }
  }, [sessionTranslations]);

  useEffect(() => {
    console.log(":)))))))))");
    if (isLastWord === true) {
      if (sessionTranslations) {
        console.log(
          sessionTranslations[0].translationUserProgress[0].timesRepeated
        );
      }
      if (
        sessionTranslations &&
        sessionTranslations[0].translationUserProgress[0].timesRepeated ===
          repeatUntilLearned
      ) {
        console.log("End");
        setTimeout(() => {
          setEnd(true);
        }, 3000);
      }
    }
  }, [isLastWord, currentTranslation]);

  useEffect(() => {
    if (end) {
      console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPP");
      const obj = Object.fromEntries(results);

    }
  }, [results, end]);

  const checkAnswer = (word: string) => {
    let newSessionArray: allTranslationsType[] | undefined = [];
    let isSessionArraySet = false;

    if (count === wordsPerRound) {
      setTimeout(() => {
        setEnd(true);
      }, 3000);
    }

    setClicked(word);
    if (word === currentTranslation?.wordTo) {
      setStyles("session-translation-card correct");
      setPoints(points + pointsForGoodAnswer);

      /*
      const newTranslationResult = {
        translationId: currentTranslation.id,
        repeated: currentTranslation.translationUserProgress[0].timesRepeated,
      };
      setResults([...results, newTranslationResult]);
*/
      const newTranslation = { ...currentTranslation };
      newTranslation.translationUserProgress[0].timesRepeated =
        newTranslation.translationUserProgress[0].timesRepeated + 1;
      setCurrentTranslation(newTranslation);

      while (
        currentTranslation.translationUserProgress[0].timesRepeated !==
        newTranslation.translationUserProgress[0].timesRepeated
      ) {}

      const newMap = results?.set(
        currentTranslation.id,
        currentTranslation.translationUserProgress[0].timesRepeated
      );
      setResults(newMap);

      if (
        currentTranslation.translationUserProgress[0].timesRepeated ===
        repeatUntilLearned
      ) {
        // zaznacz jako nauczone, dodaj punkty, post z iloscia repeated
        const nextWordIndex = allTranslations?.findIndex(
          (word: allTranslationsType) =>
            word.translationUserProgress[0].timesRepeated !==
              repeatUntilLearned && !sessionTranslations?.includes(word)
        );
        if (nextWordIndex === -1) {
          if (allTranslations && nextWordIndex !== undefined) {
            newSessionArray = sessionTranslations?.filter(
              (el) => el !== currentTranslation
            );
            if (newSessionArray && newSessionArray.length) {
              setSessionTranslations([...newSessionArray]);
              isSessionArraySet = true;
            }
          }
        } else {
          if (allTranslations && nextWordIndex !== undefined) {
            const nextWord = allTranslations[nextWordIndex];
            newSessionArray = sessionTranslations?.filter(
              (el) => el !== currentTranslation
            );
            if (newSessionArray && newSessionArray.length) {
              newSessionArray.push(nextWord);
              console.log(newSessionArray);
              setSessionTranslations([...newSessionArray]);
              isSessionArraySet = true;
            }
          }
        }
      }
    } else {
      setStyles("session-translation-card wrong");
      setBorderStyle("session-translation-card was-correct");
    }
    setOverlay(true);
    if (newSessionArray?.length !== 0) {
      console.log(newSessionArray);
      console.log(sessionTranslations);
      //while (sessionTranslations !== newSessionArray) {}
    }
    if (isSessionArraySet === false) {
      setTimeout(() => {
        if (newSessionArray?.length !== 0) {
          console.log(sessionTranslations);
          console.log(newSessionArray);
          console.log(sessionTranslations === newSessionArray);
          // while (sessionTranslations !== newSessionArray) {}
        }
        setUpSessionStep();
        setStyles("session-translation-card");
        setBorderStyle("session-translation-card");
        setCount(count + 1);
        setOverlay(false);
      }, 3000);
    }

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
      if (arr.length === numberOfDifferentWordsInSession) {
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
        <>
          <div onClick={start} className="start">
            START
          </div>
          <img
            src="assets/images/startSession.jpg"
            alt="start"
            className="start-img"
          />
        </>
      )}
      {end && (
        <div className="end-container">
          <div className="end">SESSION ENDED</div>
          {isLastWord && <div className="end">You finished this course</div>}
          <div>You gained {points} points!</div>
          <div className="links-container">
            <Link to="/" className="end-link">
              Go to homepage
            </Link>
            <Link to={`/mycourse/${session.courseId}`} className="end-link">
              Go back to this course
            </Link>
          </div>
        </div>
      )}
      {!end && currentTranslation && randomWords && (
        <>
          <div className="session-info-counter">
            <div>{count + " / " + wordsPerRound + " words"}</div>
            <div>{points + " points"}</div>
          </div>
          <div className="session-word">{currentTranslation.wordFrom}</div>
          <div className="light-bulb-icons">
            {[
              ...Array(
                currentTranslation.translationUserProgress[0].timesRepeated
              ),
            ].map(() => (
              <EmojiObjectsIcon color="primary" />
            ))}
          </div>
          <div className="session-translation-group">
            {randomWords.map((word, i) => (
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
        </>
      )}
    </div>
  );
}

export default CourseSession;
