import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Login.scss";
import Logo from "../assets/LOGO.png";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [validPwd, setValidPwd] = useState(false);

  const updateButton = () => {
    const button = document.getElementById("button");
    if (button) {
      button.disabled = !validPwd;
      button.style.opacity = button.disabled ? 0.5 : 1;
    }
  };

  useEffect(() => {
    updateButton();
  }, [validPwd]);

  // Hook pour la navigation
  // const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="login">
        <img className="logo" src={Logo} alt="logo" />
        <section>
          <form>
            <div>
              <label id="form-co-mail" htmlFor="email-co">
                {" "}
                <input
                  ref={emailRef}
                  autoComplete="on"
                  type="mail"
                  id="email-co"
                  placeholder="Email"
                  required
                  aria-describedby="uidnote"
                />
              </label>
            </div>
            <div>
              <label id="form-co-pass" htmlFor="password-co">
                {" "}
                <input
                  type="password"
                  id="password-co"
                  autoComplete="on"
                  placeholder="Password"
                  ref={passwordRef}
                  onChange={(e) => setValidPwd(e.target.value)}
                />
              </label>
            </div>

            <button
              className="button"
              id="button"
              type="submit"
              disabled={!validPwd}
            >
              <Link to="/home">Connexion</Link>
            </button>
            <span>
              Don't have any account ? Click <Link to="/register">Here</Link>
            </span>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Login;
