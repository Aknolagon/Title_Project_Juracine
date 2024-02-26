import { useRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/Login.scss";
import Logo from "../assets/LOGO.png";
import { UserContext } from "../contexts/UserContext";

function Login() {
  const emailRef = useRef();
  const pwdRef = useRef();

  const [validPwd, setValidPwd] = useState(false);

  const { updateUser } = useContext(UserContext);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailRef.current.value,
            password: pwdRef.current.value,
          }),
        }
      );

      if (response.status === 200) {
        const auth = await response.json();
        sessionStorage.setItem("userToken", auth.token);

        updateUser({
          id: auth.user.id,
          username: auth.user.username,
          role: auth.user.role_id,
        });

        window.location.href = `/profile/${auth.user.id}`;
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="page-container">
      <div className="login">
        <img className="logo" src={Logo} alt="logo" />
        <section>
          <form id="login" onSubmit={handleSubmit}>
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
                  ref={pwdRef}
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
              Connexion
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
