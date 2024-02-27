import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Logo from "../assets/LOGO.png";
import "../styles/Register.scss";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,24}$/;
const MAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!%_*?&-])[A-Za-z\d@!%_*?&-]{8,24}$/;

function Register() {
  const userRef = useRef();
  const errRef = useRef();
  const mailRef = useRef();
  const pwdRef = useRef();

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

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
    const result = USER_REGEX.test(name);
    setValidName(result);
  }, [name]);

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
  }, [name, mail, pwd]);

  const updateButton = () => {
    const button = document.getElementById("button");
    button.disabled = !validPwd;
    button.style.opacity = button.disabled ? 0.5 : 1;
  };

  useEffect(() => {
    updateButton();
  }, [validPwd]);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: mailRef.current.value.toString(),
            password: pwdRef.current.value,
          }),
        }
      );

      if (response.status === 201) {
        const userData = await response.json();

        const roleResponse = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/userroles`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: userData.insertId,
              roleId: "1",
            }),
          }
        );

        if (roleResponse.status === 201) {
          const profileResponse = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/profiles`,
            {
              method: "post",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: userData.insertId,
                username: userRef.current.value.toString(),
              }),
            }
          );

          if (profileResponse.status === 201) {
            Swal.fire({
              title: "Account created successfully!",
              text: "You can now connect.",
              icon: "success",
            });
            navigate("/login");
          } else {
            const profileData = await profileResponse.json();
            setErrMsg(`Profile creation failed: ${profileData.message}`);
          }
        } else {
          const roleData = await roleResponse.json();
          setErrMsg(`Role assignment failed: ${roleData.message}`);
        }
      } else {
        const responseData = await response.json();
        setErrMsg(`User creation failed: ${responseData.message}`);
      }
    } catch (err) {
      setErrMsg("Error during registration. Please try again later.");
      console.error(err);
    }
  };

  return (
    <div className="register">
      <div className="page-container">
        <img className="logo" src={Logo} alt="logo" />
        <section className="section">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Register</h1>
          <form id="subscribe" onSubmit={handleSubmit}>
            <label className="label" id="form-sub-username" htmlFor="username">
              <span>
                Username :{" "}
                <span className={validName ? "valid" : "hide"}>Good</span>
                <span className={validName || !name ? "hide" : "invalid"}>
                  Not good
                </span>
              </span>
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setName(e.target.value)}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setNameFocus(true)}
                onBlur={() => setNameFocus(false)}
              />
              <p
                id="usernote"
                className={
                  nameFocus && !validName ? "instructions" : "offscreen"
                }
              >
                4 to 24 characters.
                <br />
                Must begin with a letter.
                <br />
                Letters, numbers allowed.
              </p>
            </label>
            <label className="label" id="form-sub-email" htmlFor="email-reg">
              <span>
                Email :{" "}
                <span className={validMail ? "valid" : "hide"}>Good</span>
                <span className={validMail || !mail ? "hide" : "invalid"}>
                  Not good
                </span>
              </span>
              <input
                type="mail"
                id="email-reg"
                ref={mailRef}
                autoComplete="on"
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
            <label className="label" htmlFor="password-reg">
              <span>
                Password :{" "}
                <span className={validPwd ? "valid" : "hide"}>Good</span>
                <span className={validPwd || !pwd ? "hide" : "invalid"}>
                  Not good
                </span>
              </span>
              <input
                type="password"
                id="password-reg"
                ref={pwdRef}
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
                Must include one uppercase letter, a number and a special
                character.
                <br />
                Use a special character from [@!%_*?&-]
              </p>
            </label>
            <button id="button" type="submit" className="button">
              Register
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
