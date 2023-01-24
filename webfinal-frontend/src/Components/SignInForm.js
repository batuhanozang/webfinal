import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function SignInForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["authorization"]);
  const navigate = useNavigate();

  const signIn = () => {
    let body = {
      username: username,
      password: password,
    };
    axios
      .post("http://localhost:9000/auth/signin", body)
      .then((result) => {
        setCookie("authorization", result.headers.authorization, {
          path: "/",
        });
        navigate("/stock");
        alert(result.data);
      })
      .catch((err) => {
        console.log("Cannot sign in");
        alert("SignIn Failed!");
      });
  };

  useEffect(() => {
    if (cookies.authorization) navigate("/stock");
  }, []);

  return (
    <>
      <div className="form-container">
        <div className="form-field">
          <div className="form-label">Username</div>
          <input
            className="form-value"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-field">
          <div className="form-label">Password</div>
          <input
            type="password"
            className="form-value"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-submit">
          <div className="form-submit-button" onClick={signIn}>
            Sign In
          </div>
        </div>
      </div>
    </>
  );
}

export default SignInForm;
