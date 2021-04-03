import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import routes from "../../services/routes";
import SearchInput from "../../components/SearchInput";
import searchParams from "../../services/searchParams";
import r from "../../services/routes";
import s from "./Header.module.css";

export default class Header extends Component {
  handleSubmit = (e) => {
    e.preventDefault();

    const { history } = this.props;
    const {
      value: { value },
    } = e.target;

    if (value === "") {
      return history.push(r.home);
    }

    history.push({
      pathname: r.movies,
      search: `query=${value}`,
    });
  };

  render() {
    return (
      <header className={s.container}>
        <div className={s.backDrop} />
        <NavLink
          to={routes.home}
          exact
          className={s.link}
          activeClassName={s.linkAct}
        >
          Home
        </NavLink>
        <NavLink
          to={routes.movies}
          className={s.link}
          activeClassName={s.linkAct}
        >
          Movies
        </NavLink>
        <div className={s.searchBox}>
          <SearchInput
            onSubmit={this.handleSubmit}
            onChange={this.handleChange}
            name="value"
            value={searchParams(this.props.location.search, "query")}
          />
        </div>
      </header>
    );
  }
}
