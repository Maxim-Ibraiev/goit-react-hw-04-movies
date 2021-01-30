import React, { Component } from "react";
import { Route } from "react-router-dom";
import TrendingToday from "../../components/TrendingToday";

export default class HomePage extends Component {
  state = {
    popularMovies: [],
  };

  render() {
    return (
      <>
        <Route path="/" exact component={TrendingToday} />
      </>
    );
  }
}
