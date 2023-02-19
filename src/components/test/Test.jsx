import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Score from "../score/Score";
import data from "../../data";
import "./Test.css";

const Test = () => {
  /* eslint-disable */
  const currentText = useSelector((store) => store.app.currentText).split("");
  const [index, setIndex] = useState(0);
  const [isWrong, setIswrong] = useState(-1);
  const [isActive, setIsActive] = useState(0);
  const [inputText, setInputText] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [total, setTotal] = useState(1);
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
    console.log(totalCharacterTyped);
    console.log(wrongCharacterTyped);
    const WPM = Math.round(totalCharacterTyped / 5 / 5);
    const NWPM = Math.round(
      (totalCharacterTyped - wrongCharacterTyped) / 5 / 5
    );
    console.log(WPM);
    console.log(NWPM);
    const accuracy = Math.floor(
      ((totalCharacterTyped - wrongCharacterTyped) * 100) / totalCharacterTyped
    );
    dispatch({
      type: "COMPLETE",
      payload: { totalCharacterTyped, WPM, accuracy },
    });
  }

  const handleTextChange = () => {
    const randomIndex = Math.floor(Math.random() * data.length);
    dispatch({ type: "NEWLINE", payload: data[randomIndex] });
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
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
        setInputText("");
        setIndex(0);
        setIsActive(0);
        setIswrong(-1);
        handleTextChange();
      } else {
        setIswrong(-1);
        setIsActive(temp + 1);
        setIndex(temp + 1);
      }
    } else {
      setWrongCharacterTyped(wrongCharacterTyped + 1);
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
