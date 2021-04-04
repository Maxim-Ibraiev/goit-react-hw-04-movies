import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import routes from "../../services/routes";
import SearchInput from "../../components/SearchInput";
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
          LOGO
        </NavLink>
        <div className={s.searchBox}>
          <SearchInput
            placeholder="Search for a movie, tv show, person......"
            onSubmit={this.handleSubmit}
            onChange={this.handleChange}
            name="value"
          />
        </div>
      </header>
    );
  }
}
