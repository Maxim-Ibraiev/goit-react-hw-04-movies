import { Component } from "react";
import { searchTrendingToday } from "../../services/search/search";
import { Link } from "react-router-dom";
import routes from "../../services/routes";

export default class TrendingToday extends Component {
  state = {
    trendToday: [],
  };

  componentDidMount() {
    searchTrendingToday().then((trendToday) => this.setState({ trendToday }));
  }

  render() {
    const { trendToday } = this.state;

    return (
      <>
        <h1>Trending today</h1>
        {trendToday.length > 0 && (
          <ul>
            {trendToday.map(({ title, id }) => (
              <li key={id}>
                <Link to={`${routes.movies}/${id}`}>{title}</Link>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}
