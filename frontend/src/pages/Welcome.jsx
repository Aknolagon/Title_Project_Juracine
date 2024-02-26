import Logo from "../assets/LOGO.png";
import NavBarWelcome from "../components/NavBarWelcome";
import "../styles/NavBar.scss";
import "../styles/Welcome.scss";

function Welcome() {
  return (
    <div className="welcome">
      <div>
        <nav>
          <NavBarWelcome />
        </nav>
        <h1>
          <img className="logo" src={Logo} alt="logo" />
        </h1>
        <h2>
          Want to have some information about your favorite movie ? Log in and
          discover everything!
        </h2>
      </div>
    </div>
  );
}

export default Welcome;
