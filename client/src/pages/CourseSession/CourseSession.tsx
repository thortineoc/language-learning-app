import React, { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/UserSlice";
import axios from "axios";
import { selectSession } from "../../slices/SessionSlice";
import { getRandomInt, shuffle } from "../../helpers/getRandomHelper";
import "./CourseSession.scss";
import { Link } from "react-router-dom";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import { Course } from "../../models/CourseModels";
import { allTranslationsType } from "../../models/SessionModel";

function CourseSession(): ReactElement {
  const session = useSelector(selectSession);
  const user = useSelector(selectUser);

  const [allTranslations, setAllTranslations] = useState<
    allTranslationsType[] | undefined
  >(undefined);
  const [sessionTranslations, setSessionTranslations] = useState<
    allTranslationsType[] | undefined
  >([]);
  const [randomWords, setRandomWords] = useState<string[] | undefined>([]);
  const [currentTranslation, setCurrentTranslation] = useState<
    allTranslationsType | undefined
  >(undefined);

  const [getTranslationsUrl, setGetTranslationsUrl] = useState("");
  const [getCourseLanguagesByIdUrl, setGetCourseLanguagesById] = useState("");
  const [setPointsUrl, setSetPointsUrl] = useState("");
  const [courseInfo, setCourseInfo] = useState<Course | undefined>(undefined);

  const [started, setStarted] = useState(false);
  const [end, setEnd] = useState(false);
  const [overlay, setOverlay] = useState(false);

  const [styles, setStyles] = useState("session-translation-card");
  const [borderStyle, setBorderStyle] = useState("session-translation-card");
  const [clicked, setClicked] = useState("");

  const [points, setPoints] = useState(0);
  const [count, setCount] = useState(1);

  const [isLastWord, setIsLastWord] = useState(false);
  const [results, setResults] = useState<Map<number, number>>(new Map());

  const [fromLearnedTextMode, setFromLearnedTextMode] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [isLastWordInCategory, setIsLastWordInCategory] = useState(false);

  const wordsPerRound = 5;
  const pointsForGoodAnswer = 10;
  const numberOfDifferentWordsInSession = 4;
  const repeatUntilLearned = 5;
  const numberOfRandomWords = 4;

  const setUpSessionStep = () => {
    if (sessionTranslations) {
      let num = getRandomInt(numberOfDifferentWordsInSession);
      if (sessionTranslations.length < numberOfDifferentWordsInSession) {
        console.log("Sessssss");
        num = getRandomInt(sessionTranslations.length);
      }
      if (sessionTranslations[num]) {
        setCurrentTranslation(sessionTranslations[num]);
        let tempRandomArr: string[] | undefined = [];
        let allTranslationsNum: number;
        for (let i = 0; i < numberOfRandomWords - 1; i++) {
          if (allTranslations) {
            allTranslationsNum = getRandomInt(allTranslations.length);
            let word = !fromLearnedTextMode
              ? allTranslations[allTranslationsNum].wordTo
              : allTranslations[allTranslationsNum].wordFrom;
            if (!fromLearnedTextMode) {
              while (
                word === sessionTranslations[num].wordTo ||
                tempRandomArr.includes(word)
              ) {
                allTranslationsNum = getRandomInt(allTranslations.length);
                word = allTranslations[allTranslationsNum].wordTo;
              }
              tempRandomArr.push(word);
            } else {
              while (
                word === sessionTranslations[num].wordFrom ||
                tempRandomArr.includes(word)
              ) {
                allTranslationsNum = getRandomInt(allTranslations.length);
                word = allTranslations[allTranslationsNum].wordFrom;
              }
              tempRandomArr.push(word);
            }
          }
        }
        if (!fromLearnedTextMode) {
          tempRandomArr.push(sessionTranslations[num].wordTo);
        } else {
          tempRandomArr.push(sessionTranslations[num].wordFrom);
        }
        setRandomWords(shuffle(tempRandomArr));
      }
    }
  };

  const start = () => {
    setStarted(true);
    setUpSessionStep();
    console.log(allTranslations);
  };

  const startFromLearnedTextMode = () => {
    setFromLearnedTextMode(true);
  };

  useEffect(() => {
    if (fromLearnedTextMode) {
      console.log("Helo");
      start();
    }
  }, [fromLearnedTextMode]);

  // on anwer click
  const checkAnswer = (word: string) => {
    let newSessionArray: allTranslationsType[] | undefined = [];
    let isSessionArraySet = false;

    if (count === wordsPerRound) {
      setTimeout(() => {
        setEnd(true);
      }, 3000);
    }

    setClicked(word);
    if (
      (!fromLearnedTextMode && word === currentTranslation?.wordTo) ||
      (fromLearnedTextMode && word === currentTranslation?.wordFrom)
    ) {
      setStyles("session-translation-card correct");
      setPoints(points + pointsForGoodAnswer);

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
            } else {
              console.log("NOZNLE");
              setTimeout(() => {
                setIsLastWordInCategory(true);
                setIsLastWord(true);
                setEnd(true);
              }, 3000);
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
    }
    if (!isSessionArraySet) {
      setTimeout(() => {
        setUpSessionStep();
        setStyles("session-translation-card");
        setBorderStyle("session-translation-card");
        setCount(count + 1);
        setOverlay(false);
      }, 3000);
    }
    console.log("Changed CLICKED");
  };

  // set urls
  useEffect(() => {
    setGetTranslationsUrl(
      `https://localhost:5001/api/session/${session.courseId}/${session.categoryId}`
    );
    setGetCourseLanguagesById(
      `https://localhost:5001/api/courses/${session.courseId}`
    );
    setSetPointsUrl("https://localhost:5001/api/session/");
  }, [session]);

  // set states - beginning
  useEffect(() => {
    if (getTranslationsUrl !== undefined && getCourseLanguagesByIdUrl) {
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
        .get(getCourseLanguagesByIdUrl, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((res) => {
          setCourseInfo(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [getTranslationsUrl, user.token]);

  // begin set translations in session from all translations
  useEffect(() => {
    if (allTranslations !== undefined) {
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
      if (arr.length === 0) {
        setEmpty(true);
      } else {
        setSessionTranslations(arr);
      }
    }
  }, [allTranslations]);

  // after a new word was learned
  useEffect(() => {
    if (allTranslations) {
      console.log("outside");
      console.log(sessionTranslations);
      if (clicked !== "") {
        setTimeout(() => {
          setUpSessionStep();
          setStyles("session-translation-card");
          setBorderStyle("session-translation-card");
          setCount(count + 1);
          setOverlay(false);
        }, 3000);
        console.log("inside");
        console.log(sessionTranslations);

        let allLearned = true;
        for (let i = 0; i < allTranslations?.length; i++) {
          if (!allTranslations[i].translationUserProgress[0].isLearned) {
            allLearned = false;
            break;
          }
        }
        if (sessionTranslations?.length === 1) {
          setIsLastWord(allLearned);
        }
      }
    }
  }, [sessionTranslations]);

  // for last word in category
  useEffect(() => {
    if (isLastWord) {
      if (
        sessionTranslations &&
        sessionTranslations[0].translationUserProgress[0].timesRepeated ===
          repeatUntilLearned
      ) {
        if (sessionTranslations?.length) {
          setIsLastWordInCategory(false);
        } else {
          setIsLastWordInCategory(true);
        }

        console.log("End");
        setTimeout(() => {
          setEnd(true);
        }, 3000);
      }
    }
  }, [isLastWord, currentTranslation]);

  // put results in backend
  useEffect(() => {
    if (end) {
      let mappedResult: { translationId: number; repetitions: number }[] = [];
      results.forEach((val, key) => {
        mappedResult.push({ translationId: key, repetitions: val });
      });

      let gainedPoints = { Points: points };
      console.log(gainedPoints);
      axios
        .put(getTranslationsUrl, mappedResult, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      axios
        .post(setPointsUrl, gainedPoints, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  }, [results, end]);

  return (
    <div className="session-display">
      {overlay && <div className="overlay" />}
      {!started && (
        <>
          <div className="btn-container">
            <div className="btn btn-learn" onClick={start}>
              {courseInfo &&
                courseInfo.languageFrom.name +
                  " - " +
                  courseInfo.languageTo.name}
            </div>
            <div className="btn btn-learn" onClick={startFromLearnedTextMode}>
              {courseInfo &&
                courseInfo.languageTo.name +
                  " - " +
                  courseInfo.languageFrom.name}
            </div>
          </div>
          {!empty && (
            <img
              src={"/assets/images/startSession.jpg"}
              alt="start"
              height="380"
            />
          )}
        </>
      )}
      {empty && (
        <div className="info-box">
          <span className="info-title">
            You've already finished this category
          </span>
          <Link to="/session/review" className="page-link">
            Review it!
          </Link>
        </div>
      )}
      {end && (
        <div className="end-container">
          <div className="end">SESSION ENDED</div>
          {end && isLastWordInCategory && (
            <div className="end">You finished this category</div>
          )}
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
          <div className="session-word">
            {!fromLearnedTextMode
              ? currentTranslation.wordFrom
              : currentTranslation.wordTo}
          </div>
          <div className="light-bulb-icons">
            {[
              ...Array(
                currentTranslation.translationUserProgress[0].timesRepeated
              ),
            ].map(() => (
              <EmojiObjectsIcon />
            ))}
          </div>
          <div className="session-translation-group">
            {randomWords.map((word, i) => (
              <div
                key={i}
                className={
                  word === clicked
                    ? styles
                    : (!fromLearnedTextMode &&
                        word === currentTranslation.wordTo) ||
                      (fromLearnedTextMode &&
                        word === currentTranslation.wordFrom)
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
