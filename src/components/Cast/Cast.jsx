import React, { Component } from "react";
import { searchCast, getImageUrl } from "../../services/search/search";
import s from "./Cast.module.css";

export default class Cast extends Component {
  state = {
    cast: null,
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    searchCast(id).then((cast) => this.setState({ cast }));
  }

  render() {
    const { cast } = this.state;

    return (
      <>
        {cast && (
          <ul className={s.container}>
            {cast.map(({ cast_id, character, profile_path, original_name }) => (
              <li key={cast_id} className={s.item}>
                {profile_path && (
                  <img src={getImageUrl(profile_path)} alt={original_name} />
                )}
                <span>{original_name}</span>
                <span>character: {character}</span>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}
