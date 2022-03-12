import { loginUser } from "../reducers/session";
import { _userLogin } from "../utils/API";

export function handleLogin(id) {
  return (dispatch) => {
    _userLogin(id).then((result) => {
      if (result)
        dispatch(
          loginUser({ value: { id: result.id, avatarURL: result.avatarURL } })
        );
      else return null;
    });
  };
}
