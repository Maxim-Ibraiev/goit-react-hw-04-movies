import React, { Component } from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import Reviews from "../../components/Reviews";
import Cast from "../../components/Cast";
import { searchDetails, getImageUrl } from "../../services/search/search";
import routes from "../../services/routes";
import s from "./MovieDetailsPage.module.css";

export default class MovieDetailsPage extends Component {
  state = {
    movie: {},
    error: false,
  };

  async componentDidMount() {
    const { history } = this.props;
    const { id } = this.props.match.params;

    const movie = await searchDetails(id).catch((e) => {
      console.log("error in catch");
      this.setState({ error: true });
    });

    if (
      JSON.stringify(movie).includes("Error: Request failed with status code")
    ) {
      return history.push(routes.home);
    }

    this.setState({ movie });
  }

  handleGoBack = () => {
    const { location } = this.props;

    if (location.state) {
      return `${routes.movies}?query=${location.state.fromQuery}`;
    }

    return routes.home;
  };

  render() {
    const { match, location } = this.props;
    const {
      poster_path,
      original_title,
      overview,
      popularity,
      genres,
    } = this.state.movie;

    return (
      <div className={s.container}>
        <Link to={this.handleGoBack}>Go Back</Link>

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
                <Link
                  to={{
                    pathname: `${match.url}${routes.cast}`,
                    state: location.state,
                  }}
                >
                  Cast
                </Link>
              </li>
              <li>
                <Link
                  to={{
                    pathname: `${match.url}${routes.reviews}`,
                    state: location.state,
                  }}
                >
                  Reviews
                </Link>
              </li>
            </ul>

            <Switch>
              <Route
                path={`${routes.moviesId}${routes.reviews}`}
                exact
                component={Reviews}
              />
              <Route
                path={`${routes.moviesId}${routes.cast}`}
                exact
                component={Cast}
              />
              <Route path={routes.moviesId} exact />
              <Redirect to={routes.home} />
            </Switch>
          </>
        )}
      </div>
    );
  }
}
