import React, { Suspense, lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import routes from "../../services/routes";
import Header from "../Header";

const TrendingToday = lazy(() => import("../TrendingToday"));
const MovieDetailsPage = lazy(() => import("../../pages/MovieDetailsPage"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage"));

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path={routes.home} exact component={TrendingToday} />
          <Route path={routes.moviesId} component={MovieDetailsPage} />
          <Route path={routes.movies} component={MoviesPage} />
          <Redirect to={routes.home} />
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
