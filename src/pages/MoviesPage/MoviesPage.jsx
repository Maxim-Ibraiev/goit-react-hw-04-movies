import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getImageUrl, searchMovie } from "../../services/search/search";
import s from "./MoviesPage.module.css";
import searchParams from "../../services/searchParams";

export default class MoviesPage extends Component {
  state = {
    query: "",
    movies: null,
  };

  componentDidMount() {
    const { location } = this.props;

    if (location.search) {
      const query = searchParams(location.search, "query");

      searchMovie(query).then((movies) => this.setState({ movies, query }));
    }
  }

  componentDidUpdate() {
    const { query } = this.state;
    const queryParam = searchParams(this.props.location?.search, "query");

    if (queryParam !== query)
      searchMovie(queryParam).then((movies) =>
        this.setState({ movies, query: queryParam })
      );
  }

  render() {
    const { movies, query } = this.state;
    const { match } = this.props;

    return (
      <div>
        {movies && (
          <ul>
            {movies.map(({ title, id }) => (
              <li key={id}>
                <Link
                  to={{ pathname: `${match.path}/${id}`, state: { query } }}
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
