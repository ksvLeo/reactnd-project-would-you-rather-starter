import React from "react";
import { useNavigate } from "react-router-dom";
import { capitalizeString } from "../../utils/helpers";

function PollPreview(props) {
  const { question, avatarURL } = props;

  const navigate = useNavigate();

  return (
    <div
      className="poll-preview poll-options-container"
      onClick={() => navigate("../" + question.id)}
    >
      <p className="poll-options-text">
        ...{question.optionOne.text} or {question.optionTwo.text}?
      </p>
      <img
        className="poll-user-avatar"
        src={avatarURL}
        title={`${question.author}'s poll`}
      ></img>
      <div className="poll-options-buttons">
        <span
          className="poll-option-one"
        //   onClick={() => handleAnswerPoll(question.id, "optionOne")}
        >
          {capitalizeString(question.optionOne.text)}
        </span>
        <span
          className="poll-option-two"
        //   onClick={() => handleAnswerPoll(question.id, "optionTwo")}
        >
          {capitalizeString(question.optionTwo.text)}
        </span>
      </div>
    </div>
  );
}

export default PollPreview;
