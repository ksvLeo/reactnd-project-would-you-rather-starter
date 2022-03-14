import { capitalizeString } from "../../../utils/helpers";

function PollDetails(props) {
  let { userAnswer, question, handleAnswerPoll, avatarURL } = props;
  const formatVotesPercentage = (question, option) => {
    return `${(
      (question[option].votes.length /
        (question.optionOne.votes.length + question.optionTwo.votes.length)) *
      100
    ).toFixed(0)}%`;
  };

  return (
    <div>
      {question && (
        <div className="poll-options-container">
          <p className="poll-options-text">
            Would you rather {question.optionOne.text} or{" "}
            {question.optionTwo.text}?
          </p>
          <img
            className="poll-user-avatar"
            src={avatarURL}
            title={`${question.author}'s poll`}
          ></img>
          {!userAnswer ? (
            <div className="poll-options-buttons">
              <button
                className="poll-option-one"
                onClick={() => handleAnswerPoll(question.id, "optionOne")}
              >
                {capitalizeString(question.optionOne.text)}
              </button>
              <button
                className="poll-option-two"
                onClick={() => handleAnswerPoll(question.id, "optionTwo")}
              >
                {capitalizeString(question.optionTwo.text)}
              </button>
            </div>
          ) : (
            <div className="poll-answer">
              <span className="user-answer">
                <span>{userAnswer === "optionOne" && `You voted`}</span>
                <span>{userAnswer === "optionTwo" && `You voted`}</span>
              </span>
              <span>
                <span
                  className="poll-answer-one"
                  onClick={() => handleAnswerPoll(question.id, "optionOne")}
                >
                  {capitalizeString(question.optionOne.text)}
                </span>
                <span
                  className="poll-answer-two"
                  onClick={() => handleAnswerPoll(question.id, "optionTwo")}
                >
                  {capitalizeString(question.optionTwo.text)}
                </span>
              </span>
              <span>
                <span>{formatVotesPercentage(question, "optionOne")}</span>
                <span>{formatVotesPercentage(question, "optionTwo")}</span>
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PollDetails;
