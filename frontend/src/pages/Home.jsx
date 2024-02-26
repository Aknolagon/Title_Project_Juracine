import TrendingMovies from "../components/Categories/TrendingMovies";
import TrendingSeries from "../components/Categories/TrendingSeries";
import UpcomingMovies from "../components/Categories/UpcomingMovies";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import "../styles/Home.scss";

function Home() {
  return (
    <div className="home">
      <div>
        <NavBar />
        <div>
          <SearchBar />
        </div>
        <div>
          <TrendingMovies />
        </div>
        <div>
          <TrendingSeries />
        </div>
        <div>
          <UpcomingMovies />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
