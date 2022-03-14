import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleAnswerQuestion } from "../../actions/shared";
import PollDetails from "../Polls/PollDetails/PollDetails";
import PollContainer from "../Polls/PollContainer";
import PollPreview from "../Polls/PollPreview";
import { handleGetQuestionById } from "../../actions/questions";

function Home(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { authedUser, loggedAnswers } = props;

  const [questionSelected, setQuestionSelected] = useState(null);
  const [toggleQuestions, setToggleQuestions] = useState("unanswered");
  const [loading, setLoading] = useState(null);
  const urlParams = useParams();
  const questionDetailsId = urlParams["question_Id"];

  useEffect(() => {
    if (questionDetailsId) {
      if (!loading && !questionSelected) {
        handleGetQuestionById(questionDetailsId).then((result) => {
          if (!result) navigate("../404-notfound");
          setQuestionSelected(result);
          setLoading(false);
        });

        setToggleQuestions("details");
      }
    } else {
      if (questionSelected) setQuestionSelected(null);
      if (toggleQuestions === "details") setToggleQuestions("unanswered");
      setLoading(false);
    }
  });

  const questions = useSelector((state) => sortPolls(state.questions.value));

  const questionsUsers = useSelector((state) => {
    let users = { value: {} };
    if (questions?.value && state.users.value) {
      Object.values(questions?.value).map((question) => {
        let user = state.users.value[question.author];
        if (user) users.value[user.id] = user;
      });
    }
    return users;
  });

  const finishedLoading = () => {
    const finished =
      Object.values(questions.value).length > 0 &&
      Object.values(questionsUsers.value).length > 0 &&
      loading === false;
    return finished;
  };

  const handleAnswerPoll = (questionId, answer) => {
    if (!authedUser) navigate("/login");
    dispatch(handleAnswerQuestion(authedUser.id, questionId, answer));
  };

  const handleToggleView = (toggle) => {
    setToggleQuestions(toggle);
    if (questionDetailsId) navigate("/");
  };

  return (
    <>
      {finishedLoading() && (
        <div className="home-container">
          <div className="polls-selector">
            <span
              onClick={() => handleToggleView("unanswered")}
              className={toggleQuestions === "unanswered" ? "active" : ""}
            >
              Unanswered
            </span>
            <span
              onClick={() => handleToggleView("answered")}
              className={toggleQuestions === "answered" ? "active" : ""}
            >
              Answered
            </span>
          </div>
          <div className="poll-preview-collection">
            {!questionDetailsId ? (
              Object.values(questions.value).map((question) => {
                if (
                  toggleQuestions === "unanswered" &&
                  !loggedAnswers[question.id]
                )
                  return (
                    <div key={question.id} className="poll-preview-container">
                      <div className="poll-container">
                        <PollContainer question={question} showData={false}>
                          <PollPreview
                            question={question}
                            avatarURL={
                              questionsUsers.value[question.author].avatarURL
                            }
                          />
                        </PollContainer>
                      </div>
                    </div>
                  );
                if (
                  toggleQuestions === "answered" &&
                  loggedAnswers[question.id]
                )
                  return (
                    <div key={question.id} className="poll-container">
                      <PollContainer question={question} showData={false}>
                        <PollPreview
                          question={question}
                          avatarURL={
                            questionsUsers.value[question.author].avatarURL
                          }
                        />
                      </PollContainer>
                    </div>
                  );
              })
            ) : (
              <>
                {questionSelected && (
                  <PollContainer question={questionSelected}>
                    <PollDetails
                      question={questionSelected}
                      userAnswer={loggedAnswers[questionDetailsId]}
                      avatarURL={
                        questionsUsers.value[questionSelected.author].avatarURL
                      }
                      handleAnswerPoll={handleAnswerPoll}
                    />
                  </PollContainer>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
const sortPolls = (polls) => {
  let sortedQuestions = { value: {} };
  if (polls) {
    Object.values(polls)
      .sort((a, b) => a.timestamp < b.timestamp)
      .map((question) => (sortedQuestions.value[question.id] = question));
  }
  return sortedQuestions;
};

export default Home;
