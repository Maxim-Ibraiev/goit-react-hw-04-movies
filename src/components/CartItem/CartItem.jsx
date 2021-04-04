import React from "react";
import { NavLink } from "react-router-dom";
import { getImageUrl } from "../../services/search/search";
import s from "./CartItem.module.css";

export default function CartItem({ item, to }) {
  return (
    <div className={s.wrapper}>
      <NavLink to={to} className={s.link}>
        <img
          src={getImageUrl(item.poster_path)}
          alt={item.title}
          className={s.img}
        />
      </NavLink>
      <div className={s.content}>
        <h2 className={s.item}>
          <NavLink to={to} className={s.titleLink}>
            {item.title}
          </NavLink>
        </h2>
        <p className={s.date}>{item.release_date}</p>
      </div>
    </div>
  );
}

/*
adult: false
backdrop_path: "/z8TvnEVRenMSTemxYZwLGqFofgF.jpg"
genre_ids: (3) [14, 28, 12]
id: 458576
media_type: "movie"
original_language: "en"
original_title: "Monster Hunter"
overview: "A portal transports Cpt. Artemis and an elite unit of soldiers to a strange world where powerful monsters rule with deadly ferocity. Faced with relentless danger, the team encounters a mysterious hunter who may be their only hope to find a way home."
popularity: 2145.313
poster_path: "/1UCOF11QCw8kcqvce8LKOO6pimh.jpg"
release_date: "2020-12-03"
title: "Monster Hunter"
video: false
vote_average: 7.1
vote_count: 1346
*/
