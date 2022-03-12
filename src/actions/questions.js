import {
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
  formatQuestion,
  _getQuestionById,
} from "../utils/API";
import {
  removeQuestion,
  addQuestion,
  receiveQuestions,
} from "../reducers/questions";

export function handleGetQuestions() {
  return (dispatch) => {
    _getQuestions().then((questions) => {
      dispatch(receiveQuestions({ value: questions }));
    });
  };
}

export function handleGetQuestionById(questionId) {
  return _getQuestionById(questionId)
}
