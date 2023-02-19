const initState = {
  currentText: "",
  wpm: 0,
  accuracy: 0,
  totalPressIn5: 0,
  wpmIn5: 0,
};

function AppReducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case "NEWLINE": {
      return { ...state, currentText: payload };
    }
    case "COMPLETE": {
      return {
        ...state,
        totalPressIn5: payload.totalCharacterTyped,
        wpmIn5: payload.WPM,
        accuracy: payload.accuracy,
      };
    }

    default:
      return state;
  }
}
export { AppReducer };
