import TMDB from "../assets/TMDB.png";
import Footer from "../components/Footer";
import NavBarWelcome from "../components/NavBarWelcome";
import "../styles/NavBarWelcome.scss";

function About() {
  return (
    <div className="welcome">
      <div>
        <NavBarWelcome />
      </div>
      <h1>
        This site uses the TMDB API but is not endorsed or certified by TMDB.
        <img className="TMDB" src={TMDB} alt="Logo" />
      </h1>
      <Footer />
    </div>
  );
}

export default About;
