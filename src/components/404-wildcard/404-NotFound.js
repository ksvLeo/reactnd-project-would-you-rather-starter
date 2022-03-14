import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NotFoundWildcard() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(3);

  useEffect(() => {
    const callbackWait = 3000;
    const timer = setInterval(() => setSeconds(seconds - 1), 1000);
    setTimeout(() => {
      clearInterval(timer);
      navigate("/");
    }, callbackWait);
  }, [navigate]);

  return (
    <div>
      <h1>Error 404 NotFound</h1>
      <p>You can try again. You are being redirected to Home in {seconds}.</p>
    </div>
  );
}

export default NotFoundWildcard;
