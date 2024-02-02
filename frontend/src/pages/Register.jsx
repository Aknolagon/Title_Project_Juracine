import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Login.scss";
import Logo from "../assets/LOGO.png";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,24}$/;
const MAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!%_*?&-])[A-Za-z\d@!%_*?&-]{8,24}$/;

function Register() {
  const userRef = useRef();
  const errRef = useRef();
  const mailRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [mail, setMail] = useState("");
  const [validMail, setValidMail] = useState(false);
  const [mailFocus, setMailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    mailRef.current.focus();
  }, []);

  useEffect(() => {
    const result = MAIL_REGEX.test(mail);
    setValidMail(result);
  }, [mail]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
  }, [pwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, mail, pwd]);

  const updateButton = () => {
    const button = document.getElementById("button");
    button.disabled = !validPwd;
    button.style.opacity = button.disabled ? 0.5 : 1;
  };

  useEffect(() => {
    updateButton();
  }, [validPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="page-container">
      <div className="login">
        <img className="logo" src={Logo} alt="logo" />
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Register</h1>
          <form>
            <label htmlFor="username">
              Username :
              <span className={validName ? "valid" : "hide"}>Good</span>
              <span className={validName || !user ? "hide" : "invalid"}>
                Not good
              </span>
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="uidnote"
              className={
                userFocus && user && !validName ? "instructions" : "offscreen"
              }
            >
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>

            <label id="form-sub-email" htmlFor="email-reg">
              Email :<span className={validMail ? "valid" : "hide"}>Good</span>
              <span className={validMail || !mail ? "hide" : "invalid"}>
                Not good
              </span>
              <input
                type="text"
                id="email-reg"
                ref={mailRef}
                autoComplete="off"
                onChange={(e) => setMail(e.target.value)}
                required
                aria-invalid={validMail ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setMailFocus(true)}
                onBlur={() => setMailFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  mailFocus && !validMail ? "instructions" : "offscreen"
                }
              >
                4 to 24 characters.
                <br />
                Must include @ and .
                <br />
              </p>
            </label>

            <label htmlFor="password-reg">
              Password:
              <span className={validPwd ? "valid" : "hide"}>Good</span>
              <span className={validPwd || !user ? "hide" : "invalid"}>
                Not good
              </span>
              <input
                type="password"
                id="password-reg"
                onChange={(e) => setPwd(e.target.value)}
                required
                aria-invalid={validPwd ? "false" : "true"}
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              <p
                id="pwdnote"
                className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
              >
                8 to 24 characters.
                <br />
                Must include uppercase and lowercase letters, a number and a
                special dinosaur.
                <br />
                Use a special character like [@!%_*?&-]
              </p>
            </label>

            <button
              onClick={handleSubmit}
              id="button"
              type="submit"
              className="button"
            >
              <Link to="/home">Register</Link>
            </button>
            <span>
              Do you have already an account ? Click{" "}
              <Link to="/login">Here</Link>
            </span>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Register;
