import React, { Suspense, lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import routes from "../../services/routes";
import Header from "../Header";

const TrendingToday = lazy(() => import("../TrendingToday"));
const MovieDetailsPage = lazy(() => import("../MovieDetailsPage"));
const MoviesPage = lazy(() => import("../MoviesPage"));
const Reviews = lazy(() => import("../Reviews"));
const Cast = lazy(() => import("../Cast"));

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path={routes.home} exact component={TrendingToday} />
          <Route path={routes.moviesId} component={MovieDetailsPage} />
          <Route path={routes.movies} exact component={MoviesPage} />
        </Switch>
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

        <Redirect to={routes.home} />
      </Suspense>
    </>
  );
}

export default App;
