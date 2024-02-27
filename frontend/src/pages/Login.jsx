import { useRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/Register.scss";
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
    <div className="register">
      <div className="page-container">
        <img className="logo" src={Logo} alt="logo" />
        <section className="section">
          <h1>Login</h1>
          <form id="login" onSubmit={handleSubmit}>
            <label className="label" id="form-co-mail" htmlFor="email-co">
              <span className="email-log">Email : </span>
              <input
                ref={emailRef}
                autoComplete="on"
                type="mail"
                id="email-co"
                required
                aria-describedby="uidnote"
              />
            </label>
            <label className="label" id="form-co-pass" htmlFor="password-co">
              <span className="email-log">Password : </span>
              <input
                ref={pwdRef}
                autoComplete="on"
                type="password"
                id="password-co"
                required
                onChange={(e) => setValidPwd(e.target.value)}
                aria-describedby="pwdnote"
              />
            </label>
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
