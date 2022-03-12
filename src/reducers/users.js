import { createSlice } from "@reduxjs/toolkit";
import { removeByKey } from "../utils/helpers";

export const userSlice = createSlice({
  name: "users",
  initialState: { value: [] },
  reducers: {
    receiveUsers: (state, action) => {
      return {
        ...state.value,
        ...action.payload,
      };
    },

    addAnswer: (state, action) => {
      state.value[action.payload.authedUser].answers[
        action.payload.questionId
      ] = action.payload.answer;
    },

    removeAnswer: (state, action) => {
      state.value[action.payload.authedUser].answers = removeByKey(
        state.value[action.payload.authedUser].answers,
        action.payload
      );
    },

    createdQuestion: (state, action) => {
      state.value[action.payload.author].questions.push(
        action.payload.id
      );
    },
  },
});

export const { receiveUsers, userLogin, userLogout, addAnswer, removeAnswer, createdQuestion } =
  userSlice.actions;
export default userSlice.reducer;
