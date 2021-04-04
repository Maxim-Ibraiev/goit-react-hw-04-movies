import React, { Suspense, lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Layout from "../Layout";
import routes from "../../services/routes";
import Header from "../Header";
import "../../styles/index.css";

const TrendingToday = lazy(() => import("../TrendingToday"));
const MovieDetailsPage = lazy(() => import("../../pages/MovieDetailsPage"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage"));

function App() {
  return (
    <>
      <Route path="/" component={Header} />
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path={routes.home} exact component={TrendingToday} />
            <Route path={routes.moviesId} component={MovieDetailsPage} />
            <Route path={routes.movies} component={MoviesPage} />
            <Redirect to={routes.home} />
          </Switch>
        </Suspense>
      </Layout>
    </>
  );
}

export default App;
