import React from "react";
import { useSelector } from "react-redux";
import "./Score.css";

const Score = () => {
  const { wpmIn5, accuracy, totalPressIn5 } = useSelector((store) => store.app);
  return (
    <div>
      <div className="main-score-container">
        <div className="cross" onClick={() => window.location.reload()}>
          X
        </div>
        <h1>Test Score</h1>
        <div className="mini-score-container">
          <div className="score-body">
            <div className="score-heading">Time</div>
            <div className="score">5</div>
          </div>
          <div className="score-body">
            <div className="score-heading">Words Typed</div>
            <div className="score">{totalPressIn5}</div>
          </div>
          <div className="score-body">
            <div className="score-heading">WPM</div>
            <div className="score">{wpmIn5}</div>
          </div>
          <div className="score-body">
            <div className="score-heading">Accuracy</div>
            <div className="score">{accuracy}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Score;
