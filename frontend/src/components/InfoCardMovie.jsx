import PropTypes from "prop-types";
import closeIcon from "../assets/closeIcon.png";
import "../styles/InfoCardMovie.scss";
import Rating from "./Rating";

function InfoCardMovie({ movie, onClose }) {
  if (!movie) {
    return null;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }
  const formattedReleaseDate = formatDate(movie.release_date);

  return (
    <section className="info-card-movie">
      <button
        type="button"
        className="close-button"
        onClick={onClose}
        aria-label="close"
      >
        <img src={closeIcon} alt="closed" />
      </button>
      <h2 id="dialogTitleMovie" className="movieTitle">
        {movie.title}
      </h2>
      <p className="synopsis">{movie.overview}</p>
      <p className="release">Release Date : {formattedReleaseDate}</p>
      {movie.trailerKey && (
        <iframe
          title="Trailer"
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${movie.trailerKey}`}
          allowFullScreen
        />
      )}
      <div className="actors">
        {movie.cast &&
          movie.cast.slice(0, 2).map((actor) => (
            <div key={actor.id} className="actor">
              {actor.profile_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                  alt={actor.name}
                />
              )}
              <p>{actor.name}</p>
            </div>
          ))}
      </div>
      <p className="rating-title">
        Rating : <Rating rating={movie.rating} />
      </p>
    </section>
  );
}

InfoCardMovie.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    overview: PropTypes.string,
    release_date: PropTypes.string,
    cast: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        profile_path: PropTypes.string,
        name: PropTypes.string,
      })
    ),
    trailerKey: PropTypes.string,
    rating: PropTypes.number,
  }),
  onClose: PropTypes.func.isRequired,
};

InfoCardMovie.defaultProps = {
  movie: null,
};

export default InfoCardMovie;
