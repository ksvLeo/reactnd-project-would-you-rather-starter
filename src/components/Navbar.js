import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Router, useNavigate } from "react-router-dom";
import { logoutUser } from "../reducers/session";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authedUser = useSelector((state) => state.session.value);

  return (
    <div className="navbar">
      <Link to="/" className="navbar-nav-button">
        Home
      </Link>
      <Link to="/addPoll" className="navbar-nav-button">
        Add Poll
      </Link>
      <Link to="/leaderboard" className="navbar-nav-button">
        Leaderboard
      </Link>
      <div>
        {authedUser ? (
          <button title="Logout" onClick={() => dispatch(logoutUser())}>
            <span>{authedUser.id}</span>
            <img className="navbar-avatar" src={authedUser.avatarURL} />
          </button>
        ) : (
          <button title="Login" onClick={() => navigate("/login")}>
            <span>
              Hello <b>Guest</b>!
            </span>
            <img
              className="navbar-avatar"
              src="https://cdn-icons-png.flaticon.com/512/1173/1173817.png"
            />
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
