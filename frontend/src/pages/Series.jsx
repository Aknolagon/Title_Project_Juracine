import CategorySeries from "../components/Categories/CategorySeries";
import TrendingSeries from "../components/Categories/TrendingSeries";
import UpcomingSeries from "../components/Categories/UpcomingSeries";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import "../styles/Series.scss";

function Series() {
  return (
    <div className="series">
      <NavBar />
      <SearchBar />
      <TrendingSeries />
      <CategorySeries />
      <UpcomingSeries />
      <Footer />
    </div>
  );
}

export default Series;
