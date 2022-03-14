import { useDispatch, useSelector } from "react-redux";
import {
  useNavigate,
} from "react-router-dom";
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
      navigate(window.location.pathname);
    });
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
    </div>
  );
}
