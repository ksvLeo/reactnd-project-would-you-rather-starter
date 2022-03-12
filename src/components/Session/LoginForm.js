import { hasUnreliableEmptyValue } from "@testing-library/user-event/dist/utils";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../../actions/session";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const oneClickUsers = useSelector((state) => {
    let users = [];
    Object.values(state.users.value).map((user) => {
      users.push({
        id: user.id,
        avatar: user.avatarURL,
      });
    });
    return users;
  });

  const handleSuccessfulLogin = (id) => {
    Promise.all([dispatch(handleLogin(id))]).then(() => {
      navigate("/");
    });
  };

  const [login, setLogin] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const printInput = () => {
    console.log(username, password);
  };

  return (
    <div className="form-container">
      <h1>Login</h1>

      <span>OneClick Auth</span>
      <div className="one-click-login-list">
        {oneClickUsers.map((user) => (
          <img
            key={user.id}
            className="one-click-login-avatar"
            src={user.avatar}
            alt={`${user.id}'s avatar`}
            title={`Login as ${user.id}`}
            onClick={() => handleSuccessfulLogin(user.id)}
          ></img>
        ))}
      </div>

      {/* <div className="input-container">
        <input
          type="text"
          placeholder="Username..."
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Password..."
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </div>

      <div>
        <button
          onClick={() => {
            printInput();
          }}
        >
          Login
        </button>
      </div> */}
    </div>
  );
}
