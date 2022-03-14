import { useState } from "react";

const NewPoll = (props) => {
  const { handleAddPoll } = props;
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  return (
    <div className="poll-options-container">
      <p className="poll-options-text">
        Would you rather{optionOne !== "" ? ` ${optionOne}` : "..."}
        {optionTwo !== "" && ` or ${optionTwo}`}?
      </p>
      <div className="poll-input-container">
        <textarea
          className="poll-textarea"
          value={optionOne}
          onChange={(event) => setOptionOne(event.target.value)}
          rows="6"
        />
        <textarea
          className="poll-textarea"
          value={optionTwo}
          onChange={(event) => setOptionTwo(event.target.value)}
          rows="6"
        />
      </div>

      <button
        className="poll-add-button"
        onClick={() => {
          handleAddPoll(optionOne, optionTwo);
        }}
        disabled={!optionOne || !optionTwo}
      >
        Add Poll
      </button>
    </div>
  );
};

export default NewPoll;
