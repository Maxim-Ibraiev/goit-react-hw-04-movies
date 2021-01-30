import React, { Component } from "react";
import { Link } from "react-router-dom";
import { searchMovie } from "../../services/search/search";

export default class MoviesPage extends Component {
  state = {
    value: "",
    query: "",
    movies: null,
  };

  componentDidMount() {
    const { location } = this.props;

    if (location.search) {
      const searchParams = new URLSearchParams(location.search).get("query");

      this.setState({ query: searchParams });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      const { query } = this.state;

      searchMovie(query).then((movies) => this.setState({ movies }));
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  handleSearch = (e) => {
    e.preventDefault();

    const { value } = this.state;

    this.props.history.push({ search: `query=${value}` });
    this.setState({ query: value, value: "" });
  };

  render() {
    const { value, movies, query } = this.state;
    const { match } = this.props;

    return (
      <div>
        <form onSubmit={this.handleSearch}>
          <label>
            <input
              onChange={this.handleChange}
              type="text"
              name="value"
              value={value}
            />
          </label>
          <button type="submit">Search</button>
        </form>
        {movies && (
          <ul>
            {movies.map(({ title, id }) => (
              <li key={id}>
                <Link
                  to={{
                    pathname: `${match.path}/${id}`,
                    state: { fromQuery: query },
                  }}
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
