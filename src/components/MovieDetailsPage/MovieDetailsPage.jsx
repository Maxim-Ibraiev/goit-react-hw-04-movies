import React, { Component } from "react";
import { Link } from "react-router-dom";
import { searchDetails, getImageUrl } from "../../services/search/search";
import routes from "../../services/routes";
import s from "./MovieDetailsPage.module.css";

export default class MovieDetailsPage extends Component {
  state = {
    movie: {},
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    searchDetails(id).then((movie) => this.setState({ movie }));
  }

  render() {
    const { match } = this.props;
    const {
      poster_path,
      original_title,
      overview,
      popularity,
      genres,
    } = this.state.movie;

    return (
      <div className={s.container}>
        <Link to={routes.home}>Go Back</Link>

        {genres && (
          <>
            <div>
              <img src={getImageUrl(poster_path)} alt={original_title} />
              <div>
                <h2>{original_title}</h2> <br />
                <span>user score {popularity}</span> <br />
                <span>{overview}</span> <br />
                "Genres: "
                {genres.map(({ id, name }) => (
                  <span key={id}>{name} </span>
                ))}
              </div>
            </div>

            <ul>
              <li>
                <Link to={`${match.url}${routes.cast}`}>Cast</Link>
              </li>
              <li>
                <Link to={`${match.url}${routes.reviews}`}>Reviews</Link>
              </li>
            </ul>
          </>
        )}
      </div>
    );
  }
}
