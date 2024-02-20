import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import "../styles/Home.scss";

function DashboardAdmin() {
  return (
    <div className="DashboardAdmin">
      <NavBar />
      <div>
        <SearchBar />
      </div>
    </div>
  );
}

export default DashboardAdmin;
