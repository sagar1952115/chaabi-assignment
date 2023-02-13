import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Score from "../score/Score";
import "./Test.css";

const easy = [
  "aa aa aa aa",
  "ss ss ss ss",
  "dd dd dd dd",
  "ff ff ff ff",
  "gg gg gg gg",
  "hh hh hh hh",
  "jj jj jj jj",
  "kk kk kk kk",
  "ll ll ll ll",
  ";; ;; ;; ;;",
  "ls dj al dl",
  "as as as as",
  "df df df df",
  "gh gh gh gh",
  "jk jk jk jk",
  "l; l; l; l;",
  "sa df gj lk",
  "dj al sk ;l",
  "as df gj kl",
  "sd jg la ;k",
  "asdf l;l;",
  "djsa fghl",
  "sadj hgfl",
  "jdas l;gh",
  "asdj ;lgf",
  "sdja hl;g",
  "djsa lg;h",
  "adsj ;flg",
  "sjad glh;",
  "jads ;lhg",
  "dsafadsfas",
  "adsfadsfas",
];
const Test = () => {
  /* eslint-disable */
  const currentText = useSelector((store) => store.app.currentText).split("");
  const [index, setIndex] = useState(0);
  const [isWrong, setIswrong] = useState(-1);
  const [isActive, setIsActive] = useState(0);
  const [inputText, setInputText] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [total, setTotal] = useState(1);
  const [wrongCount, setWrongCount] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerId, setTimerId] = useState(null);

  const [showresult, setshowresult] = useState(false);

  const [totalCharacterTyped, setTotalCharacterTyped] = useState(0);
  const [wrongCharacterTyped, setWrongCharacterTyped] = useState(0);

  const dispatch = useDispatch();

  if (seconds % 10 === 0 && seconds !== 0 && timerId) {
    setshowresult(true);
    clearInterval(timerId);
    setSeconds(0);
    const elapsedTime = (Date.now() - startTime) / 1000;
    const WPM = Math.round(totalCharacterTyped / 5 / (elapsedTime / 60));
    const NWPM = Math.round(
      (totalCharacterTyped - wrongCharacterTyped) / 5 / (elapsedTime / 60)
    );
    const accuracy = Math.floor((NWPM * 100) / WPM);
    dispatch({
      type: "COMPLETE",
      payload: { totalCharacterTyped, WPM, accuracy },
    });
  }

  const handleTextChange = () => {
    const randomIndex = Math.floor(Math.random() * easy.length);

    dispatch({ type: "NEWLINE", payload: easy[randomIndex] });
  };

  const color = useRef(null);

  const handleInputChange = (event) => {
    const value = event.target.value;
    console.log(index);
    setInputText(value);
    if (seconds === 0 && !timerId) {
      let id = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
      setTimerId(id);
    }

    const temp = Math.min(index, value.length - 1);
    if (value[temp] === currentText[temp]) {
      if (temp === currentText.length - 1) {
        const elapsedTime = (Date.now() - startTime) / 1000;
        const WPM = Math.round(total / 5 / (elapsedTime / 60));
        const NWPM = Math.round((total - wrongCount) / 5 / (elapsedTime / 60));
        const accuracy = Math.floor((NWPM * 100) / WPM);
        setInputText("");
        setStartTime(null);
        setTotal(1);
        setIndex(0);
        setIsActive(0);
        setIswrong(-1);
        setWrongCount(0);
        dispatch({ type: "SHOW", payload: { wpm: WPM, accuracy: accuracy } });
        handleTextChange();
      } else {
        setWrongCharacterTyped(wrongCharacterTyped + 1);
        setIswrong(-1);
        setIsActive(temp + 1);
        setIndex(temp + 1);
      }
    } else {
      setIswrong(temp);
    }

    if (value.length > inputText.length) {
      setTotal((pre) => pre + 1);
      setTotalCharacterTyped(totalCharacterTyped + 1);
    }

    if (!startTime) {
      setStartTime(Date.now());
    }
  };
  useEffect(() => {
    handleTextChange();
  }, []);

  const minutes = Math.floor(seconds / 60);
  const formattedSeconds = seconds % 60;

  return (
    <div>
      <div className="main-test-container">
        <div>
          {minutes}:{formattedSeconds}
        </div>
        <div className="test-screen">
          {currentText.map((curr, i) => {
            return (
              <span
                className={`${isWrong === i && "error"} ${
                  isActive === i && "active"
                }`}
                key={i}
              >
                {curr}
              </span>
            );
          })}
        </div>
        <textarea
          placeholder="Start Typing ..."
          className="test-textarea"
          name=""
          id=""
          value={inputText}
          onChange={handleInputChange}
          ref={color}
          cols="30"
          rows="7"
          autoFocus
        ></textarea>

        {showresult && <Score />}
      </div>
    </div>
  );
};

export default Test;
