import LoginForm from "./Session/LoginForm";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Home from "./Home/Home";
import Navbar from "./Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Leaderboard from "./Leaderboard/Leaderboard";
import AddPoll from "./Polls/Addpoll/AddPoll";
import NotFoundWildcard from "./404-wildcard/404-NotFound";
import { LoadingBar } from "react-redux-loading-bar";

const App = () => {
  const dispatch = useDispatch();

  const authedUser = useSelector((state) => state.session.value);

  const loggedAnswers = useSelector(
    (state) => state.users.value[state.session.value?.id]?.answers
  );

  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar authedUser={authedUser} />
        <Routes>
          <Route
            path="/"
            element={
              authedUser ? (
                <Home authedUser={authedUser} loggedAnswers={loggedAnswers} />
              ) : (
                <LoginForm />
              )
            }
          ></Route>{" "}
          <Route
            path="questions/:question_Id"
            element={
              authedUser ? (
                <Home authedUser={authedUser} loggedAnswers={loggedAnswers} />
              ) : (
                <LoginForm />
              )
            }
          ></Route>
          <Route
            path="/add"
            exact
            element={
              authedUser ? (
                <AddPoll authedUser={authedUser} />
              ) : (
                <LoginForm  />
              )
            }
          ></Route>
          <Route
            path="/leaderboard"
            exact
            element={
              authedUser ? (
                <Leaderboard />
              ) : (
                <LoginForm  />
              )
            }
          ></Route>
          <Route path="/login" element={<LoginForm />}></Route>
          <Route path="*" element={<NotFoundWildcard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
