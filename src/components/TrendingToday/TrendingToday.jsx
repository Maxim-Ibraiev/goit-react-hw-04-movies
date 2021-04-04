import { Component } from "react";
import { searchTrendingToday } from "../../services/search/search";
import { debounce } from "lodash";
import CartItem from "../CartItem";
import elemInViewport from "../../services/elemInViewport";
import cn from "classnames";
import s from "./TrendingToday.module.css";
import r from "../../services/routes";

export default class TrendingToday extends Component {
  state = {
    trendToday: [],
    isHiddenOverlay: false,
  };

  componentDidMount() {
    searchTrendingToday().then((trendToday) => this.setState({ trendToday }));
  }
  handleScroll = (e) => {
    const result = elemInViewport(e.target.firstChild, true);
    console.log(!result);
    this.setState({ isHiddenOverlay: !result });
  };
  render() {
    const { trendToday, isHiddenOverlay } = this.state;

    return (
      <div className={cn(s.wrapper, { [s.isHiddenOverlay]: isHiddenOverlay })}>
        <h1>What's Popular</h1>

        {trendToday.length > 0 && (
          <ul className={s.list} onScroll={debounce(this.handleScroll, 200)}>
            {trendToday.map((item) => (
              <li key={item.id} className={s.item}>
                <CartItem to={`${r.movies}/${item.id}`} item={item} />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
