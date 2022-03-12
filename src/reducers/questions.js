import { createSlice } from "@reduxjs/toolkit";
import { removeByKey } from "../utils/helpers";

export const questionSlice = createSlice({
  name: "questions",
  initialState: { value: [] },
  reducers: {
    receiveQuestions: (state, action) => {
      state.value = action.payload.value;
    },

    addQuestion: (state, action) => {
      state.value[action.payload.id] = action.payload;
    },

    answerQuestion: (state, action) => {
        state.value[action.payload.questionId][action.payload.answer].votes.push(action.payload.authedUser)
    },

    removeQuestion: (state, action) => {
      state.value = removeByKey(state.value, action.payload)
    },

    removeQuestionAnswer: (state, action) => {
      switch (action.payload.answer) {
        case "optionOne":
          const votesOne =
            state.value[action.payload.questionId].optionOne.votes;
          let voteOne = votesOne.filter((vote) => vote === action.user);
          votesOne.splice(votesOne.indexOf(voteOne), 1);
          break;

        case "optionTwo":
          const votesTwo =
            state.value[action.payload.questionId].optionTwo.votes;
          let voteTwo = votesTwo.filter((vote) => vote === action.user);
          votesTwo.splice(votesTwo.indexOf(voteTwo), 1);
          break;
      }
    },
  },
});

export const { receiveQuestions, addQuestion, answerQuestion, removeQuestion } =
  questionSlice.actions;
export default questionSlice.reducer;
