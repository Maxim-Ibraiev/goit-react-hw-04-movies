import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import routes from "../../services/routes";
import s from "./Header.module.css";

export default class Header extends Component {
  render() {
    return (
      <header className={s.container}>
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
      </header>
    );
  }
}
