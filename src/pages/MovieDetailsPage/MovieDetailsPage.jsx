import React, { Component, Suspense, lazy } from "react";
import { Route, Link, Switch } from "react-router-dom";
import { searchDetails, getImageUrl } from "../../services/search/search";
import routes from "../../services/routes";
import s from "./MovieDetailsPage.module.css";

const Reviews = lazy(() => import("../../components/Reviews"));
const Cast = lazy(() => import("../../components/Cast"));

export default class MovieDetailsPage extends Component {
  state = {
    movie: {},
    error: false,
  };

  async componentDidMount() {
    const { history, location } = this.props;
    const { id } = this.props.match.params;
    const query = location.state?.query;

    const movie = await searchDetails(id).catch(() => {
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
    const query = location.state?.query;
    if (query) {
      return `${routes.movies}?query=${query}`;
    }

    return routes.home;
  };

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
        <Link to={this.handleGoBack}>Go Back</Link>

        {genres && (
          <>
            <div className={s.content}>
              <img
                src={getImageUrl(poster_path)}
                alt={original_title}
                className={s.img}
              />
              <div className={s.info}>
                <h2 className={s.title}>{original_title}</h2>
                <p>User score {popularity}</p>
                <p>{overview}</p>
                <p>
                  Genres:
                  <ul>
                    {genres.map(({ id, name }) => (
                      <li key={id}> {name},</li>
                    ))}
                  </ul>
                </p>
              </div>
            </div>

            <ul>
              <li>
                <Link
                  to={{
                    pathname: `${match.url}${routes.cast}`,
                    state: this.props.location.state,
                  }}
                >
                  Cast
                </Link>
              </li>
              <li>
                <Link
                  to={{
                    pathname: `${match.url}${routes.reviews}`,
                    state: this.props.location.state,
                  }}
                >
                  Reviews
                </Link>
              </li>
            </ul>

            <Suspense fallback={<div>Loading...</div>}>
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
              </Switch>
            </Suspense>
          </>
        )}
      </div>
    );
  }
}
