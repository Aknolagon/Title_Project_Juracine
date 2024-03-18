import PropTypes from "prop-types";
import closeIcon from "../../assets/closeIcon.png";
import "../../styles/InfoCardSerie.scss";
import Rating from "../Rating";

function InfoCardSerie({ serie, onClose }) {
  if (!serie) {
    return null;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }
  const formattedReleaseDate = formatDate(serie.release_date);

  return (
    <section className="info-card-serie">
      <button
        type="button"
        className="close-button"
        onClick={onClose}
        aria-label="close"
      >
        <img src={closeIcon} alt="close" />
      </button>
      <h1 id="dialogTitleSerie" className="serieTitle">
        {serie.title}
      </h1>
      <p className="synopsis">{serie.overview}</p>
      <p className="release">Release Date : {formattedReleaseDate}</p>
      {serie.trailerKey && (
        <iframe
          title="Trailer"
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${serie.trailerKey}`}
          allowFullScreen
        />
      )}
      <div className="actors">
        {serie.cast &&
          serie.cast.slice(0, 2).map((actor) => (
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
        Rating : <Rating rating={serie.rating} />
      </p>
    </section>
  );
}

InfoCardSerie.propTypes = {
  serie: PropTypes.shape({
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

InfoCardSerie.defaultProps = {
  serie: null,
};

export default InfoCardSerie;
