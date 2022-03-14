import {
  answerQuestion,
  receiveQuestions,
  removeQuestion,
  addQuestion
} from "../reducers/questions";
import { addAnswer, receiveUsers, removeAnswer, createdQuestion } from "../reducers/users";
import { getInitialData, _saveQuestionAnswer, formatQuestion, _saveQuestion } from "../utils/API";

export const AUTHED_ID = "tylermcginnis";

export function handleInitialData() {
  return (dispatch) => {
    return getInitialData().then(({ questions, users }) => {
      dispatch(receiveQuestions({ value: questions }));
      dispatch(receiveUsers({ value: users }));
    });
  };
}

export function handleAnswerQuestion(authedUser, questionId, answer) {
  if (!authedUser) return { value: "You need to be logged in to vote!" };
  return async (dispatch) => {
    _saveQuestionAnswer({ authedUser, questionId, answer }).catch((e) => {
      dispatch(removeQuestion({ authedUser, questionId, answer }));
      dispatch(removeAnswer({ authedUser, questionId, answer }));
      console.log(e);
    });
     await Promise.all([
      dispatch(answerQuestion({ authedUser, questionId, answer })),
      dispatch(addAnswer({ authedUser, questionId, answer })),
    ]);
  };
}

export function handleAddQuestion({optionOneText, optionTwoText, author}) {
  if (!author) return { value: "You need to be logged in to vote!" };
  return async (dispatch) => {
    const formattedQuestion = formatQuestion({ optionOneText, optionTwoText, author });
    _saveQuestion(formattedQuestion).catch((e) => {
      dispatch(removeQuestion(formattedQuestion.id));
    });
    await Promise.all([
      dispatch(addQuestion(formattedQuestion)),
      dispatch(createdQuestion(formattedQuestion))
    ])
  };
}