import React, { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/UserSlice";
import axios from "axios";
import { selectSession } from "../../slices/SessionSlice";
import { getRandomInt, shuffle } from "../../helpers/getRandomHelper";
import "./../CourseSession/CourseSession.scss";
import { Link } from "react-router-dom";
import { Course } from "../../models/CourseModels";
import { allTranslationsType } from "../../models/SessionModel";

function ReviewSession(): ReactElement {
  const session = useSelector(selectSession);
  const user = useSelector(selectUser);

  const [sessionTranslations, setSessionTranslations] = useState<
    allTranslationsType[] | undefined
  >([]);
  const [allTranslations, setAllTranslations] = useState<
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

  const [end, setEnd] = useState(false);
  const [overlay, setOverlay] = useState(false);

  const [styles, setStyles] = useState("session-translation-card");
  const [borderStyle, setBorderStyle] = useState("session-translation-card");
  const [clicked, setClicked] = useState("");

  const [points, setPoints] = useState(0);
  const [count, setCount] = useState(1);

  const [fromLearnedTextMode, setFromLearnedTextMode] = useState(false);

  const [clickToStart, setClickToStart] = useState(false);
  const [empty, setEmpty] = useState(false);

  const wordsPerRound = 10;
  const pointsForGoodAnswer = 2;
  const numberOfRandomWords = 4;

  const checkAnswer = (word: string) => {
    if (count === wordsPerRound) {
      let gainedPoints = { Points: points };
      setTimeout(() => {
        setEnd(true);
        axios
          .post(setPointsUrl, gainedPoints, {
            headers: { Authorization: `Bearer ${user.token}` },
          })
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      }, 3000);
    }

    setClicked(word);
    if (
      (!fromLearnedTextMode && word === currentTranslation?.wordTo) ||
      (fromLearnedTextMode && word === currentTranslation?.wordFrom)
    ) {
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
      if (clickToStart) {
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
      }
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
  }, [getTranslationsUrl, clickToStart]);

  useEffect(() => {
    console.log(allTranslations);
    if (allTranslations?.length !== 0) {
      const arr = [];
      for (let i = 0; i < allTranslations!.length; i++) {
        if (
          allTranslations &&
          allTranslations[i] &&
          allTranslations[i].translationUserProgress[0].isLearned
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

  useEffect(() => {
    setUpSessionStep();
  }, [sessionTranslations]);

  const setUpSessionStep = () => {
    let num = getRandomInt(sessionTranslations?.length);
    if (sessionTranslations && sessionTranslations[num]) {
      setCurrentTranslation(sessionTranslations[num]);
      console.log(sessionTranslations);

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
  };

  const start = () => {
    setClickToStart(true);
  };

  const startFromLearnedTextMode = () => {
    setFromLearnedTextMode(true);
  };

  useEffect(() => {
    if (fromLearnedTextMode) {
      start();
    }
  }, [fromLearnedTextMode]);

  return (
    <div className="session-display">
      {overlay && <div className="overlay" />}
      {!randomWords?.length && (
        <>
          <div className="btn-container">
            <div onClick={start} className="btn btn-review">
              {courseInfo &&
                courseInfo.languageFrom.name +
                  " - " +
                  courseInfo.languageTo.name}
            </div>
            <div className="btn btn-review" onClick={startFromLearnedTextMode}>
              {courseInfo &&
                courseInfo.languageTo.name +
                  " - " +
                  courseInfo.languageFrom.name}
            </div>
          </div>
          {empty && (
            <div className="info-box">
              <span className="info-title">
                You don't have anything to review yet.
              </span>
              <Link to="/session/learn" className="page-link">
                Learn something new first!
              </Link>
            </div>
          )}
          {!empty && (
            <img
              src={"/assets/images/startSession.jpg"}
              alt="start"
              height="380"
            />
          )}
        </>
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

export default ReviewSession;
